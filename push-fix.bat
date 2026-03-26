@echo off
echo ========================================
echo Pushing CORS Fix to GitHub
echo ========================================
echo.

cd c:\Users\SachinKukkar.AzureAD\Downloads\worknest-women\worknest

echo Adding files...
git add .

echo Committing...
git commit -m "Fix CORS to allow localhost for seeding tool"

echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo Done! 
echo ========================================
echo.
echo Next Steps:
echo 1. Wait 3-5 minutes for Render to auto-deploy
echo 2. Check Render logs: https://dashboard.render.com
echo 3. Open seed-database.html in browser
echo 4. Click "Seed Database" button
echo.
pause
