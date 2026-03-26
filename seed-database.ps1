Write-Host "========================================" -ForegroundColor Cyan
Write-Host "WorkNest Database Seeder" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$apiUrl = "https://worknest-api-gxb1.onrender.com/api/seed/init"

Write-Host "Seeding database..." -ForegroundColor Yellow
Write-Host "API: $apiUrl" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $apiUrl -Method POST -ContentType "application/json"
    $result = $response.Content | ConvertFrom-Json
    
    if ($result.success) {
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "✅ DATABASE SEEDED SUCCESSFULLY!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Created:" -ForegroundColor Cyan
        Write-Host "  - $($result.data.skills) Skills" -ForegroundColor White
        Write-Host "  - $($result.data.users) Users" -ForegroundColor White
        Write-Host "  - $($result.data.jobs) Jobs" -ForegroundColor White
        Write-Host "  - $($result.data.applications) Applications" -ForegroundColor White
        Write-Host "  - $($result.data.transactions) Transactions" -ForegroundColor White
        Write-Host ""
        Write-Host "🔑 Demo Credentials:" -ForegroundColor Cyan
        Write-Host "  👩 Woman:    $($result.credentials.woman.email) / $($result.credentials.woman.password)" -ForegroundColor White
        Write-Host "  🏢 Employer: $($result.credentials.employer.email) / $($result.credentials.employer.password)" -ForegroundColor White
        Write-Host "  🔑 Admin:    $($result.credentials.admin.email) / $($result.credentials.admin.password)" -ForegroundColor White
        Write-Host ""
        Write-Host "Next: Go to https://wn-women.vercel.app and login!" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Seeding Failed" -ForegroundColor Red
        Write-Host $result.message -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error connecting to backend" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible causes:" -ForegroundColor Yellow
    Write-Host "  - Backend is not deployed yet" -ForegroundColor White
    Write-Host "  - Backend is sleeping (wait 30-60 seconds and try again)" -ForegroundColor White
    Write-Host "  - Check Render logs: https://dashboard.render.com" -ForegroundColor White
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
