@echo off
echo 🚀 Starting Second You - Life Co-Simulator
echo.

echo 📡 Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo ⏳ Waiting 8 seconds for backend to initialize...
timeout /t 8 /nobreak > nul

echo 🌐 Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && set PORT=3000 && npm start"

echo ⏳ Waiting 12 seconds for frontend to compile...
timeout /t 12 /nobreak > nul

echo 🌍 Opening browser...
timeout /t 3 /nobreak > nul
echo ⏳ Checking which port frontend is using...
start http://localhost:3000

echo.
echo ✅ Both servers are starting!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo.
echo 💡 Keep both terminal windows open while using the app
echo 🛑 Press Ctrl+C in each terminal to stop the servers
pause 