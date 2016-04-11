'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var webpack = require('gulp-webpack');
var paths = ['*.js', 'test/*.js', 'routes/*.js', 'models/*.js','build/*', 'controllers/*', '*.html','css/*'];

gulp.task('default', ['watch']);

gulp.task('watch', function() {
  gulp.watch(paths,['webpack', 'build', 'buildcss']);
});

gulp.task('lint', function(){
  return gulp.src(paths)
  .pipe(eslint({
    rules: {
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
    env: {
      'es6': true,
      'node': true,
      'browser': true
    },
    globals: {
      'describe': false,
      'it': false,
      'beforeEach': false,
      'afterEach': false,
      'before': false,
      'after': false
    },
    ecmaFeatures: {
      'modules': true,
      'experimentalObjectRestSpread': true
    },
    'extends': 'eslint:recommended'
  }))
  .pipe(eslint.format());
});

gulp.task('mocha', function() {
  return gulp.src('test/', {read: false})
  .pipe(mocha({reporter: 'progress'}));
});

gulp.task('build', function() {
  return gulp.src(['./index.html'])
  .pipe(gulp.dest('./build/'))
});

gulp.task('buildcss', function(){
  return gulp.src(['css/*'])
  .pipe(gulp.dest('./build/css'))
})

gulp.task('webpack', function() {
  return gulp.src('./entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build/'))
});
