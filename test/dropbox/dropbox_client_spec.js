var assert = require('assert');
require("mocha-as-promised")();

var test_oauth_data = {access_token: "TK2Xp3yDi3YAAAAAAAAAAeegaucYDM_R1-MkfWAKU1h_uFVp6-bsldcEYhDWvWrK"};

describe('Dropbox Client', function () {
    var FileFog = null
    var Provider = null
    before(function () {
        delete require.cache[require.resolve("../../lib/main.js")]
        FileFog = require("../../lib/main.js")
        FileFog.setConfig({dropbox: {
            client_key: 'sl47p7pijvtp73h',
            client_secret: 'j6vluc5yq7dxnj6'
        }})
        Provider = FileFog.provider("dropbox")
    })

    describe('File Methods', function () {
        var Client = null;
        var testFileName = null;
        var testFileContent = "this is test content";
        before(function (done) {
            testFileName = require('../utility').guid() + '_test.txt'
            Provider.CreateClient(test_oauth_data).then(function (client) {
                Client = client;
                done();
            })
        })

        it('should successfully Create file in root directory', function () {
            return Client.CreateFile(testFileName, null, new Buffer(testFileContent)).then(function (response) {
                assert(response.isFile);
                assert.equal(response.path, '/' + testFileName);
            })
        })

        it('should successfully Read file metadata', function () {
            return Client.GetFileInformation('/' + testFileName).then(function (response) {
                assert(response.isFile);
                assert.equal(response.path, '/' + testFileName);
            })
        })

        it('should successfully Read file contents', function () {
            return Client.DownloadFile('/' + testFileName).then(function (response) {
                assert.equal(response.toString(), testFileContent);
            })
        })

        it('should successfully Delete file', function () {
            return Client.DeleteFile('/' + testFileName).then(function (response) {
                assert.equal(response.path, '/' + testFileName);
                assert(response.isRemoved);
            })
        })
    })

    describe('Folder Methods', function () {
        var Client = null;
        var testFolderName = null;
        before(function (done) {
            testFolderName = require('../utility').guid() + '_test'
            Provider.CreateClient(test_oauth_data).then(function (client) {
                Client = client;
                done();
            })
        })

        it('should successfully Create folder in root directory', function () {
            return Client.CreateFolder(testFolderName).then(function (response) {
                assert(response.isFolder);
                assert.equal(response.path, '/' + testFolderName);
            })
        })

        it('should successfully Read folder metadata', function () {
            return Client.GetFolderInformation('/' + testFolderName).then(function (response) {
                assert(response.isFolder);
                assert.equal(response.path, '/' + testFolderName);
            })
        })

        it('should successfully Read folder contents', function () {
            return Client.RetrieveFolderItems('/' + testFolderName).then(function (response) {
                assert.deepEqual(response.content_array, []);
                assert.deepEqual(response.content_stat_array, []);
            })
        })

        it('should successfully Delete folder', function () {
            return Client.DeleteFolder('/' + testFolderName).then(function (response) {
                assert.equal(response.path, '/' + testFolderName);
                assert(response.isRemoved);
            })
        })
    })

    describe('Account Methods', function () {
        var Client = null;
        before(function (done) {
            Provider.CreateClient(test_oauth_data).then(function (client) {
                Client = client;
                done();
            })
        })

        it('should access account info', function () {
            return Client.AccountInfo().then(function (response) {
                assert(response.name);
                assert(response.email);
            })
        })

        it('should access quota info', function () {
            return Client.CheckQuota().then(function (response) {
                assert(response.privateBytes);
                assert(response.quota);
            })
        })
    })

});