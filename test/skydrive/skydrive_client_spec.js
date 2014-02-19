var assert = require('assert');
require("mocha-as-promised")();

var test_oauth_data = {
    access_token: 'EwA4Aq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAeGB1ar2aeapMBwSWuE6hZdNrcGxW51d8dZwA+KYfeilMnvuWIH/5oYlzpG0347HD2VZVXtYUCnbT52vfeiMlRPDp44K34E93AI2JtYk8Bc05Py47bMeKHx8XUPjA6tJTbGuSGLAOf8yHAXfr0Imse85rXijOgcRMROkOSQ7sqW19u8L6Og6wLeaVJjoyeTHb8bePbtgTNLqJ0YtvikMf52P8Nk7PxkaLOmMKPa1yc083Ku0KaX66ZroY4foRc3+/Q23OWtwnG7XQeo78b1V+o89qA8MKup8rw+C3zcgYVeKCn6tKsV5+W2t+eD6E6cODu5XsDGj8b1v2//b93ite4gDZgAACFNT86xZRwpFCAGPBbd+5Z4uixXNb0HuJOp4ieCFkZqz5VHXGYHfFfLXCixwpZ5kOMpEf9UdRQQECMMPv70LEc4VSosYA7dqyxW72RZaZ3CaOwnZDhFlhKVwhiIIfWrFgPlZpGeOxJKqdcjYIvA1fEe51vrxiGxGoKBhquOKaaKasBULgL/xnoHkbU3NhOANNGl/jJj68FU+pXEd+GHxXFPgn2aHPDyAUpdMLgI6JhtHJay0dOrRFoyKSrOa39QZWXWklHqfrvyDHwisW2nn2t5Tze8oNG7N+OtSAXrhdeJPoR3pH+I5F95PaREswwhmqqAX634dPJqx9twHEAfbutozQ+fld/5atd/IoB3XvgSpDboAAA==',
    refresh_token: 'Cgm0sEXvHAtDjLaTe5IxBjGu5q*OxT0oQv3rT6eprZV6R5P!LB4MywusKMoQpIgo97mDoVkwXVNjKw!jGja7!EnrXL5cGlfOzoMUsXGhfKi7GsEVEFmhqfgaR*!8VG481xadja6YS3B8tkbcYEHIX7Z!2Yd!7clsjQ1UndZ7WL46mv5vAudiyB4TZf72kaHFc*HmX5zRLYZX4RhXwsTkmJaOep34ks!GnmUqLOwwKlDgw0acCHNclpPjLM2ONED1jcgKyzApQBhEJSiXugvSMBPYj9pSrSAEKhJG0c!DI7UQp5Xk0vvE!T0SIrHJYlqyJHfUnTYWmuhR5WqoLel9ubhzgZaK3!KMcT*dIwxCfLRPLJDbvB77eXSutfIb2N7Vm7YkOQj5BWVYUgF7LzC076A$',
    raw:
    { token_type: 'bearer',
        expires_in: 3600,
        scope: 'wl.basic wl.emails wl.offline_access wl.skydrive_update',
        access_token: 'EwA4Aq1DBAAUGCCXc8wU/zFu9QnLdZXy+YnElFkAAeGB1ar2aeapMBwSWuE6hZdNrcGxW51d8dZwA+KYfeilMnvuWIH/5oYlzpG0347HD2VZVXtYUCnbT52vfeiMlRPDp44K34E93AI2JtYk8Bc05Py47bMeKHx8XUPjA6tJTbGuSGLAOf8yHAXfr0Imse85rXijOgcRMROkOSQ7sqW19u8L6Og6wLeaVJjoyeTHb8bePbtgTNLqJ0YtvikMf52P8Nk7PxkaLOmMKPa1yc083Ku0KaX66ZroY4foRc3+/Q23OWtwnG7XQeo78b1V+o89qA8MKup8rw+C3zcgYVeKCn6tKsV5+W2t+eD6E6cODu5XsDGj8b1v2//b93ite4gDZgAACFNT86xZRwpFCAGPBbd+5Z4uixXNb0HuJOp4ieCFkZqz5VHXGYHfFfLXCixwpZ5kOMpEf9UdRQQECMMPv70LEc4VSosYA7dqyxW72RZaZ3CaOwnZDhFlhKVwhiIIfWrFgPlZpGeOxJKqdcjYIvA1fEe51vrxiGxGoKBhquOKaaKasBULgL/xnoHkbU3NhOANNGl/jJj68FU+pXEd+GHxXFPgn2aHPDyAUpdMLgI6JhtHJay0dOrRFoyKSrOa39QZWXWklHqfrvyDHwisW2nn2t5Tze8oNG7N+OtSAXrhdeJPoR3pH+I5F95PaREswwhmqqAX634dPJqx9twHEAfbutozQ+fld/5atd/IoB3XvgSpDboAAA==',
    authentication_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOjEsImlzcyI6InVybjp3aW5kb3dzOmxpdmVpZCIsImV4cCI6MTM5MTYzOTk4MCwidWlkIjoiYmIyNTA5ZjlhNzc1MTkzMWQxMTQ4NmU1OGE1MmQwMjUiLCJhdWQiOiJ3d3cuZXhhbXBsZS5lZHUiLCJ1cm46bWljcm9zb2Z0OmFwcHVyaSI6ImFwcGlkOi8vMDAwMDAwMDA0QzEwRUEwMyIsInVybjptaWNyb3NvZnQ6YXBwaWQiOiIwMDAwMDAwMDRDMTBFQTAzIn0.u0WNU90sO1WxCYpSvk72SGWKSEVu1iuyKYmZsmrtddg' } }

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
            return Client.CreateFolder(testFileName, null, null)
            .then(function (response) {
                console.log("RESPONSE BODY", arguments)
            }, function(err){
                console.log(arguments)
            })
        })
