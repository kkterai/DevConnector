//  Import the Express library
const express = require('express');
// Next, create an instance of express, or "Instantiate" a router
const app = express();

// First route
app.get('/', (req, res) => res.send('Hello'));

// Open a port - Pick one greater than 5000
const port = 5555;

// Tell the router to listen on 5555
app.listen(port, () => console.log(`Server running on port ${port}`));