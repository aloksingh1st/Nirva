# Nirva - Authentication as a Service

> **Safe entry, without the boilerplate.**

Nirva is a comprehensive Authentication-as-a-Service platform that provides secure, customizable authentication components for modern web applications.

## ✨ Features

- **🔐 Secure by Default** - Enterprise-grade security with JWT tokens and encryption
- **🎨 Fully Customizable** - Theme your auth flows to match your brand
- **⚡ Lightning Fast** - Optimized performance with global CDN deployment  
- **👨‍💻 Developer First** - Clean APIs, TypeScript support, and comprehensive docs
- **🚀 Easy Integration** - Drop-in React components that work out of the box
- **🌐 OAuth Support** - Built-in support for GitHub, Google, and more
- **📊 Analytics Dashboard** - Monitor authentication metrics and user activity

## 🚀 Quick Start

### Installation

```bash
npm install @nirva/react
# or
yarn add @nirva/react
```

### Basic Setup

```tsx
import { NirvaProvider, LoginForm } from '@nirva/react'

export default function App() {
  return (
    <NirvaProvider apiKey={process.env.NEXT_PUBLIC_NIRVA_API_KEY}>
      <LoginForm
        onSuccess={(user) => {
          console.log('User logged in:', user)
          // Redirect to dashboard
        }}
      />
    </NirvaProvider>
  )
}
```

### Available Components

- `<LoginForm />` - Email/password authentication
- `<RegisterForm />` - User registration with validation
- `<OAuthButtons />` - Social authentication (GitHub, Google, etc.)
- `<UserProfile />` - User profile management
- `<AuthProvider />` - Context provider with auth state

## 📖 Documentation

Visit our [comprehensive documentation](/docs) to learn more:

- [Getting Started](/docs/getting-started) - 5-minute setup guide
- [Components](/docs/components) - Detailed component documentation
- [Playground](/playground) - Interactive component customizer
- [API Reference](#) - Complete API documentation

## 🎮 Try the Demo

Explore our [interactive playground](/playground) to see Nirva components in action and customize them to match your design.

**Demo Credentials:**
- Email: `demo@nirva.dev`
- Password: `password`

## 🏗 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── ui/             # Base UI components
│   └── layout/         # Layout components
├── contexts/           # React contexts (Auth, Theme)
├── pages/              # Application pages
├── lib/                # Utility functions
└── types/              # TypeScript definitions
```

## 🔧 Configuration

### Environment Variables

```env
NEXT_PUBLIC_NIRVA_API_KEY=your_api_key_here
NEXT_PUBLIC_NIRVA_PROJECT_ID=your_project_id
```

### Component Customization

All components accept customization props:

```tsx
<LoginForm
  className="max-w-md mx-auto"
  showCard={true}
  title="Welcome Back"
  description="Sign in to continue"
  onSuccess={(user) => handleLogin(user)}
  onError={(error) => handleError(error)}
/>
```

## 🎨 Theming

Nirva uses CSS custom properties for theming. Override them to match your brand:

```css
:root {
  --primary: 239 84% 67%;          /* Primary brand color */
  --secondary: 160 84% 39%;        /* Secondary accent */
  --accent: 32 95% 44%;            /* Accent color */
  --background: 0 0% 100%;         /* Background */
  --foreground: 240 10% 3.9%;     /* Text color */
}
```

## 🛡️ Security

Nirva implements industry-standard security practices:

- **JWT Tokens** - Secure, stateless authentication
- **Password Hashing** - bcrypt with salt rounds
- **HTTPS Only** - All traffic encrypted in transit
- **Rate Limiting** - Protection against brute force attacks
- **SOC 2 Compliance** - Enterprise security standards

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📊 Analytics

Track authentication metrics in your dashboard:

- User registrations and login attempts
- OAuth provider usage
- Geographic login distribution
- Session duration and activity

## 🤝 Contributing

We welcome contributions! Please see our [contributing guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](/docs)
- 💬 [Discord Community](#)
- 📧 [Email Support](mailto:support@nirva.dev)
- 🐛 [Report Issues](https://github.com/nirva/nirva/issues)

## 🌟 Show Your Support

Give us a ⭐ if this project helped you!

---

**Built with ❤️ by the Nirva Team**

*Making authentication simple, secure, and delightful for developers everywhere.*