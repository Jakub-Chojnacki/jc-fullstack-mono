# Monorepo Food Planner App

![CI status](https://github.com/Jakub-Chojnacki/jc-fullstack-mono/actions/workflows/ci.yml/badge.svg)



This is a modern monorepo with **Turborepo**, a shared **ts-rest** API contract, a **React + TanStack Router** frontend, and a **NestJS + Prisma** + **Postgres backend**.

---

## 📁 Monorepo Structure
```text
jc-fullstack-mono/
├── apps/
│   ├── food-planner-client/   # Frontend - React Vite + TanStack Router
│   └── api/           # Backend - NestJS + Prisma
├── packages/
│   ├── api-contract/  # Shared ts-rest contract
│   └── ui/           # Shared shadcn/ui components
├── turbo.json         # Turborepo config
├── package.json
├── docker-compose.dev.yml # Easy to setup postgres container    
```

## 🚀 Getting Started

### 1. Clone the repo

`git clone https://github.com/Jakub-Chojnacki/jc-fullstack-mono.git`

### 2. Install dependencies
`npm install` - in the root directory
`npm run setup` - in the root directory, it's a script that prepares internal packages and runs npx prisma generate in api

### 3. Set up the database (Prisma)

Inside `apps/api` and `apps/food-planner-client`:

 Create .env file and add values according to the .env.example file.

You can generate a database container in docker with `npm run dev:db`

Then push the prisma schema to the database:

`npx prisma db push`

### 4. Run the dev servers

From the root:
`npm run dev`

This runs frontend, backend and runs `tsc` for the api-contract internal package.

### Additional notes:
You could technically run FE and BE in containers because they have Dockerfile but they are mostly for production purposes. I'd recommend just using `npm run dev`
