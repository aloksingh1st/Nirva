# Nirva Monorepo

Nirva is a full-stack authentication and user management platform designed for modern applications. This monorepo consolidates all core components of the project — **backend**, **frontend**, and **SDK** — under a single repository for cleaner collaboration, versioning, and deployment.

---

## 📦 Repository Structure

```
nirva/
├── backend/      # Express + Prisma based authentication API
├── frontend/     # React frontend for dashboard and user interfaces
└── sdk/          # Nirva SDK for client-side authentication integration
```

---

## ⚙️ Backend

### Overview

The backend provides RESTful authentication services, including:

* User registration and login (email/password)
* OAuth integrations (Google, GitHub)
* Token-based session management (JWT)
* Prisma ORM with PostgreSQL

### Tech Stack

* **Node.js** + **Express**
* **Prisma** ORM
* **PostgreSQL**
* **JWT** for authentication

### Run Locally

```bash
cd backend
cp .env.example .env  # update environment variables
yarn install
yarn dev
```

---

## 🖥️ Frontend

### Overview

The frontend provides a clean and responsive interface for managing user accounts and viewing authentication activity.

### Tech Stack

* **React.js** + **Vite**
* **TailwindCSS**
* **Zustand** for state management
* **Axios** for API calls

### Run Locally

```bash
cd frontend
yarn install
yarn dev
```

---

## 🧩 SDK

### Overview

The SDK enables easy integration of Nirva authentication into third-party applications.

### Features

* Auto-configuration with base URL
* Support for email/password and OAuth login
* Token storage and session management

### Example Usage

```js
import { configureEntrix, loginGoogle, getMe } from "nirva";

configureEntrix({ baseUrl: "https://api.nirva.app" });

async function example() {
  await loginGoogle();
  const user = await getMe();
  console.log(user);
}
```

### Build SDK

```bash
cd sdk
yarn install
yarn build
```

---

## 🧠 Development Philosophy

Nirva is built for **modularity**, **clarity**, and **scalability**. Keeping backend, frontend, and SDK in a single monorepo allows synchronized development, atomic commits, and simplified CI/CD.

---

## 🚀 Future Roadmap

* [ ] Add organization-based user roles
* [ ] Implement rate limiting and API analytics
* [ ] Publish SDK on npm
* [ ] Integrate CI/CD pipeline for deployments

---

## 🤝 Contributing

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes and push: `git push origin feature/your-feature-name`
4. Create a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

**Nirva** — Simplifying Authentication for Modern Applications.
