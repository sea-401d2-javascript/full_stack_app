'run strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('webpack-stream');
require('css-loader');

var sources = {
  html: __dirname + '/build/index.html',
  js: __dirname + '/js/index.js',
  test: __dirname + '/test/*_spec.js'
};

var paths = ['*.js', 'test/*.js', 'routes/*.js', 'models/*.js', 'js/beers/*.js', 'js/users/*.js'];

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
  return gulp.src(__dirname + '/js/index.js')
  .pipe(webpack({
    watch: true,
    module: {
      loaders: [
        // {test: /\.css$/, loader: 'style!css'}
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.png$/, loader: "url-loader?limit=100000" },
        { test: /\.jpg$/, loader: "file-loader" }
      ],
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest(__dirname + '/build'));
});

gulp.task('bundle:dev', function () {
  return gulp.src(sources.js)
  .pipe(webpack({output: {filename: 'bundle.js'}}))
  .pipe(gulp.dest('./build'))
});

gulp.task('copy', function () {
  return gulp.src(sources.html)
  .pipe(gulp.dest('./build'))
});

gulp.task('bundle:test', () => {
  return gulp.src(sources.test)
  .pipe(webpack({output: {filename:'test_bundle.js'}}))
  .pipe(gulp.dest('./test'))
});
// gulp.task('watch', function() {
//   gulp.watch('*.js', ['eslint']);
//   gulp.watch('models/*.js', ['eslint']);
//   gulp.watch('test/*.js', ['eslint','mocha']);
// });

gulp.task('default', ['eslint', 'webpack', 'bundle:dev', 'copy']);
