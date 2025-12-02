# Setting Up Environment Variables in Vercel

## Method 1: Using Vercel Dashboard (Recommended)

### Step-by-Step Guide:

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in to your account

2. **Select Your Project**
   - Click on your project (www.sigmaafrica.io)

3. **Navigate to Settings**
   - Click on "Settings" tab at the top

4. **Add Environment Variables**
   - Click "Environment Variables" in the left sidebar
   - You'll see a form to add variables

5. **Add Each Variable**
   For each variable below, do the following:
   - Enter the **Name** (e.g., `APP_KEY`)
   - Enter the **Value**
   - Select environments: Check **Production**, **Preview**, and **Development**
   - Click "Save"

### Required Environment Variables:

```plaintext
┌─────────────────────┬──────────────────────────────────────┬──────────────────────────────┐
│ Name                │ Value                                 │ Notes                        │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ APP_NAME            │ Sigma Africa                          │ Your application name        │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ APP_ENV             │ production                            │ Must be 'production'         │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ APP_KEY             │ base64:your_generated_key_here        │ See "Generate APP_KEY" below │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ APP_URL             │ https://your-app.vercel.app           │ Your Vercel deployment URL   │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ APP_DEBUG           │ false                                 │ MUST be false in production  │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ DB_CONNECTION       │ sqlite                                │ Or mysql, pgsql              │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ DB_DATABASE         │ /tmp/database.sqlite                  │ For SQLite only              │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ SESSION_DRIVER      │ cookie                                │ Required for serverless      │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ CACHE_DRIVER        │ array                                 │ Required for serverless      │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ QUEUE_CONNECTION    │ sync                                  │ For simple queue jobs        │
├─────────────────────┼──────────────────────────────────────┼──────────────────────────────┤
│ LOG_CHANNEL         │ stderr                                │ Required for Vercel logs     │
└─────────────────────┴──────────────────────────────────────┴──────────────────────────────┘
```

### Generate APP_KEY:

**On your local machine:**

```bash
cd /home/mwangi-brian/Desktop/Projects/www.sigmaafrica.io/application
php artisan key:generate --show
```

Copy the output (it will look like `base64:abcde123456...`) and paste it as the value for `APP_KEY`.

**Example output:**
```
base64:Xvw8kM3zQN9YXs7KqF2hJ5iT8nP1Rb4WcU6eD0lS=
```

### Database Configuration:

**Option 1: SQLite (For Testing Only)**
```plaintext
DB_CONNECTION=sqlite
DB_DATABASE=/tmp/database.sqlite
```
⚠️ **Warning:** Data will be lost on each deployment! Use only for testing.

**Option 2: MySQL/PlanetScale (Recommended for Production)**
```plaintext
DB_CONNECTION=mysql
DB_HOST=your-database-host.psdb.cloud
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

**Option 3: PostgreSQL (Neon/Supabase)**
```plaintext
DB_CONNECTION=pgsql
DB_HOST=your-postgres-host.neon.tech
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### Screenshot Guide:

1. **Vercel Dashboard → Your Project**
   ```
   [Project Name]
   ├── Overview
   ├── Deployments
   ├── Analytics
   └── Settings  ← Click here
   ```

2. **Settings → Environment Variables**
   ```
   Settings
   ├── General
   ├── Domains
   ├── Environment Variables  ← Click here
   ├── Git
   └── ...
   ```

3. **Add Variable Form**
   ```
   Name:  [APP_KEY                          ]
   Value: [base64:Xvw8kM3zQN9YXs7KqF2hJ5iT...]
   
   Environments:
   ☑ Production
   ☑ Preview
   ☑ Development
   
   [Save] button
   ```

---

## Method 2: Using Vercel CLI

### Installation:
```bash
npm install -g vercel
```

### Login:
```bash
vercel login
```

### Link Project (if not already linked):
```bash
cd /home/mwangi-brian/Desktop/Projects/www.sigmaafrica.io/application
vercel link
```

### Add Variables:

```bash
# Add APP_KEY
vercel env add APP_KEY production
# When prompted, paste your generated key: base64:xxx...

# Add APP_NAME
vercel env add APP_NAME production
# When prompted, type: Sigma Africa

# Add APP_ENV
vercel env add APP_ENV production
# When prompted, type: production

# Add APP_URL
vercel env add APP_URL production
# When prompted, type: https://your-app.vercel.app

# Add APP_DEBUG
vercel env add APP_DEBUG production
# When prompted, type: false

# Add DB_CONNECTION
vercel env add DB_CONNECTION production
# When prompted, type: sqlite

# Add DB_DATABASE
vercel env add DB_DATABASE production
# When prompted, type: /tmp/database.sqlite

# Add SESSION_DRIVER
vercel env add SESSION_DRIVER production
# When prompted, type: cookie

# Add CACHE_DRIVER
vercel env add CACHE_DRIVER production
# When prompted, type: array

# Add QUEUE_CONNECTION
vercel env add QUEUE_CONNECTION production
# When prompted, type: sync

# Add LOG_CHANNEL
vercel env add LOG_CHANNEL production
# When prompted, type: stderr
```

