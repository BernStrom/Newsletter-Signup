// Core node dependencies and modules for the server.
const express = require("express");
const bodyParser = require("body-parser");
const newsletter = require("./controllers/userController");

const app = express();
 
app.set("view engine", "ejs"); // Settings to read EJS files in views directory.
app.use(express.static("public")); /// Serve static files such as CSS & images from the public directory.
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/")
    .get(newsletter.homepage) // GET and display the homepage when the URL points to the root path.
    .post(newsletter.subscribe); // POST the subscribing data when the form is submitted at the homepage.

// Redirect success and failure subscription status to homepage.
app.post("/success", newsletter.success);
app.post("/failure", newsletter.failure);

app.listen(process.env.PORT || 3000); 
// Server will run on a dynamically assigned port number by Heroku OR run on port number 3000 locally.