@echo off
echo ========================================
echo Committing Beautiful New README
echo ========================================
echo.

cd c:\Users\SachinKukkar.AzureAD\Downloads\worknest-women\worknest

git add .
git commit -m "docs: Create beautiful UX-friendly README and cleanup unnecessary files"
git push origin main

echo.
echo ========================================
echo Done! Your README is now live!
echo ========================================
echo.
echo View it on GitHub or in your project folder
echo.
pause
