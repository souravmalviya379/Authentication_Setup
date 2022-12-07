# Authentication_Setup

## Introduction
Authentication_Setup is basic template designed by me for using in any Dynamic Web Application. I have done setup for Local as well as Social Authentication(Using Google oauth) so that user can login manually by entering username and password as well as directly using Google/gmail.

## Features
* User can do Sign-Up with name, email and password
* User can do Sign-In with email and password
* User can reset password when logged In
* User can do Sign-Up/Sign-In using gmail Id
* Used Passport.js library for authentication

## Local Machine Setup
* Install Node.js on your machine.
* Install MongoDB community Server.
* After installing software's open Project Directory in VSCode.
* Go to Terminal
* Run command "npm install" to install all the necessary modules required to execute the project on local
* After the installation is complete
* Go to config/environment file
* Change exports to development
* Change the google Secret, and other keys
* Run command "npm start"
* Server will start running at port 8000.

## Technologies Used
* Frontend :- HTML, CSS, JavaScript
* Backend :- Node.js, ExpressJS
* Database :- MongoDB
