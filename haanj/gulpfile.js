'use strict';
const gulp    = require('gulp');
const fs      = require('fs');
const lint    = require('gulp-eslint');
const mocha   = require('gulp-mocha');
const webpack = require('gulp-webpack');

var jsPaths = ['*.js', 'test/*js', 'lib/*js', 'app/*js', 'test/*js'];
var tests   = ['test/*js'];
var build   = 'build/';
var entry   = ['app/index.js'];

gulp.task('lint', function() {
  return gulp.src(jsPaths)
    .pipe(lint())
    .pipe(lint.format());
});

gulp.task('webpack', function() {
  try {
    fs.unlinkSync(build + 'bundle.js');
  }
  catch (e) {
    console.log(e);
  }
  return gulp.src(entry)
    .pipe(webpack( require('./webpack.config.js')))
    .pipe(gulp.dest(build));
});

gulp.task('mocha', function() {
  return gulp.src(tests)
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['lint', 'webpack']);

gulp.watch(jsPaths, function(){
  gulp.run('default');
});
