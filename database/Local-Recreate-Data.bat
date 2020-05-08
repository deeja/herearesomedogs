echo off
echo This will remove all your data from your local instance. Close if you don't want to continue.
pause
call docker volume rm hasd_db_data
call docker volume ls
call docker volume create hasd_db_data
call docker volume ls
pause