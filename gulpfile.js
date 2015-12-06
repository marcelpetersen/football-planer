var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.production.config.js");
var del = require('del');

gulp.task('clean', function () {
  return del([
    'www/**/*.*'
  ]);
***REMOVED***);
gulp.task('copy', ['clean'], function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(['**/*.html', '**/*.json'], { base: './app' ***REMOVED***)
  .pipe(gulp.dest('www'));
***REMOVED***);

gulp.task("build",  ['copy']);