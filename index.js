/* globals require */

module.exports.init = (config) => {
  // General
  const wpt = require('webpagetest-mapper');

  wpt.run({
    uri: config.uri,
    tests: path.join(__dirname, 'tests.json'),
    silent: true
  }).then(function (mapped) {
    fs.writeFileSync(path.join(__dirname, 'results.html'), mapped);
  }).catch(function (error) {
    console.log(error.stack);
  });

  /**
   * Theme task declaration
   */
  // gulp.task('theme', ['serve']);
  //
  // gulp.task('compile', tasks.compile);
  // gulp.task('clean', tasks.clean);
  // gulp.task('validate', tasks.validate);
  // gulp.task('watch', tasks.watch);
  // tasks.default.push('watch');
  // gulp.task('default', tasks.default);

  /**
   * Theme task declaration
   */
  // gulp.task('build', ['imagemin', 'clean', 'scripts', 'styleguide-scripts', 'css', 'icons']);

  /**
   * Deploy
   */
  // gulp.task('ghpages-deploy', () => {
  //   gulp.src([
  //     `${config.paths.dist_js}/**/*`,
  //     `${config.paths.pattern_lab}/**/*`,
  //   ], { base: config.themeDir })
  //     .pipe(ghPages());
  // });
};
