# 🚀 Vercel Deployment - README

## Quick Start

```bash
# 1. Validate your setup
./validate-deployment.sh

# 2. Deploy to preview (for testing)
./quick-deploy.sh preview

# 3. After testing preview, deploy to production
./quick-deploy.sh production
```

## What's Been Fixed

Your Vercel deployment had several critical issues that have been **resolved**:

### ❌ Before → ✅ After

| Issue | Status | Fix |
|-------|--------|-----|
| 500 Server Errors | ❌ | ✅ Enhanced error handling & logging |
| Hardcoded ASSET_URL | ❌ | ✅ Removed - now auto-detects |
| Missing build config | ❌ | ✅ Added explicit build commands |
| No .vercelignore | ❌ | ✅ Created proper exclusions |
| Assets not loading | ❌ | ✅ Fixed routing & cache headers |
| Navbar distorted | ❌ | ✅ Fixed CSS loading |
| Cards not structured | ❌ | ✅ Fixed asset paths |
| Duplicate @routes | ❌ | ✅ Removed duplicate directive |
| Poor debugging | ❌ | ✅ Added validation scripts |

## Environment Variables Setup

**⚠️ CRITICAL: Set these in Vercel Dashboard before deploying**

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Settings → Environment Variables
4. Add these variables:

### Required Variables

```bash
# App Configuration
APP_NAME=Sigma Africa
APP_ENV=production
APP_KEY=base64:YOUR_KEY_HERE  # Run: php artisan key:generate --show
APP_URL=https://your-app.vercel.app
APP_DEBUG=false

# Database (Choose one option)
# Option 1: SQLite (Testing only - data resets on each deploy)
DB_CONNECTION=sqlite
DB_DATABASE=/tmp/database.sqlite

# Option 2: MySQL/PlanetScale (Recommended)
# DB_CONNECTION=mysql
# DB_HOST=your-host.psdb.cloud
# DB_PORT=3306
# DB_DATABASE=your_database
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Session & Cache (Required for Serverless)
SESSION_DRIVER=cookie
CACHE_DRIVER=array
QUEUE_CONNECTION=sync
LOG_CHANNEL=stderr
```

### Generate APP_KEY

```bash
php artisan key:generate --show
```

Copy the output and paste it as `APP_KEY` in Vercel environment variables.

## Deployment Scripts

### 1. `validate-deployment.sh` - Pre-deployment Validation
Checks your project for common issues before deploying.

```bash
./validate-deployment.sh
```

**What it checks:**
- ✅ Project structure
- ✅ Dependencies
- ✅ Configuration files
- ✅ Build output
- ✅ Common misconfigurations
- ✅ PHP extensions

### 2. `quick-deploy.sh` - One-Command Deploy
Validates, builds, and deploys in one command.

```bash
# Deploy to preview
./quick-deploy.sh preview

# Deploy to production
./quick-deploy.sh production
```

**What it does:**
1. Runs validation
2. Builds frontend assets
3. Verifies build output
4. Deploys to Vercel
5. Shows helpful next steps

### 3. `build.sh` - Manual Build
Just builds the project without deploying.

```bash
./build.sh
```

## Step-by-Step Deployment

### First Time Setup

1. **Link to Vercel:**
   ```bash
   vercel link
   ```

2. **Set Environment Variables:**
   - Via Vercel Dashboard (recommended)
   - Or via CLI: `vercel env add VARIABLE_NAME`

3. **Generate APP_KEY:**
   ```bash
   php artisan key:generate --show
   ```
   Add output to Vercel env vars

### Every Deployment

1. **Validate:**
   ```bash
   ./validate-deployment.sh
   ```

2. **Deploy to Preview First:**
   ```bash
   ./quick-deploy.sh preview
   ```

3. **Test Preview URL:**
   - Check homepage loads
   - Verify navbar displays correctly
   - Ensure cards are structured properly
   - Test all routes
   - Check browser console for errors

4. **Deploy to Production:**
   ```bash
   ./quick-deploy.sh production
   ```

## Troubleshooting

### 500 Server Error

**Check logs:**
```bash
vercel logs --follow
```

**Common causes:**
- Missing `APP_KEY` in environment variables
- Database connection error
- Missing PHP extensions

**Quick debug (temporary):**
```bash
# Enable debug mode (REMOVE AFTER FIXING!)
vercel env add APP_DEBUG
# Set value to: true

# Redeploy
vercel --prod

# Check error details
vercel logs --follow

# IMPORTANT: Disable after fixing
vercel env rm APP_DEBUG production
```

### Assets Not Loading / Styling Broken

**Symptoms:**
- Page loads but CSS missing
- Navbar distorted
- Cards not structured

