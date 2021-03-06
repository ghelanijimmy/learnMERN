const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(()=>console.log('MongoDB Connected'))
  .catch(error=>console.log(error));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//USE routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5050;

app.listen(port, ()=>console.log(`Server running on port ${port}`));
