/* globals require */

module.exports = (gulp, config) => {
  // General
  // eslint-disable-next-line no-redeclare, no-var
  var gulp = require('gulp-help')(gulp);
  const _ = require('lodash');

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
