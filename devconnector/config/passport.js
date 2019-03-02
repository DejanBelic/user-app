const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys.js');

const opts = {};

opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false)
            })
            .catch(error => console.log(error))
    }))
};