var assert = require('assert');
require("mocha-as-promised")();


describe('Dropbox Provider', function () {
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

    describe('#oAuthGetAuthorizeUrl()', function () {
        it('should generate oauth authorize Url', function () {
            var parsed = require('url').parse(Provider.oAuthGetAuthorizeUrl(), true);
            assert.equal(parsed.hostname, "www.dropbox.com")
            assert.equal(parsed.query.redirect_uri, FileFog.getRedirectUrlGenerator()('dropbox'))
            assert.equal(parsed.query.response_type, "code")
            assert.equal(parsed.query.client_id, "sl47p7pijvtp73h")
        })
    })
    describe('#CreateClient()', function () {
        it('should generate client promise', function () {
            return Provider.CreateClient({access_token: "TK2Xp3yDi3YAAAAAAAAAAeegaucYDM_R1-MkfWAKU1h_uFVp6-bsldcEYhDWvWrK"}).then(function (client) {
                assert(client);
            });
        })
    })

});