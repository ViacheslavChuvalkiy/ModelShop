var express = require('express');
var router = express.Router();
var Sale_items = require('../models/sale_item_base');

router.get('/', async (req,res) => {

    var list_sale_items = await Sale_items.find();
    //console.log(list_sale_items);

    res.render('edit_item_page',{
        list_sale_items : list_sale_items
    })

});


module.exports = router;