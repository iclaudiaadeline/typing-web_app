# JFFT Web Application - Automated Setup Script
# Run this script in PowerShell to set up the project

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "JFFT Web Application Setup" -ForegroundColor Cyan
Write-Host "Jackal Furious Finger Typing" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if MongoDB is installed (optional)
try {
    $mongoVersion = mongod --version
    Write-Host "✓ MongoDB installed" -ForegroundColor Green
} catch {
    Write-Host "⚠ MongoDB not found locally. You can use MongoDB Atlas instead." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 1: Installing Backend Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Set-Location -Path "backend"
if (Test-Path "node_modules") {
    Write-Host "Backend node_modules already exists. Skipping..." -ForegroundColor Yellow
} else {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Backend dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 2: Configuring Backend Environment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if (Test-Path ".env") {
    Write-Host "⚠ .env file already exists. Skipping..." -ForegroundColor Yellow
} else {
    Copy-Item ".env.example" -Destination ".env"
    Write-Host "✓ Created .env file from template" -ForegroundColor Green
    Write-Host "⚠ Please edit backend/.env with your configuration" -ForegroundColor Yellow
}

Set-Location -Path ".."

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Step 3: Installing Frontend Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if (Test-Path "node_modules") {
    Write-Host "Frontend node_modules already exists. Skipping..." -ForegroundColor Yellow
} else {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Frontend dependencies installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Configure backend/.env with your settings" -ForegroundColor White
Write-Host "   - MongoDB connection string" -ForegroundColor Gray
Write-Host "   - JWT secret key" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start MongoDB (if using local):" -ForegroundColor White
Write-Host "   mongod" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Start the backend server:" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. In a new terminal, start the frontend:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Open your browser to:" -ForegroundColor White
Write-Host "   http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "  - INSTALLATION.md  (Quick start guide)" -ForegroundColor Gray
Write-Host "  - COMPLETE_GUIDE.md  (Full documentation)" -ForegroundColor Gray
Write-Host "  - API_INTEGRATION.md  (API connection guide)" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Happy Typing! 🎯⌨️" -ForegroundColor Green
Write-Host ""
