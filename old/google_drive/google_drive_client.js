var Q = require('q')
    , request = require('request')
    , googleapis = require('googleapis')
    , winston = require('winston')
    , errorTypes = require('../errors.js')
    , FFParameterRejected = errorTypes.FFParameterRejected


module.exports = function (oauth_data, provider_options) {
    provider_options = provider_options || {}
    if(!oauth_data)
        throw new FFParameterRejected("oauth_data cannot be null")

    var _oauth_data = oauth_data;
    var _oauth2Client = new googleapis.OAuth2Client(provider_options.client_key, provider_options.client_secret, provider_options.redirect_url);
    _oauth2Client.credentials = _oauth_data;

    var _googleClientPromise = null

    function getClient() {
        if (_googleClientPromise) return _googleClientPromise
        var deferred = Q.defer();
        googleapis.discover('drive', 'v2').execute(function (err, client) {
            if (err) return deferred.reject(err);
            _googleClientPromise = deferred.resolve(client);
            return _googleClientPromise;
        });
        return deferred.promise;
    }

    this.AccountInfo = function (options) {
        options = options || {}
        options.includeSubscribed = options.includeSubscribed || true;
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.drive.about
                .get(options)
                .withAuthClient(_oauth2Client).execute(function (err, result) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve(result);
                });
            return deferred.promise;
        })
    }

    this.CheckQuota = function (options) {
        options = options || {}
        options.includeSubscribed = options.includeSubscribed || true;
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.drive.about
                .get(options)
                .withAuthClient(_oauth2Client).execute(function (err, result) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve(result);
                });
            return deferred.promise;
        })
    }


    this.CreateFile = function (fileName, parentIdentifier, content_buffer, options) {
        options = options || {};
        options.title = fileName;
        options.mimeType = options.mimeType || 'text/plain';
        if (parentIdentifier) {
            options.parents = options.parents || []
            options.parents.push(parentIdentifier)
        }
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.drive.files
                .insert(options)
                .withMedia('application/binary', content_buffer)
                .withAuthClient(_oauth2Client).execute(function (err, result) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve(result);
                });
            return deferred.promise;
        })
    }
    this.DeleteFile = function (identifier) {
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.drive.files
                .trash({ fileId: identifier })
                .withAuthClient(_oauth2Client).execute(function (err, result) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve(result);
                });
            return deferred.promise;
        })
    }

    this.DownloadFile = function (identifier) {
        return this.GetFileInformation(identifier).then(function(meta_data){
            var deferred = Q.defer();
            request.get(
                {
                    headers: {
                        'Authorization': 'Bearer ' + _oauth_data.access_token
                    },
                    url: meta_data.downloadUrl,
                    encoding: null /*forces the content to be sent back in binary form, body will always be a buffer.*/
                },
                function (err, r, body) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve({ "response": r, "body": body});
                }
            );
            return deferred;
        })
    }
    this.GetFileInformation = function (identifier) {
        identifier = identifier ||'root';
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.drive.files
                .get({ fileId: identifier })
                .withAuthClient(_oauth2Client).execute(function (err, result) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve(result);
                });
            return deferred.promise;
        })
    }

    this.CreateFolder = function (folderName, parentIdentifier, options) {
        options = options || {};
        options.title = folderName;
        options.mimeType = "application/vnd.google-apps.folder";
        if (parentIdentifier) {
            options.parents = []
            options.parents.push(parentIdentifier)
        }
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.drive.files
                .insert(options)
                .withAuthClient(_oauth2Client).execute(function (err, result) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve(result);
                });
            return deferred.promise;
        })
    }
    this.DeleteFolder = this.DeleteFile;
    this.GetFolderInformation = this.GetFileInformation;

    this.RetrieveFolderItems = function (identifier,options) {
        options = options || {}
        identifier = identifier ||'root';
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.drive.children
                .list({ folderId: identifier })
                .withAuthClient(_oauth2Client).execute(function (err, result) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve(result);
                });
            return deferred.promise;
        })
    }
};