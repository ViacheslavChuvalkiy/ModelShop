var express = require('express');
var router = express.Router();
var Sale_items = require('../models/sale_item_base');

router.get('/', async (req,res) => {

    if (req.query.param1 == null) {
        var list_sale_items = await Sale_items.find();

        res.render('edit_item_page', {
            list_sale_items: list_sale_items,
            all_items_visible: true
        })
    }
    else {
        var selected_sale_item = await Sale_items.findById(req.query.param1);

        res.render('edit_item_page', {
            selected_sale_item: selected_sale_item,
            all_items_visible: false
        })

    }


});


module.exports = router;