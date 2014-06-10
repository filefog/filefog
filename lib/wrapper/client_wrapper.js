var q = require('q');
var util = require("util");
var extend = require("node.extend");

module.exports = function(name,base_client,transform, provider_config, credentials, filefog_options){

    var ClientWrapper = function(name,transform, provider_config, credentials, filefog_options){
        this.name = name;
        this.config = provider_config || {};
        this.credentials = credentials || {};
        this.filefog_options = extend(true, {transform:true, include_raw:true}, filefog_options || {});
        this._transform = transform;

        base_client.call(this);
    };
    util.inherits(ClientWrapper, base_client);


    ClientWrapper.prototype.getConfig = function () {
        return this.config;
    };
    ClientWrapper.prototype.setConfig = function (new_config) {
        this.config = extend(true, this.config, new_config || {});
    };
    ClientWrapper.prototype.getCredentials = function () {
        return this.credentials;
    };
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
    ClientWrapper.prototype.checkQuota = function (provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("checkQuota",arguments,filefog_options);

    }

    ClientWrapper.prototype.createFile = function (fileName, parentIdentifier, content_buffer, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("createFile",arguments,filefog_options);

    };
    ClientWrapper.prototype.deleteFile = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("deleteFile",arguments,filefog_options);

    }
    ClientWrapper.prototype.downloadFile = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("downloadFile",arguments,filefog_options);

    }


    ClientWrapper.prototype.getFileInformation = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("getFileInformation",arguments,filefog_options);
    }

    ClientWrapper.prototype.createFolder = function (folderName, parentIdentifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("createFolder",arguments,filefog_options);

    };
    ClientWrapper.prototype.deleteFolder = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("deleteFolder",arguments,filefog_options);

    }
    ClientWrapper.prototype.getFolderInformation = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("getFolderInformation",arguments,filefog_options);

    }
    ClientWrapper.prototype.retrieveFolderItems = function (identifier,provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return this._methodWrapper("retrieveFolderItems",arguments,filefog_options);

    }

    return new ClientWrapper(name,transform,provider_config, credentials, filefog_options)
}