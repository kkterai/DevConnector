//  Import the Express library
const express = require('express');
// Import database
const mongoose = require('mongoose');
// Next, create an instance of express, or "Instantiate" a router
const app = express();

// Db Config
const db = require('./config/keys').mongoURI;
// Connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log("MongoDb connected!"))
    .catch(err => console.log(err));

// First route
app.get('/', (req, res) => res.send('Hello World'));

// Open a port - Pick one greater than 5000
const port = 5555;

// Tell the router to listen on 5555
app.listen(port, () => console.log(`Server running on port ${port}`));