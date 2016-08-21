'use strict';

var gulp = require('gulp');
var protractor = require('gulp-protractor');
var fs = require('fs-extra');
var mkdirp = require('mkdirp');
var del = require('del');
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
var reporter = require('gulp-protractor-cucumber-html-report');
var cucumber = require('gulp-cucumber');
var settings = require('../e2e/e2e-settings.js');
var argv = require('yargs').argv;

module.exports = function (options) {

	var protractorOptions = {};
	var runCustomTag = argv.tag !== undefined && argv.tag.length ? true : false;

	// set config file path based on gulp task
	switch(argv._[0]){
		case 'api':
			protractorOptions.configFile = 'setup.conf.js';
			break;
		case 'ui':
			protractorOptions.configFile = 'ui.conf.js';
			break;
		case 'headless':
			protractorOptions.configFile = 'headless.conf.js';
			break;
		case 'parallel':
			protractorOptions.configFile = 'parallel.conf.js';
			break;
		case 'setup':
			protractorOptions.configFile = 'setup.conf.js';
			break;
		case 'bs':
			protractorOptions.configFile = 'browserstack.conf.js';
			break;
	}

	// run custom tests if tag is present
	if(runCustomTag){
		protractorOptions.args = ['--cucumberOpts.tags', argv.tag];
	}

	function generateProtractorHtmlReport() {
		return gulp.src('e2e/reports/ui/json/cucumber-test-results.json')
			.pipe(reporter({
				dest: 'e2e/reports/ui/html'
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
			del(options.e2e_report_dir + 'ui/**/*', done);
		} else {
			mkdirp(options.e2e_report_dir, done);
		}
	}

	function cleanProtractorApiReports(done) {
		if (fs.existsSync(options.e2e_report_dir)) {
			del(options.e2e_report_dir + 'api/**/*', done);
		} else {
			mkdirp(options.e2e_report_dir, done);
		}
	}

	function runCucumber(cb) {
		return gulp
			.src(options.e2e + '/features/api/**/*.feature')
			.pipe(cucumber({
				'steps': ['e2e/step-definitions/api/*.js', 'e2e/lib/*.js'],
				'format': 'pretty',
				'path': 'report.json',
				'tags': '@api'
			}))
			.on('error', function (err) {
				console.log(err);
				cb();
			})
			.on('end', function () {
				//cb();
			});
	}


	function runUIProtractor(cb) {
		return gulp
			.src(options.e2e + '/features/**/**/*.feature')
			.pipe(protractor.protractor(protractorOptions))
			.on('error', function (err) {
				//Make sure failed tests cause gulp to exit non-zero
				console.log(err);
				cb();
			})
			.on('end', function () {
				// cb();
			});
	}

	function runHeadlessProtractor(cb) {
		return gulp
			.src(options.e2e + '/features/**/**/*.feature')
			.pipe(protractor.protractor(protractorOptions))
			.on('error', function (err) {
				//Make sure failed tests cause gulp to exit non-zero
				console.log(err);
				cb();
			})
			.on('end', function () {
				// cb();
			});
	}

	// exit process to kill the connect server
	function exitProcess() {
		process.exit(0);
	}

	//webdriver
	gulp.task('webdriver-update', protractor.webdriver_update);
	gulp.task('webdriver-standalone', protractor.webdriver_standalone);

	//reports
	gulp.task('protractor-report', generateProtractorHtmlReport);
	gulp.task('clean-protractor-report', cleanProtractorReports);
	gulp.task('clean-protractor-report-api', cleanProtractorApiReports);
	gulp.task('parallel-api-report', generateApiHtmlReport);

	//run e2e tasks
	gulp.task('cucumber', ['clean-protractor-report-api'], runCucumber);
	gulp.task('protractor', ['clean-protractor-report'], runHeadlessProtractor);
	gulp.task('protractor2', ['clean-protractor-report'], runUIProtractor);
	gulp.task('browserstack', ['clean-protractor-report'], runHeadlessProtractor);

	gulp.task('api', ['cucumber'], generateApiHtmlReport);
	gulp.task('ui', ['protractor2'], generateProtractorHtmlReport);
	gulp.task('headless', ['protractor'], generateProtractorHtmlReport);
	gulp.task('parallel', ['protractor'], generateProtractorHtmlReport);

	gulp.task('parallel:report', ['parallel-api-report']);
	gulp.task('webdriver_standalone', webdriver_standalone);
	gulp.task('bs', ['browserstack'], exitProcess);
};
