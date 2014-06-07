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
                provider : function(){},
                transform: {},
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
            provider : function(){},
            transform: {},
            client: function(){}
        }
        provider = FileFog.use("empty",definition)
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

describe("ProviderWrapper",function(){
    var provider;

    before(function(){
        var base_classes = {
            provider : function(){},
            transform: {},
            client: function(){}
        }
        FileFog.use("empty",base_classes);
        provider = FileFog.provider("empty");
    });

    it("should have a getConfig() method", function(){
        provider.getConfig.should.be.a.Function;
    })
    it("should have a setConfig() method", function(){
        provider.setConfig.should.be.a.Function;
    })

    it("should have an name property", function(){
        provider.name.should.be.a.String;
    })

    describe("#getConfig()", function(){
        it("should retrieve the value in ", function(){
            provider.setConfig({test:"test"})
            provider.getConfig().test.should.eql("test")
        })
    })

    describe("#setConfig()", function(){
        it("should extend existing values", function(){
            provider.setConfig({test:"test", test2:"test2"})
            provider.getConfig().test.should.eql("test");
            provider.setConfig({test:"new_test"})
            provider.getConfig().test.should.eql("new_test");

        })
    })



})
