# Database Connection Error Fix

## The Error
```
SQLSTATE[08006] [7] connection to server at "127.0.0.1", port 5432 failed: 
Connection refused
```

## What This Means
Your app is trying to connect to PostgreSQL, but there's no database configured in Vercel.

## Solution 1: Use SQLite (Quick Testing - Data Resets on Each Deploy)

### In Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add these variables (for all environments):

```
DB_CONNECTION=sqlite
DB_DATABASE=/tmp/database.sqlite
```

5. Redeploy your site

⚠️ **Warning:** SQLite on Vercel uses `/tmp` which is ephemeral. Data will be lost on:
- Each new deployment
- Function cold starts (after inactivity)

This is only suitable for testing, NOT production.

---

## Solution 2: Use External PostgreSQL Database (Recommended for Production)

### Best Options:

#### A) Neon (PostgreSQL - Free Tier Available)
1. Go to https://neon.tech
2. Create a free account
3. Create a new project
4. Copy the connection string
5. In Vercel, add these environment variables:

```
DB_CONNECTION=pgsql
DB_HOST=your-project.neon.tech
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_SSLMODE=require
```

#### B) Supabase (PostgreSQL - Free Tier Available)
1. Go to https://supabase.com
2. Create a free account
3. Create a new project
4. Go to Project Settings → Database
5. Copy connection details
6. In Vercel, add these environment variables:

```
DB_CONNECTION=pgsql
DB_HOST=db.your-project.supabase.co
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_SSLMODE=require
```

#### C) PlanetScale (MySQL - Free Tier Available)
1. Go to https://planetscale.com
2. Create a free account
3. Create a new database
4. Get connection details
5. In Vercel, add these environment variables:

```
DB_CONNECTION=mysql
DB_HOST=your-host.psdb.cloud
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_SSLMODE=require
```

---

## Quick Commands

### If Using SQLite (Testing Only):

```bash
# Add to Vercel via CLI
vercel env add DB_CONNECTION production
# Enter: sqlite

vercel env add DB_DATABASE production
# Enter: /tmp/database.sqlite

# Redeploy
vercel --prod
```

### After Setting Database:

You'll need to run migrations. Create a temporary migration route:

```php
// In routes/web.php - TEMPORARY ONLY
Route::get('/migrate', function () {
    if (request()->query('secret') === env('MIGRATION_SECRET')) {
        try {
            Artisan::call('migrate', ['--force' => true]);
            Artisan::call('db:seed', ['--force' => true]);
            return 'Migrations and seeds completed!';
        } catch (\Exception $e) {
            return 'Error: ' . $e->getMessage();
        }
    }
    return abort(403);
});
```

Then:
1. Add `MIGRATION_SECRET=your-random-secret-123` to Vercel env vars
2. Visit: `https://your-app.vercel.app/migrate?secret=your-random-secret-123`
3. **IMPORTANT:** Remove this route after running migrations!

---

## Checking Current Database Config

Check what's currently set in Vercel:

```bash
vercel env ls
```

Look for:
- `DB_CONNECTION`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`

---

## Recommended Approach

**For Testing:**
- Use SQLite temporarily (quick, but data is lost)
- Understand data will reset on each deployment

**For Production:**
- Use Neon (easiest PostgreSQL option)
- Or Supabase (PostgreSQL + additional features)
- Or PlanetScale (MySQL - very fast)

---

## Current Status

✅ Site deployed successfully
❌ Database not configured
→ Choose SQLite (testing) or external database (production)

---

## Next Steps

1. **Quick Test (SQLite):**
   ```bash
   vercel env add DB_CONNECTION production
   # Enter: sqlite
   
   vercel env add DB_DATABASE production
   # Enter: /tmp/database.sqlite
   
   vercel --prod
   ```

2. **Or Production Setup:**
   - Sign up for Neon/Supabase/PlanetScale
   - Get connection details
   - Add to Vercel environment variables
   - Redeploy

3. **Run Migrations:**
   - Create temporary migration route (see above)
   - Visit the migration URL
   - Remove the route after
