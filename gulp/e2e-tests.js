'use strict';

var gulp = require('gulp');
var protractor = require('gulp-protractor');
var fs = require('fs-extra');
var mkdirp = require('mkdirp');
var del = require('del');
var reporter = require('protractor-cucumber-report-gulp');
var cucumber = require('gulp-cucumber');
var settings = require('../e2e/e2e-settings.js');
var argv = require('yargs').argv;
var concat = require('gulp-concat');
var replace = require('gulp-replace');

module.exports = function (options) {

	var protractorOptions = {};
	var dirOptions = {};
	var runCustomTag = argv.tag !== undefined && argv.tag.length ? true : false;

	// set config file path based on gulp task
	switch(argv._[0]){
		case 'api':
			protractorOptions.configFile = 'api.conf.js';
			dirOptions = options.e2e + '/features/api/*.feature';
			break;
		case 'ui':
			protractorOptions.configFile = 'ui.conf.js';
			dirOptions = options.e2e + '/features/ui/*.feature';
			break;
		case 'parallel-api':
			protractorOptions.configFile = 'parallel-api.conf.js';
			dirOptions = options.e2e + '/features/api/*.feature';
			break;
		case 'parallel-ui':
			protractorOptions.configFile = 'parallel-ui.conf.js';
			dirOptions = options.e2e + '/features/ui/*.feature';
			break;
		case 'bs':
			protractorOptions.configFile = 'browserstack.conf.js';
			dirOptions = options.e2e + '/features/ui/*.feature';
			break;
	}

	// run custom tests if tag is present
	if(runCustomTag){
		protractorOptions.args = ['--cucumberOpts.tags', argv.tag];
	}

	function concatenateJsonReports() {
		return gulp.src('e2e/reports/ui/json/*.json')
			.pipe(concat('cucumber-test-results.json'))
			.pipe(gulp.dest('e2e/reports/ui/json/'));
	}

	function cleanJsonReport() {
		return gulp.src(['e2e/reports/ui/json/cucumber-test-results.json'])
			.pipe(replace('[]\n', ''))
			.pipe(replace('\n]\n\[', ''))
			.pipe(replace('}\n  {', '},{'))
			.pipe(gulp.dest('e2e/reports/ui/json/'));
	}

	function generateProtractorHtmlReport() {
		return gulp.src('e2e/reports/ui/json/cucumber-test-results.json')
			//.pipe(insert.append('HELLOworld'))
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
			.src(dirOptions)
			.pipe(cucumber({
				require: [
					'e2e/step_definitions/**/*.js',
					'e2e/support/*.js'
				],
				format: 'pretty',
				path: 'report.json',
				tags: '@api'
			}))
			.on('error', function (err) {
				console.log(err);
				cb();
			})
			.on('end', function () {
				//cb();
			});
	}

	function runHeadlessProtractor(cb) {
		return gulp
			.src(dirOptions)
			.pipe(protractor.protractor(protractorOptions))
			.on('error', function (err) {
				//Make sure failed tests cause gulp to exit non-zero
				console.log(err);
				cb();
			})
			.on('end', function () {
				//exitProcess();
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
	gulp.task('concatenate', generateApiHtmlReport);
	gulp.task('clean-json', cleanJsonReport);

	//run e2e tasks
	gulp.task('cucumber', ['clean-protractor-report-api'], runCucumber);
	gulp.task('protractor', ['clean-protractor-report'], runHeadlessProtractor);
	gulp.task('browserstack', ['clean-protractor-report'], runHeadlessProtractor);


	gulp.task('api', ['cucumber'], generateApiHtmlReport);
	gulp.task('ui', ['protractor'], concatenateJsonReports);
	gulp.task('parallel-ui', ['protractor'], concatenateJsonReports);
	gulp.task('parallel-api', ['protractor'], concatenateJsonReports);
	gulp.task('bs', ['protractor'], exitProcess);
};
