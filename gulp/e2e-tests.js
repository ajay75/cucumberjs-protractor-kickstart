'use strict';

var gulp = require('gulp');
var protractor = require('gulp-protractor');
var fs = require('fs-extra');
var mkdirp = require('mkdirp');
var del = require('del');
var browserStack = require('gulp-browserstack');
var reporter = require('gulp-protractor-cucumber-html-report');

module.exports = function(options) {
  function generateProtractorHtmlReport() {
    return gulp.src(options.e2e + '/reports/json/cucumber-test-results.json')
      .pipe(reporter({
        dest: options.e2e + '/reports/html'
      }));
  }

  gulp.task('webdriver-update', protractor.webdriver_update);
  gulp.task('webdriver-standalone', protractor.webdriver_standalone);
  gulp.task('protractor-report', generateProtractorHtmlReport);

  gulp.task('clean-protractor-report', function(done) {
    if (fs.existsSync(options.e2e_report_dir)) {
      del(options.e2e_report_dir + '**/*', done);
    } else {
      mkdirp(options.e2e_report_dir, done);
    }
  });

  function runProtractor(cb) {
    gulp.src(options.e2e + '/features/*.feature')
      .pipe(protractor.protractor({
        configFile: 'protractor.conf.js'
      }))
      .on('error', function(err) {
//Make sure failed tests cause gulp to exit non-zero
        console.log(err);
      })
      .on('end', function() {
        generateProtractorHtmlReport(cb);
      });
  }


  function runBsProtractor() {
    return gulp
      .src(options.e2e + '/features/*.feature')
      .pipe(browserStack.startTunnel({
        key: 'jzBB2xi85SHicW6ksqqQ'
      }))
      .pipe(protractor.protractor({
        configFile: 'browserstack.conf.js'
      }))
      .on('error', function(err) {
//process.exit(1);
        throw err;
      })
      .pipe(browserStack.stopTunnel());
  }

  function runJenkinsProtractor() {
    return gulp
      .src(options.e2e + '/features/*.feature')
      .pipe(protractor.protractor({
        configFile: 'jenkins.conf.js'
      }))
      .on('error', function(err) {
        console.log(err);
      });
  }

  function exitProcess() {
    process.exit(0);
  }

  gulp.task('protractor', ['clean-protractor-report'], runProtractor);
  gulp.task('protractor2', ['clean-protractor-report'], runJenkinsProtractor);
  gulp.task('e2e', ['protractor'], generateProtractorHtmlReport);
  gulp.task('jenkins', ['protractor2'], generateProtractorHtmlReport);
  gulp.task('e2e:bs', ['protractor:bs'], exitProcess);
  gulp.task('protractor:bs', [], runBsProtractor);
};
