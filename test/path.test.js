var path = require('../lib/path'),
    fs = require('fs'),
    assert = require('assert');

describe('path', function () {
    describe('+ tempDir()', function () {
        it('should return a temporary directory', function () {
            var tmpDir = path.tempDir(),
                testFile = 'TEST-path-ext-#{Date.now()}',
                testString = 'SOME STRING',
                retString;

            assert(tmpDir);

            testFile = path.join(tmpDir, testFile);

            fs.writeFileSync(testFile, testString);
            retString = fs.readFileSync(testFile).toString();

            assert(retString === testString);
        });
    });

    describe('+ homeDir()', function () {
        it('should return the users home directory', function () {
            var homeDir = path.homeDir();
            assert(homeDir);
        });
    });
});
 
    

      