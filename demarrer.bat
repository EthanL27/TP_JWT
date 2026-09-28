@echo off
chcp 65001 > nul
echo =======================================================
echo   DEMARRAGE DU SERVEUR TP JWT (BTS SIO)
echo =======================================================
echo.
echo Lancement du serveur Node.js sur le port 3000...
echo Ouvrez votre navigateur sur : http://localhost:3000
echo.
node server.js
pause
