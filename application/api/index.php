<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Force HTTPS detection for Vercel
$_SERVER['HTTPS'] = 'on';
$_SERVER['SERVER_PORT'] = 443;

// Set default environment variables if not set
if (!getenv('LOG_CHANNEL')) {
    putenv('LOG_CHANNEL=stderr');
}
if (!getenv('DB_CONNECTION')) {
    putenv('DB_CONNECTION=sqlite');
    putenv('DB_DATABASE=/tmp/database.sqlite');
}
if (!getenv('APP_DEBUG')) {
    putenv('APP_DEBUG=false');
}

// Set bootstrap cache paths to /tmp for serverless
if (!getenv('APP_SERVICES_CACHE')) {
    putenv('APP_SERVICES_CACHE=/tmp/bootstrap/cache/services.php');
}
if (!getenv('APP_PACKAGES_CACHE')) {
    putenv('APP_PACKAGES_CACHE=/tmp/bootstrap/cache/packages.php');
}
if (!getenv('APP_CONFIG_CACHE')) {
    putenv('APP_CONFIG_CACHE=/tmp/bootstrap/cache/config.php');
}
if (!getenv('APP_ROUTES_CACHE')) {
    putenv('APP_ROUTES_CACHE=/tmp/bootstrap/cache/routes.php');
}
if (!getenv('APP_EVENTS_CACHE')) {
    putenv('APP_EVENTS_CACHE=/tmp/bootstrap/cache/events.php');
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__ . '/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__ . '/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
try {
    /** @var Application $app */
    $app = require_once __DIR__ . '/../bootstrap/app.php';

    // Create storage directories if they don't exist
    $storagePaths = [
        '/tmp/framework/cache',
        '/tmp/framework/sessions',
        '/tmp/framework/views',
        '/tmp/logs',
        '/tmp/bootstrap/cache',
    ];

    foreach ($storagePaths as $path) {
        if (!is_dir($path)) {
            mkdir($path, 0755, true);
        }
    }

    // Set storage path to /tmp for serverless
    $app->useStoragePath('/tmp');

    // Handle the request
    $kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
    $response = $kernel->handle(
        $request = Illuminate\Http\Request::capture()
    );

    $response->send();

    $kernel->terminate($request, $response);
} catch (Throwable $e) {
    // Log to stderr for Vercel logs (this doesn't output to browser)
    error_log('Laravel Fatal Error: ' . $e->getMessage());
    error_log('File: ' . $e->getFile() . ' Line: ' . $e->getLine());
    error_log($e->getTraceAsString());

    // Only show detailed errors in non-production
    if (getenv('APP_ENV') !== 'production' || getenv('APP_DEBUG') === 'true') {
        // Use output buffering to prevent headers already sent
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: text/html; charset=utf-8');
        }
        
        echo '<html><head><title>Server Error</title></head><body>';
        echo '<h1>Server Error</h1>';
        echo '<p><strong>Message:</strong> ' . htmlspecialchars($e->getMessage()) . '</p>';
        echo '<p><strong>File:</strong> ' . htmlspecialchars($e->getFile()) . ':' . $e->getLine() . '</p>';
        echo '<details><summary>Stack Trace</summary><pre>' . htmlspecialchars($e->getTraceAsString()) . '</pre></details>';
        echo '<p><em>To disable this, set APP_DEBUG=false in Vercel environment variables</em></p>';
        echo '</body></html>';
    } else {
        // Production: Show minimal error
        if (!headers_sent()) {
            http_response_code(500);
            header('Content-Type: text/html; charset=utf-8');
        }
        echo '<html><head><title>Server Error</title></head><body>';
        echo '<h1>500 - Server Error</h1>';
        echo '<p>An error occurred. Please try again later.</p>';
        echo '</body></html>';
    }
}
