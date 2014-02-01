var FileFog = require("../lib/main.js")
    , assert = require('assert')

describe('Config', function(){
    describe('#getConfig()', function(){
        it('should return base configuration', function(){
            var config = {
                google : {
                    client_key : '',
                    client_secret : '',
                    client_scope : "https://www.googleapis.com/auth/drive"
                },
                skydrive : {
                    client_key : '',
                    client_secret : '',
                    client_scope : "wl.basic wl.emails wl.offline_access wl.skydrive_update"
                },
                box : {
                    client_key : '',
                    client_secret : ''
                },
                dropbox : {
                    client_key : '',
                    client_secret : ''
                }
            }
            assert.equal(FileFog.getConfig(), config);
            assert.equal(-1, [1,2,3].indexOf(0));
        })
    })
})