const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));

app.post("/", (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    
});

app.listen(port, (req, res) => console.log(`Server running on port ${port}`));