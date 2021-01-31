var express = require('express');
var router = express.Router();
var Users = require('../models/add_users');
var {validatorRegistretion} = require('../middleware/validator');
const {validationResult} = require('express-validator');

var bcrypt = require('bcryptjs');

router.post('/', validatorRegistretion, async (req,res)=> {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(422).render('index', {
            messageUser : true,
            loginError :  false,
            auth: false,
            itsAdmin : false,
            registrationError:  errors.array()[0].msg,
            email: req.body.email,
            name:  req.body.name,
            phone: req.body.phone
        }
        )
    }

    var hashPassword = await bcrypt.hash(req.body.password,10);

    var user = new Users({

        email:    req.body.email,
        password: hashPassword,
        name:     req.body.name,
        phone:    req.body.phone
    });

    try{
        await user.save();

        req.session.user = user;
        req.session.isAuthenticated = true;
        req.session.save(err => {
            if (err) {
                throw err;
            }
            res.redirect('/');
        })
    }
    catch (err) {
        console.log(err);
    }

});

module.exports = router;
