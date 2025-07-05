🔐 Entrix – Authentication Microservice (Backend)

Entrix is a plug-and-play authentication microservice built with Node.js, Express, PostgreSQL, and Redis. It supports JWT-based auth, password-based login, OAuth (Google, GitHub), and user event syncing via Redis PubSub. Ideal for use across multiple frontend platforms or as a full-fledged AaaS (Authentication-as-a-Service).

🚀 Features

🛡️ Secure login, register, logout, refresh

🔐 JWT-based authentication

🔁 Redis PubSub for syncing user changes to external platforms

🔑 OAuth support (Google, GitHub)

🧩 Multi-tenant ready (with client IDs, webhook support)

🧠 Written in TypeScript with clean service-based architecture

⚙️ RESTful API design with modular routes/controllers/services

🧪 Easy to test, extend, and deploy

🧰 Tech Stack

Backend: Express.js + TypeScript

Database: PostgreSQL (via Prisma ORM)

Auth: JWT, bcrypt

OAuth: Google/GitHub (via passport)

Sync: Redis Pub/Sub

Env Mgmt: dotenv

ORM: Prisma

Validation: Zod

📁 Project Structure

auth-service/
├── src/
│   ├── config/             # Redis, Prisma, OAuth, env
│   ├── controllers/        # Route handlers (auth, user, oauth)
│   ├── services/           # Business logic (auth, sync, users)
│   ├── middlewares/        # JWT auth, error handling
│   ├── models/             # DB models or Prisma clients
│   ├── events/             # Redis publisher/subscriber
│   ├── routes/             # Express routers
│   ├── utils/              # JWT, password hashing, logger
│   ├── types/              # TS types for user, token, events
│   ├── app.ts              # Express app instance
│   └── server.ts           # Entry point
├── prisma/
│   └── schema.prisma       # Prisma DB schema
├── .env                    # Environment variables
└── README.md

🛠️ Getting Started

1. Clone the Repository

git clone https://github.com/your-org/entrix-auth-service.git
cd entrix-auth-service

2. Install Dependencies

npm install

3. Setup Environment Variables

Create a .env file in the root:

PORT=4000
JWT_SECRET=supersecretkey
DATABASE_URL=postgresql://user:password@localhost:5432/entrix
REDIS_URL=redis://localhost:6379
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OAUTH_CALLBACK_URL=http://localhost:4000/oauth/callback

4. Run Prisma Migrations

npx prisma migrate dev --name init
npx prisma generate

5. Start the Server

npm run dev

🔑 API Overview

Endpoint

Method

Description

/api/register

POST

Create a new user

/api/login

POST

Authenticate user credentials

/api/logout

POST

Clear token / session

/api/me

GET

Get current user info

/api/refresh

POST

Refresh JWT token

/api/oauth/google

GET

Start Google OAuth

/api/oauth/callback

GET

Handle OAuth redirect

Full OpenAPI/Swagger docs coming soon

🔁 Redis Pub/Sub

This service publishes events like:

user.created

user.updated

user.deleted

Example payload:

{
  "event": "user.updated",
  "user": {
    "id": "auth_123",
    "email": "user@example.com"
  }
}

Clients can subscribe using Redis or webhook endpoint.

🧪 Testing

You can test the routes using Postman or Insomnia. Auth routes require a valid JWT in the Authorization header:

Authorization: Bearer <token>

📄 License

MIT License. Use it, fork it, build your own 🔥

