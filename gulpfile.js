// const {src, dest} = require('gulp');
const {watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();

const path = require("./gulpfile/config/path.js");
const app = require('./gulpfile/config/app.js');



const rm = require('gulp-rm');

// Tasks //
const style = require("./gulpfile/task/sass.js");
const html = require("./gulpfile/task/html.js");
const svg = require("./gulpfile/task/svg.js");
const img = require("./gulpfile/task/images.js");
const js = require("./gulpfile/task/js.js");
const favicon = require("./gulpfile/task/favicon.js");





// CLEAN //
const clean = () => {
  return src('./build/**/*', {read: false})
    .pipe(rm())
}

// SERVER //
const server = () => {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  });
}


exports.style = style;
exports.html = html;
exports.img = img;
exports.js = js;
exports.favicon = favicon;
exports.svg = svg;
exports.clean = clean;
exports.server = server;