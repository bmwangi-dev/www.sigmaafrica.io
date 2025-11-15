<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

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
    $response = $app->handleRequest(Request::capture());
    $response->send();
} catch (Throwable $e) {
    // If we're in debug mode, show the error
    if (getenv('APP_DEBUG') === 'true') {
        echo '<h1>Error</h1>';
        echo '<p>' . $e->getMessage() . '</p>';
        echo '<pre>' . $e->getTraceAsString() . '</pre>';
    } else {
        // Log the error to stderr
        error_log('Laravel Error: ' . $e->getMessage());
        error_log($e->getTraceAsString());

        // Return a clean 500 error
        http_response_code(500);
        echo 'Server Error - Check logs for details';
    }
}
