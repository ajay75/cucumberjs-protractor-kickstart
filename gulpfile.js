'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');
var reporter = require('gulp-protractor-cucumber-html-report');

var options = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: '../e2e',
  e2e_report_dir: 'e2e/reports/',
  rev: new Date().getTime(),
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
    exclude: [
      'bower_components/jquery'
    ]
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.src('./reports/json/cucumber-test-results.json')
    .pipe(reporter({
      dest: options.e2e + '/reports/html'
    }));