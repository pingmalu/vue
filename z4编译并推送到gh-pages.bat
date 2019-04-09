@echo off
@echo ========================================================
@echo build Push to github
@echo ========================================================

yarn run build && yarn run deploy

&& pause
