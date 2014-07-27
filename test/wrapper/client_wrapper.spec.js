var should = require('should');
var FileFog = require('../../lib/main.js');
describe("ClientWrapper",function(){
    var clientPromise;

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
        clientPromise = FileFog.client("empty");
    });

    it("should have a getConfig() method", function(done){
        clientPromise
            .then(function(client){
                client.getConfig.should.be.a.Function
            })
            .then(done,done)
    })
    it("should have a setConfig() method", function(done){
        clientPromise
            .then(function(client){
                client.setConfig.should.be.a.Function
            })
            .then(done,done)
    })

    it("should have an name property", function(done){
        clientPromise
            .then(function(client){
                client.name.should.be.a.String
            })
            .then(done,done)
    })

    describe("#getConfig()", function(done){
        it("should retrieve the value in ", function(){
            clientPromise
                .then(function(client){
                    client.setConfig({test:"test"})
                    client.getConfig().test.should.eql("test")
                })
                .then(done,done)
        })
    });

    describe("#setConfig()", function(done){
        it("should extend existing values", function(){
            clientPromise
                .then(function(client){
                    client.setConfig({test:"test", test2:"test2"})
                    client.getConfig().test.should.eql("test");
                    client.setConfig({test:"new_test"})
                    client.getConfig().test.should.eql("new_test");
                })
                .then(done,done)
        })
    })

    describe("#getCredentials()", function(done){
        it("should retrieve the value in credentials", function(){
            clientPromise
                .then(function(client){
                    client.setCredentials({test:"test"})
                    client.getCredentials().test.should.eql("test")
                })
                .then(done,done)
        })
    });

    describe("#setCredentials()", function(done){
        it("should extend existing values", function(){
            clientPromise
                .then(function(client){
                    client.setCredentials({test:"test", test2:"test2"})
                    client.getCredentials().test.should.eql("test");
                    client.setCredentials({test:"new_test"})
                    client.getCredentials().test.should.eql("new_test");
                })
                .then(done,done)
        })
    })

})
