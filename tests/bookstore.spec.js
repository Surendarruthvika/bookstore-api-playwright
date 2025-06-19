const { test, expect } = require('@playwright/test');
const { baseUrl } = require('../configs/env');

console.log("Using BASE_URL:", baseUrl); 

let token;
let newBookId;

test.beforeAll(async ({ request }) => {
  // ⏳ Wait for FastAPI server to be ready (2 seconds)
  await new Promise((res) => setTimeout(res, 2000));

  // Sign up - optional
  await request.post(`${baseUrl}/signup`, {
    data: {
      username: 'playwrightuser',
      password: 'Test@123'
    }
  });

  // Login
  const loginRes = await request.post(`${baseUrl}/login`, {
    form: {
      username: 'playwrightuser',
      password: 'Test@123'
    }
  });

  expect(loginRes.status()).toBe(200);
  const loginData = await loginRes.json();
  token = loginData.access_token;
});

test.describe('Bookstore API Tests', () => {

  test('GET /books - should list books', async ({ request }) => {
    const res = await request.get(`${baseUrl}/books`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('POST /books - should add a book', async ({ request }) => {
    const res = await request.post(`${baseUrl}/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        title: "Playwright Guide",
        author: "Test User"
      }
    });

    expect(res.status()).toBe(200);
    const data = await res.json();
    newBookId = data.id;
    expect(data.title).toBe("Playwright Guide");
  });

  test('PUT /books/:id - should update the book', async ({ request }) => {
    const res = await request.put(`${baseUrl}/books/${newBookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        title: "Updated Playwright Guide",
        author: "Updated Author"
      }
    });

    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.title).toBe("Updated Playwright Guide");
    expect(data.author).toBe("Updated Author");
  });

  test('GET /books/:id - should get the added book', async ({ request }) => {
    const res = await request.get(`${baseUrl}/books/${newBookId}`);
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.id).toBe(newBookId);
  });

  test('DELETE /books/:id - should delete the book', async ({ request }) => {
    const res = await request.delete(`${baseUrl}/books/${newBookId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.message).toMatch(/Deleted/i);
  });

  test('GET /books/:id - should return 404 after delete', async ({ request }) => {
    const res = await request.get(`${baseUrl}/books/${newBookId}`);
    expect(res.status()).toBe(404);
  });
});