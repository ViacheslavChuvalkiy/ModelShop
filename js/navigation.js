
function toggleToActiveLink (event) {

    var links = $('.nav__link');

    for (var index = 0; index < links.length; index++) {
        if (links[index].classList.contains('nav__link--active')) {
            links[index].classList.remove('nav__link--active');
            break;
        }
    }

    event.target.classList.add('nav__link--active');

}

function setClick_Button_User(event) {

    var buttons = $('.btn_user');

    for (var index = 0; index < buttons.length; index++ ) {

        var temp_btn = buttons[index];
        temp_btn.addEventListener('click', ShowUserMenu_Sign_in);
    }

    var menu_user_close = $('.menu_user_close');
    for (var index = 0; index < menu_user_close.length; index++ ) {
        menu_user_close[index].addEventListener('click', HideUserMenu_Sign_in);
    }

    buttons = $('.user_menu_choice');

    for (var index = 0; index < buttons.length; index++ ) {

        var temp_btn = buttons[index];
        temp_btn.addEventListener('click', Choice_User_Menu);
    }

}

function ShowUserMenu_Sign_in(event) {

    var temp = $('.menu_user');
    temp.slideToggle(5);

    var user_menu_choices = $('.user_menu_choice');

    for (var index = 0; index < user_menu_choices.length; index++ ) {

        temp = user_menu_choices[index];
        if(temp.classList.contains('user_menu_choice_active')){
            temp.classList.remove('user_menu_choice_active');
        }
    }

    Choice_User_Menu(event);

}

function HideUserMenu_Sign_in(event) {

    var menu_registration = $('.menu_user_registration');
    var menu_sign_in = $('.menu_user_sign_in');
    var user_form = $('.menu_user');

    if (menu_registration.visible){
        menu_registration.hide();
    }

    else if(menu_sign_in.visible){
        menu_sign_in.hide();
    }

    user_form.closest()
    user_form.hide();

    if(menu_registration.find('.alert').length){
        menu_registration.find('.alert').remove();
        $(location).attr('href','/');
    }

    else if(menu_sign_in.find('.alert').length){
        menu_sign_in.find('.alert').remove();
        $(location).attr('href','/');
    }



}

function Choice_User_Menu(event) {

    var temp_value = $('.' + event.target.value);

    if(!temp_value[0]){
        return;
    }

    if(temp_value[0].classList.contains('is-hidden')){
        temp_value[0].classList.remove('is-hidden');
    }

    var menu_registration = $('.menu_user_registration');
    var menu_sign_in = $('.menu_user_sign_in');

    if(temp_value[0].classList.contains('menu_sign_in') ){

        if(menu_sign_in[0].classList.contains('is-hidden')){
            menu_sign_in[0].classList.remove('is-hidden');
        }

        menu_sign_in.css('max-height','215px');
        menu_registration[0].classList.add('is-hidden');

    }
    else {

        if(menu_registration[0].classList.contains('is-hidden')){
            menu_registration[0].classList.remove('is-hidden');
        }

        menu_registration.css('max-height','295px');
        menu_sign_in[0].classList.add('is-hidden');
    }

    if(temp_value.visible){
        temp_value.hide();
    }
    else {
        temp_value.show();
    }

}

function showUsersForm() {

    var menu_registration = $('.menu_user_registration');
    var menu_sign_in = $('.menu_user_sign_in');

    if(menu_registration.find('.alert').length){
        menu_registration.css('max-height','355px');
        menu_registration.show();
    }

    else if(menu_sign_in.find('.alert').length){
        menu_sign_in.css('max-height','255px');
        menu_sign_in.show();
    }
}