<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

// TEMPORARY MIGRATION ROUTE - REMOVE AFTER USE!
Route::get('/setup-database', function () {
    // Security check
    $secret = request()->query('secret');
    if ($secret !== env('SETUP_SECRET', 'change-me-in-production')) {
        abort(403, 'Invalid secret');
    }

    try {
        $results = [];

        // Run migrations
        Artisan::call('migrate', ['--force' => true]);
        $results['migrations'] = 'Completed';

        // Run seeders
        Artisan::call('db:seed', ['--force' => true]);
        $results['seeders'] = 'Completed';

        return response()->json([
            'success' => true,
            'message' => 'Database setup completed!',
            'results' => $results,
            'warning' => 'IMPORTANT: Remove this route from routes/web.php after use!'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ], 500);
    }
});
