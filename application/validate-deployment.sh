#!/usr/bin/env bash

# Deployment validation script for Vercel
# This script helps identify issues before deploying to Vercel

set -e

echo "╔══════════════════════════════════════════════╗"
echo "║   Vercel Deployment Validation Script       ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

error_count=0
warning_count=0

# Function to print errors
print_error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
    ((error_count++))
}

# Function to print warnings
print_warning() {
    echo -e "${YELLOW}⚠️  WARNING: $1${NC}"
    ((warning_count++))
}

# Function to print success
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

echo "1️⃣  Checking Project Structure..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check vercel.json
if [ -f "vercel.json" ]; then
    print_success "vercel.json exists"
    
    # Validate JSON syntax
    if command -v jq &> /dev/null; then
        if jq empty vercel.json 2>/dev/null; then
            print_success "vercel.json is valid JSON"
        else
            print_error "vercel.json has invalid JSON syntax"
        fi
    fi
else
    print_error "vercel.json is missing"
fi

# Check api/index.php
if [ -f "api/index.php" ]; then
    print_success "api/index.php exists"
else
    print_error "api/index.php is missing"
fi

# Check .vercelignore
if [ -f ".vercelignore" ]; then
    print_success ".vercelignore exists"
else
    print_warning ".vercelignore is missing"
fi

echo ""
echo "2️⃣  Checking Dependencies..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check composer.json
if [ -f "composer.json" ]; then
    print_success "composer.json exists"
    
    # Check PHP version requirement
    php_version=$(php -r "echo PHP_VERSION;")
    print_success "PHP version: $php_version"
    
    # Validate composer.json
    if composer validate --no-check-publish 2>/dev/null; then
        print_success "composer.json is valid"
    else
        print_error "composer.json validation failed"
    fi
else
    print_error "composer.json is missing"
fi

# Check package.json
if [ -f "package.json" ]; then
    print_success "package.json exists"
    
    # Check for vercel-build script
    if grep -q '"vercel-build"' package.json; then
        print_success "package.json has vercel-build script"
    else
        print_warning "package.json missing vercel-build script"
    fi
else
    print_error "package.json is missing"
fi

# Check if vendor directory exists
if [ -d "vendor" ]; then
    print_success "vendor directory exists"
else
    print_warning "vendor directory not found - run 'composer install'"
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_success "node_modules directory exists"
else
    print_warning "node_modules not found - run 'npm install'"
fi

echo ""
echo "3️⃣  Checking Configuration Files..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check vite.config
if [ -f "vite.config.ts" ] || [ -f "vite.config.js" ]; then
    print_success "Vite config exists"
else
    print_error "Vite config missing"
fi

# Check for .env.example
if [ -f ".env.example" ]; then
    print_success ".env.example exists"
else
    print_warning ".env.example missing"
fi

# Check app.blade.php
if [ -f "resources/views/app.blade.php" ]; then
    print_success "resources/views/app.blade.php exists"
    
    # Check for duplicate @routes
    route_count=$(grep -c "@routes" resources/views/app.blade.php || true)
    if [ "$route_count" -eq 1 ]; then
        print_success "Single @routes directive found"
    elif [ "$route_count" -gt 1 ]; then
        print_error "Duplicate @routes directives found ($route_count times)"
    else
        print_warning "No @routes directive found"
    fi
else
    print_error "resources/views/app.blade.php missing"
fi

echo ""
echo "4️⃣  Testing Build Process..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if build directory exists
if [ -d "public/build" ]; then
    build_size=$(du -sh public/build 2>/dev/null | cut -f1 || echo "unknown")
    file_count=$(find public/build -type f 2>/dev/null | wc -l || echo "0")
    print_success "Build directory exists (Size: $build_size, Files: $file_count)"
    
    # Check for manifest.json
    if [ -f "public/build/manifest.json" ]; then
        print_success "Build manifest exists"
    else
        print_warning "Build manifest missing - run 'npm run build'"
    fi
else
    print_warning "Build directory missing - run 'npm run build'"
fi

echo ""
echo "5️⃣  Checking Vercel Configuration..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if ASSET_URL is hardcoded in vercel.json
if [ -f "vercel.json" ]; then
    if grep -q "ASSET_URL" vercel.json; then
        print_warning "ASSET_URL is set in vercel.json - should be dynamic"
    else
        print_success "ASSET_URL is not hardcoded"
    fi
    
    # Check for buildCommand
    if grep -q "buildCommand" vercel.json; then
        print_success "buildCommand is configured"
    else
        print_warning "buildCommand not found in vercel.json"
    fi
fi

echo ""
echo "6️⃣  Checking .gitignore vs .vercelignore..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if public/build is in .gitignore but NOT in .vercelignore
if [ -f ".gitignore" ]; then
    if grep -q "public/build" .gitignore; then
        print_success "public/build is in .gitignore (as expected)"
        
        if [ -f ".vercelignore" ]; then
            if grep -q "public/build" .vercelignore && ! grep -q "#!/public/build" .vercelignore; then
                print_error "public/build should NOT be in .vercelignore"
            else
                print_success "public/build is correctly NOT ignored by .vercelignore"
            fi
        fi
    fi
fi

echo ""
echo "7️⃣  Environment Variables Check..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

required_envs=("APP_NAME" "APP_ENV" "APP_KEY" "DB_CONNECTION")

for env_var in "${required_envs[@]}"; do
    if [ -n "${!env_var}" ]; then
        print_success "$env_var is set"
    else
        print_warning "$env_var is not set (make sure it's set in Vercel)"
    fi
done

echo ""
echo "8️⃣  Checking PHP Compatibility..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check PHP extensions
required_extensions=("pdo" "mbstring" "json" "openssl" "tokenizer")

for ext in "${required_extensions[@]}"; do
    if php -m | grep -qi "^$ext$"; then
        print_success "PHP extension '$ext' is installed"
    else
        print_error "PHP extension '$ext' is missing"
    fi
done

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║            Validation Summary                ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

if [ $error_count -eq 0 ] && [ $warning_count -eq 0 ]; then
    echo -e "${GREEN}🎉 Perfect! No errors or warnings found.${NC}"
    echo -e "${GREEN}✅ Your project is ready for Vercel deployment!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run 'npm run build' to generate production assets"
    echo "  2. Ensure all environment variables are set in Vercel"
    echo "  3. Deploy with 'vercel --prod'"
    exit 0
elif [ $error_count -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Found $warning_count warning(s) but no errors.${NC}"
    echo -e "${GREEN}✅ You can proceed with deployment, but review warnings above.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Review and fix warnings if possible"
    echo "  2. Run 'npm run build' to generate production assets"
    echo "  3. Ensure all environment variables are set in Vercel"
    echo "  4. Deploy with 'vercel --prod'"
    exit 0
else
    echo -e "${RED}❌ Found $error_count error(s) and $warning_count warning(s).${NC}"
    echo -e "${RED}⚠️  Please fix the errors before deploying.${NC}"
    echo ""
    echo "Common fixes:"
    echo "  - Run 'composer install' to install PHP dependencies"
    echo "  - Run 'npm install' to install Node.js dependencies"
    echo "  - Run 'npm run build' to build frontend assets"
    echo "  - Check vercel.json syntax at jsonlint.com"
    exit 1
fi
