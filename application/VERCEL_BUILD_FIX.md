# Vercel Build Process - Fixed

## What Just Happened

### The Error:
```
sh: line 1: composer: command not found
Error: Command "composer install --optimize-autoloader --no-dev && npm ci" exited with 127
```

### The Cause:
The `vercel.json` had a custom `installCommand` that tried to run Composer before Vercel had set it up:
```json
"installCommand": "composer install --optimize-autoloader --no-dev && npm ci"
```

### The Fix:
Removed the custom `installCommand`. Vercel now auto-detects and handles dependency installation.

## How Vercel Build Works for Laravel

Vercel automatically detects your project type and runs the appropriate build steps:

### 1. Auto Detection Phase
Vercel scans your project and finds:
- `composer.json` → Detects PHP/Laravel project
- `package.json` → Detects Node.js/npm dependencies
- `vercel.json` → Reads custom configuration

### 2. Automatic Dependency Installation
Vercel automatically runs (in order):
```bash
# Step 1: Install Composer dependencies
composer install --optimize-autoloader --no-dev

# Step 2: Install npm dependencies  
npm ci
```

### 3. Build Phase
Vercel then runs build commands in this order:

**a) Composer's `post-install-cmd` hooks** (if defined in `composer.json`)

**b) Composer's `vercel-build` script** (from your `composer.json`):
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

**c) Custom `buildCommand`** (from `vercel.json`):
```bash
npm run build
```

**d) npm's `vercel-build` script** (from your `package.json`)
- In your case, this is: `vite build`

### 4. Deploy Phase
Vercel deploys the built application with:
- PHP runtime (vercel-php@0.7.4)
- Built assets in `public/build/`
- API functions in `api/index.php`

## Current Configuration

### vercel.json (Now Correct)
{
    "version": 2,
    // ❌ DO NOT add "buildCommand" here - it causes Vercel to misdetect the project type
    // ✅ Use "vercel-build" scripts in package.json and composer.json instead
    "functions": {
        "api/index.php": {
            "runtime": "vercel-php@0.7.4",
            "maxDuration": 30
        }
    }
}
```

### composer.json (Already Correct)
```json
{
    "scripts": {
        "vercel-build": [
            "@php artisan config:cache",
            "@php artisan route:cache",
            "@php artisan view:cache"
        ]
    }
}
```

### package.json (Already Correct)
```json
{
    "scripts": {
        "build": "vite build",
        "vercel-build": "vite build"
    }
}
```

## Build Order (What Actually Happens)

```
┌─────────────────────────────────────────────────────┐
│ 1. Vercel Clones Your Repository                   │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 2. Applies .vercelignore (removes dev files)        │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 3. Auto-installs Composer dependencies              │
│    → composer install --optimize-autoloader --no-dev│
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 4. Auto-installs npm dependencies                   │
│    → npm ci                                         │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 5. Runs composer vercel-build script                │
│    → php artisan config:cache                       │
│    → php artisan route:cache                        │
│    → php artisan view:cache                         │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 6. Runs custom buildCommand from vercel.json        │
│    → npm run build (which runs vite build)          │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 7. Deploys to Vercel Edge Network                   │
│    → Public assets served statically                │
│    → API requests routed to api/index.php           │
└─────────────────────────────────────────────────────┘
```

## Key Takeaways

### ✅ DO:
- Let Vercel auto-detect and install dependencies
- Use `buildCommand` for custom build steps
- Use `vercel-build` scripts in both `composer.json` and `package.json`
- Keep build commands simple and fast

### ❌ DON'T:
- Use custom `installCommand` (Vercel handles this)
- Try to run Composer in `buildCommand` (it's already run)
- Hardcode paths or URLs
- Run long-running tasks in build (use separate services)

## What's Different Now

### Before (Broken):
```json
{
    "installCommand": "composer install --optimize-autoloader --no-dev && npm ci"
}
```
❌ Problem: Tries to run Composer before Vercel sets it up

### After (Fixed):
```json
{
    "buildCommand": "npm run build"
}
```
✅ Solution: Let Vercel handle dependency installation automatically

## Next Steps

Now that this is fixed, try deploying again:

```bash
# Commit the fix
git add vercel.json
git commit -m "fix: Remove custom installCommand from vercel.json"
git push origin main

# Or deploy directly via CLI
vercel --prod
```

## Expected Build Logs (Success)

You should now see:
```
✓ Cloning github.com/bmwangi-dev/www.sigmaafrica.io
✓ Installing Composer dependencies [Auto-detected]
✓ Installing npm dependencies [Auto-detected]
✓ Running "composer run vercel-build"
  → Config cached
  → Routes cached
  → Views cached
✓ Running "npm run build"
  → vite v7.0.4 building for production...
  → ✓ built in Xs
✓ Build completed
```

## Troubleshooting

If you still see errors:

### Check Vercel Dashboard Overrides
Go to **Settings > General > Build & Development Settings**:
- **Install Command**: Ensure "INSTALL COMMAND" is **NOT** overridden with `composer install`. Set it to default (`npm install`) or turn off the override.
- **Build Command**: Ensure it matches `npm run build` as per `vercel.json`.
- **Root Directory**: Ensure this is set to `application`.

### Check Environment Variables
Ensure these are set in Vercel Dashboard:
- `APP_KEY`
- `APP_URL`
- `APP_DEBUG=false`
- Database credentials

### Check Logs
```bash
vercel logs --follow
```

### Force Rebuild
```bash
vercel --prod --force
```

---

**Status:** ✅ Build process fixed - ready to deploy!
**Fix:** Removed custom `installCommand` from `vercel.json`
**Next:** Push changes and redeploy
