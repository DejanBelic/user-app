const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');

// Body parser middleware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config.
const db = require('./config/keys.js').mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// Passport configure.
app.use(passport.initialize());


// Passport config.
require('./config/passport')(passport);

// Use routes.
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));