@echo off
setlocal
set ROOT_DIR=%~dp0..\..\..\..
set VSROOT_DIR=%~dp0..\..
start "Open Browser" /B "%ROOT_DIR%\node.exe" "%VSROOT_DIR%\out\server-cli.js" "code-server" "1.91.1" "1962f48b7f71772dc2c060dbaa5a6b4c0792a549" "code-server.cmd" "--openExternal" "%*"
endlocal
