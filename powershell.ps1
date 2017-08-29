$Server = "http://localhost:3333/"

$body = @{
    Passord = 'Passord1'
}

$header = @{
    "Content-Type"="application/x-www-form-urlencoded"
}

Invoke-RestMethod -Method Post -Uri $Server -Body $body -Headers $header