### List All Variables:
```bash
vercel env ls
```

### Remove a Variable (if needed):
```bash
vercel env rm VARIABLE_NAME production
```

---

## Method 3: Bulk Import (Advanced)

### Create `.env.vercel` locally:

```bash
cat > .env.vercel << 'EOF'
APP_NAME="Sigma Africa"
APP_ENV=production
APP_KEY=base64:YOUR_GENERATED_KEY_HERE
APP_URL=https://your-app.vercel.app
APP_DEBUG=false
DB_CONNECTION=sqlite
DB_DATABASE=/tmp/database.sqlite
SESSION_DRIVER=cookie
CACHE_DRIVER=array
QUEUE_CONNECTION=sync
LOG_CHANNEL=stderr
EOF
```

### Import using Vercel CLI:
```bash
# For each line in .env.vercel
while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue
    
    # Remove quotes from value
    value=$(echo "$value" | sed 's/^"//;s/"$//')
    
    # Add to Vercel
    echo "$value" | vercel env add "$key" production
done < .env.vercel
```

---

## Verification

### Check Variables are Set:

**Via Dashboard:**
1. Go to Settings → Environment Variables
2. You should see all variables listed

**Via CLI:**
```bash
vercel env ls
```

Expected output:
```
Production Environment Variables
  APP_NAME         updated 1m ago
  APP_ENV          updated 1m ago
  APP_KEY          updated 1m ago
  APP_URL          updated 1m ago
  APP_DEBUG        updated 1m ago
  DB_CONNECTION    updated 1m ago
  DB_DATABASE      updated 1m ago
  SESSION_DRIVER   updated 1m ago
  CACHE_DRIVER     updated 1m ago
  QUEUE_CONNECTION updated 1m ago
  LOG_CHANNEL      updated 1m ago
```

### Test After Deployment:

After deploying, you can verify variables are working:

```bash
# Deploy
vercel --prod

# Check logs for environment
vercel logs --follow
```

Look for any error messages about missing environment variables.

---

## Common Issues

### Issue 1: APP_KEY Missing or Invalid

**Symptoms:**
- "No application encryption key has been specified"
- 500 error on deployment

**Solution:**
```bash
# Generate new key
php artisan key:generate --show

# Add to Vercel
vercel env add APP_KEY production
# Paste the generated key
```

### Issue 2: Database Connection Failed

**Symptoms:**
- "SQLSTATE[HY000] [2002] Connection refused"
- Database errors in logs

**Solution:**
- Verify all `DB_*` variables are set correctly
- For SQLite: Use `/tmp/database.sqlite`
- For MySQL/PostgreSQL: Verify host, port, credentials

### Issue 3: Variables Not Taking Effect

**Symptoms:**
- Changed variables but seeing old values

**Solution:**
```bash
# Redeploy after changing variables
vercel --prod

# Or use force flag
vercel --prod --force
```

---

## Security Best Practices

1. **Never commit `.env` files**
   - ✅ Already in `.gitignore`

2. **Use strong APP_KEY**
   - ✅ Generate with `php artisan key:generate`

3. **Keep APP_DEBUG=false in production**
   - ⚠️ CRITICAL: Never enable in production

4. **Use environment-specific variables**
   - Production: Secure database, APP_DEBUG=false
   - Preview: Can use test database
   - Development: Local settings

5. **Rotate sensitive credentials regularly**
   - Database passwords
   - API keys
   - APP_KEY (if compromised)

---

## Quick Reference

```bash
# Generate APP_KEY
php artisan key:generate --show

# Add variable via CLI
vercel env add VARIABLE_NAME production

# List all variables
vercel env ls

# Remove variable
vercel env rm VARIABLE_NAME production

# View specific variable value
vercel env pull .env.production

# After changing variables, redeploy
vercel --prod
```

---

## Checklist

Before deploying, ensure:
- ✅ All required variables are set
- ✅ APP_KEY is generated and set
- ✅ APP_DEBUG is set to `false`
- ✅ APP_URL matches your deployment URL
- ✅ Database credentials are correct
- ✅ SESSION_DRIVER is `cookie`
- ✅ CACHE_DRIVER is `array`
- ✅ LOG_CHANNEL is `stderr`

---

**Next Step:** Once all environment variables are set, run:
```bash
./validate-deployment.sh
./quick-deploy.sh preview
```
