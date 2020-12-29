// Node dependency for loading environment variables such as API keys, etc.
require('dotenv').config();

// Core node dependencies for the server
const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
const apiKey = process.env.MAILCHIMP_API_KEY; // Access the API key from a secure .env file. 

app.use(express.static("public")); // Serve static files such as styles & images from the public directory.
app.use(bodyParser.urlencoded({ extended: true }));

// Set the configuration for the Mailchimp server with the API key and server prefix.
mailchimp.setConfig({
    apiKey,
    server: "us7"
});

// GET and display the homepage when the URL path points to the root. 
app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));

// POST the following data when the form is submitted at the homepage.
app.post("/", (req, res) => {

    const listId = "b3953bf459"; // ID for the audience subscription newsletter. 
    const subscribingUser = { // Assign the corresponding user details from the form input data.
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    const userSubscriptionStatus = { // Establish a subscription status profile for the user.
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
        }
    };

    const run = async () => { // Submits the data to the Mailchimp audience subscribers list.
        try {
            await mailchimp.lists.addListMember(listId, userSubscriptionStatus);
            res.sendFile(`${__dirname}/success.html`); // Displays the success page if successfully subscribed.
        } catch (err) {
            res.sendFile(`${__dirname}/failure.html`); // Displays the failure page if failed to subscribe.
        }
    }

    run(); // Calls the async function above.
});

// Redirect success and failure subscription status to homepage
app.post("/success", (req, res) => res.redirect("/"));
app.post("/failure", (req, res) => res.redirect("/"));

// Server will run on a dynamically assigned port number by Heroku OR run on port number 3000 locally.
app.listen(process.env.PORT || 3000); 
