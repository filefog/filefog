var assert = require('assert')
    , q = require('q')
    , transform = require('../../lib/dropbox/dropbox_transform.js')
    , fs = require('fs')
    , path = require('path')
    , assert = require('assert')

require("mocha-as-promised")();

describe('Dropbox Transform', function () {
    it('should transform account ', function () {
        var response = JSON.parse(fs.readFileSync(
            path.resolve(__dirname, 'data/AccountInfoResponse.json')
        ));
        return q.when(response)
            .then(transform.parseAccountInfo)
            .then(function(transform){
                assert(transform.email);
                assert.equal(transform.avatar_url, '');
                assert(transform.id);
            })
    })

    it('should transform quota', function () {
        var response = JSON.parse(fs.readFileSync(
            path.resolve(__dirname, 'data/CheckQuotaResponse.json')
        ));
        return q.when(response)
            .then(transform.parseQuota)
            .then(function(transform){
                assert(transform.total_bytes);
                assert(transform.used_bytes);
                assert(transform.limits);
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
                assert.equal(transform.parent_identifier,'');
                assert(transform.name)
                //assert.equals(transform.checksum,'')
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
                assert.equal(transform.parent_identifier,'');
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