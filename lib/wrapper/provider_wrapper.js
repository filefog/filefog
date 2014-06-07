//###################################################################################################
// ProviderWrapper
var extend = require("node.extend")
function ProviderWrapper(base_provider, alias, config){
    this.config = config || {};
    this.base = base_provider;
    this.base();

    this.alias = alias;
}

ProviderWrapper.prototype.getConfig = function () {
    return this.config;
};
ProviderWrapper.prototype.setConfig = function (new_config) {
    this.config = extend(true, this.config, new_config || {});
};