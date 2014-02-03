var assert = require('assert');
require("mocha-as-promised")();

var test_oauth_data = { access_token: 'ya29.1.AADtN_W5vWUjYklaE_ZNkJBd2y9Ot60jF4SewLivnLgLHDYhmiadzbPPZntHmL4nceXs0w',
    token_type: 'Bearer',
    expires_in: 3600,
    refresh_token: '1/IMcWJR9KJPVguuKLUrHzMjRl-XECLf6mK2YoUYnbQaU' }

describe('Google Client', function () {
    var FileFog = null
    var Provider = null
    before(function () {
        delete require.cache[require.resolve("../../lib/main.js")]
        FileFog = require("../../lib/main.js")
        FileFog.setConfig({google: {
            client_key: '777041726477-a5o1tp6f3i9m1me3tj5vhpnrn1jge43c.apps.googleusercontent.com',
            client_secret: 'mWURYHmMKZxr6aeR7DTjRu-q'
        }})
        Provider = FileFog.provider("google")
        return Provider.oAuthRefreshAccessToken(test_oauth_data).then(function(oauth_data){
            test_oauth_data = oauth_data
        });

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
                assert.notEqual(response.mimeType, 'application/vnd.google-apps.folder');
                assert.equal(response.title, testFileName);
                testFileID = response.id;
            })
        })

        it('should successfully Read file metadata', function () {
            return Client.GetFileInformation(testFileID).then(function (response) {
                assert.notEqual(response.mimeType, 'application/vnd.google-apps.folder');
                assert.equal(response.title, testFileName);
            })
        })

        it('should successfully Read file contents', function () {
            return Client.DownloadFile(testFileID).then(function (response) {
                //TODO: this seems to break due to a bug in node edge, check if errors occur in updated edge version.
                assert.equal(response.body.toString(), testFileContent);
            })
        })

        it('should successfully Delete file', function () {
            return Client.DeleteFile(testFileID).then(function (response) {
                assert.equal(response.title, testFileName);
                assert(response.explicitlyTrashed);
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
                console.log(response)
                assert.equal(response.mimeType, 'application/vnd.google-apps.folder');
                assert.equal(response.title, testFolderName);
                testFolderID = response.id;
            })
        })

        it('should successfully Read folder metadata', function () {
            return Client.GetFolderInformation(testFolderID).then(function (response) {
                assert.equal(response.mimeType, 'application/vnd.google-apps.folder');
                assert.equal(response.title, testFolderName);
            })
        })

        it('should successfully Read folder contents', function () {
            return Client.RetrieveFolderItems(testFolderID).then(function (response) {
                assert.equal(response.kind, 'drive#childList');
                assert.deepEqual(response.items, [])
            });
        })

        it('should successfully Delete folder', function () {
            return Client.DeleteFolder(testFolderID).then(function (response) {
                assert.equal(response.title, testFolderName);
                assert(response.explicitlyTrashed);
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
                console.log(response)
                assert(response.name);
                assert(response.email);
            })
        })

        it('should access quota info', function () {
            return Client.CheckQuota().then(function (response) {
                assert(response.quotaBytesTotal);
                assert(response.quotaBytesUsed);
            })
        })
    })

});