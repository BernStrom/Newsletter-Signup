const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;



app.listen(port, (req, res) => console.log(`Server running on port ${port}`));