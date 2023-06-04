const {src, dest} = require('gulp');

// Config //
const path = require('../config/path.js');
const app = require("../config/app.js");

// Plugins //
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const favicons = require('gulp-favicons');
const filter = require('gulp-filter');


// FAVICON //
const favicon = () => {
  return src(path.favicon.src)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'Favicon',
        message: error.message
      }))
    }))
    .pipe(dest(path.favicon.dest))
    .pipe(favicons(app.favicons))
    .pipe(dest('./build/img/favicon/'))
    .pipe(filter(['favicon.ico', 'apple-touch-icon.png', 'manifest.json']))
    .pipe(dest('./build/img/favicon/'))
}

module.exports = favicon;