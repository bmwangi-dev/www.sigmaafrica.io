<?php

namespace App\Services;

use Google_Client;
use Google_Service_Sheets;

class GoogleSheetsService
{
    protected $client;
    protected $service;

    public function __construct()
    {
        $this->client = new Google_Client();
        $this->client->setApplicationName('Sigma Africa Accelerate');
        $this->client->setScopes([Google_Service_Sheets::SPREADSHEETS]);
        
        // Try JSON credentials from env first (for Vercel/serverless)
        $credentialsJson = config('services.google.credentials_json');
        
        if ($credentialsJson) {
            $credentials = json_decode($credentialsJson, true);
            $this->client->setAuthConfig($credentials);
        } else {
            // Fall back to file path (for local development)
            $credentialsPath = config('services.google.credentials_path');
            if ($credentialsPath && file_exists(storage_path('app/' . $credentialsPath))) {
                $this->client->setAuthConfig(storage_path('app/' . $credentialsPath));
            }
        }
        
        $this->client->setAccessType('offline');
        $this->service = new Google_Service_Sheets($this->client);
    }

    /**
     * Get the Google Service Sheets instance.
     *
     * @return Google_Service_Sheets
     */
    public function getService()
    {
        return $this->service;
    }

    /**
     * Append a row to a spreadsheet.
     *
     * @param string $spreadsheetId
     * @param string $range
     * @param array $values
     * @return \Google\Service\Sheets\AppendValuesResponse
     */
    public function appendRow(string $spreadsheetId, string $range, array $values)
    {
        $body = new \Google_Service_Sheets_ValueRange([
            'values' => [$values]
        ]);
        
        $params = [
            'valueInputOption' => 'RAW'
        ];

        return $this->service->spreadsheets_values->append($spreadsheetId, $range, $body, $params);
    }

    /**
     * Get values from a spreadsheet range.
     *
     * @param string $spreadsheetId
     * @param string $range
     * @return array
     */
    public function getValues(string $spreadsheetId, string $range)
    {
        $response = $this->service->spreadsheets_values->get($spreadsheetId, $range);
        return $response->getValues();
    }
}
