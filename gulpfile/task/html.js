const {src, dest} = require('gulp');

// Config //
const path = require('../config/path.js');
//const app = require("./gulpfile/config/app.js");

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');
const webpHtml = require('gulp-webp-html');
const prettyHtml = require('gulp-pretty-html');


// HTML //
const html = () => {
  return src(path.html.src)
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'HTML',
        message: error.message
      }))
    }))
    .pipe(fileinclude())
    .pipe(prettyHtml())
    .pipe(webpHtml())
    .pipe(dest(path.html.dest))
}

module.exports = html;