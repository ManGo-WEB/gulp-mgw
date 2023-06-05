// const {src, dest} = require('gulp');
const {watch, series, parallel} = require('gulp');
const browserSync = require('browser-sync').create();

const path = require("./gulpfile/config/path.js");
const app = require('./gulpfile/config/app.js');

// Tasks //
const style = require("./gulpfile/task/sass.js");
const html = require("./gulpfile/task/html.js");
const svg = require("./gulpfile/task/svg.js");
const img = require("./gulpfile/task/images.js");
const js = require("./gulpfile/task/js.js");
const favicon = require("./gulpfile/task/favicon.js");
const clean = require("./gulpfile/task/clean.js");
const font = require("./gulpfile/task/font.js");

// WATCHER //
const watcher = () => {
  watch(path.html.watch, html).on('all', browserSync.reload);
  watch(path.scss.watch, style).on('all', browserSync.reload);
  watch(path.js.watch, js).on('all', browserSync.reload);
  watch(path.img.watch, img).on('all', browserSync.reload);
  watch(path.font.watch, font).on('all', browserSync.reload);
  watch(path.favicon.watch, favicon).on('all', browserSync.reload);
}

// SERVER //
const server = () => {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  });
}

// BUILD //
const build = series(
  clean,
  parallel(html, style, js, font, img, favicon, svg)
);

const dev = series(
  build,
  parallel(server, watcher)
);

// PUBLIC //
exports.style = style;
exports.html = html;
exports.img = img;
exports.js = js;
exports.favicon = favicon;
exports.svg = svg;
exports.clean = clean;
exports.font = font;
exports.server = server;
exports.build = build;

exports.default = series(build, parallel(server, watcher));