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
const sassGlob = require('gulp-sass-glob');
const groupMedia = require("gulp-group-css-media-queries");

const fileinclude = require('gulp-file-include');
const webpHtml = require('gulp-webp-html');
const prettyHtml = require('gulp-pretty-html');

const newer = require('gulp-newer');
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

const babel = require('gulp-babel');

const favicons = require('gulp-favicons');
const filter = require('gulp-filter');

const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');


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
    .pipe(sassGlob())
    .pipe(sass())
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
const svgoConfig = {
  plugins: [
    {
      removeAttrs: {
        attrs: '(fill|stroke|width|height|style|data.*)'
      }
    }
  ]
}
const svgSpriteConfig = {
  mode: {
    symbol: {
      sprite: '../sprite.svg'
    }
  }
}

const svg = () => {
  return src('./src/img/icons/**/*.svg')
  .pipe(plumber({
    errorHandler: notify.onError(error => ({
      title: 'SVG',
      message: error.message
    }))
  }))
  .pipe(svgo(svgoConfig))
  .pipe(svgSprite(svgSpriteConfig))
  .pipe(dest('./build/img/'))
}


exports.scss = scss;
exports.html = html;
exports.img = img;
exports.js = js;
exports.favicon = favicon;
exports.svg = svg;