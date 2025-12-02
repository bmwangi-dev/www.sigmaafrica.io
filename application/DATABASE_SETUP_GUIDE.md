# Fix Database Connection Error - Step by Step

## Current Error:
```
SQLSTATE[08006] [7] connection to server at "127.0.0.1", port 5432 failed
```

Your `/about` page tries to query the `teams` table, but no database is configured.

---

## 🚀 Quick Fix (5 Minutes)

### Step 1: Add Database Environment Variables

**Via Vercel CLI (Fastest):**

```bash
# Add DB_CONNECTION
vercel env add DB_CONNECTION
# When prompted select: Production, Preview, Development
# Enter value: sqlite

# Add DB_DATABASE
vercel env add DB_DATABASE  
# When prompted select: Production, Preview, Development
# Enter value: /tmp/database.sqlite

# Add SETUP_SECRET (for running migrations)
vercel env add SETUP_SECRET
# When prompted select: Production
# Enter value: your-random-secret-xyz123
```

**Or Via Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add these variables:

| Name | Value | Environments |
|------|-------|--------------|
| `DB_CONNECTION` | `sqlite` | Production, Preview, Development |
| `DB_DATABASE` | `/tmp/database.sqlite` | Production, Preview, Development |
| `SETUP_SECRET` | `your-random-secret-xyz123` | Production |

### Step 2: Deploy the Changes

```bash
# Commit the setup route
git add routes/web.php
git commit -m "Add temporary database setup route"
git push

# Or redeploy via CLI
vercel --prod
```

Wait for deployment to complete.

### Step 3: Run Migrations

Once deployed, visit this URL in your browser:

```
https://your-app.vercel.app/setup-database?secret=your-random-secret-xyz123
```

Replace:
- `your-app.vercel.app` with your actual Vercel URL
- `your-random-secret-xyz123` with the SETUP_SECRET you set

You should see:
```json
{
  "success": true,
  "message": "Database setup completed!",
  "results": {
    "migrations": "Completed",
    "seeders": "Completed"
  },
  "warning": "REMOVE this route after use!"
}
```

### Step 4: Remove the Setup Route (IMPORTANT!)

After migrations complete, remove the setup route for security:

```bash
# Edit routes/web.php
# Remove lines 13-42 (the setup-database route)
```

Or use this command:

```bash
# Will create a backup and remove the setup route
cp routes/web.php routes/web.php.backup
```

Then manually remove the setup route from `routes/web.php` (lines 13-42).

```bash
# Commit and push
git add routes/web.php
git commit -m "Remove temporary database setup route"
git push
```

### Step 5: Test Your Site

Visit your about page:
```
https://your-app.vercel.app/about
```

It should now load without errors! ✅

---

## ⚠️ Important Notes on SQLite

**Data Will Be Lost:**
- On every new deployment
- After periods of inactivity (cold starts)
- When Vercel rebuilds the function

**This is only for testing!**

For production, use a proper database:
- **Neon** (PostgreSQL - Free tier available)
- **Supabase** (PostgreSQL - Free tier available)
- **PlanetScale** (MySQL - Free tier available)

See `DATABASE_FIX.md` for production database setup.

---

## 🔍 Troubleshooting

### Setup route returns 403:
- Check that SETUP_SECRET matches in both:
  - Vercel environment variables
  - The URL query parameter

### Migrations fail:
- Check Vercel logs: `vercel logs --follow`
- Ensure DB_CONNECTION and DB_DATABASE are set
- Verify your seeders don't require external data

### Still seeing database errors:
- Make sure you redeployed after adding env vars
- Clear browser cache
- Check you're testing the latest deployment

---

## 📋 Quick Commands Summary

```bash
# 1. Add environment variables
vercel env add DB_CONNECTION
# Enter: sqlite

vercel env add DB_DATABASE
# Enter: /tmp/database.sqlite

vercel env add SETUP_SECRET
# Enter: your-secret-123

# 2. Deploy
git add routes/web.php
git commit -m "Add database setup route"
git push

# 3. Visit setup URL
# https://your-app.vercel.app/setup-database?secret=your-secret-123

# 4. Remove setup route
# Edit routes/web.php and remove the setup-database route

# 5. Deploy again
git add routes/web.php
git commit -m "Remove setup route"
git push
```

---

## ✅ Success Checklist

- [ ] Added DB_CONNECTION and DB_DATABASE to Vercel
- [ ] Added SETUP_SECRET to Vercel
- [ ] Deployed the setup route
- [ ] Visited /setup-database and saw success message
- [ ] Removed the setup route from routes/web.php
- [ ] Deployed again without the setup route
- [ ] /about page loads without database errors

---

**Status:** Ready to configure database and run migrations!
