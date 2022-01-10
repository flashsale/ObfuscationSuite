$confuser_exe_input = Read-Host "Enter the path to Confuser.CLI.exe (example: C:\Users\fs\dev\ConfuserEx\Confuser.CLI\bin\Release\net461\Confuser.CLI.exe)"
$confuser_exe = $confuser_exe_input.Replace('\', '\\')
(Get-Content controllers\obfuscation.js).replace('CHANGEME', $confuser_exe) | Set-Content controllers\obfuscation.js

Write-Output "Updated. 'node server.js' and visit localhost:7777/obfuscator"