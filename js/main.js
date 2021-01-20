
window.onload = (function() {

    var nav_item = $('.nav__link');

    for (var index = 0; index < nav_item.length; index++ ) {

        var temp = nav_item[index];
        temp.addEventListener('click', toggleToActiveLink);

    }

    /*List */

    setClick_Button_User();
    showUsersForm();

    //Admin page//
    if($('#input_img')[0]) {
        $('#input_img')[0].addEventListener('input', addEventShowAddImage, false);
    }

    if($('#input_other_img')[0]) {
        $('#input_other_img')[0].addEventListener('input', addEventShowOthersAddImage, false);
    }

    if($('#clear_photo')[0]) {
        $('#clear_photo')[0].addEventListener('click', clear_photo_in_admin_page, false);
    }

    var admin_items_li = $('.sidebar_admin_li');

    for(var i = 0; i < admin_items_li.length; i++){
        if(admin_items_li[i]) {
            admin_items_li[i].addEventListener('click',slide_active_admin_form,false)
        }
    };

    var admin_img_edit = $('.grid_item_img');

    for(var i = 0; i <= admin_img_edit.length; i++){
        if(admin_img_edit[i]) {
            admin_img_edit[i].addEventListener('click', img_edit_selected, false)
        }
    };
});

