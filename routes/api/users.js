const express = require('express');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();


// Named functions will become the route names
router.get('/test', (req,res) => res.json({
    msg: "Users test works!"
}))

// @route   POST api/users/register
// @desc    Register user
// @access  public
router.post('/register', (req,res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user){
            return res.status(400).json({
                email: 'Email already  exists'
            })
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password // TODO: Encrypt password
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    }) // success
    .catch(err => console.log(err)); // failure
});
module.exports = router;