<?php

// Temporary debug script - DELETE AFTER FIXING THE ISSUE!

header('Content-Type: text/plain');

echo "=== VERCEL DEBUG INFO ===\n\n";

echo "PHP Version: " . PHP_VERSION . "\n";
echo "Current Directory: " . __DIR__ . "\n\n";

// Check if vendor exists
echo "Vendor Directory Exists: " . (is_dir(__DIR__ . '/../vendor') ? 'YES' : 'NO') . "\n";
echo "Bootstrap File Exists: " . (file_exists(__DIR__ . '/../bootstrap/app.php') ? 'YES' : 'NO') . "\n\n";

// Check critical directories
$dirs = [
    '/tmp',
    '/tmp/framework',
    '/tmp/framework/cache',
    '/tmp/framework/sessions',
    '/tmp/framework/views',
    '/tmp/logs',
];

echo "Directory Check:\n";
foreach ($dirs as $dir) {
    $exists = is_dir($dir);
    $writable = $exists && is_writable($dir);
    echo "  $dir: " . ($exists ? 'EXISTS' : 'MISSING') . ' | ' . ($writable ? 'WRITABLE' : 'NOT WRITABLE') . "\n";
}

echo "\n";

// Check environment variables
echo "Environment Variables:\n";
$envVars = [
    'APP_ENV',
    'APP_DEBUG',
    'APP_KEY',
    'APP_URL',
    'DB_CONNECTION',
    'SESSION_DRIVER',
    'CACHE_DRIVER',
    'LOG_CHANNEL',
];

foreach ($envVars as $var) {
    $value = getenv($var);
    if ($var === 'APP_KEY' && $value) {
        $value = substr($value, 0, 20) . '...'; // Mask the key
    }
    echo "  $var: " . ($value ? $value : 'NOT SET') . "\n";
}

echo "\n";

// Try to load Laravel
echo "Attempting to load Laravel...\n";
try {
    if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
        throw new Exception('Composer autoload file not found');
    }
    
    require __DIR__ . '/../vendor/autoload.php';
    echo "✓ Autoload successful\n";
    
    if (!file_exists(__DIR__ . '/../bootstrap/app.php')) {
        throw new Exception('Bootstrap file not found');
    }
    
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    echo "✓ Bootstrap successful\n";
    
    // Create storage directories
    $storagePaths = [
        '/tmp/framework/cache',
        '/tmp/framework/sessions',
        '/tmp/framework/views',
        '/tmp/logs',
    ];
    
    foreach ($storagePaths as $path) {
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
    }
    echo "✓ Storage directories created\n";
    
    $app->useStoragePath('/tmp');
    echo "✓ Storage path set\n";
    
    echo "\n✓✓✓ Laravel loaded successfully! Issue is elsewhere.\n";
    
} catch (Throwable $e) {
    echo "\n✗✗✗ ERROR LOADING LARAVEL:\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n";
    echo "\nStack Trace:\n" . $e->getTraceAsString() . "\n";
}

echo "\n=== END DEBUG INFO ===\n";
