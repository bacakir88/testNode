"use strict";
/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const recordsRouter = require("./api/routers/records");

/* =======================
    LOAD THE MIDDLEWEARES
==========================*/
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log("connected to the db"))
.catch(err => 
    console.log(err)
);
    

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Enable CORS on ExpressJS to avoid cross-origin errors when calling this server using AJAX
// We are authorizing all domains to be able to manage information via AJAX (this is just for development)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST");
        return res.status(200).json({});
    }

    if (req.method != "POST") {        
        return res.status(200).json({
            message: "Only POST request accepted"
        });
    }
    next();
});

/* =======================
    Routers
==========================*/
app.use("/records", recordsRouter);


/* =======================
    Error Handling
==========================*/
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;