<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/Index');
})->name('home');

Route::get('/about', function () {
     $teams = [
        [
            'id' => 1,
            'name' => 'Shikuku Bill',
            'contact_no' => '+233-123-456-789',
            'email' => 'billbrewood@gmail.com',
            'department' => 'Leadership',
            'position' => 'Founder & CEO',
            'image_path' => '/bill.jpeg',
            'socials' => [
                ['type' => 'linkedin', 'url' => 'https://www.linkedin.com/in/billshikuku/'],
            ],
            'is_active' => true,
            'sort_order' => 1,
            'created_at' => now()->toISOString(),
            'updated_at' => now()->toISOString(),
        ],
        [
            'id' => 2,
            'name' => 'Todd Abbott',
            'contact_no' => '+254-700-123-456',
            'email' => 'toddabbott@gmail.com',
            'department' => 'Leadership',
            'position' => 'Growth & Partnerships Lead',
            'image_path' => '/toddAbott.png',
            'socials' => [
                ['type' => 'linkedin', 'url' => 'https://www.linkedin.com/in/todd-abbott/'],
            ],
            'is_active' => true,
            'sort_order' => 2,
            'created_at' => now()->toISOString(),
            'updated_at' => now()->toISOString(),
        ],
        [
            'id' => 3,
            'name' => 'Neville Apondi',
            'contact_no' => '+254-722-987-654',
            'email' => 'nevilleapondi@gmail.com',
            'department' => 'Marketing',
            'position' => 'Marketing',
            'image_path' => '/neville.png',
            'socials' => [
                ['type' => 'linkedin', 'url' => 'https://linkedin.com/in/fraiser'],
            ],
            'is_active' => true,
            'sort_order' => 3,
            'created_at' => now()->toISOString(),
            'updated_at' => now()->toISOString(),
        ],
        [
            'id' => 4,
            'name' => 'Mwangi Brian',
            'contact_no' => '+254-791-948-842',
            'email' => 'mwangibrian.dev@gmail.com',
            'department' => 'Engineering',
            'position' => 'CTO & Lead Developer',
            'image_path' => '/mwangi.jpeg',
            'socials' => [
                ['type' => 'linkedin', 'url' => 'https://www.linkedin.com/in/mwangi-brian-68732527b/'],
            ],
            'is_active' => true,
            'sort_order' => 4,
            'created_at' => now()->toISOString(),
            'updated_at' => now()->toISOString(),
        ],
    ];
    
    return Inertia::render('AboutUs/Index', [
        'teams' => $teams
    ]);
})->name('about');

Route::get('/academy', function () {
    return Inertia::render('Academy/Index');
})->name('academy');

Route::get('/community', function () {
    return Inertia::render('Community/Index');
})->name('community');

Route::get('/blogs', function () {
    return Inertia::render('Blogs/Index');
})->name('blogs');

Route::get('/contact', function () {
    return Inertia::render('ContactUs/Index');
})->name('contact');

Route::get('/skill-sparks/application', function () {
    return Inertia::render('Academy/SkillSpark/Index');
})->name('skill-sparks.application');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('courses', \App\Http\Controllers\Admin\CourseController::class);
        Route::resource('cohorts', \App\Http\Controllers\Admin\CohortController::class);
        Route::resource('applications', \App\Http\Controllers\Admin\ApplicationController::class);
    });

    // Settings Routes
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/profile', function () {
            return Inertia::render('Settings/Profile');
        })->name('profile');
        Route::get('/password', function () {
            return Inertia::render('Settings/Password');
        })->name('password');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
