Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Checking Database Status" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$apiUrl = "https://worknest-api-gxb1.onrender.com/api/skills"

Write-Host "Checking if database has data..." -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $apiUrl -Method GET
    $skills = $response.Content | ConvertFrom-Json
    
    if ($skills.data.Count -gt 0) {
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "✅ DATABASE ALREADY SEEDED!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Found $($skills.data.Count) skills in database" -ForegroundColor White
        Write-Host ""
        Write-Host "🔑 Demo Credentials:" -ForegroundColor Cyan
        Write-Host "  👩 Woman:    priya@demo.com / demo1234" -ForegroundColor White
        Write-Host "  🏢 Employer: employer@demo.com / demo1234" -ForegroundColor White
        Write-Host "  🔑 Admin:    admin@worknest.com / demo1234" -ForegroundColor White
        Write-Host ""
        Write-Host "✅ Your database is ready to use!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next: Go to https://wn-women.vercel.app and login!" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Database is empty - needs seeding" -ForegroundColor Red
        Write-Host "Run the seed endpoint to populate data" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error checking database" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Backend might be sleeping. Wait 30 seconds and try again." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
