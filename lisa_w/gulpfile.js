var gulp = require('gulp');
// var clean = require('gulp-clean');
var webpack = require('webpack-stream');

​
var paths = {
  html: ['build/index.html'],
  js: ['app/*.js']
};
​
gulp.task('build:html', function() {
  gulp.src('build/index.html')
  .pipe(gulp.dest('build/'));
});
​
gulp.task('build:js', function() {
  return gulp.src('app/index.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});
​


gulp.task('watch:html', function() {
	gulp.watch(paths.html, ['build:html']);
});
​
gulp.task('watch:js', function() {
	gulp.watch(paths.js, ['build:js']);
});
​
gulp.task('watch:static', function() {
  gulp.watch(paths.static, ['build:static'])
});
​
gulp.task('build:all', ['build:css', 'build:html', 'build:js', 'build:static']);
gulp.task('test:all', ['test:mocha']);
gulp.task('watch:all', ['watch:css', 'watch:html', 'watch:js']);
gulp.task('default', ['build:all', 'watch:all']);
