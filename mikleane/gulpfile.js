'run strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('webpack-stream')

var paths = ['*.js', 'test/*.js', 'routes/*.js', 'models/*.js'];

gulp.task('eslint', function() {
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
});

// gulp.task('mocha', function(){
//   return gulp.src('test/*.js')
//     .pipe(mocha({reporter: 'nyan'}));
// });

gulp.task('webpack', function() {
  return gulp.src(__dirname + '/app/index.js')
  .pipe(webpack({
    watch: true,
    module: {
      loaders: [
        {test: /\.css$/, loader: 'style!css'}
      ],
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest(__dirname + '/build'));
});

// gulp.task('watch', function() {
//   gulp.watch('*.js', ['eslint']);
//   gulp.watch('models/*.js', ['eslint']);
//   gulp.watch('test/*.js', ['eslint','mocha']);
// });

gulp.task('default', ['eslint', 'webpack']);
