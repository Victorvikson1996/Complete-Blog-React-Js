const express = require("express");
const app = express();
const { MONGOURI } = require("./keys");
const mongoose = require("mongoose");
const PORT = 5000;


//connect to moongoose

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("connection to MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log("Error: connected to MongoDB " + error);
});


// Model import
require("./models/post");
require("./models/category");
require("./models/comment");

app.use(express.json());

//Rout import
app.use(require("./routes/post"));
app.use(require("./routes/category"));
app.use(require("./routes/comment"))







app.listen(PORT, () => {
    console.log("Server is started at " + PORT);
});