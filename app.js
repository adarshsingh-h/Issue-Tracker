const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();
const app = express();

//setting up the templating engine
app.set("view engine", "ejs");
app.set("views", "views");

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((error) => {
        console.log(error);
    });

//Body-Parser
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static("public"));

// app.use(express.static("public"));
const homeRoutes = require("./routes/home");

app.use("/", homeRoutes);

app.listen(8000, () => {
    console.log("Server Running!");
});
