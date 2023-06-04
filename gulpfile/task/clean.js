const {src, dest} = require('gulp');

// Config //
const path = require('../config/path.js');

// Plugins //
const del = require('del');

// CLEAN //
const clean = () => {
  return del(path.root)
}

module.exports = clean;