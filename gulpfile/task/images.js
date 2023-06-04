const {src, dest} = require('gulp');

// Config //
const path = require('../config/path.js');
const app = require("../config/app.js");

// Plugins //
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const newer = require('gulp-newer');
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");


// IMAGES //
const img = () => {
  return src(path.img.src)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'Images',
        message: error.message
      }))
    }))
    .pipe(newer(path.img.dest))
    .pipe(webp())    
    .pipe(dest(path.img.dest))

    .pipe(src(path.img.src))
    .pipe(newer(path.img.dest))
    .pipe(imagemin())
    .pipe(dest(path.img.dest))
}

module.exports = img;