var express = require('express');
var router = express.Router();

const authorized = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.get('/', async (req,res)=> {

    res.render('index'), {
        messageUser : false,
        auth: req.session.isAuthenticated,
        itsAdmin : req.session.itsAdmin,
        loginError: false
    };
});

router.get('/form_error', async (req,res)=> {

    res.render('index', {
        messageUser : true,
        auth: false,
        itsAdmin : false,
        loginError :        req.flash('loginError'),
        registrationError:  req.flash('registrationError'),
        email:   req.body.email,
        name:    req.body.name,
        confirm: req.body.confirm,
        phone:   req.body.phone

    });
});


router.get('/admin', authorized, isAdmin, (req,res) => [
    res.render('admin')
]);

router.get('/sale_page', (req,res) => [
    res.render('sale_page')
]);

//////////////////////////////Добавить редактирование пользователя ///////////////////////////
router.get('/:id', authorized, async (req,res)=> {

    res.render('index'), {
        messageUser : false,
        auth: req.session.isAuthenticated,
        itsAdmin: req.session.itsAdmin,
        loginError: false
    };
});

module.exports = router;