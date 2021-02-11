# Houdek-Journal
The Houdek-Journal application is a blog web app built with Node.js/Express.js, MongoDB, Mongoose, and ejs templating.
This project was purely for fun and to get accustomed to ejs templating, working with a NOSQL database, and URL Parameters.

To Use:
1. Read title of blog
2. Read content of blog. If the content of the blog is over 100 character, click on the "Read more" link to be taken to that blog post's personal page.

To compose a post:
1. https://houdek-journal.herokuapp.com/compose

Hosted on Heroku: https://houdek-journal.herokuapp.com/

Note: This web app runs on a single database with a single collection. All posts can be seen by everyone from the database it is being read from.

To install and use:
1. Download or clone this repository.
2. Open all files in your Text Editor/IDE of your choosing
3. In the command line type: "npm i"
4. In the the App.js file (line 26), modify the mongoose connection to connect to a local mongoDB server you are running, or to a MongoDB Atlas cluster you have created
5. In the command line type: "node app.js" or "nodemon app.js" to run the application
6. If required, type: "localhost:3000" (note: 3000 is the port number and can be changed to any port number of your choosing. The number just has to match the port code in the app,js file)
