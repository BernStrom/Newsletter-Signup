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

    const listId = process.env.MAILCHIMP_AUDIENCE_LIST_ID;
    const subscribingUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

});

app.listen(port, (req, res) => console.log(`Server running on port ${port}`));