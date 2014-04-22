var Q = require('q')
    , OAuth = require('oauth')
    , winston = require('winston');



//My God Dropbox.js butchers OAuth2 flow. Using node-oauth to do the intial transfer.
var OAuth2 = OAuth.OAuth2;
exports.provider = function (provider_options) {

    var oauth2Client = new OAuth2(
        provider_options.client_key,
        provider_options.client_secret,
        '',
        'https://www.dropbox.com/1/oauth2/authorize',
        'https://api.dropbox.com/1/oauth2/token'
    );

    this.oAuthGetAuthorizeUrl = function oAuthGetAuthorizeUrl() {
        return oauth2Client.getAuthorizeUrl({
            "redirect_uri": provider_options.redirect_url,
            "response_type": "code"
        })
    }

    this.oAuthGetAccessToken = function oAuthGetAccessToken(code) {
        var deferred = Q.defer();
        oauth2Client.getOAuthAccessToken(
            code,
            {
                "grant_type": "authorization_code",
                "redirect_uri": provider_options.redirect_url
            },
            function (err, access_token, refresh_token, results) {
                var oauth_data = {'access_token': access_token, 'refresh_token': refresh_token, 'raw': results}
                if (err) return deferred.reject(err);
                return deferred.resolve(oauth_data);
            });
        return deferred.promise;
    }

    this.oAuthRefreshAccessToken = function oAuthRefreshAccessToken(oauth_data){
        //dropbox access tokens do not need to be refreshed
        return Q(oauth_data);
    }

    this.CreateClient = function (oauth_data) {
        var DropboxClient = require('./dropbox_client')
        var client = new DropboxClient(oauth_data, provider_options)
        return Q.when(client);
    }
};