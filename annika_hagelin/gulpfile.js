'use strict';
const gulp = require('gulp');
const lint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');

const fs = require('fs');

const paths = ['*.js', 'test/*.js'];

const sources = {
  test: __dirname + '/test/unit/*.js'
};

gulp.task('default', ['build']);

gulp.task('lint', () => {
  return gulp.src(paths)
    .pipe(lint())
    .pipe(lint.format());
})

gulp.task('test', () => {
  return gulp.src(['test/*.js'], {read: false})
    .pipe(mocha({reporter:'nyan'}));
});

gulp.task('build', () => {
  fs.unlink('./build/bundle.js', (err) => {
    if (err) console.log(err);
    return gulp.src('./src/index.js')
      .pipe(webpack({
        entry: './src/index.js',
        output: {
          filename: 'bundle.js'
        }
    }))
      .pipe(gulp.dest('./build/'));
  });
});

gulp.task('bundle:test', () => {
  return gulp.src(sources.test)
    .pipe(webpack({output: {filename: 'test_bundle.js'}}))
    .pipe(gulp.dest('./test'));
});
