
function addEventShowAddImage() {

    var admin_img_block = $('.main_image_admin_form');

    if(admin_img_block[0] && this.files[0]) {

        if(admin_img_block[0].childNodes.length = 0) {
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(this.files[0]);
            img.onload = function () {
                window.URL.revokeObjectURL(this.src);
            }
            admin_img_block[0].appendChild(img);
        }
        else{
            child_img = admin_img_block[0].childNodes[0];
            child_img.src = this.files[0];
        }
    }
}

function addEventShowOthersAddImage() {

    var admin_images_block = $('.others_image_admin_form');

    if(admin_images_block[0] && this.files.length) {

        for(var i = 0; i < this.files.length;i++){

            if(admin_images_block[0].childNodes[i]){

                var img = admin_images_block[0].childNodes[i];
                img.src = window.URL.createObjectURL(this.files[i]);
            }
            else {
                var img = document.createElement("img");
                img.src = window.URL.createObjectURL(this.files[i]);
                img.onload = function () {
                    window.URL.revokeObjectURL(this.src);
                }
            };

            var img_elem = $('.others_image_admin_form img');

            if (img_elem.length == 6) {
                break;
            }

            if(img_elem[0]) {
                admin_images_block[0].insertBefore(img,img_elem[0]);
            }
            else {
                admin_images_block[0].appendChild(img);
            }
        }

    }
}

function clear_photo_in_admin_page() {

    var admin_images_block = $('.others_image_admin_form');

    while (admin_images_block[0].firstChild) {
        admin_images_block[0].removeChild(admin_images_block[0].firstChild);
    }
}

function slide_active_admin_form(event) {

    if (event) {
        var current_form = event.target.id;
    }
    else {
        var current_form = this.id;
    }

    var admin_forms = $('.admin_form');

    for (var i = 0; i <= admin_forms.length; i++ ){

        var temp_form = admin_forms[i];

        if(!temp_form){
            continue;
        }

        if(temp_form.classList.contains('active_admin_form')){
            temp_form.classList.remove('active_admin_form');
        }
        else {
            continue;
        }
    }

    if(current_form == 'edit_items_page'){

        $(location).attr('href','/edit_items_page');

    }
    else if(current_form == '/'){
        $(location).attr('href','/');

    }
    else{

         if (location.pathname == '/edit_items_page') {
            $(location).attr('href','/admin');
         }
         else{
             var activateform = $('.' + current_form);
             if(activateform[0]) {
                 activateform[0].classList.add('active_admin_form');
             }
         }
    }
}

function img_edit_selected(event) {

    var id_selected_item = event.target.id;
    $(location).attr('href','/edit_items_page?param1=' + id_selected_item);

}