// Imports
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
require('./config/passport')(passport);

// App Set up
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // JSON parsing
app.use(cors()); // allow all CORS requests
app.use(passport.initialize());

// Database Set Up
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at HOST: ${db.host} and PORT: ${db.port}`);
});

db.on('error', (error) => {
    console.log(`Database Error: ${error}`);
});


// API Routes

app.get('/', (req, res) => {
  res.json({ name: 'MERN Auth API', greeting: 'Welcome to the our API', author: 'YOU', message: "Smile, you are being watched by the Backend Engineering Team" });
});
    
  app.use('/eventsignup', require('./controllers/event-signup'));
  app.use('/opportunities', require('./controllers/opportunity'));
  app.use('/organizations', require('./controllers/organization'));
  app.use('/hours', require('./controllers/hours'));
app.use('/examples', require('./controllers/example'));
app.use('/users', require('./controllers/user'));

// Server
const server = app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));



