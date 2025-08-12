Param(
  [Parameter(Mandatory=$true)] [string]$ResourceGroup,
  [Parameter(Mandatory=$true)] [string]$Location,
  [Parameter(Mandatory=$true)] [string]$ApiAppName,
  [Parameter(Mandatory=$true)] [string]$StorageAccountName,
  [Parameter(Mandatory=$true)] [string]$GeminiApiKey,
  [string]$AllowedOrigins = "",
  [string]$FirebaseProjectId = "",
  [string]$FirebaseClientEmail = "",
  [string]$FirebasePrivateKey = ""
)

$ErrorActionPreference = "Stop"

Write-Host "Login to Azure if needed..."
az account show 1>$null 2>$null || az login | Out-Null

Write-Host "Creating resource group $ResourceGroup in $Location..."
az group create -n $ResourceGroup -l $Location 1>$null | Out-Null

Write-Host "Creating App Service plan (Free F1 if available)..."
az appservice plan create -g $ResourceGroup -n "$ApiAppName-plan" --sku F1 --is-linux 1>$null | Out-Null

Write-Host "Creating Web App $ApiAppName..."
az webapp create -g $ResourceGroup -p "$ApiAppName-plan" -n $ApiAppName --runtime "NODE:18LTS" 1>$null | Out-Null

Write-Host "Configuring app settings..."
$settings = @("NODE_ENV=production","GEMINI_API_KEY=$GeminiApiKey")
if ($AllowedOrigins -ne "") { $settings += "ALLOWED_ORIGINS=$AllowedOrigins" }
if ($FirebaseProjectId -ne "") { $settings += "FIREBASE_PROJECT_ID=$FirebaseProjectId" }
if ($FirebaseClientEmail -ne "") { $settings += "FIREBASE_CLIENT_EMAIL=$FirebaseClientEmail" }
if ($FirebasePrivateKey -ne "") { $settings += "FIREBASE_PRIVATE_KEY=$FirebasePrivateKey" }
az webapp config appsettings set -g $ResourceGroup -n $ApiAppName --settings $settings 1>$null | Out-Null

Write-Host "Deploying backend from ./backend ..."
pushd backend
az webapp up --name $ApiAppName --resource-group $ResourceGroup --runtime "NODE:18LTS" --sku F1 --location $Location 1>$null | Out-Null
popd

Write-Host "Configuring health check path..."
az webapp config set -g $ResourceGroup -n $ApiAppName --generic-configurations '{"healthCheckPath":"/health"}' 1>$null | Out-Null

$apiUrl = "https://$ApiAppName.azurewebsites.net"
Write-Host "API deployed at: $apiUrl"

Write-Host "Building frontend..."
pushd frontend
if (Test-Path ".env.production") { Remove-Item .env.production }
"REACT_APP_API_URL=$apiUrl" | Out-File -Encoding ASCII .env.production
npm install
npm run build
popd

Write-Host "Provisioning Storage Account $StorageAccountName for static website..."
az storage account create -n $StorageAccountName -g $ResourceGroup -l $Location --sku Standard_LRS --kind StorageV2 1>$null | Out-Null
Write-Host "Enabling static website..."
az storage blob service-properties update --account-name $StorageAccountName --static-website --index-document index.html --404-document index.html 1>$null | Out-Null

Write-Host "Uploading frontend build to $web..."
az storage blob upload-batch --account-name $StorageAccountName -s frontend/build -d '$web' 1>$null | Out-Null

$frontendUrl = az storage account show -n $StorageAccountName -g $ResourceGroup --query "primaryEndpoints.web" -o tsv
Write-Host "Frontend deployed at: $frontendUrl"

Write-Host "Tip: Add frontend origin to ALLOWED_ORIGINS and redeploy backend if needed."
Write-Host "Done." 