# CareConnect Server Startup Script

Write-Host "🚀 Starting CareConnect Servers..." -ForegroundColor Green

# Kill any existing node processes
Write-Host "Cleaning up existing processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.Name -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment for cleanup
Start-Sleep 2

# Start backend server in background
Write-Host "Starting backend server on port 5000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm start" -WindowStyle Normal

# Wait for backend to start
Start-Sleep 3

# Start frontend server
Write-Host "Starting frontend server on port 3000..." -ForegroundColor Cyan
Write-Host "Frontend will open in this window..." -ForegroundColor Green
Write-Host "Backend is running in a separate window" -ForegroundColor Green
Write-Host "`nOnce both servers are ready, open: http://localhost:3000" -ForegroundColor Magenta

npm run dev --force