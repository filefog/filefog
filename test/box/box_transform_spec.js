var assert = require('assert')
    , q = require('q')
    , transform = require('../../lib/box/box_transform.js')
    , fs = require('fs')
    , path = require('path')
    , assert = require('assert')

require("mocha-as-promised")();

describe('Box Transform', function () {
    it('should transform account ', function () {
        var response = JSON.parse(fs.readFileSync(
            path.resolve(__dirname, 'data/AccountInfoResponse.json')
        ));
        return q.when(response)
            .then(transform.parseAccountInfo)
            .then(function(transform){
                assert.equal(transform.email, 'filefogtest@gmail.com');
                assert.equal(transform.avatar_url, 'https://app.box.com/api/avatar/large/210924315');
                assert.equal(transform.id, '210924315');
            })
    })

    it('should transform quota', function () {
        var response = JSON.parse(fs.readFileSync(
            path.resolve(__dirname, 'data/CheckQuotaResponse.json')
        ));
        return q.when(response)
            .then(transform.parseQuota)
            .then(function(transform){
                assert.equal(transform.total_bytes, 10737418240);
                assert.equal(transform.used_bytes, 0);
                assert.equal(transform.limits.upload_size, 262144000);
            })
    })

    it('should transform file information', function () {
        var response = JSON.parse(fs.readFileSync(
            path.resolve(__dirname, 'data/GetFileInformationResponse.json')
        ));
        return q.when(response)
            .then(transform.parseFileInformation)
            .then(function(transform){
                assert.equal(transform.is_file, true);
                assert.equal(transform.is_folder, false);
                assert(transform.etag);
                assert(transform.identifier);
                assert(transform.parent_identifier);
                assert(transform.name)
                assert(transform.checksum)
                assert(transform.file_size)
            })
    })

    it('should transform folder information', function () {
        var response = JSON.parse(fs.readFileSync(
            path.resolve(__dirname, 'data/GetFolderInformationResponse.json')
        ));
        return q.when(response)
            .then(transform.parseFolderInformation)
            .then(function(transform){
                assert.equal(transform.is_file, false);
                assert.equal(transform.is_folder, true);
                assert(transform.etag);
                assert(transform.identifier);
                assert(transform.parent_identifier);
                assert(transform.name)
            })
    })

    it('should transform folder contents', function () {
        var response = JSON.parse(fs.readFileSync(
            path.resolve(__dirname, 'data/RetrieveFolderItemsResponse.json')
        ));
        return q.when(response)
            .then(transform.parseFolderItems)
            .then(function(transform){
                console.log("RESPONSE",transform);
            })
    })
});