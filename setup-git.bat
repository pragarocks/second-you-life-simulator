@echo off
echo 🚀 Setting up Git for Second You Life Simulator
echo.

echo 📋 Checking prerequisites...
if not exist ".git" (
    echo ✅ Initializing Git repository...
    git init
) else (
    echo ✅ Git repository already exists
)

echo.
echo 📝 Adding all files to Git...
git add .

echo.
echo 💾 Making initial commit...
git commit -m "Initial commit: Second You Life Simulator - AI-powered life path exploration app"

echo.
echo 🔗 Next steps:
echo 1. Create a GitHub repository at https://github.com/new
echo 2. Name it: second-you-life-simulator
echo 3. Make it Public
echo 4. Don't initialize with README
echo.
echo 5. Then run these commands:
echo    git remote add origin https://github.com/YOUR_USERNAME/second-you-life-simulator.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 📚 See GIT_SETUP.md for detailed deployment instructions
echo.
pause 