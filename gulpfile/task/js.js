const {src, dest} = require('gulp');

// Config //
const path = require('../config/path.js');
const app = require("../config/app.js");

// Plugins //
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

// JS //
const js = () => {
  return src(path.js.src)
  .pipe(sourcemaps.init())
  .pipe(plumber({
    errorHandler: notify.onError(error => ({
      title: 'JS',
      message: error.message
    }))
  }))
  .pipe(babel({
      presets: ['@babel/env']
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(dest(path.js.dest))
}

module.exports = js;