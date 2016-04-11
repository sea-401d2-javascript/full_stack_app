var gulp = require('gulp');
var webpack = require('webpack-stream');


var paths = {
  css: ['app/**/*.scss', 'app/**/*.sass'],
  html: ['app/**/*.html'],
  js: ['app/**/*.js'],
  static: ['img/*', 'vendor/*'],
  test: ['test/testRoutes.js']
};

​gulp.task('build:html', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});
​
gulp.task('build:js', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});
​gulp.task('build:all', ['build:css', 'build:html', 'build:js', 'build:static']);
gulp.task('test:all', ['test:mocha']);
gulp.task('watch:all', ['watch:css', 'watch:html', 'watch:js']);
gulp.task('default', ['build:all', 'watch:all']);
