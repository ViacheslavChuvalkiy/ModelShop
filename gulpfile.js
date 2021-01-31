const keys = require('./keys');

const gulp  = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const rename = require('gulp-rename');
const rimraf = require('rimraf');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');


const varMiddleware = require('./middleware/variables');

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MongoBD_URL
})

/* ------------ App ------------- */
const app = express();
app.use(express.urlencoded({extended:true}));

/* ------------ Static ------------- */

app.use(express.static('js'));
app.use(express.static('fonts'));
app.use(express.static('views'));
app.use(express.static('images'));
app.use(express.static('images/item_photos'));
app.use(express.static('styles'));


/* ------------ Session ------------- */

app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));


app.use(varMiddleware);
app.use(flash());

/* ------------ Views ------------- */

app.set("views", 'views');
app.set("view engine", "pug");

//////////////Routers//////////////////////////////////////////////

const homepage = require(path.join(__dirname, "routes",'home'));
const addUsers = require(path.join(__dirname, "routes",'user'));
const addFile = require(path.join(__dirname, "routes",'addFile'));
const sale_item_base = require(path.join(__dirname, "routes",'sale_item_base'));
const editPage = require(path.join(__dirname, "routes",'edit_page'));

const users_sign_in = require(path.join(__dirname, "routes",'authorization'));

//const add_to_cart = require(path.join(__dirname, "routes",'sale_item'));

//////////////Models//////////////////////////////////////////////

const fileMiddleware = require('./models/file_middleware');

//////////////////////////////////////////////////////////////////////////

app.use('/', homepage);
app.use('/addUser', addUsers);
app.use('/sale_item_base', sale_item_base);
app.use( fileMiddleware.single('multi_choice_img'));
app.use('/add_item_photos', addFile);
app.use('/edit_items_page', editPage);
app.use('/authorization', users_sign_in);

//////////////////////////////////////////////////////////////////////////

async function start_server(){

    const url = keys.MongoBD_URL;
    await mongoose.connect(url,{
        useUnifiedTopology: true,
        useNewUrlParser: true}
    )
    app.listen(keys.PORT);

}

/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function () {
    return gulp.src('styles/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('styles/css'));
});

/* ------------ JS compile ------------- */

gulp.task('js', function () {
    return gulp.src(['./js/navigation.js','./js/hero.js','./js/admin_page.js','./js/main.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('js'));
});

/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
    return rimraf('styles/css', cb);
});

gulp.task('add_app', function() {

    start_server();

});


//////////////////////////////////////////////////////////////////////////

/* ------------ Watchers ------------- */
gulp.task('watch', function() {

    gulp.watch('styles/**/*.scss', gulp.series('styles:compile'));
    // gulp.watch('views/**/*.pug',   gulp.series('reload_app'));
    // gulp.watch('js/**/*.js',       gulp.series('reload_app'));

});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('styles:compile','js'),
    gulp.parallel('watch','add_app'),
    //gulp.parallel('watch', 'server')
    )
);

