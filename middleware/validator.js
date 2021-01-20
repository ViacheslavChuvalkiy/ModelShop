var Users = require('../models/add_users');
const {body} = require('express-validator');

exports.validatorForm = [
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
        .isLength({ min: 5 })
        .isAlphanumeric(),
    body('confirm')
        .custom((value, {req})  =>{
        if (value !== req.boby.confirm){
            throw new Error('Пароли должны совпадать!')
        }
        return true
    },
    body('name')
        .isLength({min:5}).withMessage('Имя должно содержаться минимум из 5 символов.')
        .trim()
)
];