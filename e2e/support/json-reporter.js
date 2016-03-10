var Cucumber = require('cucumber');
var JsonFormatter = Cucumber.Listener.JsonFormatter();
var fs = require('fs-extra');
var path = require('path');
var reportDir = '../reports/json/';
var reportFile = reportDir + 'cucumber-test-results.json';

module.exports = function JsonOutputHook() {
    JsonFormatter.log = function (json) {
        fs.open(path.join(__dirname, reportFile), 'w+', function (err, fd) {
            if (err) {
                fs.mkdirsSync(path.join(__dirname, reportDir));
                fd = fs.openSync(path.join(__dirname, reportFile), 'w+');
            }
            fs.write(fd, json, function () {
                console.log('JSON report written to: \'' + path.join(__dirname, reportFile) +
                    '\'');
            });
        });
    };

    this.registerListener(JsonFormatter);
}
