var should = require('should');
var FileFog = require('../lib/main.js');


describe('#use()', function () {
    it("should throw an error if null or missing base classes", function(){
        should(function(){

            FileFog.use("test",{})
        }).throw()
    })

    it("should throw an error if an name isn't provided", function(){
        should(function(){
            var definition = {
                /**
                 * Description
                 * @method provider
                 * @return 
                 */
                provider : function(){},
                transform: {},
                /**
                 * Description
                 * @method client
                 * @return 
                 */
                client: function(){}
            }
            FileFog.use("",definition)
        }).throw()
    })

//    describe('#getConfig()', function () {
//        var FileFog = null
//        before(function () {
//            delete require.cache[require.resolve("../lib/main.js")]
//            FileFog = require("../lib/main.js")
//        })
//
//        it('should return base configuration', function () {
//            assert.deepEqual(FileFog.getConfig().google, {
//                "client_key": '',
//                "client_secret": '',
//                "client_scope": "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.email"
//            });
//            assert.deepEqual(FileFog.getConfig().skydrive, {
//                "client_key": '',
//                "client_secret": '',
//                "client_scope": "wl.basic wl.emails wl.offline_access wl.skydrive_update"
//            });
//            assert.deepEqual(FileFog.getConfig().box, {
//                "client_key": '',
//                "client_secret": ''
//            });
//            assert.deepEqual(FileFog.getConfig().dropbox, {
//                "client_key": '',
//                "client_secret": ''
//            });
//            assert.deepEqual(FileFog.getConfig().dropbox, {
//                "client_key": '',
//                "client_secret": ''
//            });
//        })
//    })

});

describe("#provider()",function(){
    var provider

    before(function(){
        var definition = {
            /**
             * Description
             * @method provider
             * @return 
             */
            provider : function(){},
            transform: {},
            /**
             * Description
             * @method client
             * @return 
             */
            client: function(){},
            config: {interfaces: []}
        }
        provider = FileFog.use("empty",definition,{})
    });

    it("should throw an error if the provider name is not valid", function(){
        should(function(){
            FileFog.provider("test");
        }).throw()
    })
    it("should throw an error if the provider name is empty", function(){
        should(function(){
            FileFog.provider("");
        }).throw()
    })
})
