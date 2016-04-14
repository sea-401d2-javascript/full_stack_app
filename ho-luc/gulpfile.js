'use strict'

var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('ang', function(){
  return gulp.src('./app/app.js')
  .pipe(webpack({
    watch: true,
    module: {
      loaders: [
        {test: /\.css$/, loader: 'style!css'}
      ]
    }
  }))
  .pipe(gulp.dest('./build'))
});

gulp.task('default', ['ang']);
