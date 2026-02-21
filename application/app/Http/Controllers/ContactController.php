<?php

namespace App\Http\Controllers;

use App\Services\GoogleSheetsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    protected $googleSheets;

    public function __construct(GoogleSheetsService $googleSheets)
    {
        $this->googleSheets = $googleSheets;
    }

    /**
     * Handle generic contact form submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            $spreadsheetId = config('services.google.spreadsheet_id');
            $range = 'CONTACT US!A:F'; // Matches 6 columns
            $values = [
                $validated['name'],
                $validated['email'],
                $validated['phone'],
                $validated['subject'],
                $validated['message'],
                now()->toDateTimeString(),
            ];

            if ($spreadsheetId) {
                $this->googleSheets->appendRow($spreadsheetId, $range, $values);
            } else {
                Log::warning('Google Sheets Spreadsheet ID not configured.');
            }

            return back()->with('success', 'Message sent successfully!');
        } catch (\Exception $e) {
            Log::error('Google Sheets Error: ' . $e->getMessage());
            return back()->with('error', 'There was an error sending your message. Please try again.');
        }
    }

    /**
     * Handle services consultancy form submission.
     */
    public function submitConsultation(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'service' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            $spreadsheetId = config('services.google.spreadsheet_id');
            $range = 'SERVICES CONSULTANCY!A:F';
            $values = [
                $validated['name'],
                $validated['phone'],
                $validated['email'],
                $validated['service'],
                $validated['message'],
                now()->toDateTimeString(),
            ];

            if ($spreadsheetId) {
                $this->googleSheets->appendRow($spreadsheetId, $range, $values);
            }

            return back()->with('success', 'Consultation request submitted successfully!');
        } catch (\Exception $e) {
            Log::error('Google Sheets Error: ' . $e->getMessage());
            return back()->with('error', 'There was an error submitting your request.');
        }
    }

    /**
     * Handle newsletter subscription.
     */
    public function subscribeNewsletter(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        try {
            $spreadsheetId = config('services.google.spreadsheet_id');
            $range = 'NEWSLETTER!A:B'; // Column A: Email, B: Date

            if ($spreadsheetId) {
                // Check for duplicates
                $existingData = $this->googleSheets->getValues($spreadsheetId, 'NEWSLETTER!A:A');
                
                if (!empty($existingData)) {
                    $targetEmail = strtolower(trim($validated['email']));
                    foreach ($existingData as $row) {
                        $existingEmail = strtolower(trim($row[0] ?? ''));
                        if ($existingEmail === $targetEmail) {
                            throw \Illuminate\Validation\ValidationException::withMessages([
                                'email' => 'This email is already subscribed!'
                            ]);
                        }
                    }
                }

                $values = [
                    $validated['email'],
                    now()->toDateTimeString(),
                ];

                $this->googleSheets->appendRow($spreadsheetId, $range, $values);
            }

            return back()->with('success', 'Thank you for subscribing to our newsletter!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::error('Newsletter Subscription Error: ' . $e->getMessage());
            return back()->with('error', 'There was an error subscribing. Please try again.');
        }
    }
}
