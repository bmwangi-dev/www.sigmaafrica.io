# Vercel Deployment Guide

This guide will help you deploy your Laravel + React + Inertia application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/docs/cli) installed: `npm i -g vercel`
3. A database service (recommended):
   - [PlanetScale](https://planetscale.com/) (MySQL)
   - [Neon](https://neon.tech/) (PostgreSQL)
   - [Supabase](https://supabase.com/) (PostgreSQL)
   - Or SQLite for testing (stored in `/tmp`, data is ephemeral)

## Configuration Files

The following files have been configured for Vercel deployment:

- `vercel.json` - Main Vercel configuration
- `api/lambda.php` - Serverless function entry point for Laravel
- `.vercelignore` - Files to exclude from deployment
- `.env.vercel` - Environment variables template
- `build.sh` - Build script (optional)

## Deployment Steps

### 1. Set Up Your Database (Production)

**Important**: SQLite with `/tmp` storage is ephemeral and will reset on every deployment. For production, use a managed database service.

#### Option A: PlanetScale (MySQL)
```bash
# Install PlanetScale CLI
brew install planetscale/tap/pscale

# Create database
pscale database create sigma-africa

# Get connection string
pscale connect sigma-africa main
```

#### Option B: Neon (PostgreSQL)
```bash
# Create a database at https://neon.tech
# Copy the connection string
```

### 2. Install Vercel CLI

```bash
npm install -g vercel
```

### 3. Link Your Project

```bash
vercel link
```

Follow the prompts to:
- Select your scope (personal or team)
- Link to existing project or create new one
- Confirm project settings

### 4. Configure Environment Variables

Add these environment variables to your Vercel project. You can do this in two ways:

#### Option A: Using Vercel Dashboard
1. Go to your project on [vercel.com](https://vercel.com)
2. Navigate to **Settings** > **Environment Variables**
3. Add each variable from `.env.vercel`

#### Option B: Using Vercel CLI
```bash
# Required variables
vercel env add APP_NAME
vercel env add APP_ENV
vercel env add APP_KEY
vercel env add APP_URL
vercel env add DB_CONNECTION
vercel env add DB_HOST
vercel env add DB_PORT
vercel env add DB_DATABASE
vercel env add DB_USERNAME
vercel env add DB_PASSWORD

# Add more as needed
```

**Critical Variables:**
- `APP_KEY` - Generate with `php artisan key:generate --show`
- `APP_URL` - Your Vercel app URL (e.g., `https://your-app.vercel.app`)
- `DB_*` - Your database credentials
- `SESSION_DRIVER=cookie`
- `CACHE_DRIVER=array`
- `LOG_CHANNEL=stderr`

### 5. Deploy to Vercel

#### For Testing (Preview Deployment)
```bash
vercel
```

#### For Production
```bash
vercel --prod
```

### 6. Run Database Migrations

After deployment, you'll need to run migrations. Since Vercel is serverless, you have a few options:

#### Option A: Create a Migration Endpoint (Temporary)
```php
// routes/web.php - Remove after migration!
Route::get('/migrate', function () {
    if (app()->environment('production')) {
        Artisan::call('migrate', ['--force' => true]);
        return 'Migrated!';
    }
    return 'Not in production';
});
```

Then visit: `https://your-app.vercel.app/migrate`

**⚠️ Important**: Remove this route immediately after running migrations for security!

#### Option B: Use Database GUI
Use your database provider's migration tool or GUI to run migrations manually.

#### Option C: Use a CI/CD Pipeline
Set up GitHub Actions or similar to run migrations on deployment.

## Vercel Configuration Explained

### vercel.json
- **buildCommand**: Builds your React assets and installs PHP dependencies
- **routes**: Handles routing between static assets and PHP backend
- **functions**: Configures the PHP runtime for your Laravel app
- **env**: Sets environment variables for all deployments

### api/lambda.php
- Entry point for all Laravel requests
- Sets storage path to `/tmp` (required for serverless)
- Creates necessary directories dynamically

## Important Considerations

### 1. File Storage
Vercel's filesystem is read-only except for `/tmp`, which is ephemeral. For file uploads:
- Use AWS S3
- Use Cloudinary
- Use Vercel Blob Storage

Configure in `config/filesystems.php`:
```php
'default' => env('FILESYSTEM_DISK', 's3'),
```

### 2. Sessions
Use `cookie` or `database` session driver, not `file`:
```env
SESSION_DRIVER=cookie
```

### 3. Cache
Use `array` driver or external service (Redis, Memcached):
```env
CACHE_DRIVER=array
```

### 4. Queue Jobs
Use `sync` for simple jobs or external queue service (SQS, Redis):
```env
QUEUE_CONNECTION=sync
```

### 5. Cold Starts
Serverless functions have cold starts (~1-3 seconds). This is normal for the first request after inactivity.

### 6. Execution Time Limit
Vercel functions have a maximum execution time:
- Free: 10 seconds
- Pro: 60 seconds
- Enterprise: 900 seconds

Long-running tasks should use external queue services.

## Troubleshooting

### Build Fails
```bash
# Check build logs
vercel logs <deployment-url>

# Test build locally
npm run build
composer install --optimize-autoloader --no-dev
```

### 500 Errors
```bash
# Check function logs
vercel logs <deployment-url> --follow

# Common issues:
# - Missing APP_KEY
# - Database connection errors
# - Missing environment variables
```

### Assets Not Loading
- Verify `APP_URL` is set correctly
- Check `public/build` directory exists after build
- Ensure Vite build completed successfully

### Database Connection Issues
- Verify all `DB_*` environment variables are set
- Check database allows connections from Vercel IPs
- Test connection string locally

## Testing Locally

Before deploying, test the production build locally:

```bash
# Build assets
npm run build

# Start PHP server
php artisan serve

# Test in browser
open http://localhost:8000
```

## CI/CD with GitHub

Vercel automatically deploys when you push to GitHub:

1. Connect your GitHub repository in Vercel dashboard
2. Set your production branch (usually `main` or `master`)
3. Configure environment variables
4. Push to GitHub to trigger deployment

## Monitoring

- **Logs**: `vercel logs <deployment-url> --follow`
- **Analytics**: Available in Vercel dashboard
- **Error Tracking**: Consider integrating Sentry or similar

## Useful Commands

```bash
# Deploy preview
vercel

# Deploy production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>

# Check environment variables
vercel env ls
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel PHP Runtime](https://github.com/vercel-community/php)
- [Laravel Deployment](https://laravel.com/docs/deployment)
- [Inertia.js SSR on Vercel](https://inertiajs.com/server-side-rendering)

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test build process locally
4. Review this guide's troubleshooting section
5. Check [Vercel Support](https://vercel.com/support)
