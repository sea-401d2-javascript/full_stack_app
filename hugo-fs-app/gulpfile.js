'use strict';

var gulp = require('gulp');
var lint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var webpack = require('gulp-webpack');

var paths = ['*.js', 'models/*.js', 'routes/*.js', 'test/*.js'];

gulp.task('eslint', () => {
  gulp.src(paths)
  .pipe(lint())
  .pipe(lint.format());
});

gulp.task('test', () => {
  gulp.src(__dirname + '/test/*.js')
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('webpack', () => {
  return gulp.src(__dirname + '/public/js/app.js')
  .pipe(webpack({
    watch: true,
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style!css'}
      ]
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest(__dirname + '/public/'));
})

gulp.task('watch', () => {
  gulp.watch(paths);
});

gulp.task('default', ['eslint', 'test', 'webpack']);
