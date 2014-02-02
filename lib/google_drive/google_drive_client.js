var Q = require('Q')
    , request = require('request')
    , googleapis = require('googleapis')
    , winston = require('winston');

module.exports = function (oauth_data, provider_options) {
    var _oauth2Client = new googleapis.OAuth2Client(provider_options.client_key, provider_options.client_secret, provider_options.redirect_url(provider_options.service_name));
    _oauth2Client.credentials = oauth_data;

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
                .withMedia('text/plain', 'Hello World!')
                .withAuthClient(oauth2Client).execute(function (err, result) {
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
                .withAuthClient(oauth2Client).execute(function (err, result) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve(result);
                });
            return deferred.promise;
        })
    }

    this.DownloadFile = function (identifier) {
    }
    this.GetFileInformation = function (identifier) {
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.drive.files
                .get({ fileId: identifier })
                .withAuthClient(oauth2Client).execute(function (err, result) {
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
                .withAuthClient(oauth2Client).execute(function (err, result) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve(result);
                });
            return deferred.promise;
        })
    }
    this.DeleteFolder = this.DeleteFile;
    this.GetFolderInformation = this.GetFileInformation;

    this.RetrieveFolderItems = function (identifier) {
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.drive.children
                .list({ folderId: identifier })
                .withAuthClient(oauth2Client).execute(function (err, result) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve(result);
                });
            return deferred.promise;
        })
    }
};