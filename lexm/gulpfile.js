'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
// var webpack = require('gulp-webpack');
var webpack = require('webpack-stream');

var eslintRules = {
  'rules': {
    'no-console': 0,
    'indent': [
      2,
      2
    ],
    'quotes': [
      2,
      'single'
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    'semi': [
      2,
      'always'
    ]
  },
  'env': {
    'es6': true,
    'node': true,
    'browser': true
  },
  'globals': {
    'describe': false,
    'it': false,
    'beforeEach': false,
    'afterEach': false,
    'before': false,
    'after': false
  },
  'ecmaFeatures': {
    'modules': true,
    'experimentalObjectRestSpread': true
  },
  'extends': 'eslint:recommended'
};

var path = ['*.js', 'test/*.js'];

gulp.task('lint', function(){
  return gulp.src(path)
    .pipe(eslint(eslintRules))
    .pipe(eslint.format());
});

var testPath = ['test/*.js'];

gulp.task('mocha', function(){
  return gulp.src(testPath, {read: false})
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('webpack', function() {
  return gulp.src('./app/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./public/'))
})

var wpPath = ['*.js', 'app/*.js'];

gulp.task('wp-watch',function() {
  gulp.watch(wpPath, ['webpack']);
})

gulp.task('watch', function(){
  gulp.watch(path, ['lint', 'mocha']);
});

gulp.task('default', ['lint', 'mocha']);

gulp.task('all', ['lint', 'mocha', 'watch']);
