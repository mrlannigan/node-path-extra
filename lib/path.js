'use strict';

var os = require('os'),
    path = require('path');

function ExtendedPath () {
    var osType = os.type().toLowerCase(),
        osClass;

    // decide which OS
    if (osType.indexOf('lin') === 0) {
        osClass = Linux;
    } else if (osType.indexOf('darwin') === 0) {
        osClass = Darwin;
    } else if (osType.indexOf('win') === 0) {
        osClass = Windows;
    } else if (osType.indexOf('sunos') === 0) {
        osClass = SunOS;
    } else {
        throw new Error('Unsupported OS: ' + osType);
    }

    // enumerate the existing `path` core module
    Object.keys(path).forEach(function (key) {
        this[key] = path[key];
    }.bind(this));

    // apply selected os
    osClass.call(this);

    // maintain old api (I changed it to follow the camal casing the path module follows)
    ['tempDir', 'homeDir', 'dataDir'].forEach(function (functionName) {
        this[functionName.toLowerCase()] = this[functionName];
    }.bind(this));
}

function Darwin () {
    this.tempDir = function () {
        return '/tmp';
    };

    this.homeDir = function () {
        return process.env['HOME'];
    };

    this.dataDir = function (appname) {
        return this.homeDir() + '/Library/Application Support/' + appname;
    };
}

function Linux () {
    this.tempDir = function () {
        return '/tmp';
    };

    this.homeDir = function () {
        return process.env['HOME'];
    };

    this.dataDir = function (appname) {
        return this.homeDir() + '/.config/' + appname;
    };
}

function SunOS () {
    this.tempDir = function () {
        return '/tmp';
    };

    this.homeDir = function () {
        return process.env['HOME'];
    };

    this.dataDir = function (appname) {
        return this.homeDir() + '/.config/' + appname;
    };
}

function Windows () {
    this.tempDir = function () {
        return process.env['TEMP'];
    };

    this.homeDir = function () {
        return process.env['USERPROFILE'];
    };

    this.dataDir = function (appname) {
        var appData = process.env['LOCALAPPDATA'] || process.env['APPDATA'];
        return appData + '\\' + appname;
    };
}

module.exports = new ExtendedPath();