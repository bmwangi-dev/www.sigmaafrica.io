# Headers Already Sent Error - Fixed

## The Error

```
http_response_code(): Cannot set response code - headers already sent 
(output started at /var/task/user/vendor/symfony/http-foundation/Response.php:382)
```

## What Was Happening

The error occurred because our error handler was trying to set HTTP headers AFTER Laravel had already started sending output to the browser.

### Why This Happened

1. Laravel's Response object sends headers automatically
2. Once headers are sent, you can't change them
3. Our catch block was trying to call `http_response_code()` after headers were already sent

### The Problematic Code

```php
} catch (Throwable $e) {
    error_log(...);  // This is fine - goes to stderr, not browser
    
    http_response_code(500);  // ❌ ERROR: Headers already sent!
    header('Content-Type: application/json');  // ❌ ERROR!
    echo json_encode([...]);
}
```

## The Fix

### Three Key Changes:

**1. Check if headers were already sent before setting them:**
```php
if (!headers_sent()) {
    http_response_code(500);
    header('Content-Type: text/html; charset=utf-8');
}
```

**2. Use proper Laravel HTTP Kernel (instead of deprecated `handleRequest()`):**
```php
// Before (deprecated)
$response = $app->handleRequest(Request::capture());

// After (correct)
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
$response->send();
$kernel->terminate($request, $response);
```

**3. Output HTML instead of JSON for error pages:**
```php
echo '<html><head><title>Server Error</title></head><body>';
echo '<h1>Server Error</h1>';
echo '<p><strong>Message:</strong> ' . htmlspecialchars($e->getMessage()) . '</p>';
// ... etc
echo '</body></html>';
```

## Current State

Your `api/index.php` now:
- ✅ Checks if headers were sent before setting them
- ✅ Uses proper Laravel HTTP Kernel
- ✅ Properly terminates requests
- ✅ Logs errors to stderr (visible in Vercel logs)
- ✅ Shows user-friendly error pages
- ✅ Only shows detailed errors when `APP_DEBUG=true`

## What You Should See Now

### In Production (`APP_DEBUG=false`):
```html
500 - Server Error
An error occurred. Please try again later.
```

### In Debug Mode (`APP_DEBUG=true`):
```html
Server Error
Message: [error message]
File: [file path]
Stack Trace: [full trace]
```

## Important Notes

### Logging vs Browser Output

- **`error_log()`** → Goes to stderr → Visible in `vercel logs --follow` ✅
- **`echo`** → Goes to browser → User sees it ❌ (unless intentional)

### When to See Debug Errors

Only enable `APP_DEBUG=true` temporarily when debugging. Always set it to `false` in production.

```bash
# Enable debug (temporary)
vercel env add APP_DEBUG
# Set value: true

# Redeploy
vercel --prod

# View error details in browser
# Then DISABLE debug:
vercel env rm APP_DEBUG production
```

## Next Steps

1. **Commit the fix:**
   ```bash
   git add api/index.php
   git commit -m "fix: Resolve headers already sent error"
   git push
   ```

2. **Verify on Vercel:**
   - Wait for deployment to complete
   - Test your site
   - The error should be gone

3. **Check for other issues:**
   - Open browser DevTools (F12)
   - Check Console tab for JavaScript errors
   - Check Network tab for failed requests

## Troubleshooting

### Still seeing errors?

**Check Vercel logs:**
```bash
vercel logs --follow
```

**Look for:**
- Database connection errors
- Missing environment variables
- PHP errors

### Need to debug?

**Temporarily enable debug mode:**
```bash
# In Vercel Dashboard:
# Settings → Environment Variables
# Add: APP_DEBUG = true

# Or via CLI:
vercel env add APP_DEBUG production
# Enter: true
```

**Then redeploy:**
```bash
vercel --prod
```

**After debugging, DISABLE it:**
```bash
vercel env rm APP_DEBUG production
vercel --prod
```

---

**Status:** ✅ Headers error fixed
**Next:** Commit and push the changes
