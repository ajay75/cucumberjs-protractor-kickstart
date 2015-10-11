'use strict';

var gulp = require('gulp');
var protractor = require('gulp-protractor');
var fs = require('fs-extra');
var mkdirp = require('mkdirp');
var del = require('del');
var browserStack = require('gulp-browserstack');
var reporter = require('gulp-protractor-cucumber-html-report');
var cucumber = require('gulp-cucumber');

module.exports = function (options) {
    function generateProtractorHtmlReport() {
        return gulp.src('e2e/reports/json/cucumber-test-results.json')
            .pipe(reporter({
                dest: 'e2e/reports/html'
            }));
    }


    function cleanProtractorReports(done) {
        if (fs.existsSync(options.e2e_report_dir)) {
            del(options.e2e_report_dir + '**/*', done);
        } else {
            mkdirp(options.e2e_report_dir, done);
        }
    }

    function runProtractor(cb) {
        gulp.src('e2e/features/api.feature')
            .pipe(cucumber({
                'steps': ['e2e/step-definitions/api/*.js', 'node_modules/apickli/apickli-gherkin.js'],
                'format': 'pretty'
            }))
            .on('error', function (err) {
                //Make sure failed tests cause gulp to exit non-zero
                console.log(err);
                cb();
            })
            .on('end', function () {
                cb();
            });
    }


    function runBsProtractor() {
        return gulp
            .src(options.e2e + '/features/*.feature')
            .pipe(browserStack.startTunnel({
                key: 'ZaFK93k2p3yCLpdfXqRV'
            }))
            .pipe(protractor.protractor({
                configFile: 'browserstack.conf.js'
            }))
            .on('error', function (err) {
                throw err;
            })
            .pipe(browserStack.stopTunnel());
    }

    function runJenkinsProtractor(cb) {
        return gulp
            .src(options.e2e + '/features/*.feature')
            .pipe(protractor.protractor({
                configFile: 'jenkins.conf.js'
            }))
            .on('error', function (err) {
                //Make sure failed tests cause gulp to exit non-zero
                console.log(err);
                cb();
            })
            .on('end', function () {
                cb();
            });
    }

    function exitProcess() {
// exit process to kill the connect server
        process.exit(0);
    }

    //webdriver
    gulp.task('webdriver-update', protractor.webdriver_update);
    gulp.task('webdriver-standalone', protractor.webdriver_standalone);

    //reports
    gulp.task('protractor-report', generateProtractorHtmlReport);
    gulp.task('clean-protractor-report', cleanProtractorReports);

    //run e2e tasks
    gulp.task('protractor', ['clean-protractor-report'], runProtractor);
    gulp.task('protractor2', ['clean-protractor-report'], runJenkinsProtractor);
    gulp.task('api', ['protractor'], generateProtractorHtmlReport);
    gulp.task('jenkins', ['protractor2'], generateProtractorHtmlReport);
    gulp.task('e2e:bs', ['protractor:bs'], exitProcess);
    gulp.task('protractor:bs', [], runBsProtractor);
};
