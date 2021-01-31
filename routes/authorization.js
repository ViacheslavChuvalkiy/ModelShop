var express = require('express');
var router = express.Router();

var {validatorLogIn} = require('../middleware/validator');
const {validationResult} = require('express-validator');

router.post('/', validatorLogIn, async (req,res)=> {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(422).render('index', {
                messageUser : true,
                loginError :  errors.array()[0].msg,
                registrationError:  false,
                auth: false,
                itsAdmin : false,
                email: req.body.email
            }
        )
    }

    try {
          var user = req.user;
          req.session.user = user;
          req.session.isAuthenticated = true;
          req.session.itsAdmin = user.isAdmin;
          req.session.save(err => {
            if (err) {
               throw err;
               }

            res.redirect('/');
            });
    }
    catch (e) {
        console.log(e);
    }

});

module.exports = router;
