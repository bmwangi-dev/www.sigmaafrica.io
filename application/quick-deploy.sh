#!/usr/bin/env bash

# Quick Deploy Script - Validates and deploys to Vercel
# Usage: ./quick-deploy.sh [preview|production]

set -e

MODE=${1:-preview}

echo "╔══════════════════════════════════════════════╗"
echo "║     Sigma Africa - Quick Deploy Script      ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Mode: $MODE${NC}"
echo ""

# Step 1: Validation
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Running pre-deployment validation..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if ./validate-deployment.sh; then
    echo -e "${GREEN}✅ Validation passed${NC}"
else
    echo -e "${RED}❌ Validation failed${NC}"
    echo ""
    echo "Please fix the errors above before deploying."
    exit 1
fi

echo ""

# Step 2: Build
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Building frontend assets..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if npm run build; then
    echo -e "${GREEN}✅ Build completed successfully${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo ""

# Step 3: Verify build
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Verifying build output..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ ! -d "public/build" ]; then
    echo -e "${RED}❌ Build directory not found${NC}"
    exit 1
fi

if [ ! -f "public/build/manifest.json" ]; then
    echo -e "${RED}❌ Build manifest not found${NC}"
    exit 1
fi

build_size=$(du -sh public/build | cut -f1)
file_count=$(find public/build -type f | wc -l)

echo -e "${GREEN}✅ Build verified${NC}"
echo "   Size: $build_size"
echo "   Files: $file_count"

echo ""

# Step 4: Deploy
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 4: Deploying to Vercel..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$MODE" = "production" ] || [ "$MODE" = "prod" ]; then
    echo -e "${YELLOW}⚠️  Deploying to PRODUCTION${NC}"
    echo ""
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled."
        exit 0
    fi
    
    if vercel --prod; then
        echo ""
        echo -e "${GREEN}✅ Production deployment successful!${NC}"
    else
        echo ""
        echo -e "${RED}❌ Production deployment failed${NC}"
        exit 1
    fi
else
    echo -e "${BLUE}Deploying to preview environment...${NC}"
    
    if vercel; then
        echo ""
        echo -e "${GREEN}✅ Preview deployment successful!${NC}"
        echo ""
        echo -e "${YELLOW}📝 Next steps:${NC}"
        echo "   1. Test the preview URL thoroughly"
        echo "   2. Check navbar, cards, and styling"
        echo "   3. Verify all routes work"
        echo "   4. If everything looks good, run:"
        echo -e "      ${BLUE}./quick-deploy.sh production${NC}"
    else
        echo ""
        echo -e "${RED}❌ Preview deployment failed${NC}"
        exit 1
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Helpful commands:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "View logs:        vercel logs --follow"
echo "List deployments: vercel ls"
echo "Rollback:         vercel promote <deployment-url>"
echo ""
