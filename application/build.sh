#!/usr/bin/env bash

set -e

echo "🔍 Pre-deployment validation starting..."

# Check for required files
echo "📋 Checking required files..."
required_files=("vercel.json" "api/index.php" "composer.json" "package.json" "vite.config.ts")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Error: Required file missing: $file"
        exit 1
    fi
    echo "✅ Found: $file"
done

# Validate composer.json
echo ""
echo "🔍 Validating composer.json..."
if ! composer validate --no-check-publish; then
    echo "❌ composer.json validation failed"
    exit 1
fi
echo "✅ composer.json is valid"

# Install Composer dependencies
echo ""
echo "🔧 Installing Composer dependencies..."
composer install --optimize-autoloader --no-dev --prefer-dist --no-interaction

# Install Node.js dependencies
echo ""
echo "📦 Installing Node.js dependencies..."
npm ci --production=false

# Build frontend assets
echo ""
echo "🏗️  Building frontend assets..."
npm run build

# Verify build output
echo ""
echo "🔍 Verifying build output..."
if [ ! -d "public/build" ]; then
    echo "❌ Error: public/build directory not created"
    exit 1
fi

if [ ! -f "public/build/manifest.json" ]; then
    echo "❌ Error: Build manifest not found"
    exit 1
fi

build_size=$(du -sh public/build | cut -f1)
echo "✅ Build directory created (Size: $build_size)"

# Count built assets
asset_count=$(find public/build -type f | wc -l)
echo "✅ Built $asset_count asset files"

# Cache Laravel configuration
echo ""
echo "⚙️  Caching Laravel configuration..."
php artisan config:cache || true
php artisan route:cache || true
php artisan view:cache || true

# Verify cache files
echo ""
echo "🔍 Verifying cache files..."
if [ -f "bootstrap/cache/config.php" ]; then
    echo "✅ Config cache created"
else
    echo "⚠️  Warning: Config cache not created"
fi

if [ -f "bootstrap/cache/routes-v7.php" ]; then
    echo "✅ Routes cache created"
else
    echo "⚠️  Warning: Routes cache not created"
fi

# Check environment configuration
echo ""
echo "🔍 Checking environment configuration..."
if [ -z "$APP_KEY" ]; then
    echo "⚠️  Warning: APP_KEY not set in environment"
fi

if [ -z "$APP_URL" ]; then
    echo "⚠️  Warning: APP_URL not set in environment"
fi

# Display summary
echo ""
echo "═══════════════════════════════════════════"
echo "✅ Build completed successfully!"
echo "═══════════════════════════════════════════"
echo ""
echo "📊 Build Summary:"
echo "  - Composer packages: Installed (production)"
echo "  - NPM packages: Installed"
echo "  - Frontend assets: Built ($asset_count files, $build_size)"
echo "  - Laravel caches: Created"
echo ""
echo "🚀 Ready for deployment!"
echo ""

exit 0
