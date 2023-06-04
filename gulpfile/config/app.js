module.exports = {
  // isProd: isProd,
  // isDev: isDev,

  // htmlmin: {
  //   collapseWhitespace: isProd
  // },

  
  imagemin: {
    verbose: true
  },

  fonter: {
    formats: ["ttf", "woff", "eot", "svg"]
  },

  scss: {
    //importer: require('node-sass-tilde-importer'),
    outputStyle: 'compressed'
  },

  svgo: {
    plugins: [
      {
        removeAttrs: {
          attrs: '(fill|stroke|width|height|style|data.*)'
        }
      }
    ]
  },

  svgSprite: {
    mode: {
      symbol: {
        sprite: '../sprite.svg'
      }
    }
  },

  favicons: {
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

  }
}