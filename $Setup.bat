@echo off
setlocal enabledelayedexpansion
type IndexTop.txt > "index.html"
(
	FOR /D %%G in (.\*) DO (
        Pushd %%G
		  set "sopra=%%~nG"
          echo ^<h1 onclick="fisa(this)" class="voce"^>%%~nG^</h1^>
          echo ^<div id="%%~nG" class="elenco"^>
		FOR  %%H in (.\*.html) DO (
		  set "filename=%%~nH"
		  set "filename=!filename: =%%20!"
		  echo ^<p^>^<a href="!sopra!/!filename!%%~xH"^>!filename!^</a^>^</p^>
		) 
        echo ^</div^>
		Popd 
	) 
) >> "index.html"
type IndexBot.txt >> "index.html"
copy zapp.js ARTEMI\ 
copy zapp.js LECTIO\ 
copy zapp.js PRAXIS\ 
copy zapp.js SOPHIA\ 
copy zapp.js PRAXIS\QUOTIDIE_files\

copy zapp.css ARTEMI\ 
copy zapp.css LECTIO\ 
copy zapp.css PRAXIS\ 
copy zapp.css SOPHIA\ 
copy zapp.css PRAXIS\QUOTIDIE_files\
