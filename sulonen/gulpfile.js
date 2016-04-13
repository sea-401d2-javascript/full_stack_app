'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
// const mocha = require('gulp-mocha');
const exec = require('child_process').exec;
const webpack = require('webpack-stream');

var paths = ['*.js', 'src/*.js', 'test/*.js', 'models/*.js'];

var runCommand = function(command) {
  exec(command, (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
};

gulp.task('lint', () => {
  return gulp.src(paths)
    .pipe(eslint())
    .pipe(eslint.format());
});

// gulp.task('test', () => {
//   return gulp.src(paths)
//   .pipe(mocha());
// });

gulp.task('watch', () => {
  gulp.watch([paths], ['lint']);
});

gulp.task('mongo-start', () => {
  var command = 'mongod --dbpath ./data';
  runCommand(command);
});

gulp.task('mongo-stop', () => {
  var command = 'mongo admin --eval "db.shutdownServer()"';
  runCommand(command);
});

gulp.task('webpack', () => {
  return gulp.src('./entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      watch: true,
      module: {
        loaders: [{
          test: /\.css$/,
          loader: 'style!css'
        }]
      }
    }))
    .pipe(gulp.dest('./dist/'));
});
          
gulp.task('default', ['webpack', 'lint']);

