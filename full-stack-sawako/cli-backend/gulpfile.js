'use strict';
const gulp = require('gulp');
const lint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const paths = ['*.js', 'test/*.js'];
const webpack = require('gulp-webpack');

gulp.task('webpack', function(){
  return gulp.src(__dirname + '/app/index.js')
  .pipe(webpack({
    watch: true,
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {test:  /\.css$/, loader: 'style!css'},
      ],
    },
  }))
  .pipe(gulp.dest('build/'));
})

gulp.task('lint', function(){
  return gulp.src(paths)
  .pipe(lint())
  .pipe(lint.format());
});

gulp.task('test', function(){
  return gulp.src( __dirname + '/test/test.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watcher', function(){
  gulp.watch( __dirname + '/**/*.js', ['lint', 'test', 'webpack']);
});
