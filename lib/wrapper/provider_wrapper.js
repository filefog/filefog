var util = require("util");
var extend = require("node.extend");
var q = require("q");
/**
 * Wraps the provider specified Client constructor and creates an instance of of a ClientWrapper object with support
 * for provider specified transforms.
 * @method exports
 * @param {String} name - the name the provider is registered with (using the use method)
 * @param {Object} classes - the constructors to be wrapped
 * @param {Object} config - the configuration for this client (OAuth client keys, etc)
 * @param {} filefog_options
 * @return NewExpression
 */
module.exports = function(name, classes, config,filefog_options){

    var base_provider =classes.provider;
    /**
     * Wraps the provided base Provider constructor and provides instance variables.
     * @constructor ProviderWrapper
     * @method ProviderWrapper
     * @param {String} name - the name the provider is registered with (using the use method)
     * @param {Transform} transform - the provider specified transforms for all the client methods.
     * @param {Object} config
     * @param {} filefog_options
     * @return 
     */
    var ProviderWrapper = function (name, transform, config, filefog_options){
        this.name = name;
        this.config = config || {};
        this._transform = transform;
        this.filefog_options = extend(true, {transform:true, include_raw:true, auto_paginate:true}, filefog_options || {});
        base_provider.call(this, name);
    }
    util.inherits(ProviderWrapper, base_provider);

    /**
     * Gets the configuration for this provider (Oauth client keys, etc)
     * @method getConfig
     * @return MemberExpression
     */
    ProviderWrapper.prototype.getConfig = function () {
        return this.config;
    };
    /**
     * Sets the configuration for this client (OAuth client keys, etc)
     * @return
     * @method setConfig
     * @param {Object} new_config
     * @return 
     */
    ProviderWrapper.prototype.setConfig = function (new_config) {
        this.config = extend(true, this.config, new_config || {});
    };

    /**
     * Returns a promise that resolves to a ClientWrapper instance.
     * @method getClient
     * @param {Object} credentials
     * @param {} default_filefog_options
     * @return CallExpression
     */
    ProviderWrapper.prototype.getClient = function (credentials, default_filefog_options) {
        var ClientWrapper = require('./client_wrapper');
        return q.when(ClientWrapper(this.name,classes.client, classes.transform, this.config, credentials,default_filefog_options))
    };

    if(config.interfaces.indexOf("oauth") != -1){

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

        /**
         * For OAuth providers, this method will return an access token
         * @method oAuthGetAccessToken
         * @param {String} code
         * @param {} filefog_options
         * @return CallExpression
         */
        ProviderWrapper.prototype.oAuthGetAccessToken = function (code,filefog_options) {
            filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
            return this._methodWrapper("oAuthGetAccessToken",arguments,filefog_options);
        }
        /**
         * For OAuth providers, this method will generate a new access token using a refresh token.
         * @method oAuthRefreshAccessToken
         * @param {Object} credentials
         * @param {} filefog_options
         * @return CallExpression
         */
        ProviderWrapper.prototype.oAuthRefreshAccessToken = function (credentials,filefog_options) {
            filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
            return this._methodWrapper("oAuthRefreshAccessToken",arguments,filefog_options);
        }
    }

    if(config.interfaces.indexOf("webhooks") != -1) {

        ProviderWrapper.prototype.events_webhook = function (req,res,webhook_options,filefog_options) {
            filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
            return this._methodWrapper("events_webhook",arguments,filefog_options);
        }
    }


    return new ProviderWrapper(name, classes.transform, config,filefog_options)
};