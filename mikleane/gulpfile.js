'run strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('webpack-stream');


var sources = {
  html: __dirname + '/app/layout/*.html',
  js: __dirname + '/app/index.js',
  test: __dirname + '/test/*_spec.js',
  css: __dirname + '/app/style/*.css'
};

var paths = ['*.js', 'test/*.js', 'routes/*.js', 'models/*.js', 'app/beers/*.js', 'app/users/*.js'];

gulp.task('eslint', function() {
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('webpack', function() {
  return gulp.src(__dirname + '/app/index.js')
  .pipe(webpack({
    watch: true,
    module: {
      loaders: [
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

gulp.task('copycss', function () {
  return gulp.src(sources.css)
  .pipe(gulp.dest('./build'))
});

gulp.task('bundle:test', () => {
  return gulp.src(sources.test)
  .pipe(webpack({output: {filename:'test_bundle.js'}}))
  .pipe(gulp.dest('./test'))
});

gulp.task('default', ['eslint', 'webpack', 'bundle:dev', 'copy', 'copycss']);
