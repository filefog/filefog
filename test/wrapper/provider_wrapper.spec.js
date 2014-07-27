var should = require('should');
var FileFog = require('../../lib/main.js');
describe("ProviderWrapper",function(){
    var provider;

    before(function(){
        var base_classes = {
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
            config: {interfaces:[]}
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
    it("should have a getClient() method", function(){
        provider.getClient.should.be.a.Function;
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
            provider.setConfig({ test:"test", test2:"test2" })
            provider.getConfig().test.should.eql("test");
            provider.setConfig({ test:"new_test" })
            provider.getConfig().test.should.eql("new_test");

        })
    })

})
