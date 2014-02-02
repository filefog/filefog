var googleapis = require('googleapis')
    , Q = require('Q')
    , winston = require('winston');


exports.provider = function (provider_options) {
    //https://developers.google.com/drive/quickstart-nodejs
    //https://developers.google.com/apis-explorer/#p/drive/v2/
    //https://github.com/google/google-api-nodejs-client/
    var oauth2Client = new googleapis.OAuth2Client(provider_options.client_key,
        provider_options.client_secret, provider_options.redirect_url(provider_options.service_name));
    this.oAuthGetAuthorizeUrl = function oAuthGetAuthorizeUrl() {
        return oauth2Client.generateAuthUrl({ access_type: 'offline', scope: provider_options.client_scope });
    }

    this.oAuthGetAccessToken = function oAuthGetAccessToken(code) {
        var deferred = Q.defer();
        oauth2Client.getToken(code, function (err, oauth_data) {
            if (err) return deferred.reject(err);
            return deferred.resolve(oauth_data);
        });
        return deferred.promise;
    }

    this.CreateClient = function (oauth_data) {
        var GoogleDriveClient = require('./google_drive_client')
        var client = new GoogleDriveClient(oauth_data, provider_options)
        return Q.when(client);
    }
};



//methods
//OAUTH method
//find all changes to the cloud service from a specific catalog root (used for updating/regenerating the current catalog data)
//generate public links for files
//export links






