const {src, dest} = require('gulp');

// Config //
const path = require('../config/path.js');
//const app = require("./gulpfile/config/app.js");

// Plugins //
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

// SASS & SCSS //
const scss = () => {
  return src(path.scss.src)
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'SASS',
        message: error.message
      }))
    }))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(webpCss())
    .pipe(autoprefixer())
    .pipe(groupMedia())
    .pipe(dest(path.scss.dest))
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(path.scss.dest))
}

module.exports = scss;