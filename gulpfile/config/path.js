const pathSrc = './src';
const pathDest = './build';


module.exports = {
  root: pathDest,

  html: {
    src: pathSrc + '/html/*.html',
    watch: pathSrc + '/html/**/*.html',
    dest: pathDest
  },

  pug: {
    src: pathSrc + '/pug/*.pug',
    watch: pathSrc + '/pug/**/*.pug',
    dest: pathDest
  },

  scss: {
    src: pathSrc + '/sass/*.{sass,scss}',
    watch: pathSrc + '/sass/**/*.{sass,scss}',
    dest: pathDest + '/css/'
  },

  js: {
    src: pathSrc + '/js/*.js',
    watch: pathSrc + '/js/**/*.js',
    dest: pathDest + '/js/'
  },

  img: {
    src: pathSrc + '/img/**/*.{png,jpg,jpeg,gif,svg}',
    watch: pathSrc + '/img/**/*.{png,jpg,jpeg,gif,svg}',
    dest: pathDest + '/img/'
  },

  svg: {
    src: pathSrc + '/img/icons/*.svg',
    watch: pathSrc + '/img/icons/*.svg',
    dest: pathDest + '/img/'
  },

  font: {
    src: pathSrc + '/font/**/*.{eot,ttf,otf,otc,ttc,woff,woof2,svg}',
    watch: pathSrc + '/font/**/*.{eot,ttf,otf,otc,ttc,woff,woof2,svg}',
    dest: pathDest + '/font/'
  },

  favicon: {
    src: pathSrc + '/img/favicon/favicon.svg',
    watch: pathSrc + '/img/favicon/favicon.svg',
    dest: pathDest + '/img/favicon/'
  },
}