var path = require('../lib/path'),
    fs = require('fs-extra'),
    assert = require('assert');

describe('path', function () {
    describe('+ tempdir()', function () {
        it('should return a temporary directory', function () {
            var tmpDir = path.tempdir(),
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

    describe('+ homedir()', function () {
        it('should return the users home directory', function () {
            var homeDir = path.homedir();
            assert(homeDir);
        });
    });
});
 
    

      