@echo off
setlocal enableextensions enabledelayedexpansion

rem Timestamp like 20250918_143015
for /f %%i in ('powershell -NoProfile -Command "(Get-Date).ToString('yyyyMMdd_HHmmss')"') do set "TS=%%i"
set "ROOT=%CD%"
set "BACKUPS=%ROOT%\backups"
set "DEST=%BACKUPS%\%TS%"
set "ZIP=%BACKUPS%\project_%TS%.zip"

if not exist "%BACKUPS%" mkdir "%BACKUPS%"
if not exist "%DEST%" mkdir "%DEST%"

echo [1/3] Creating folder snapshot: %DEST%
rem Copy everything under project into snapshot, excluding backups itself to avoid recursion
robocopy "%ROOT%" "%DEST%" /E /R:1 /W:1 /COPY:DAT /XD "%BACKUPS%" >nul
set RC=%ERRORLEVEL%
if %RC% GEQ 8 (
  echo   - robocopy completed with warnings (RC=%RC%).
) else (
  echo   - snapshot copied (RC=%RC%).
)

rem Generate file list for the snapshot
echo [2/3] Writing file list
powershell -NoProfile -Command "Get-ChildItem -Path '%DEST%' -Recurse -Force -File ^| Select-Object FullName,Length ^| Out-File -Encoding utf8 '%DEST%\filelist.txt'" 1>nul 2>nul

rem Create a zip archive from the snapshot
echo [3/3] Creating zip archive: %ZIP%
powershell -NoProfile -Command "Compress-Archive -Path '%DEST%\*' -DestinationPath '%ZIP%' -Force" 1>nul 2>nul

if exist "%ZIP%" (
  echo Backup completed successfully.
  echo Folder: %DEST%
  echo Zip:    %ZIP%
) else (
  echo Backup finished (folder created), but zip file was not created.
)

echo Done.
endlocal
