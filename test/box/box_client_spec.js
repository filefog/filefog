var assert = require('assert');
require("mocha-as-promised")();

var test_oauth_data = { access_token: '7sXD7LEI73V23mMyXJoUGZGZ3YrgE55N',
    refresh_token: 'wEFBv9ibkspDMWkHZlAaiKt1V7GKfzxDvVMr4qJih89HrCzn9bObe3zNqsO6ISge',
    raw: { access_token: '7sXD7LEI73V23mMyXJoUGZGZ3YrgE55N',
        expires_in: 3863,
        restricted_to: [],
        token_type: 'bearer' } };

describe('Box Client', function () {
    var FileFog = null
    var Provider = null
    before(function () {
        delete require.cache[require.resolve("../../lib/main.js")]
        FileFog = require("../../lib/main.js")
        FileFog.setConfig({box: {
            client_key: 'cch3sssk23ueqsbdh2k2zlv2i7rz06lp',
            client_secret: '6v7ywbCdut5FRdIjDeREofrFGc2ymGmA'
        }})
        Provider = FileFog.provider("box")
    })

    describe('File Methods', function () {
        var Client = null;
        var testFileName = null;
        var testFileID = null;
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
                var resp_json = JSON.parse(response.body);
                assert.equal(resp_json.entries[0].type, "file");
                assert.equal(resp_json.entries[0].name, testFileName);
                testFileID = resp_json.entries[0].id;
            })
        })

        it('should successfully Read file metadata', function () {
            return Client.GetFileInformation(testFileID).then(function (response) {
                var resp_json = JSON.parse(response.body);
                assert.equal(resp_json.type, "file");
                assert.equal(resp_json.name, testFileName);
            })
        })

        it('should successfully Read file contents', function () {
            return Client.DownloadFile(testFileID).then(function (response) {
                assert.equal(response.body.toString(), testFileContent);
            })
        })

        it('should successfully Delete file', function () {
            return Client.DeleteFile(testFileID).then(function (response) {
                assert.equal(response.body, '');
                //TODO: check the header for 204 response
            })
        })
    })

    describe('Folder Methods', function () {
        var Client = null;
        var testFolderName = null;
        var testFolderID = null;
        before(function (done) {
            testFolderName = require('../utility').guid() + '_test'
            Provider.CreateClient(test_oauth_data).then(function (client) {
                Client = client;
                done();
            })
        })

        it('should successfully Create folder in root directory', function () {
            return Client.CreateFolder(testFolderName).then(function (response) {
                var resp_json = JSON.parse(response.body);
                assert.equal(resp_json.type, "folder");
                assert.equal(resp_json.name, testFolderName);
                testFolderID = resp_json.id;
            })
        })

        it('should successfully Read folder metadata', function () {
            return Client.GetFolderInformation(testFolderID).then(function (response) {
                var resp_json = JSON.parse(response.body);
                assert.equal(resp_json.type, "folder");
                assert.equal(resp_json.name, testFolderName);
            })
        })

        it('should successfully Read folder contents', function () {
            return Client.RetrieveFolderItems(testFolderID).then(function (response) {
                var resp_json = JSON.parse(response.body);
                assert.equal(resp_json.total_count, 0);
                assert.deepEqual(resp_json.entries, []);
            })
        })

        it('should successfully Delete folder', function () {
            return Client.DeleteFolder(testFolderID).then(function (response) {
                assert.equal(response.body, '');
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
                var resp_json = JSON.parse(response.body);
                assert.equal(resp_json.type, "user");
                assert(resp_json.name);
                assert(resp_json.login);
            })
        })

        it('should access quota info', function () {
            assert.throws(function () {
                Client.CheckQuota()
            })

        })
    })

});