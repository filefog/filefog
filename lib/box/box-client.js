var Q = require('Q')
    , request = require('request')
    , winston = require('winston')

module.exports = function (oauth_data,provider_options){
    var _oauth_data = oauth_data;

    var _boxClientPromise = null
    function getClient(){
        if(_boxClientPromise) return _boxClientPromise
        var options = {
            headers: {
                'Authorization': 'Bearer ' + _oauth_data.access_token
            }
        };
        _boxClientPromise = Q.when(request.defaults(options))
        return _boxClientPromise;
    }



    this.CreateFile = function(fileName,parentIdentifier, content_buffer, options){
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.post({
                    url:'https://upload.box.com/api/2.0/files/content',
                    headers: {
                        'Authorization': 'Bearer ' + _oauth_data.access_token,
                        'content-type': 'multipart/form-data'
                    },
                    multipart: [
                        {
                            'content-type' : 'application/octet-stream',
                            'content-disposition': 'form-data; filename="'+fileName+'"; name="filename"',
                            body: content_buffer
                        },
                        {
                            'content-disposition': 'form-data; name="folder_id"',
                            body: parentIdentifier
                        }
                    ]
                },
                function (err, r, body) {
                    if(err) return deferred.reject(err);
                    return deferred.resolve({ "response": r , "body" : body});
                });

            return deferred.promise;
        })
    }

    this.DeleteFile = function(identifier){
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.del(
                {
                    url:'https://api.box.com/2.0/files/'+identifier
                },
                function (err, r, body) {
                    if(err) return deferred.reject(err);
                    return deferred.resolve({ "response": r , "body" : body});
                }
            );
            return deferred.promise;
        })
    }
    this.DownloadFile = function(identifier){}
    this.GetFileInformation = function(identifier){
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.get(
                {
                    url:'https://api.box.com/2.0/files/'+identifier
                },
                function (err, r, body) {
                    if(err) return deferred.reject(err);
                    return deferred.resolve({ "response": r , "body" : body});
                }
            );
            return deferred.promise;
        })
    }

    this.CreateFolder = function(folderName, parentIdentifier, options){
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.post(
                {
                    url:'https://api.box.com/2.0/folders',
                    body: '{"name":"NewFTSILERSTING", "parent": {"id": "0"}}'
                },
                function (err, r, body) {
                    if(err) return deferred.reject(err);
                    return deferred.resolve({ "response": r , "body" : body});
                }
            );
            return deferred.promise;
        })
    }

    this.DeleteFolder = function(identifier){
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.del(
                {
                    url:'https://api.box.com/2.0/folders'+identifier
                },
                function (err, r, body) {
                    if(err) return deferred.reject(err);
                    return deferred.resolve({ "response": r , "body" : body});
                }
            );
            return deferred.promise;
        })
    }
    this.GetFolderInformation = function(identifier){
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.get(
                {
                    url:'https://api.box.com/2.0/folders'+identifier
                },
                function (err, r, body) {
                    if(err) return deferred.reject(err);
                    return deferred.resolve({ "response": r , "body" : body});
                }
            );
            return deferred.promise;
        })
    }

    this.RetrieveFolderItems = function (identifier,options){
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.get(
                {
                    url:'https://api.box.com/2.0/folders'+identifier+'/items'
                },
                function (err, r, body) {
                    if(err) return deferred.reject(err);
                    return deferred.resolve({ "response": r , "body" : body});
                }
            );
            return deferred.promise;
        })
    }
}
