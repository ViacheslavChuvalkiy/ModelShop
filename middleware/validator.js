var Users = require('../models/add_users');
const {body} = require('express-validator');

var bcrypt = require('bcryptjs');

exports.validatorRegistretion = [
    body('email')
        .isEmail().withMessage('Введите корректный email')
        .custom(async (value, {req}) => {
         try {
             var candidate = await Users.findOne({email:value});

             if(candidate){
                 return Promise.reject('Такой email уже существует');
             }
         }   
         catch (e) {
             console.log(e);
         }   
         
        })
        .normalizeEmail(),
    
    body('password')
        .isLength({ min: 5 }).withMessage('Минимальная длина пароля 5 символов')
        .isAlphanumeric(),
    body('confirm')
        .custom((value, {req})  =>{
        if (value !== req.body.password){
            throw new Error('Пароли должны совпадать!')
        }
        return true
    },
    body('name')
        .isLength({min:5}).withMessage('Имя должно содержаться минимум из 5 символов.')
        .trim()
)
];

exports.validatorLogIn = [

    body('email')
        .isEmail().withMessage('Введите корректный email')
        .custom(async (value, {req}) => {
            try {

                const {email, password} = req.body;
                var candidate = await Users.findOne({email});

                if (candidate) {
                    const areSame = await bcrypt.compare(password, candidate.password);
                    if (!areSame) {
                        return Promise.reject('Не верный пароль');
                    }

                    req.user = candidate;
                    return true;
                }
                else {
                    return Promise.reject('Данный email не зарегистрирован');
                }
            }

            catch (e) {
                console.log(e);
            }

        })
];