const express = require('express');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
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

            bcrypt.genSalt(10, function(err, salt) {
                if (err) { console.log(err) }
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) { console.log(err) }
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

<<<<<<< HEAD
// @route   POST api/users/register
// @desc    Register user
// @access  public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({email})
        .then(user => {
            if(!user) {
                return res.status(404).json({email: 'User not found'});
            }

            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //create payload
                        const payload = {id: user.id, name: user.name, avatar: user.avatar};

                        // sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600}, 
                            (err, token) => {
                                return res.json({
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    } else {
                        return res.status(400).json({password: 'Password incorrect!' });
                    }
                })
            })
        .catch()
    })    

=======
>>>>>>> d1daa7deb29003c59ea707ccf0847e91555917a0
module.exports = router;