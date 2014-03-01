var Q = require('q')
    , request = require('request')
    , Dropbox = require("dropbox")
    , winston = require('winston')
        , errorTypes = require('../errors.js')
    , FFParameterRejected = errorTypes.FFParameterRejected


//http://coffeedoc.info/github/dropbox/dropbox-js/master/classes/Dropbox/Client.html#writeFile-instance
module.exports = function (oauth_data, provider_options) {
    provider_options = provider_options || {}
    if(!oauth_data)
        throw new FFParameterRejected("oauth_data cannot be null")

    var _dropboxClientPromise = null
    var _oauth_data = oauth_data;

    function getClient() {
        if (_dropboxClientPromise) return _dropboxClientPromise
        var deferred = Q.defer();
        var client = new Dropbox.Client({
            key: provider_options.client_key,
            secret: provider_options.client_secret,
            token: _oauth_data.access_token
        })
        client.authenticate(function (err, client) {
            if (err) return deferred.reject(err);
            return deferred.resolve(client);
        })
        _dropboxClientPromise = deferred.promise
        return _dropboxClientPromise;
    }

    function createPath(fileName, parentIdentifier) {
        return (parentIdentifier || '') + fileName
    }

    function errorHandler(error) {
        if(error){
            switch (error.status) {
                case Dropbox.ApiError.INVALID_TOKEN:
                    var FFTokenRejected = errorTypes.FFTokenRejected;
                    return new FFTokenRejected('User token has expired');

                case Dropbox.ApiError.NOT_FOUND:
                    // The file or folder you tried to access is not in the user's Dropbox.
                    // Handling this error is specific to your application.
                    var FFItemDoesNotExist = errorTypes.FFItemDoesNotExist;
                    return new FFItemDoesNotExist();

                case Dropbox.ApiError.OVER_QUOTA:
                    // The user is over their Dropbox quota.
                    // Tell them their Dropbox is full. Refreshing the page won't help.
                    var FFOverQuota = errorTypes.FFOverQuota
                    return new FFOverQuota();

                case Dropbox.ApiError.RATE_LIMITED:
                    // Too many API requests. Tell the user to try again later.
                    // Long-term, optimize your code to use fewer API calls.
                    var FFRateLimit = errorTypes.FFRateLimit;
                    return new FFRateLimit();

                case Dropbox.ApiError.NETWORK_ERROR:
                    // An error occurred at the XMLHttpRequest layer.
                    // Most likely, the user's network connection is down.
                    // API calls will not succeed until the user gets back online.
                    return error;

                case Dropbox.ApiError.INVALID_PARAM:
                    var FFParameterRejected = errorTypes.FFParameterRejected
                    return new FFParameterRejected();
                case Dropbox.ApiError.OAUTH_ERROR:
                    var FFTokenRejected = errorTypes.FFTokenRejected
                    return new FFTokenRejected();
                case Dropbox.ApiError.INVALID_METHOD:
                default:
                    // Caused by a bug in dropbox.js, in your application, or in Dropbox.
                    // Tell the user an error occurred, ask them to refresh the page.
                    return error;
            }
        }
        return false;
    };


    this.AccountInfo = function (options) {
        options = options || {}
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.getAccountInfo(options || {}, function (err, stat) {
                err = errorHandler(err);
                if (err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        })
    }

    this.CheckQuota = function (options) {
        options = options || {}
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.getAccountInfo(options || {}, function (err, stat) {
                err = errorHandler(err);
                if (err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        })
    }

    this.CreateFile = function (fileName, parentIdentifier, content_buffer, options) {
        options = options || {}
        if(!fileName){
            throw new FFParameterRejected("fileName cannot be emtpy.")
        }
        var path = createPath(fileName, parentIdentifier)
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.writeFile(path, content_buffer, options || {}, function (err, stat) {
                err = errorHandler(err);
                if (err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        })
    }
    this.DeleteFile = function (identifier,options) {
        options = options || {}
        if(!identifier){
            throw new FFParameterRejected("identifier cannot be emtpy.")
        }
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.remove(identifier, function (err, stat) {
                err = errorHandler(err);
                if (err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        })
    }
    this.DownloadFile = function (identifier,options) {
        options = options || {}
        if(!identifier){
            throw new FFParameterRejected("identifier cannot be emtpy.")
        }
        return getClient().then(function (client) {
            var deferred = Q.defer();
            var options = options || {};
            options.buffer = true;
            client.readFile(identifier, options, function (err, buffer) {
                err = errorHandler(err);
                if (err) return deferred.reject(err);
                return deferred.resolve(buffer);
            });
            return deferred.promise;
        })
    }
    this.GetFileInformation = function (identifier, options) {
        options = options || {}
        if(!identifier){
            throw new FFParameterRejected("identifier cannot be emtpy.")
        }
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.stat(identifier, options || {}, function (err, stat) {
                err = errorHandler(err);
                if (err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        })
    }

    this.CreateFolder = function (folderName, parentIdentifier, options) {
        options = options || {}
        if(!folderName){
            throw new FFParameterRejected("folderName cannot be emtpy.")
        }
        var path = createPath(folderName, parentIdentifier);
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.mkdir(path, function (err, stat) {
                err = errorHandler(err);
                if (err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        });
    }
    this.DeleteFolder = this.DeleteFile;
    this.GetFolderInformation = function(identifier, options){
        options = options || {}
        identifier = identifier || '';
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.stat(identifier, options || {}, function (err, stat) {
                err = errorHandler(err);
                if (err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        })
    }

    this.RetrieveFolderItems = function (identifier,options) {
        options = options || {}
        identifier = identifier || '';
        var path = createPath(identifier)
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.readdir(path, function (err, content_array, folder_stat, content_stat_array) {
                err = errorHandler(err);
                if (err) return deferred.reject(err);
                return deferred.resolve({content_array: content_array, folder_stat: folder_stat, content_stat_array: content_stat_array});
            });
            return deferred.promise;
        });
    }
};
