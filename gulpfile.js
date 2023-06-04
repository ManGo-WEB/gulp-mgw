const {src, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const sassGlob = require('gulp-sass-glob');
const webpCss = require('gulp-webp-css');
const groupMedia = require("gulp-group-css-media-queries");

const fileinclude = require('gulp-file-include');
const webpHtml = require('gulp-webp-html');
const prettyHtml = require('gulp-pretty-html');

const newer = require('gulp-newer');
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");


// HTML //
const html = () => {
  return src('src/html/index.html')
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'HTML',
        message: error.message
      }))
    }))
    .pipe(fileinclude())
    .pipe(prettyHtml())
    .pipe(webpHtml())
    .pipe(dest('./build/'))
}

// // SCSS //
const scss = () => {
  return src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'SCSS',
        message: error.message
      }))
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(groupMedia())
    .pipe(sourcemaps.write())
    .pipe(dest('./build/css/'))
}

// IMAGES //
const img = () => {
  return src('./src/img/**/*.*')
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'Images',
        message: error.message
      }))
    }))
    .pipe(newer('build/img/'))
    .pipe(webp())    
    .pipe(dest('./build/img/'))

    .pipe(src('./src/img/**/*.*'))
    .pipe(newer('build/img/'))
    .pipe(imagemin())
    .pipe(dest('./build/img/'))

}


exports.scss = scss;
exports.html = html;
exports.img = img;