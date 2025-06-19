# 📚 Bookstore API Test Automation with Playwright

This project provides a complete test automation suite for a Bookstore API using **Playwright** with integrated **FastAPI** backend, **JWT authentication**, and **Allure reporting**.

---

## 🚀 Features

- FastAPI server with in-memory user and book management
- JWT-based user authentication
- Full CRUD tests for books
- Positive and negative test coverage
- Request chaining across test steps
- Allure reporting integration
- GitHub Actions CI pipeline ready
- `.env` support for environment config

---

## 🛠️ Technologies Used

- Python (FastAPI)
- Node.js (Playwright)
- Playwright Test Runner
- Allure Reporter
- dotenv
- GitHub Actions

---

## 🧰 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bookstore-api-playwright.git
cd bookstore-api-playwright
```

### 2. Install Dependencies

```bash
npm install
```

> If Python dependencies are needed, set up your Python environment and install FastAPI, Uvicorn, and others:
```bash
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt  # If provided
```

### 3. Start the FastAPI Server

```bash
python -m uvicorn main:app --reload
```

This runs the API on `http://127.0.0.1:8000`.

### 4. Run the Tests

```bash
npx playwright test
```

### 5. Generate Allure Report

```bash
npx playwright test --reporter=allure-playwright
npx allure serve
```

---

## 🔐 Authentication

The app uses **OAuth2 with JWT tokens**. Token-based auth is required for protected routes. To test:

- Register a user via the `/register` endpoint
- Log in via `/login` to obtain a JWT token
- Use that token in headers: `Authorization: Bearer <token>`

---

## 📁 Project Structure

```
bookstore-api-playwright/
├── main.py                  # FastAPI app
├── package.json             # Playwright test scripts
├── playwright.config.js     # Playwright configuration
├── tests/                   # Test files (not shown here)
├── .env                     # Env variables
└── README.md                # Project documentation
```

---

## 🧪 Example API Endpoints

- `POST /register` – Register a new user
- `POST /login` – Obtain access token
- `GET /books` – List books (auth required)
- `POST /books` – Add a new book
- `PUT /books/{id}` – Update a book
- `DELETE /books/{id}` – Delete a book

---

## 🧼 Environment Variables

Make sure you configure the `.env` file (if needed):

```env
BASE_URL=http://localhost:8000
```

---

## 🤖 Continuous Integration

This project is CI-ready with **GitHub Actions**. Just add your `.github/workflows/playwright.yml` to trigger tests on every push or PR.

---

## 📜 License

MIT – free to use and modify.