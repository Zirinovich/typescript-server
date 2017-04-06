var fs = require('fs');
var glob = require('glob');
var path = require('path');

function getFullPath(applicationName) {
    return path.resolve(getPath(applicationName));
}

function getPath(applicationName) {
    return glob.sync('./src/client/**/clientApplication.ts').filter(function (file) {
        return (new RegExp("[\\/]" + applicationName + "[\\/]", "i")).test(file);
    })[0];
}

module.exports = {
    getFullPath,
    getPath
};
