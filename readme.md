login & register page
feed page
profile page
picture
story feature 
edit details
share to story  
search accounts


STEPS FOLLOWED:-

1- npm i

2- npm i passport passport-local passport-local-mongoose mongoose express-session multer uuid

3- in app.js, require express session,passport and setup passport codes

4- go to user.js remove every code, set up mongoose and create schema

5- in index.js, first requires passport and passport-local stratergy.
wrote passport.use code in starting
wrote register, login , logout code(remember to give correct name, method, action in the form of login and register in ejs files)

6- write isLoggedin function(in index.js) for protected routes.

7- created the multer.js file and wrote code for file storage purpose.
also inside public-images, made another file "uploads".

8

