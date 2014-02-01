var assert = require('assert')

describe('Dropbox Provider', function(){
    var FileFog = null
    var Provider = null
    before(function(){
        delete require.cache[require.resolve("../../lib/main.js")]
        FileFog = require("../../lib/main.js")
        Provider = FileFog.provider("dropbox")
    })

    describe('#oAuthGetAuthorizeUrl()', function(){
        it('should generate oauth authorize Url', function(){
            assert.equal(Provider.oAuthGetAuthorizeUrl(),"")
        })

    })
})