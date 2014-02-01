var assert = require('assert')

describe('Config', function(){
    describe('#getConfig()', function(){
        var FileFog = null
        before(function(){
            FileFog = require("../lib/main.js")
        })

        it('should return base configuration', function(){
            assert.deepEqual(FileFog.getConfig().google, {
                "client_key" : '',
                "client_secret" : '',
                "client_scope" : "https://www.googleapis.com/auth/drive"
            });
            assert.deepEqual(FileFog.getConfig().skydrive, {
                "client_key" : '',
                "client_secret" : '',
                "client_scope" : "wl.basic wl.emails wl.offline_access wl.skydrive_update"
            });
            assert.deepEqual(FileFog.getConfig().box, {
                "client_key" : '',
                "client_secret" : ''
            });
            assert.deepEqual(FileFog.getConfig().dropbox, {
                "client_key" : '',
                "client_secret" : ''
            });
            assert.deepEqual(FileFog.getConfig().dropbox, {
                "client_key" : '',
                "client_secret" : ''
            });
        })
    })
    describe('#setConfig()', function(){
        var FileFog = null
        before(function(){
            FileFog = require("../lib/main.js")
        })

        it('should set configuration without affecting default configuration', function(){
            FileFog.setConfig({google:{client_key:"test_key", client_secret:"test_secret"}})
            assert.deepEqual(FileFog.getConfig().google, {
                "client_key" : 'test_key',
                "client_secret" : 'test_secret',
                "client_scope" : "https://www.googleapis.com/auth/drive"
            });
            assert.deepEqual(FileFog.getConfig().skydrive, {
                "client_key" : '',
                "client_secret" : '',
                "client_scope" : "wl.basic wl.emails wl.offline_access wl.skydrive_update"
            });
            assert.deepEqual(FileFog.getConfig().box, {
                "client_key" : '',
                "client_secret" : ''
            });
            assert.deepEqual(FileFog.getConfig().dropbox, {
                "client_key" : '',
                "client_secret" : ''
            });
        })
    })
    describe('#generateProviderOptions()', function(){
        var FileFog = null
        before(function(){
            FileFog = require("../lib/main.js")
        })

        it('should generate provider options with no overrides', function(){
            assert.deepEqual(FileFog.generateProviderOptions("skydrive"), {
                "client_key" : '',
                "client_secret" : '',
                "client_scope" : "wl.basic wl.emails wl.offline_access wl.skydrive_update",
                "redirect_url" : FileFog.redirect_url
            });
        })

        it('should generate provider options with client overrides', function(){
            assert.deepEqual(FileFog.generateProviderOptions("skydrive",{"client_key": "test_key","client_secret":"test_secret"}), {
                "client_key" : 'test_key',
                "client_secret" : 'test_secret',
                "client_scope" : "wl.basic wl.emails wl.offline_access wl.skydrive_update",
                "redirect_url" : FileFog.redirect_url
            });
        })
    })
    describe('#provider()', function(){
        var FileFog = null
        before(function(){
            FileFog = require("../lib/main.js")
        })

        it('should generate provider', function(){
            assert(FileFog.provider("skydrive"));
        })

        it('should generate provider for uppercase service name', function(){
            assert(FileFog.provider("SKYDRIVE"));
        })

        it('should throw error if service name invalid', function(){
            assert.throws(function(){
                FileFog.provider("DOES_NOT_EXIST")
            });
        })
    })

})