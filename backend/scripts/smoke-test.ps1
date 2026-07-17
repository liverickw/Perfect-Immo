$BaseUrl = if ($env:API_URL) { $env:API_URL } else { "http://localhost:5000" }

Write-Host "Testing API at $BaseUrl"

Invoke-RestMethod -Uri "$BaseUrl/health" -Method GET
Invoke-RestMethod -Uri "$BaseUrl/health/db" -Method GET
Invoke-RestMethod -Uri "$BaseUrl/api" -Method GET

Write-Host "Smoke test finished."
