var util = require("util");
var extend = require("node.extend");
module.exports = function(base_provider, name, config){

    var ProviderWrapper = function (name, config){
        this.name = name;
        this.config = config || {};

        base_provider.call(this, name);
    }
    util.inherits(ProviderWrapper, base_provider);

    ProviderWrapper.prototype.getConfig = function () {
        return this.config;
    };
    ProviderWrapper.prototype.setConfig = function (new_config) {
        this.config = extend(true, this.config, new_config || {});
    };

    return new ProviderWrapper(name, config)
};