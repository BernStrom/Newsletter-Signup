require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
const port = 3000;
const apiKey = process.env.MAILCHIMP_API_KEY;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mailchimp.setConfig({
    apiKey,
    server: "us7"
});

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));

app.post("/", (req, res) => {

    const listId = "b3953bf459";
    const subscribingUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    const userSubscriptionStatus = {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName
        }
    };

    const run = async () => {
        try {
            await mailchimp.lists.addListMember(listId, userSubscriptionStatus);
            res.sendFile(`${__dirname}/success.html`);
        } catch (err) {
            res.sendFile(`${__dirname}/failure.html`);
        }
    }

    run();
});

// Redirect success and failure subscription status to homepage
app.post("/success", (req, res) => res.redirect("/"));
app.post("/failure", (req, res) => res.redirect("/"));

app.listen(port);