//  Import the Express library
const express = require('express');
// Import database
const mongoose = require('mongoose');
// Import route JS files
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const bodyparser = require('body-parser');
const passport = require('passport');
// Next, create an instance of express, or "Instantiate" a router
const app = express();

// Body parser middleware - Defined at the app top-level to be used throughout
app.use(bodyparser.urlencoded({extended: false}
));
app.use(bodyparser.json());

// Db Config
const db = require('./config/keys').mongoURI;
// Connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log("MongoDb connected!"))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

// First route
app.get('/', (req, res) => res.send('Hello World'));
// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Open a port - Pick one greater than 5000
const port = 5555;

// Tell the router to listen on 5555
app.listen(port, () => console.log(`Server running on port ${port}`));