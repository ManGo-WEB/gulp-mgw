const {src, dest} = require('gulp');

// Config //
const path = require('../config/path.js');
const app = require("../config/app.js");

// Plugins //
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');

// SVG //
const svg = () => {
  return src(path.svg.src)
  .pipe(plumber({
    errorHandler: notify.onError(error => ({
      title: 'SVG',
      message: error.message
    }))
  }))
  .pipe(svgo(app.svgo))
  .pipe(svgSprite(app.svgSprite))
  .pipe(dest(path.svg.dest))
}

module.exports = svg;