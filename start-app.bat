@echo off
echo 🚀 Starting Second You - Life Co-Simulator
echo.

echo 📡 Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo ⏳ Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak > nul

echo 🌐 Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo ⏳ Waiting 5 seconds for frontend to compile...
timeout /t 5 /nobreak > nul

echo 🌍 Opening browser...
start http://localhost:3000

echo.
echo ✅ Both servers are starting!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:5000
echo.
echo 💡 Keep both terminal windows open while using the app
echo 🛑 Press Ctrl+C in each terminal to stop the servers
pause 