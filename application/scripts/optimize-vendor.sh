#!/bin/bash
# Optimize vendor directory for Vercel deployment
# This removes unused Google API services, keeping only Sheets

set -e

VENDOR_DIR="vendor/google/apiclient-services/src"

if [ ! -d "$VENDOR_DIR" ]; then
    echo "Google API services directory not found, skipping optimization"
    exit 0
fi

echo "Optimizing Google API services..."
echo "Before: $(du -sh $VENDOR_DIR)"

# Keep only Sheets-related files and folders
cd "$VENDOR_DIR"

# Find and remove all service directories except Sheets
for dir in */; do
    if [ "$dir" != "Sheets/" ]; then
        rm -rf "$dir"
    fi
done

# Remove all service PHP files except Sheets.php
for file in *.php; do
    if [ "$file" != "Sheets.php" ]; then
        rm -f "$file"
    fi
done

cd - > /dev/null

echo "After: $(du -sh $VENDOR_DIR)"
echo "Google API optimization complete!"
