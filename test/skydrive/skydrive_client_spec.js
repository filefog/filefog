var assert = require('assert');
require("mocha-as-promised")();

var test_oauth_data = require('../utility.js').loadAccessToken('skydrive')

describe('Skydrive Client', function () {
    var FileFog = null
    var Provider = null
    before(function () {
        delete require.cache[require.resolve("../../lib/main.js")]
        FileFog = require("../../lib/main.js")
        FileFog.setConfig({skydrive: {
            client_key: '000000004C10EA03',
            client_secret: 'YfSMQ7El6nN5hotB4zDKtrpishCd1P4M',
            client_scope : "wl.basic wl.emails wl.offline_access wl.skydrive_update"
        }})

        var provider_options = { redirect_url :function (service){
            var service_name = service.toLowerCase();
            if(service_name == "skydrive")
                return "http://www.example.edu/service/callback/skydrive";
            else
                return 'http://localhost:3000/service/callback/' + service_name
        }
        }

        Provider = FileFog.provider("skydrive",provider_options)
    })

    describe('Standard Init Calls', function(){
        //this is not necessarily a test, but needs to be done incase the token has expired.
        it('should successfully refresh oauth_token', function () {
            return Provider.oAuthRefreshAccessToken(test_oauth_data).then(function(new_oauth_data){
                assert(new_oauth_data);
                test_oauth_data = new_oauth_data;
                require('../utility.js').saveAccessToken('skydrive', new_oauth_data);
            })
        })
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

        it('should successfully Create folder in root directory', function () {
            return Client.CreateFile(testFileName, null, new Buffer(testFileContent)).then(function (response) {
                var resp_json = JSON.parse(response.body);
                assert.equal(resp_json.name, testFileName);
                testFileID = resp_json.id
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
                //assert.equal(resp_json.count, 0);
                assert.deepEqual(resp_json.data, []);
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
                assert(resp_json.name);
                assert(resp_json.first_name);
                assert(resp_json.last_name);
                assert(resp_json.emails);
            })
        })

        it('should access quota info', function () {
            assert.throws(function () {
                Client.CheckQuota()
            })

        })
    })

});