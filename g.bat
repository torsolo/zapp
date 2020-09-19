echo off
C:\Users\Utente\AppData\Local\GitHubDesktop\app-2.5.5\resources\app\git\cmd\git.exe init
pause
C:\Users\Utente\AppData\Local\GitHubDesktop\app-2.5.5\resources\app\git\cmd\git.exe remote add origin https://github.com/torsolo/zapp.git
pause
C:\Users\Utente\AppData\Local\GitHubDesktop\app-2.5.5\resources\app\git\cmd\git.exe remote -v
pause
C:\Users\Utente\AppData\Local\GitHubDesktop\app-2.5.5\resources\app\git\cmd\git.exe add --all
pause
C:\Users\Utente\AppData\Local\GitHubDesktop\app-2.5.5\resources\app\git\cmd\git.exe commit -am "Initial commit"
pause
C:\Users\Utente\AppData\Local\GitHubDesktop\app-2.5.5\resources\app\git\cmd\git.exe push -f origin master
pause