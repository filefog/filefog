var q = require('q');
var util = require("util");
var extend = require("node.extend");

/**
 * Wraps the provider specified Client constructor and creates an instance of of a ClientWrapper object with support
 * for provider specified transforms.
 * @method exports
 * @param {String} name - the name the provider is registered with (using the use method)
 * @param {Client} base_client - the Client constructor to be wrapped and instanciated
 * @param {Transform} transform - the provider specified transforms for all the client methods.
 * @param {Object} provider_config - the configuration for this client (OAuth client keys, etc)
 * @param {Object} credentials - the user specific credentials for the Client (access token, refresh token, etc)
 * @param {} filefog_options
 * @return NewExpression
 */
module.exports = function(name,base_client,transform, provider_config, credentials, filefog_options){

    /**
     * Wraps the provided base Client constructor and provides instance variables to be used by provider Clients.
     * @constructor ClientWrapper
     * @method ClientWrapper
     * @param {String} name - the name that the provider is registered with.
     * @param {Transform} transform - the provider specified transforms for all the client methods.
     * @param {Object} provider_config - the configuration for this client (OAuth client keys, etc)
     * @param {Object} credentials - the user specific credentials for the Client (access token, refresh token, etc)
     * @param {} filefog_options
     * @return 
     */
    var ClientWrapper = function(name,transform, provider_config, credentials, filefog_options){
        this.name = name;
        this.config = provider_config || {};
        this.credentials = credentials || {};
        this.filefog_options = extend(true, {transform:true, include_raw:true, auto_paginate:true}, filefog_options || {});
        this._transform = transform;

        base_client.call(this);
    };
    util.inherits(ClientWrapper, base_client);


    /**
     * Gets the configuration for this client (Oauth client keys, etc)
     * @method getConfig
     * @return MemberExpression
     */
    ClientWrapper.prototype.getConfig = function () {
        return this.config;
    };
    /**
     * Sets the configuration for this client (OAuth client keys, etc)
     * @method setConfig
     * @param {Object} new_config
     * @return 
     */
    ClientWrapper.prototype.setConfig = function (new_config) {
        this.config = extend(true, this.config, new_config || {});
    };
    /**
     * Gets the client credentials
     * @method getCredentials
     * @return MemberExpression
     */
    ClientWrapper.prototype.getCredentials = function () {
        return this.credentials;
    };
    /**
     * Sets the client credentials
     * @method setCredentials
     * @param {Object} new_creds
     * @return 
     */
    ClientWrapper.prototype.setCredentials = function (new_creds) {
        this.credentials = extend(true, this.credentials, new_creds || {});
    };

    ClientWrapper.prototype._methodWrapper = function(method, args, filefog_options){
        //TODO: pop the filefog variable off the args object, it should only be used to configure Filefog.
        var self = this;
        try{
            var promise = ClientWrapper.super_.prototype[method].apply(this, args)
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
     * Account Info for the provider account.
     * @method accountInfo
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.accountInfo = function(provider_options, filefog_options){
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("accountInfo",arguments,filefog_options);
//        return ClientWrapper.super_.prototype.accountInfo.apply(this, arguments)
//            .then(function (raw_response) {
//                if (!filefog_options.transform)
//                    return raw_response;
//                var transform = this._transform.accountInfo(raw_response);
//                if(!filefog_options.include_raw){
//                    delete transform._raw
//                }
//                return transform;
//            })
    }
    /**
     * Quota information for the provider account.
     * @method checkQuota
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.checkQuota = function (provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("checkQuota",arguments,filefog_options);

    }

    /**
     * Create file on provider
     * @method createFile
     * @param {String} fileName
     * @param {String} parentIdentifier
     * @param {Buffer} content_buffer
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.createFile = function (fileName, parentIdentifier, content_buffer, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("createFile",arguments,filefog_options);

    };

    /**
     * Update file on provider
     * @method updateFile
     * @param {String} identifier
     * @param {Buffer} content_buffer
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.updateFile = function (identifier, content_buffer, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("updateFile",arguments,filefog_options);

    };

    /**
     * Delete file on provider
     * @method deleteFile
     * @param {String} identifier
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.deleteFile = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("deleteFile",arguments,filefog_options);

    }
    /**
     * Download file from provider
     * @method downloadFile
     * @param {String} identifier
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.downloadFile = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("downloadFile",arguments,filefog_options);

    }


    /**
     * Get file metadata from provider
     * @method getFileInformation
     * @param {String} identifier
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.getFileInformation = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("getFileInformation",arguments,filefog_options);
    }

    /**
     * Update file information provider, eg parent folder name, filename
     * @method updateFileInformation
     * @param {String} identifier
     * @param {String} fileName
     * @param {String} parentIdentifier
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.updateFileInformation = function (identifier, fileName, parentIdentifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("updateFileInformation",arguments,filefog_options);

    };

    /**
     * Create folder on provider
     * @method createFolder
     * @param {String} folderName
     * @param {String} parentIdentifier
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.createFolder = function (folderName, parentIdentifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("createFolder",arguments,filefog_options);

    };
    /**
     * Delete folder on provider
     * @method deleteFolder
     * @param {String} identifier
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.deleteFolder = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("deleteFolder",arguments,filefog_options);

    }
    /**
     * Get folder metadata from provider
     * @method getFolderInformation
     * @param {String} identifier
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.getFolderInformation = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("getFolderInformation",arguments,filefog_options);

    }
    /**
     * Get folder content
     * @method retrieveFolderItems
     * @param {String} identifier
     * @param {Object} provider_options
     * @param {} filefog_options
     * @return CallExpression
     */
    ClientWrapper.prototype.retrieveFolderItems = function (identifier,provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("retrieveFolderItems",arguments,filefog_options);

    }


    if(provider_config.interfaces.indexOf("events") != -1) {

        ClientWrapper.prototype.events = function (cursor,provider_options,filefog_options) {
            filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
            return this._methodWrapper("events",arguments,filefog_options);

        }
    }

    if(provider_config.interfaces.indexOf("webhooks") != -1) {

        ClientWrapper.prototype.subscribe = function (webhook_options,filefog_options) {
            filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
            return this._methodWrapper("subscribe",arguments,filefog_options);
        }

        ClientWrapper.prototype.unsubscribe = function (webhook_options,filefog_options) {
            filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
            return this._methodWrapper("unsubscribe",arguments,filefog_options);
        }
    }

    return new ClientWrapper(name,transform,provider_config, credentials, filefog_options)
}