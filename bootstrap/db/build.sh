echo "+ Checking and creating the database, if needed;"
mysql -uroot -e 'DROP DATABASE IF EXISTS mvchallenge;'
mysql -uroot -e 'CREATE DATABASE mvchallenge DEFAULT CHARACTER SET utf8mb4;'

echo "+ Importing the existent database structure and fixtures."
mysql -uroot mvchallenge < /project/bootstrap/db/database.sql

echo "+ MySQL process of import has just completed."