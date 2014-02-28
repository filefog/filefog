var Q = require('q')
    , request = require('request')
    , winston = require('winston')
    , errorTypes = require('../errors.js')
    , FFParameterAbsent = errorTypes.FFParameterAbsent
    , FFTokenRejected = errorTypes.FFTokenRejected
    , FFAdditionalAuthorizationRequired = errorTypes.FFAdditionalAuthorizationRequired

module.exports = function (oauth_data, provider_options) {
    var _oauth_data = oauth_data;


    var _skydriveClientPromise = null

    function getClient() {
        if (_skydriveClientPromise) return _skydriveClientPromise
        var options = {
            headers: {
                'Authorization': 'Bearer ' + _oauth_data.access_token
            }
        };
        _skydriveClientPromise = Q.when(request.defaults(options))
        return _skydriveClientPromise;
    }

    //custom error detection method.
    function errorHandler(response, body, err){
        if(err) return err;
        if(response.statusCode != 200 && body.error){

            if(body.error.code == 'request_token_expired') return  new FFTokenRejected();
            else{
                return body.error
            }
            //if(response.statusCode == 401 && response.body.error) return  new FFTokenRejected(err_message);
            //if(response.statusCode == 403) return new FFAdditionalAuthorizationRequired(err_message);
        }

        return false;
    }

    this.AccountInfo = function () {
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.get({
                    url: 'https://apis.live.net/v5.0/me'
                },
                function (err, r, body) {
                    if (err) return deferred.reject(err);
                    return deferred.resolve({ "response": r, "body": body});
                });

            return deferred.promise;
        })
    }


    this.CreateFile = function (fileName, parentIdentifier, content_buffer, options) {
        console.log("Starting Create File Promise")
        return getClient().then(function (client) {
            console.log("successfully got client", fileName, parentIdentifier, content_buffer);
            var deferred = Q.defer();
            client.put({
                    url: 'https://apis.live.net/v5.0/' + (parentIdentifier || 'me/skydrive') + '/files/'+ fileName,
                    body: content_buffer
//                    multipart: [
//                        {
//                            'content-type': 'application/octet-stream',
//                            'content-disposition':' form-data; name="file"; filename="' + fileName + '"',
//
//                        }
//                    ]
                },
                function (err, r, body) {
                    console.log(err, r.statusCode, body);
                    err = errorHandler(r, body, err);
                    if (err) return deferred.reject(err);
                    return deferred.resolve({ "response": r, "body": body});
                });
            console.log("GENEREATED POST")
            return deferred.promise;
        })
    }

    this.DeleteFile = function (identifier) {
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.del(
                {
                    url: 'https://apis.live.net/v5.0/' + identifier
                },
                function (err, r, body) {
                    err = errorHandler(r, body, err);
                    if (err) return deferred.reject(err);
                    return deferred.resolve({ "response": r, "body": body});
                }
            );
            return deferred.promise;
        })
    }
    this.DownloadFile = function (identifier) {
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.get(
                {
                    url: 'https://apis.live.net/v5.0/' + identifier + '/content',
                    encoding: null /*forces the content to be sent back in binary form, body will always be a buffer.*/
                },
                function (err, r, body) {
                    err = errorHandler(r, body, err);
                    if (err) return deferred.reject(err);
                    return deferred.resolve({ "response": r, "body": body});
                }
            );
            return deferred.promise;
        })
    }
    this.GetFileInformation = function (identifier) {
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.get(
                {
                    url: 'https://apis.live.net/v5.0/' + identifier
                },
                function (err, r, body) {
                    err = errorHandler(r, body, err);
                    if (err) return deferred.reject(err);
                    return deferred.resolve({ "response": r, "body": body});
                }
            );
            return deferred.promise;
        })
    }

    this.CreateFolder = function (folderName, parentIdentifier, options) {
        parentIdentifier = parentIdentifier || 'me/skydrive/'
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.post(
                {
                    headers: {
                        'Authorization': 'Bearer ' + _oauth_data.access_token,
                        'content-type': 'application/json'
                    },
                    url: 'https://apis.live.net/v5.0/' + parentIdentifier,
                    body: '{"name":"' + folderName + '", "description": "A test folder"}'
                },
                function (err, r, body) {
                    err = errorHandler(r, body, err);
                    if (err) return deferred.reject(err);
                    return deferred.resolve({ "response": r, "body": body});
                }
            );
            return deferred.promise;
        })
    }

    this.DeleteFolder = function (identifier) {
        identifier = identifier || 'me/skydrive'
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.del(
                {
                    url: 'https://apis.live.net/v5.0/' + identifier
                },
                function (err, r, body) {
                    err = errorHandler(r, body, err);
                    if (err) return deferred.reject(err);
                    return deferred.resolve({ "response": r, "body": body});
                }
            );
            return deferred.promise;
        })
    }
    this.GetFolderInformation = function (identifier) {
        identifier = identifier || 'me/skydrive'
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.get(
                {
                    url: 'https://apis.live.net/v5.0/' + identifier
                },
                function (err, r, body) {
                    err = errorHandler(r, body, err);
                    if (err) return deferred.reject(err);
                    return deferred.resolve({ "response": r, "body": body});
                }
            );
            return deferred.promise;
        })
    }
    this.RetrieveFolderItems = function (identifier, options) {
        identifier = identifier || 'me/skydrive'
        return getClient().then(function (client) {
            var deferred = Q.defer();
            client.get(
                {
                    url: 'https://apis.live.net/v5.0/' + identifier + '/files'
                },
                function (err, r, body) {
                    console.log(err, r.statusCode, body);
                    err = errorHandler(r, body, err);
                    if (err) return deferred.reject(err);
                    return deferred.resolve({ "response": r, "body": body});
                }
            );
            return deferred.promise;
        })
    }
};