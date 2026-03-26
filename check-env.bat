@echo off
echo ========================================
echo Environment Variables Checker
echo ========================================
echo.

echo Checking Backend Environment...
cd backend
if not exist .env (
    echo [ERROR] backend/.env not found!
    echo Please copy .env.example to .env and configure it.
    echo.
) else (
    echo [OK] backend/.env exists
    findstr /C:"MONGO_URI" .env >nul
    if errorlevel 1 (
        echo [WARNING] MONGO_URI not configured
    ) else (
        echo [OK] MONGO_URI configured
    )
    
    findstr /C:"JWT_SECRET" .env >nul
    if errorlevel 1 (
        echo [WARNING] JWT_SECRET not configured
    ) else (
        echo [OK] JWT_SECRET configured
    )
)
echo.

echo Checking Frontend Environment...
cd ..\frontend
if not exist .env (
    echo [ERROR] frontend/.env not found!
    echo Please copy .env.example to .env and configure it.
    echo.
) else (
    echo [OK] frontend/.env exists
    findstr /C:"VITE_API_URL" .env >nul
    if errorlevel 1 (
        echo [WARNING] VITE_API_URL not configured
    ) else (
        echo [OK] VITE_API_URL configured
    )
)
echo.

cd ..
echo ========================================
echo Check Complete!
echo ========================================
pause
