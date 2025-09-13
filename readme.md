# Entrix SDK

A lightweight, modular authentication SDK for seamless integration of Entrix auth (OAuth + JWT) into your React apps.

## 🚀 Features

- ✅ Google & GitHub OAuth preconfigured
- 🔐 JWT-based login & session handling
- 🧩 Pre-built UI components (editable)
- 🛠 CLI tool to scaffold login UI
- 🪝 React Hooks for user access

---

## 📦 Installation

```bash
npm install @entrix/sdk
# or
yarn add @entrix/sdk
```

---

## ⚙️ Quick Setup

### 1. Configure SDK

In your app’s entry point (`main.tsx` or `_app.tsx`):

```ts
import { configureEntrix } from '@entrix/sdk';

configureEntrix({
  baseUrl: 'http://localhost:4000', // Your Entrix backend URL
  tokenStorage: 'cookie', // or 'localStorage'
});
```

---

### 2. Generate Editable UI (Optional)

```bash
npx entrix-sdk init-ui
```

This will generate editable UI files inside your project:
```
src/components/auth/
├── EntrixLogin.tsx
├── EntrixOAuthButtons.tsx
```

---

### 3. Use in Components

```tsx
import { EntrixLogin, EntrixOAuthButtons, useEntrixUser } from '@entrix/sdk';

const Home = () => {
  const { user, loading } = useEntrixUser();

  if (loading) return <p>Loading...</p>;
  if (!user) return <EntrixLogin />;

  return <p>Welcome, {user.name}!</p>;
};
```

---

## 🔐 Auth APIs

### `login(email, password)`
Handles traditional email login

### `logout()`
Clears session/token

### `getUser()`
Fetches authenticated user info

---

## 🧪 Example Project

Check [`examples/react-app`](./examples/react-app) for a working integration.

---

## 📜 License

MIT © 2025 Entrix Team
