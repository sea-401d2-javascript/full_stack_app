'use strict';
const gulp = require('gulp');
const lint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('gulp-webpack');

const fs = require('fs');

const paths = ['*.js', 'test/*.js'];

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
          filename: 'bundle.js',
        }
    }))
      .pipe(gulp.dest('./build/'));
  });
});

//http://stackoverflow.com/questions/8496212/node-js-fs-unlink-function-causes-eperm-error
function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file) {
        var curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
          } else { // delete file
              fs.unlinkSync(curPath);
          }
      });
      fs.rmdirSync(path);
    }
};
