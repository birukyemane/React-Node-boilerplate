const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require('../config/keys');
const validateSignUpInput = require('../validation/sign-up');
const validateSignInInput = require('../validation/sign-in');

function signUp(req, res) {
  const {errors, isValid} = validateSignUpInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const {name, email, password} = req.body;

  User.findOne({email}).then(user => {
    if (user) {
      errors.email = 'A user already exist';
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, true); // generate avatar
    const newUser = new User({name, email, password, avatar});

    bcrypt.genSalt(10, function(err, salt) { // generate a salt and hash on separate function calls
      bcrypt.hash(password, salt, function(err, hash) {
        console.log(salt);
        // Store hash in your password DB.
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.json({success: true, message: 'A user is ceated'});
            //res.json(user);
          })
          .catch(err => console.log(err));
      });
    });
  });
}

function signIn(req, res) {
  const {errors, isValid} = validateSignInInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const {email, password} = req.body;
  User.findOne({email}).then(user => { // check uer by email
    if (!user) {
      errors.email = 'A user doesnt exist';
      return res.status(400).json(errors);
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => { // compare password with hashed password
      if (isMatch) {
        //User Matched
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        }; //create JWT payload
        console.log('pay load at user route:', payload);
        //Sign Token
        //  res.json({ msg: 'Success' })
        //if user log in success, generate a JWT token for the user with a secret key
        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
          res.json({success: true, token: `Bearer ${token}`});
        });
      } else {
        errors.password = 'Password incorrect';
        // return res.status(400).json({ password: "Password incorrect" });
        return res.status(400).json(errors);
      }
    });
  });
}

module.exports = { 
  signUp,
  signIn,
};