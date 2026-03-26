@echo off
echo ========================================
echo WorkNest Women - Production Setup
echo ========================================
echo.

echo Step 1: Checking Node.js version...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found. Install from https://nodejs.org
    pause
    exit /b 1
)
echo.

echo Step 2: Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed
    pause
    exit /b 1
)
echo Backend dependencies installed!
echo.

echo Step 3: Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed
    pause
    exit /b 1
)
echo Frontend dependencies installed!
echo.

cd ..
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Follow DEPLOYMENT.md for production deployment
echo 2. Setup MongoDB Atlas (free)
echo 3. Deploy backend to Render (free)
echo 4. Deploy frontend to Vercel (free)
echo.
echo For local testing:
echo   Backend:  cd backend  ^&^& npm run dev
echo   Frontend: cd frontend ^&^& npm run dev
echo.
pause
