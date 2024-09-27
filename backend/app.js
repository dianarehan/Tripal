// External variables
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.set('strictQuery', false);
require("dotenv").config();

const routes = require ('./routes/preferenceTagRoutes');
const MongoURI = process.env.MONGO_URI;

//App variables
const app = express();
const port = process.env.PORT || "8000";

//Route Imports
const routes = require('./routes/index');
app.use(cors());


//Route Imports
const routes = require('./routes/index');


// configurations
// Mongo DB
mongoose.connect(MongoURI)
    .then(() => {
        console.log("MongoDB is now connected!")
        // Starting server
        app.listen(port, () => {
            console.log(`Listening to requests on http://localhost:${port}`);
        })
    })
    .catch(err => console.log(err));

app.use(express.json())
app.use('/', routes);