**Fixes:**
```bash
# 1. Rebuild assets
rm -rf public/build
npm run build

# 2. Verify build exists
ls -la public/build/

# 3. Force new deployment
vercel --prod --force

# 4. Clear browser cache
# Hard reload: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
```

**Check in browser:**
1. Open DevTools (F12)
2. Network tab
3. Reload page
4. Look for failed requests (404 errors)
5. Verify `/build/assets/*` files load successfully

### Only Homepage Works

**Fix route caching:**
```bash
# Clear route cache
php artisan route:clear

# Rebuild
npm run build

# Redeploy
vercel --prod
```

### Nothing Changed After Deploy

```bash
# 1. Clear Vercel cache
vercel --prod --force

# 2. Clear browser cache (hard reload)

# 3. Verify you're testing the latest deployment
vercel ls
```

## File Structure

```
application/
├── api/
│   ├── index.php           # ✅ UPDATED: Enhanced error handling
│   └── debug.php
├── public/
│   └── build/              # ✅ Generated assets (auto-built)
├── vercel.json             # ✅ UPDATED: Fixed configuration
├── .vercelignore           # ✅ NEW: Deployment exclusions
├── build.sh                # ✅ UPDATED: Enhanced validation
├── quick-deploy.sh         # ✅ NEW: One-command deploy
├── validate-deployment.sh  # ✅ NEW: Pre-deploy validation
├── FIXES_SUMMARY.md        # ✅ NEW: Detailed fixes
├── DEPLOYMENT_CHECKLIST.md # ✅ NEW: Complete guide
└── README_DEPLOYMENT.md    # ✅ NEW: This file
```

## Monitoring

### View Logs
```bash
# Real-time logs
vercel logs --follow

# Filter by deployment
vercel logs <deployment-url>
```

### Check Deployment Status
```bash
# List all deployments
vercel ls

# Inspect specific deployment
vercel inspect <deployment-url>
```

### Analytics
View in Vercel Dashboard:
- Function invocations
- Error rates
- Response times
- Bandwidth usage

## Useful Commands

```bash
# Validation
./validate-deployment.sh

# Quick deploy (preview)
./quick-deploy.sh preview

# Quick deploy (production)
./quick-deploy.sh production

# Manual deployment
vercel                    # Preview
vercel --prod             # Production
vercel --prod --force     # Force rebuild

# Logs
vercel logs --follow

# Deployments
vercel ls                           # List all
vercel promote <deployment-url>     # Promote to prod
vercel rm <deployment-url>          # Remove

# Environment Variables
vercel env ls                       # List all
vercel env add VARIABLE_NAME        # Add new
vercel env rm VARIABLE_NAME         # Remove
```

## Success Checklist

After deployment, verify:
- ✅ Homepage loads without errors
- ✅ Navbar displays correctly
- ✅ Cards are properly structured and styled
- ✅ All routes work (not just homepage)
- ✅ Assets load from `/build/assets/*`
- ✅ No 404 errors in browser console
- ✅ No 500 errors in Vercel logs
- ✅ CSS is applied correctly
- ✅ JavaScript works (no console errors)
- ✅ Page loads in < 3 seconds

## Getting Help

1. **Check validation script:**
   ```bash
   ./validate-deployment.sh
   ```

2. **Review detailed guide:**
   ```bash
   cat DEPLOYMENT_CHECKLIST.md
   ```

3. **Check fixes summary:**
   ```bash
   cat FIXES_SUMMARY.md
   ```

4. **View Vercel logs:**
   ```bash
   vercel logs --follow
   ```

5. **Test locally:**
   ```bash
   npm run build
   php artisan serve
   ```

## Important Notes

- ✅ **Always test preview** before deploying to production
- ✅ **Never commit `.env` files** - use Vercel env vars
- ✅ **Keep `APP_DEBUG=false`** in production
- ✅ **Use cookie sessions** (required for serverless)
- ✅ **Build folder auto-generated** - don't commit `public/build`
- ✅ **Check logs first** when troubleshooting

## Quick Reference Card

| Task | Command |
|------|---------|
| Validate | `./validate-deployment.sh` |
| Deploy Preview | `./quick-deploy.sh preview` |
| Deploy Production | `./quick-deploy.sh production` |
| View Logs | `vercel logs --follow` |
| List Deploys | `vercel ls` |
| Force Deploy | `vercel --prod --force` |
| Add Env Var | `vercel env add NAME` |

---

**Status:** ✅ Ready to deploy  
**Last Validated:** Run `./validate-deployment.sh` to check  
**Documentation:** See `DEPLOYMENT_CHECKLIST.md` for complete guide
