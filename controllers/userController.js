// Node dependency for loading environment variables such as API keys, etc.
require('dotenv').config();

// Core node dependencies for Mailchimp Marketing API
const mailchimp = require("@mailchimp/mailchimp_marketing");

// Access the API key from a secure .env file.
const apiKey = process.env.MAILCHIMP_API_KEY;

mailchimp.setConfig({
    apiKey,
    server: "us7"
});

module.exports = {

    homepage: (req, res) => {
        res.render("home");
    },

    subscribe: (req, res) => {

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
                res.render("success"); // Displays the success page if successfully subscribed.
            } catch (err) {
                res.render("failure"); // Displays the failure page if failed to subscribe.
            }
        }
    
        run(); // Calls the async function above.
    },

    success: (req, res) => {
        res.redirect("/");
    },

    failure: (req, res) => {
        res.redirect("/");
    }
};