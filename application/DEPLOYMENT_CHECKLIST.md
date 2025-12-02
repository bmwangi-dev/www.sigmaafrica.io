# Vercel Deployment Checklist

## Pre-Deployment Steps

### 1. Environment Variables Setup
Before deploying, ensure these environment variables are set in Vercel Dashboard:

**Required Variables:**
```bash
APP_NAME="Sigma Africa"
APP_ENV=production
APP_KEY=base64:YOUR_APP_KEY_HERE  # Generate with: php artisan key:generate --show
APP_DEBUG=false
APP_URL=https://your-app.vercel.app

# Database (Choose one option)
# Option A: SQLite (for testing only - data is ephemeral)
DB_CONNECTION=sqlite
DB_DATABASE=/tmp/database.sqlite

# Option B: MySQL (PlanetScale - Recommended for Production)
# DB_CONNECTION=mysql
# DB_HOST=your-planetscale-host.psdb.cloud
# DB_PORT=3306
# DB_DATABASE=your_database
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Option C: PostgreSQL (Neon or Supabase)
# DB_CONNECTION=pgsql
# DB_HOST=your-postgres-host
# DB_PORT=5432
# DB_DATABASE=your_database
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Session & Cache
SESSION_DRIVER=cookie
CACHE_DRIVER=array
QUEUE_CONNECTION=sync
LOG_CHANNEL=stderr

# Asset Configuration (Set automatically by Vercel)
# ASSET_URL will be your deployment URL
```

### 2. Local Build Test
Test the production build locally before deploying:

```bash
# Install dependencies
composer install --optimize-autoloader --no-dev
npm ci

# Build assets
npm run build

# Verify build directory exists
ls -la public/build/

# Test the application
php artisan serve
```

### 3. Verify Configuration Files
- ✅ `vercel.json` - Build and routing configuration
- ✅ `.vercelignore` - Files to exclude from deployment
- ✅ `api/index.php` - Serverless function entry point
- ✅ `package.json` - Has `vercel-build` script
- ✅ `composer.json` - Has `vercel-build` script

## Deployment Commands

### Initial Deployment
```bash
# Link to Vercel project (first time only)
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Check Deployment Status
```bash
# View real-time logs
vercel logs --follow

# List recent deployments
vercel ls

# Check specific deployment
vercel inspect <deployment-url>
```

## Post-Deployment Steps

### 1. Run Database Migrations
Since you can't run artisan commands directly on Vercel, you have options:

**Option A: Create a temporary migration endpoint (REMOVE AFTER USE)**
```php
// routes/web.php
Route::get('/run-migrations', function () {
    if (env('APP_ENV') === 'production' && request()->query('secret') === env('MIGRATION_SECRET')) {
        Artisan::call('migrate', ['--force' => true]);
        return 'Migrations completed!';
    }
    return abort(403);
});
```
Then add `MIGRATION_SECRET=your-random-secret` to Vercel env vars and visit:
`https://your-app.vercel.app/run-migrations?secret=your-random-secret`

**Option B: Use database GUI**
Run migrations directly in your database provider's console.

**Option C: Local connection**
Connect to your production database locally and run:
```bash
php artisan migrate --force
```

### 2. Verify Deployment
Check these URLs:
- ✅ Homepage: `https://your-app.vercel.app`
- ✅ Assets loading: Open browser DevTools → Network tab
- ✅ API routes working
- ✅ Styling intact (navbar, cards, etc.)

### 3. Check Logs
```bash
# Real-time logs
vercel logs --follow

# Filter by type
vercel logs --follow --output=logs
```

## Common Issues & Solutions

### Issue 1: 500 Server Error
**Symptoms:** White screen or "500 Server Error"

**Solutions:**
1. Check Vercel logs: `vercel logs --follow`
2. Verify `APP_KEY` is set in environment variables
3. Ensure database credentials are correct
4. Check for missing dependencies in `composer.json`
5. Verify PHP version compatibility (requires PHP 8.2+)

**Debug temporarily:**
Set `APP_DEBUG=true` in Vercel env vars to see detailed errors (remove after debugging!)

### Issue 2: Assets Not Loading / Styling Issues
**Symptoms:** Page loads but no CSS/JS, navbar distorted, cards not structured

**Solutions:**
1. Verify build completed successfully:
   ```bash
   vercel logs <deployment-url> | grep "Building frontend"
   ```

