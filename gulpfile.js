// const {src, dest} = require('gulp');
const {watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();

const path = require("./gulpfile/config/path.js");
//const app = require('./gulpfile/config/app.js');




const newer = require('gulp-newer');
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

const babel = require('gulp-babel');

const favicons = require('gulp-favicons');
const filter = require('gulp-filter');



const rm = require('gulp-rm');


const style = require("./gulpfile/task/sass.js");
const html = require("./gulpfile/task/html.js");
const svg = require("./gulpfile/task/svg.js");





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

// JS //
const js = () => {
  return src('./src/js/main.js')
  .pipe(plumber({
    errorHandler: notify.onError(error => ({
      title: 'JS',
      message: error.message
    }))
  }))
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(dest('./build/js/'))
}

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

// SVG //
// const svgoConfig = {
//   plugins: [
//     {
//       removeAttrs: {
//         attrs: '(fill|stroke|width|height|style|data.*)'
//       }
//     }
//   ]
// }
// const svgSpriteConfig = {
//   mode: {
//     symbol: {
//       sprite: '../sprite.svg'
//     }
//   }
// }



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