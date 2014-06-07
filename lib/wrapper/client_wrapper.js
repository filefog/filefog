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

    //TODO:Look at possible ways to deduplicate this code later.
    ClientWrapper.prototype.accountInfo = function(provider_options, filefog_options){
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return ClientWrapper.super_.prototype.accountInfo.apply(this, arguments)
            .then(function (raw_response) {
                if (!filefog_options.transform)
                    return raw_response;
                var transform = this._transform.accountInfo(raw_response);
                if(!filefog_options.include_raw){
                    delete transform._raw
                }
                return transform;
            })
    }
    ClientWrapper.prototype.checkQuota = function (provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return ClientWrapper.super_.prototype.checkQuota.apply(this, arguments)
            .then(function (raw_response) {
                if (!filefog_options.transform)
                    return raw_response;
                var transform = this._transform.checkQuota(raw_response);
                if(!filefog_options.include_raw){
                    delete transform._raw
                }
                return transform;
            })
    }

    ClientWrapper.prototype.createFile = function (fileName, parentIdentifier, content_buffer, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return ClientWrapper.super_.prototype.createFile.apply(this, arguments)
            .then(function (raw_response) {
                if (!filefog_options.transform)
                    return raw_response;
                var transform = this._transform.createFile(raw_response);
                if(!filefog_options.include_raw){
                    delete transform._raw
                }
                return transform;
            })
    };
    ClientWrapper.prototype.deleteFile = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return ClientWrapper.super_.prototype.deleteFile.apply(this, arguments)
            .then(function (raw_response) {
                if (!filefog_options.transform)
                    return raw_response;
                var transform = this._transform.deleteFile(raw_response);
                if(!filefog_options.include_raw){
                    delete transform._raw
                }
                return transform;
            })
    }
    ClientWrapper.prototype.downloadFile = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return ClientWrapper.super_.prototype.downloadFile.apply(this, arguments)
            .then(function (raw_response) {
                if (!filefog_options.transform)
                    return raw_response;
                var transform = this._transform.downloadFile(raw_response);
                if(!filefog_options.include_raw){
                    delete transform._raw
                }
                return transform;
            })
    }
    ClientWrapper.prototype.getFileInformation = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return ClientWrapper.super_.prototype.getFileInformation.apply(this, arguments)
            .then(function (raw_response) {
                if (!filefog_options.transform)
                    return raw_response;
                var transform = this._transform.getFileInformation(raw_response);
                if(!filefog_options.include_raw){
                    delete transform._raw
                }
                return transform;
            })
    }

    ClientWrapper.prototype.createFolder = function (folderName, parentIdentifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return ClientWrapper.super_.prototype.createFolder.apply(this, arguments)
            .then(function (raw_response) {
                if (!filefog_options.transform)
                    return raw_response;
                var transform = this._transform.createFolder(raw_response);
                if(!filefog_options.include_raw){
                    delete transform._raw
                }
                return transform;
            })
    };
    ClientWrapper.prototype.deleteFolder = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return ClientWrapper.super_.prototype.deleteFolder.apply(this, arguments)
            .then(function (raw_response) {
                if (!filefog_options.transform)
                    return raw_response;
                var transform = this._transform.deleteFolder(raw_response);
                if(!filefog_options.include_raw){
                    delete transform._raw
                }
                return transform;
            })
    }
    ClientWrapper.prototype.getFolderInformation = function (identifier, provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return ClientWrapper.super_.prototype.getFolderInformation.apply(this, arguments)
            .then(function (raw_response) {
                if (!filefog_options.transform)
                    return raw_response;
                var transform = this._transform.getFolderInformation(raw_response);
                if(!filefog_options.include_raw){
                    delete transform._raw
                }
                return transform;
            })
    }
    ClientWrapper.prototype.retrieveFolderItems = function (identifier,provider_options,filefog_options) {
        filefog_options = extend(true, {}, this.filefog_options, filefog_options|| {});
        return ClientWrapper.super_.prototype.retrieveFolderItems.apply(this, arguments)
            .then(function (raw_response) {
                if (!filefog_options.transform)
                    return raw_response;
                var transform = this._transform.retrieveFolderItems(raw_response);
                if(!filefog_options.include_raw){
                    delete transform._raw
                }
                return transform;
            })
    }

    return new ClientWrapper(name,transform,provider_config, credentials, filefog_options)
}