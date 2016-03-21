'use strict';

var gulp = require('gulp');
var protractor = require('gulp-protractor');
var fs = require('fs-extra');
var mkdirp = require('mkdirp');
var del = require('del');
//var browserStack = require('gulp-browserstack');
var reporter = require('gulp-protractor-cucumber-html-report');
var cucumber = require('gulp-cucumber');

module.exports = function (options) {
    function generateProtractorHtmlReport() {
        return gulp.src('e2e/reports/json/cucumber-test-results.json')
            .pipe(reporter({
                dest: 'e2e/reports/html'
            }));
    }

    function generateApiHtmlReport() {
        return gulp.src('report.json')
            .pipe(reporter({
                dest: 'e2e/reports/api/html'
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
        gulp.src(options.e2e + '/features/api/**/*.feature')
            .pipe(cucumber({
                'steps': ['e2e/step-definitions/api/*.js'],
                'format': 'pretty',
                'path': 'e2e/reports/api/json/report_singlerun.json',
                'tags': '@api'
            }))
            .on('error', function (err) {
                //Make sure failed tests cause gulp to exit non-zero
                console.log(err);
                cb();
            })
            .on('end', function () {
                //cb();
            });
    }

    //function runBsProtractor() {
    //    return gulp
    //        .src(options.e2e + '/features/ui/*.feature')
    //        .pipe(browserStack.startTunnel({
    //            key: 'ZaFK93k2p3yCLpdfXqRV'
    //        }))
    //        .pipe(protractor.protractor({
    //            configFile: 'browserstack.conf.js'
    //        }))
    //        .on('error', function (err) {
    //            throw err;
    //        })
    //        .pipe(browserStack.stopTunnel());
    //}

    function runUIProtractor(cb) {
        return gulp
            .src(options.e2e + '/features/ui/*.feature')
            .pipe(protractor.protractor({
                configFile: 'ui.conf.js'
            }))
            .on('error', function (err) {
                //Make sure failed tests cause gulp to exit non-zero
                //console.log(err);
                cb();
            })
            .on('end', function () {
                //exitProcess();
            });
    }

    function runParallel(cb) {
        return gulp
            .src(options.e2e + '/features/ui/uiUserJourney.feature')
            .pipe(protractor.protractor({
                configFile: 'parallel.conf.js'
            }))
            .on('error', function (err) {
                //Make sure failed tests cause gulp to exit non-zero
                console.log(err);
                cb();
            })
            .on('end', function () {
//                exitProcess()
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
    gulp.task('parallel-api-report', generateApiHtmlReport);

    //run e2e tasks
    gulp.task('protractor', ['clean-protractor-report'], runProtractor);
    gulp.task('protractor2', ['clean-protractor-report'], runUIProtractor);
    gulp.task('protractor3', ['clean-protractor-report'], runParallel);
    //gulp.task('protractor:bs', ['clean-protractor-report'], runBsProtractor);
    gulp.task('api', ['protractor'], generateApiHtmlReport);
    gulp.task('ui', ['protractor2'], generateProtractorHtmlReport);
    gulp.task('parallel:report', ['parallel-api-report']);
    gulp.task('parallel', ['protractor3'], generateProtractorHtmlReport);
    //gulp.task('e2e:bs', ['protractor:bs'], exitProcess);

};
