const { test, expect, request } = require('@playwright/test');

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:8000';

test.describe('Bookstore API Tests', () => {
  let token = '';
  let addedBookId = null;

  test.beforeAll(async () => {
    const api = await request.newContext();

    // Sign up the user (optional - ignore failure if already signed up)
    await api.post(`${baseUrl}/signup`, {
      data: {
        username: 'playwrightuser',
        password: 'Test@123',
      },
    }).catch(() => {});

    // Login to get JWT token
    const loginRes = await api.post(`${baseUrl}/login`, {
      form: {
        username: 'playwrightuser',
        password: 'Test@123',
      },
    });

    expect(loginRes.ok()).toBeTruthy();
    const loginData = await loginRes.json();
    token = loginData.access_token;
  });

  test('GET /books - should list books', async ({ request }) => {
    const res = await request.get(`${baseUrl}/books`);
    expect(res.ok()).toBeTruthy();
    const books = await res.json();
    expect(Array.isArray(books)).toBeTruthy();
  });

  test('POST /books - should add a book', async ({ request }) => {
    const res = await request.post(`${baseUrl}/books`, {
      data: {
        title: 'Playwright Book',
        author: 'Tester',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(res.ok()).toBeTruthy();
    const book = await res.json();
    expect(book.title).toBe('Playwright Book');
    addedBookId = book.id;
  });

  test('PUT /books/:id - should update the book', async ({ request }) => {
    const res = await request.put(`${baseUrl}/books/${addedBookId}`, {
      data: {
        title: 'Updated Title',
        author: 'Updated Author',
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(res.ok()).toBeTruthy();
    const updated = await res.json();
    expect(updated.title).toBe('Updated Title');
  });

  test('GET /books/:id - should get the added book', async ({ request }) => {
    const res = await request.get(`${baseUrl}/books/${addedBookId}`);
    expect(res.ok()).toBeTruthy();
    const book = await res.json();
    expect(book.id).toBe(addedBookId);
  });

  test('DELETE /books/:id - should delete the book', async ({ request }) => {
    const res = await request.delete(`${baseUrl}/books/${addedBookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(res.ok()).toBeTruthy();
  });

  test('GET /books/:id - should return 404 after delete', async ({ request }) => {
    const res = await request.get(`${baseUrl}/books/${addedBookId}`);
    expect(res.status()).toBe(404);
  });
});