@echo off
@echo ========================================================
@echo build Push to github
@echo ========================================================

set SVN_HOME=D:\01_cloud\SAE\xlmusic\3\vue
explorer "%SVN_HOME%"

yarn run build && del "%SVN_HOME%" /s /f /q && xcopy dist "%SVN_HOME%" /e /y


