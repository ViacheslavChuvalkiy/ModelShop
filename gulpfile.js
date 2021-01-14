const gulp  = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const rimraf = require('rimraf');
var exec = require('gulp-exec');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

/* ------------ App ------------- */
const app = express();
app.use(express.urlencoded({extended:true}));

/* ------------ Static ------------- */

app.use(express.static('fonts'));
app.use(express.static('views'));
app.use(express.static('images'));
app.use(express.static('images/item_photos'));
app.use(express.static('styles'));
app.use(express.static('js'));

/* ------------ Views ------------- */

app.set("views", 'views');
app.set("view engine", "pug");


//////////////Routers//////////////////////////////////////////////

const addUsers = require(path.join(__dirname, "routes",'addUser'));
const addFile = require(path.join(__dirname, "routes",'addFile'));
const sale_item_base = require(path.join(__dirname, "routes",'sale_item_base'));
const editPage = require(path.join(__dirname, "routes",'edit_page'));

//const users_sign_in = require(path.join(__dirname, "routes",'authorization'));
//const add_to_cart = require(path.join(__dirname, "routes",'sale_item'));

//////////////Models//////////////////////////////////////////////

const fileMiddleware = require('./models/file_middleware');

//////////////////////////////////////////////////////////////////////////

app.use('/addUser', addUsers);
app.use('/sale_item_base', sale_item_base);
app.use( fileMiddleware.single('multi_choice_img'));
app.use('/add_item_photos', addFile);
app.use('/edit_items_page', editPage);

//////////////////////////////////////////////////////////////////////////

app.get('/', (req,res) => [
    res.render('index')
]);

app.get('/sale_page', (req,res) => [
    res.render('sale_page')
]);

app.get('/admin', (req,res) => [
    res.render('admin')
]);

async function start_server(){

    const url = 'mongodb+srv://admin_site:r2d2c3po@cluster0.ce3gh.gcp.mongodb.net/shop_Nataly_Bloom';
    await mongoose.connect(url,{
        useNewUrlParser: true}
    )
    app.listen('3000');

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
    exec('node index.js', err => err);

});

gulp.task('reload_app', function() {

    exec('node index.js', err => err);

});

//////////////////////////////////////////////////////////////////////////

/* ------------ Watchers ------------- */
gulp.task('watch', function() {

    gulp.watch('styles/**/*.scss', gulp.series('styles:compile'));
    gulp.watch('views/**/*.pug',   gulp.series('reload_app'));
    gulp.watch('js/**/*.js',       gulp.series('reload_app'));

});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('styles:compile','js'),
    gulp.parallel('watch','add_app'),
    //gulp.parallel('watch', 'server')
    )
);

