@echo off
echo ========================================
echo Pushing Trust Proxy Fix
echo ========================================
echo.

cd c:\Users\SachinKukkar.AzureAD\Downloads\worknest-women\worknest

git add backend/server.js
git commit -m "Fix: Add trust proxy for Render deployment"
git push origin main

echo.
echo ========================================
echo Done! Wait 3-5 min for Render to deploy
echo ========================================
echo.
echo Then run: seed-database.ps1
echo.
pause
