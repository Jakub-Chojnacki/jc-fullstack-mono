# Monorepo Food Planner App

This is a modern monorepo with **Turborepo**, a shared **ts-rest** API contract, a **React + TanStack Router** frontend, and a **NestJS + Prisma** + **Postgres backend**.

---

## 📁 Monorepo Structure
```text
jc-fullstack-mono/
├── apps/
│   ├── food-planner-client/   # Frontend - React + TanStack Router
│   └── api/           # Backend - NestJS + Prisma
├── packages/
│   ├── api-contract/  # Shared ts-rest contract
├── turbo.json         # Turborepo config
├── package.json       
```

## 🚀 Getting Started

### 1. Clone the repo

`git clone https://github.com/Jakub-Chojnacki/jc-fullstack-mono.git`

### 2. Install dependencies
`npm install` - in the root directory

### 3. Set up the database (Prisma)

Inside `apps/api`:

 Create a .env file and add values according to the .env.example file.

Then generate the Prisma client and push the schema:

`npm prisma generate` 
`npm prisma db push`

### 4. Run the dev servers

From the root:
`npm run dev`

This runs frontend, backend and runs `tsc` for the api-contract internal package.