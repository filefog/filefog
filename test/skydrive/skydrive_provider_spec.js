var assert = require('assert');

describe('SkyDrive Provider', function () {
    var FileFog = null
    var Provider = null
    before(function () {
        delete require.cache[require.resolve("../../lib/main.js")]
        FileFog = require("../../lib/main.js")
        FileFog.setConfig({skydrive: {
            client_key: '000000004C10EA03',
            client_secret: 'YfSMQ7El6nN5hotB4zDKtrpishCd1P4M'
        }})
        Provider = FileFog.provider("skydrive")
    })

    describe('#oAuthGetAuthorizeUrl()', function () {
        it('should generate oauth authorize Url', function () {
            var parsed = require('url').parse(Provider.oAuthGetAuthorizeUrl(), true);
            assert.equal(parsed.hostname, "login.live.com")
            assert.equal(parsed.query.redirect_uri, FileFog.redirect_url('skydrive'))
            assert.equal(parsed.query.response_type, "code")
            assert.equal(parsed.query.client_id, "000000004C10EA03")
            assert.equal(parsed.query.scope, 'wl.basic wl.emails wl.offline_access wl.skydrive_update')

        })
    })
    describe('#CreateClient()', function () {
        it('should generate client promise', function () {
            return Provider.CreateClient({access_token: "tTsFRZw1KhAAAAAAAAAAAfYwDgiem4FnRlUE4eFT0LugBVeNzWBz-HqRbQqAufP3"}).then(function (client) {
                assert(client);
            });
        })
    })

});