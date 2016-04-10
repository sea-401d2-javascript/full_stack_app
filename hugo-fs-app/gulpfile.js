'use strict';

var gulp = require('gulp');
var lint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var webpack = require('gulp-webpack');
var del = require('del');

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

gulp.task('del-build', () => {
  return del([
    //content goes here
    __dirname + '/public/build/**', __dirname + '!/public/build'
  ])
  .then(paths => console.log('Deleted files and folders:\n', paths.join('\n')))
})

gulp.task('copy-html', () => {
  gulp.src(__dirname + '/public/index.html')
  .pipe(gulp.dest(__dirname + '/public/build'));
})

gulp.task('copy-css', () => {
  gulp.src(__dirname + '/public/css/main.css')
  .pipe(gulp.dest(__dirname + '/public/build'))
})

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
  .pipe(gulp.dest(__dirname + '/public/build'));
})

gulp.task('watch', () => {
  gulp.watch(paths);
});

gulp.task('default', ['eslint', 'del-build', 'webpack', 'copy-html', 'copy-css']);
