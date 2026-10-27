# CareConnect Team Setup Script
# Run this script in PowerShell as Administrator

Write-Host "🏥 CareConnect Team Setup Script" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green

# Check if Node.js is installed
Write-Host "`n📦 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org" -ForegroundColor Yellow
    Read-Host "Press Enter to continue after installing Node.js"
}

# Check if Git is installed
Write-Host "`n🔧 Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to continue after installing Git"
}

# Get project information
Write-Host "`n📋 Project Setup Information" -ForegroundColor Blue
$repoUrl = Read-Host "Enter the GitHub repository URL (or press Enter to skip)"
$projectName = Read-Host "Enter project folder name (default: careconnect)"

if ([string]::IsNullOrEmpty($projectName)) {
    $projectName = "careconnect"
}

# Clone repository if URL provided
if (![string]::IsNullOrEmpty($repoUrl)) {
    Write-Host "`n📥 Cloning repository..." -ForegroundColor Yellow
    git clone $repoUrl $projectName
    Set-Location $projectName
} else {
    Write-Host "`n📁 Setting up existing project..." -ForegroundColor Yellow
    if (Test-Path $projectName) {
        Set-Location $projectName
    } else {
        Write-Host "❌ Project folder not found: $projectName" -ForegroundColor Red
        exit 1
    }
}

# Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Check if installation was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Error installing dependencies!" -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (!(Test-Path ".env")) {
    Write-Host "`n🔧 Creating environment file..." -ForegroundColor Yellow
    
    $envContent = @"
# CareConnect Environment Variables

# Razorpay Configuration (Replace with actual keys)
VITE_RAZORPAY_KEY_ID=rzp_test_9999999999

# Development Settings
VITE_NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3001

# Application Settings
VITE_APP_NAME=CareConnect
VITE_APP_VERSION=1.0.0
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Environment file created!" -ForegroundColor Green
}

# Display setup completion
Write-Host "`n🎉 Setup Complete!" -ForegroundColor Green
Write-Host "==================" -ForegroundColor Green

Write-Host "`n📋 Next Steps:" -ForegroundColor Blue
Write-Host "1. Start development server: npm run dev" -ForegroundColor White
Write-Host "2. Open browser: http://localhost:3000" -ForegroundColor White
Write-Host "3. Admin access: http://localhost:3000/admin" -ForegroundColor White
Write-Host "   Username: admin" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White

Write-Host "`n🔧 Available Commands:" -ForegroundColor Blue
Write-Host "npm run dev      - Start development server" -ForegroundColor White
Write-Host "npm run build    - Build for production" -ForegroundColor White
Write-Host "npm run preview  - Preview production build" -ForegroundColor White

Write-Host "`n📚 Project Features:" -ForegroundColor Blue
Write-Host "✅ Doctor search and booking system" -ForegroundColor Green
Write-Host "✅ Admin panel with authentication" -ForegroundColor Green
Write-Host "✅ Razorpay payment integration" -ForegroundColor Green
Write-Host "✅ Real-time database synchronization" -ForegroundColor Green
Write-Host "✅ Responsive design with animations" -ForegroundColor Green

Write-Host "`n🚀 Ready to start developing!" -ForegroundColor Green

# Ask if user wants to start dev server
$startServer = Read-Host "`nStart development server now? (y/n)"
if ($startServer.ToLower() -eq "y" -or $startServer.ToLower() -eq "yes") {
    Write-Host "`n🚀 Starting development server..." -ForegroundColor Green
    npm run dev
}