<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/Index');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('AboutUs/Index');
})->name('about');

Route::get('/notifications/active', [NotificationController::class, 'getActiveNotifications'])
    ->name('notifications.active');

Route::post('/notifications/{notification}/mark-viewed', [NotificationController::class, 'markAsViewed'])
    ->name('notifications.markViewed');

Route::post('/notifications/{notification}/dismiss', [NotificationController::class, 'dismiss'])
    ->name('notifications.dismiss');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Admin/dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
