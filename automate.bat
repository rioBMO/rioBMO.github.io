@echo off
setlocal EnableDelayedExpansion

cd "C:\Users\Lenovo LOQ\OneDrive - Politeknik Negeri Bandung\Kuliah\Semester 2\Proyek 1\rioBMO.github.io"
"C:\Users\Lenovo LOQ\OneDrive - Politeknik Negeri Bandung\Kuliah\Semester 2\Proyek 1\rioBMO.github.io\scrapper.exe"
git add --all
git commit -am "Auto update"
git push origin main

exit /b %ERRORLEVEL%