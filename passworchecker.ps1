#Lord Hagen
#olehag04@nfk.no
function CHECK-PASSWORD() {
    
Function Get-StringHash([String] $String,$HashName = "SHA1")
{
$StringBuilder = New-Object System.Text.StringBuilder
[System.Security.Cryptography.HashAlgorithm]::Create($HashName).ComputeHash([System.Text.Encoding]::UTF8.GetBytes($String))|%{
    #Change "X2" to "x2" if you want the hash in lowercase.
    [Void]$StringBuilder.Append($_.ToString("X2"))
}
$StringBuilder.ToString()
}

Clear-Host
Write-Host

#Lookin' fine!
Write-Host "`t`tPassword Checker" -ForegroundColor Magenta
Write-Host "`tDatabase of 320 Million passwords!" -ForegroundColor Yellow
Write-Host ""

#Get user-input.
$myvar = Read-Host -Prompt "`tEnter Password: "
$hashedstring = Get-StringHash $myvar
Write-Host ""
#Write-Host $hashedstring
Write-Host


#Request info
$Server = "http://localhost:3333/post/"
$header = @{"Content-Type"="application/x-www-form-urlencoded"}
$body = @{Passord = "$hashedstring"}
$password_request = Invoke-RestMethod -Method Post -Uri $Server -Body $body -Headers $header

#Run request
if(($password_request.success) -eq "yes"){
    Write-Host "`tPassword exists in Database" -ForegroundColor Red
}
else {
    Write-Host "`tNot found in Database" -ForegroundColor Green
}

#Exit
Write-Host ""
Write-Host "`tPress any key to Continue ..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

}
while ($true) {
    CHECK-PASSWORD
}