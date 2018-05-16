Param(
	[Parameter(Mandatory=$true)][string]$sqlServerIp,
	[Parameter(Mandatory=$true)][string]$destDir,
	[Parameter(Mandatory=$true)][string]$iisAppName,
	[Parameter(Mandatory=$true)][string]$envName,
	[Parameter(Mandatory=$false)][string]$envId,
	[Parameter(Mandatory=$false)][string]$envType,
	[Parameter(Mandatory=$true)][string]$portNumber,
	[Parameter(Mandatory=$true)][string]$iisWebSiteName,
    [Parameter(Mandatory=$false)][string]$linuxIp,
	[Parameter(Mandatory=$true)][string]$packageName
)

#Including global variables
. "$env:ModulesPath\envConfig.ps1"

#Get execution folder
$Invocation = (Get-Variable MyInvocation -Scope 0).Value
$executionRoot = Split-Path -parent $Invocation.MyCommand.Definition

Write-Output ".\env-$envName$envId.ps1"

#Include environment script if exists
$envFilePath =  ".\env-$envName$envId.ps1"

if (Test-Path $envFilePath) { 
	. "$envFilePath"
}

$targetPathWithoutEnvPrefix = "web-sites/pdf-viewer-js"
Write-Output "targetPath: $targetPathWithoutEnvPrefix"

#Create site
Write-Output "Creating s3 site..."
& "$env:ModulesPath\s3sync.ps1" -EnvName $envName -envId $envId -envType $envType -WebSiteFolder $iisAppName -targetPathWithoutEnvPrefix $targetPathWithoutEnvPrefix -maxAge 31536000

Write-Output "Completed Successfully"
#Stop-Transcript
