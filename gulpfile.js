/* globals require */

// General
const gulp = require('gulp-help')(require('gulp'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const atImport = require('postcss-import');
const mixins = require('postcss-mixins');
const nested = require('postcss-nested');
const simpleVars = require('postcss-simple-vars');
const concat = require('gulp-concat');
// const portscanner = require('portscanner');
const browserSync = require('browser-sync').create();

const wpt = require('webpagetest-mapper');
const fs = require('fs');
const path = require('path');
const fakeResults = require('./mapper/fake-results');

gulp.task('css', (done) => {
  const plugins = [
    autoprefixer({ browsers: ['last 2 versions'] }),
    atImport,
    mixins,
    nested,
    simpleVars,
  ];
  gulp.src('./mapper/siftmap/css/dev/**/*.css')
    .pipe(postcss(plugins))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./mapper/siftmap/css/build'))
    .on('end', () => {
      browserSync.reload('*.css');
      done();
    });
});

// Find open port using portscanner.
// let openPort = 'what';
// portscanner.findAPortNotInUse(3000, 3010, '127.0.0.1', (error, port) => {
//   openPort = port;
// });

gulp.task('default', () => {
  wpt.map({
    mapper: 'siftmap',
  }, fakeResults).then((mapped) => {
    fs.writeFileSync(path.join(__dirname, 'results.html'), mapped);
    browserSync.init({
      injectChanges: true,
      server: {
        baseDir: __dirname,
      },
      startPath: './results.html',
      ui: false,
      open: true,
      port: 3010,
    });
  }).catch((error) => {
    console.log(error.stack);
  });

  gulp.watch('./mapper/siftmap/css/dev/**/*.css', ['css']);
  gulp.watch('./mapper/siftmap/template.html', ['default']);
});
