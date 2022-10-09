const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const fs = require('fs');
const organisationRoutes = require("./routes/organisation-routes");
const path = require('path');
const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

//for CORS issue
app.use((req, res, next) => {
    //Controls which domains have access, * means any domain
    res.setHeader("Access-Control-Allow-Origin", "*");

    //Controls which headers are allowed and can be handled
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    //Controls which http methods are allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use("/api/organisations", organisationRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});

//error handling
app.use((error, req, res, next) => {

    //multer adds a file property to the request object
    if(req.file){
        //deletes the file for a image upload error
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }

    //checks if a response has already been sent
    if (res.headerSent) {
        return next(error);
    }

    //no response sent yet
    //500 indicates an error in server
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred" });
});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_KEY}@cluster0.9x3g6zd.mongodb.net/crypto?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });
