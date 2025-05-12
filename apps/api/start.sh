#!/bin/sh
echo "🚀 Running Prisma Migrate Deploy..."
npx prisma migrate deploy

echo "📦 Starting API..."
node apps/api/dist/main
