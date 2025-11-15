#!/usr/bin/env bash

set -e

echo "🔧 Installing Composer dependencies..."
composer install --optimize-autoloader --no-dev --prefer-dist

echo "📦 Installing Node.js dependencies..."
npm ci

echo "🏗️  Building frontend assets..."
npm run build

echo "⚙️  Caching Laravel configuration..."
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

echo "✅ Build completed successfully!"
