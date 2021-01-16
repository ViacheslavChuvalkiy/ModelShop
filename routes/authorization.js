var express = require('express');
var router = express.Router();
var users = require('../models/add_users');

var bcrypt = require('bcryptjs');

router.post('/', async (req,res)=> {

    try {

        const {email, password} = req.body;
        var candidate = await users.findOne({email});

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);
            if(areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/');
                });
            }
            else {
                res.redirect('/');
            }


        }
    }
    catch (e) {
        console.log(e);
    }


});


router.get('/logout', async (req,res)=> {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