2. Check `public/build` directory exists in deployment:
   - The `.vercelignore` file should NOT exclude `/public/build`
   - The `.gitignore` excludes it but deployment should include it

3. Verify asset URLs in browser DevTools:
   - Assets should load from `https://your-app.vercel.app/build/assets/...`
   - Check for 404 errors in Network tab

4. Clear Vercel cache and redeploy:
   ```bash
   vercel --prod --force
   ```

5. Ensure `ASSET_URL` is NOT set in vercel.json (should auto-detect)

### Issue 3: Only Homepage Loads
**Symptoms:** Homepage works but other routes show 404

**Solutions:**
1. Verify `routes` in `vercel.json` includes catch-all:
   ```json
   {
     "src": "/(.*)",
     "dest": "/api/index.php"
   }
   ```

2. Check route caching:
   - Routes are cached during build
   - Clear cache: Remove cached files and redeploy

3. Verify Inertia.js configuration in `app.tsx`

### Issue 4: Database Connection Errors
**Symptoms:** "Could not find driver" or connection refused

**Solutions:**
1. Verify database credentials in Vercel env vars
2. For MySQL: Ensure SSL is configured if required by provider
3. For PlanetScale: Use the proper connection format (no SSL)
4. Check database allows connections from Vercel's IP range

### Issue 5: Session/Cache Errors
**Symptoms:** "Session store not defined" or cache errors

**Solutions:**
1. Ensure `SESSION_DRIVER=cookie` in env vars
2. Ensure `CACHE_DRIVER=array` in env vars
3. Verify `/tmp` directories are created in `api/index.php`

## Optimization Tips

### 1. Asset Optimization
```bash
# Ensure Vite builds optimized assets
npm run build

# Verify production mode
echo $NODE_ENV  # Should be 'production'
```

### 2. PHP Optimization
```bash
# Composer autoloader optimization
composer install --optimize-autoloader --no-dev

# Cache Laravel configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 3. Enable Caching Headers
Already configured in `vercel.json` for `/build/*` and static assets.

### 4. Use Environment-Specific Config
Keep production config in Vercel env vars, not in code.

## Monitoring

### Check Build Logs
```bash
vercel logs <deployment-url> | grep -E "(Error|Warning|Building)"
```

### Monitor Function Execution
View Analytics in Vercel Dashboard:
- Function invocation count
- Error rate
- Execution duration
- Bandwidth usage

### Set Up Alerts
Configure notifications in Vercel Dashboard for:
- Failed deployments
- High error rates
- Increased latency

## Rollback Strategy

### Rollback to Previous Deployment
```bash
# List deployments
vercel ls

# Promote a specific deployment to production
vercel promote <deployment-url>
```

### Instant Rollback
In Vercel Dashboard:
1. Go to Deployments
2. Find the last working deployment
3. Click "Promote to Production"

## Security Checklist

- ✅ `APP_DEBUG=false` in production
- ✅ `APP_ENV=production`
- ✅ Strong `APP_KEY` generated
- ✅ Database credentials in env vars (not in code)
- ✅ `.env` files in `.gitignore`
- ✅ Remove any test/debug routes before deployment
- ✅ CORS properly configured if needed
- ✅ Rate limiting enabled for API routes

## Performance Checklist

- ✅ Composer autoloader optimized
- ✅ Laravel config cached
- ✅ Routes cached
- ✅ Views cached
- ✅ Vite production build
- ✅ Static assets have cache headers
- ✅ Database indexes created
- ✅ N+1 queries resolved
- ✅ Image assets optimized

## Quick Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Force rebuild (clear cache)
vercel --prod --force

# View logs
vercel logs --follow

# List deployments
vercel ls

# Check environment variables
vercel env ls

# Add environment variable
vercel env add VARIABLE_NAME

# Remove environment variable
vercel env rm VARIABLE_NAME

# Inspect deployment
vercel inspect <deployment-url>
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel PHP Runtime](https://github.com/vercel-community/php)
- [Laravel Deployment Guide](https://laravel.com/docs/deployment)
- [Vercel Community](https://github.com/vercel/community)

---

**Last Updated:** 2025-12-02
**Vercel PHP Runtime Version:** 0.7.4
**Laravel Version:** 12.x
**PHP Version:** 8.2+
