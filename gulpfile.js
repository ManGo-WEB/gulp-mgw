// const {src, dest} = require('gulp');
const {watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();

const path = require("./gulpfile/config/path.js");
const app = require('./gulpfile/config/app.js');

const favicons = require('gulp-favicons');
const filter = require('gulp-filter');

const rm = require('gulp-rm');

// Tasks //
const style = require("./gulpfile/task/sass.js");
const html = require("./gulpfile/task/html.js");
const svg = require("./gulpfile/task/svg.js");
const img = require("./gulpfile/task/images.js");
const js = require("./gulpfile/task/js.js");



// FAVICON //
const favicon = () => {
  return src('./src/img/favicon/favicon.svg')
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'Favicon',
        message: error.message
      }))
    }))
    .pipe(dest('./build/img/favicon/'))
    .pipe(favicons({
      appName: 'My App',
      appShortName: 'App',
      appDescription: 'This is my application',
      developerName: '',
      developerURL: '',
      background: '#fff',
      path: "img/favicon/",
      icons: {
        favicons: true,
        appleIcon: true,
        android: true,
        windows: false,
        yandex: false,
        coast: false,
        firefox: false,
        appleStartup: false
      }  
    }))
    .pipe(dest('./build/img/favicon/'))
    .pipe(filter(['favicon.ico', 'apple-touch-icon.png', 'manifest.json']))
    .pipe(dest('./build/img/favicon/'))
}

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