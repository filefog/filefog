var Q = require('Q')
    , request = require('request')
    , Dropbox = require("dropbox")
    , winston = require('winston')

//http://coffeedoc.info/github/dropbox/dropbox-js/master/classes/Dropbox/Client.html#writeFile-instance
module.exports = function (oauth_data,provider_options){
    var _dropboxClientPromise = null
    var _oauth_data = oauth_data;
    function getClient(){
        if(_dropboxClientPromise) return _dropboxClientPromise
        var deferred = Q.defer();
        var client = new Dropbox.Client({
            key: provider_options.client_key,
            secret: provider_options.client_secret,
            token: _oauth_data.access_token
        })
        client.authenticate(function(err, client) {
            if(err) return deferred.reject(err);
            return deferred.resolve(client);
        })
        _dropboxClientPromise = deferred.promise
        return _dropboxClientPromise;
    }

    function createPath(fileName, parentIdentifier){
        return (parentIdentifier || '') + fileName
    }


    this.CreateFile = function(fileName,parentIdentifier, content_buffer, options){
        var path = createPath(fileName, parentIdentifier)
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.writeFile(path, content_buffer, options || {}, function (err, stat) {
                if(err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        })
    }
    this.DeleteFile = function(identifier){
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.remove(identifier, function (err, stat) {
                if(err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        })
    }
    this.DownloadFile = function(identifier){}
    this.GetFileInformation = function(identifier,options){
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.stat(identifier,options || {}, function (err, stat) {
                if(err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        })
    }


    this.CreateFolder = function(folderName, parentIdentifier, options){
        var path = createPath(folderName, parentIdentifier);
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.mkdir(path, function (err, stat) {
                if(err) return deferred.reject(err);
                return deferred.resolve(stat);
            });
            return deferred.promise;
        });
    }
    this.DeleteFolder = this.DeleteFile;
    this.GetFolderInformation = this.GetFileInformation;

    this.RetrieveFolderItems = function (identifier){
        return getClient().then(function(client){
            var deferred = Q.defer();
            client.readdir(identifier, function (err, content_array, folder_stat, content_stat_array) {
                if(err) return deferred.reject(err);
                return deferred.resolve({content_array:content_array, folder_stat:folder_stat, content_stat_array:content_stat_array});
            });
            return deferred.promise;
        });
    }
}
