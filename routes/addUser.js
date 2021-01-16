var express = require('express');
var router = express.Router();
var Users = require('../models/add_users');

var bcrypt = require('bcryptjs');

router.post('/', async (req,res)=> {

    const {email,password,password2} = req.body;

    if(password !== password2){
        req.flash('error','Подтверждение пароля не отличается от значения пароля.');
        res.redirect('/');
    }

    var candidate = Users.findOne({email});

    if(candidate){
        req.flash('error','Пользователь с таким email уже существует!');
        res.redirect('/');
    }

    var hashPassword = await bcrypt.hash(password,10);

    var user = new Users({

        email:    email,
        password: hashPassword,
        name:     req.body.name,
        phone:    req.body.phone
    });

    try{
        await user.save();
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
    }

});

module.exports = router;
