# Vercel Deployment - Quick Start

## Before Deploying

### ✅ Checklist
- [ ] Database set up (PlanetScale, Neon, Supabase, etc.)
- [ ] Vercel account created
- [ ] Vercel CLI installed: `npm i -g vercel`
- [ ] Environment variables ready
- [ ] Build tested locally: `npm run build`

## Quick Deploy

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
# Preview deployment (test first)
vercel

# Production deployment
vercel --prod
```

## Critical Environment Variables

Add these in Vercel Dashboard (Settings > Environment Variables):

```env
# Required
APP_NAME=Sigma-Africa-Accelerate
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:DoC7jD6ZdKmxxReTe9fSpSWHyFkEzbzoRRFRhw3kaSs=
APP_URL=https://your-app.vercel.app

# Database (example for MySQL)
DB_CONNECTION=mysql
DB_HOST=your-db-host.com
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Serverless optimizations
SESSION_DRIVER=cookie
CACHE_DRIVER=array
LOG_CHANNEL=stderr
QUEUE_CONNECTION=sync
```

## Generate New APP_KEY
```bash
php artisan key:generate --show
```

## Test Build Locally
```bash
# Build assets
npm run build

# Install production dependencies
composer install --optimize-autoloader --no-dev

# Test server
php artisan serve
```

## Troubleshooting

### Build Failed?
```bash
vercel logs <deployment-url>
```

### 500 Error?
- Check environment variables are set
- Verify APP_KEY is set correctly
- Check database connection

### Assets not loading?
- Verify `npm run build` completed
- Check APP_URL matches your Vercel domain
- Look for CORS issues in browser console

## Useful Commands

```bash
vercel                    # Deploy preview
vercel --prod             # Deploy production
vercel logs               # View logs
vercel env ls             # List environment variables
vercel ls                 # List deployments
```

## Need More Help?

See `VERCEL_DEPLOYMENT.md` for detailed documentation.