//
//        it('should successfully Read file metadata', function () {
//            return Client.GetFileInformation(testFileID).then(function (response) {
//                var resp_json = JSON.parse(response.body);
//                assert.equal(resp_json.type, "file");
//                assert.equal(resp_json.name, testFileName);
//            })
//        })
//
//        it('should successfully Read file contents', function () {
//            return Client.DownloadFile(testFileID).then(function (response) {
//                assert.equal(response.body.toString(), testFileContent);
//            })
//        })
//
//        it('should successfully Delete file', function () {
//            return Client.DeleteFile(testFileID).then(function (response) {
//                assert.equal(response.body, '');
//                //TODO: check the header for 204 response
//            })
//        })
    })
//
//    describe('Folder Methods', function () {
//        var Client = null;
//        var testFolderName = null;
//        var testFolderID = null;
//        before(function (done) {
//            testFolderName = require('../utility').guid() + '_test'
//            Provider.CreateClient(test_oauth_data).then(function (client) {
//                Client = client;
//                done();
//            })
//        })
//
//        it('should successfully Create folder in root directory', function () {
//            return Client.CreateFolder(testFolderName).then(function (response) {
//                var resp_json = JSON.parse(response.body);
//                assert.equal(resp_json.type, "folder");
//                assert.equal(resp_json.name, testFolderName);
//                testFolderID = resp_json.id;
//            })
//        })
//
//        it('should successfully Read folder metadata', function () {
//            return Client.GetFolderInformation(testFolderID).then(function (response) {
//                var resp_json = JSON.parse(response.body);
//                assert.equal(resp_json.type, "folder");
//                assert.equal(resp_json.name, testFolderName);
//            })
//        })
//
//        it('should successfully Read folder contents', function () {
//            return Client.RetrieveFolderItems(testFolderID).then(function (response) {
//                var resp_json = JSON.parse(response.body);
//                assert.equal(resp_json.total_count, 0);
//                assert.deepEqual(resp_json.entries, []);
//            })
//        })
//
//        it('should successfully Delete folder', function () {
//            return Client.DeleteFolder(testFolderID).then(function (response) {
//                assert.equal(response.body, '');
//            })
//        })
//    })
//
//    describe('Account Methods', function () {
//        var Client = null;
//        before(function (done) {
//            Provider.CreateClient(test_oauth_data).then(function (client) {
//                Client = client;
//                done();
//            })
//        })
//
//        it('should access account info', function () {
//            return Client.AccountInfo().then(function (response) {
//                var resp_json = JSON.parse(response.body);
//                assert.equal(resp_json.type, "user");
//                assert(resp_json.name);
//                assert(resp_json.login);
//            })
//        })
//
//        it('should access quota info', function () {
//            assert.throws(function () {
//                Client.CheckQuota()
//            })
//
//        })
//    })

});