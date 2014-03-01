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
            .then(function(data){
                console.log("RESPONSE",data);
            })
    })
});