var assert = require('assert');

describe('Google Provider', function () {
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
    })

    describe('#oAuthGetAuthorizeUrl()', function () {
        it('should generate oauth authorize Url', function () {
            var parsed = require('url').parse(Provider.oAuthGetAuthorizeUrl(), true);
            assert.equal(parsed.hostname, "accounts.google.com")
            assert.equal(parsed.query.redirect_uri, FileFog.redirect_url('google'))
            assert.equal(parsed.query.response_type, "code")
            assert.equal(parsed.query.access_type, "offline")
            assert.equal(parsed.query.client_id, "777041726477-a5o1tp6f3i9m1me3tj5vhpnrn1jge43c.apps.googleusercontent.com")
            assert.equal(parsed.query.scope, 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.email')

        })
    })
    describe('#CreateClient()', function () {
        it('should generate client promise', function () {
            return Provider.CreateClient({ access_token: 'ya29.1.AADtN_W5vWUjYklaE_ZNkJBd2y9Ot60jF4SewLivnLgLHDYhmiadzbPPZntHmL4nceXs0w',
                token_type: 'Bearer',
                expires_in: 3600,
                refresh_token: '1/IMcWJR9KJPVguuKLUrHzMjRl-XECLf6mK2YoUYnbQaU' }).then(function (client) {
                    assert(client);
                });
        })
    })

});