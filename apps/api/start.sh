#!/bin/sh

echo "⏳ Waiting for database..."
until nc -z -v -w30 db-hostname 5432; do
  echo "Waiting for Postgres to be ready..."
  sleep 2
done

echo "🚀 Running Prisma Migrate Deploy..."
npx prisma migrate deploy

echo "📦 Starting API..."
node apps/api/dist/main
