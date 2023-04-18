require("dotenv").config();

var bodyParser = require("body-parser");

const express = require("express");

const helmet = require("helmet");
const cors = require("cors");

const app = express();

app.use(bodyParser.json({ limit: "400mb" }));
app.use(bodyParser.urlencoded({ limit: "400mb", extended: true }));

app.enable("etag");
app.disable("x-powered-by");
app.set("json spaces", 2);

app.use(cors());
app.use(helmet());

app.use("/", /* require('./middlewares/valid-referer'), */ require("./routes"));

const port = process.env.PORT || 5000;
const server = app.listen(port, async () => {
  console.log("Server is running on port:" + port);
});

module.exports = { app };
