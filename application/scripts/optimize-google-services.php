<?php
/**
 * Optimize Google API services - keeps only Sheets
 * Runs automatically after composer install via post-install-cmd
 */

$servicesDir = __DIR__ . '/../vendor/google/apiclient-services/src';

if (!is_dir($servicesDir)) {
    echo "Google API services directory not found, skipping optimization\n";
    exit(0);
}

echo "Optimizing Google API services...\n";

// Services to keep (add more if needed)
$keepServices = ['Sheets'];

$items = scandir($servicesDir);
$removed = 0;

foreach ($items as $item) {
    if ($item === '.' || $item === '..') {
        continue;
    }
    
    $path = $servicesDir . '/' . $item;
    $baseName = pathinfo($item, PATHINFO_FILENAME);
    
    // Check if this is a service we want to keep
    $shouldKeep = false;
    foreach ($keepServices as $service) {
        if ($baseName === $service) {
            $shouldKeep = true;
            break;
        }
    }
    
    if (!$shouldKeep) {
        if (is_dir($path)) {
            // Remove directory recursively
            removeDirectory($path);
            $removed++;
        } elseif (is_file($path)) {
            unlink($path);
            $removed++;
        }
    }
}

echo "Removed $removed unused Google API services/files\n";
echo "Google API optimization complete!\n";

function removeDirectory($dir) {
    if (!is_dir($dir)) {
        return;
    }
    
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }
        
        $path = $dir . '/' . $item;
        if (is_dir($path)) {
            removeDirectory($path);
        } else {
            unlink($path);
        }
    }
    
    rmdir($dir);
}
