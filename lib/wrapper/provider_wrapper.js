var util = require("util");
var extend = require("node.extend");
module.exports = function(name, classes, config,filefog_options){

    var base_provider =classes.provider;

    var ProviderWrapper = function (name, transform, config, filefog_options){
        this.name = name;
        this.config = config || {};
        this._transform = transform;
        this.filefog_options = extend(true, {transform:true, include_raw:true}, filefog_options || {});
        base_provider.call(this, name);
    }
    util.inherits(ProviderWrapper, base_provider);

    ProviderWrapper.prototype.getConfig = function () {
        return this.config;
    };
    ProviderWrapper.prototype.setConfig = function (new_config) {
        this.config = extend(true, this.config, new_config || {});
    };

    ProviderWrapper.prototype.getClient = function (credentials, default_filefog_options) {
        var ClientWrapper = require('./client_wrapper');
        return q.when(ClientWrapper(this.name,classes.client, classes.transform, this.config, credentials,default_filefog_options))
    };

    if(base_provider.prototype.interfaces.indexOf("oauth") != -1){

        ProviderWrapper.prototype._methodWrapper = function(method, args, filefog_options){
            //TODO: pop the filefog variable off the args object, it should only be used to configure Filefog.
            var self = this;
            try{
                var promise = ProviderWrapper.super_.prototype[method].apply(this, args)
                    .then(function (raw_response) {
                        if (!filefog_options.transform)
                            return raw_response;
                        var transform = self._transform[method](raw_response);
                        if(!filefog_options.include_raw){
                            delete transform._raw
                        }
                        return transform;
                    })
                return promise;
            }
            catch(ex){
                //this catch block will send errors as rejected promises if the underlying provider causes an error.
                return q.reject(ex);
            }
        }

        ProviderWrapper.prototype.oAuthGetAccessToken = function (code,filefog_options) {
            filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
            return this._methodWrapper("oAuthGetAccessToken",arguments,filefog_options);
        }
        ProviderWrapper.prototype.oAuthRefreshAccessToken = function (credentials,filefog_options) {
            filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
            return this._methodWrapper("oAuthRefreshAccessToken",arguments,filefog_options);
        }
    }


    return new ProviderWrapper(name, classes.transform, config,filefog_options)
};