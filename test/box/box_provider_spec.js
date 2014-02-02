var assert = require('assert')

describe('Box Provider', function(){
    var FileFog = null
    var Provider = null
    before(function(){
        delete require.cache[require.resolve("../../lib/main.js")]
        FileFog = require("../../lib/main.js")
        FileFog.setConfig({skydrive : {
            client_key : '',
            client_secret : ''
        }})
        Provider = FileFog.provider("box")
    })

    describe('#oAuthGetAuthorizeUrl()', function(){
        it('should generate oauth authorize Url', function(){
            var parsed = require('url').parse(Provider.oAuthGetAuthorizeUrl(), true);
            assert.equal(parsed.hostname,"www.box.com")
            assert.equal(parsed.query.redirect_uri,FileFog.redirect_url('box'))
            assert.equal(parsed.query.response_type,"code")
            assert.equal(parsed.query.client_id,"")
        })
    })
    describe('#CreateClient()', function(){
        it('should generate client promise', function(){
            return Provider.CreateClient({ access_token: '7sXD7LEI73V23mMyXJoUGZGZ3YrgE55N',
                refresh_token: 'wEFBv9ibkspDMWkHZlAaiKt1V7GKfzxDvVMr4qJih89HrCzn9bObe3zNqsO6ISge',
                raw:
                { access_token: '7sXD7LEI73V23mMyXJoUGZGZ3YrgE55N',
                    expires_in: 3863,
                    restricted_to: [],
                    token_type: 'bearer' } }
            ).then(function (client) {
                assert(client);
            });
        })
    })
})