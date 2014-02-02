var Q = require('Q')
    , OAuth = require('OAuth')
    , winston = require('winston')

var OAuth2 = OAuth.OAuth2;
exports.provider = function(provider_options){

    var oauth2Client = new OAuth2(provider_options.client_key,
        provider_options.client_secret,
        'https://www.box.com',
        '/api/oauth2/authorize',
        '/api/oauth2/token'
    );

    this.oAuthGetAuthorizeUrl = function oAuthGetAuthorizeUrl(){
        return oauth2Client.getAuthorizeUrl({
            "redirect_uri": provider_options.redirect_url(provider_options.service_name),
            "response_type": "code"
        })
    }

    this.oAuthGetAccessToken = function oAuthGetAccessToken(code){
        var deferred = Q.defer();
        oauth2Client.getOAuthAccessToken(
            code,
            {
                "grant_type": "authorization_code",
                "redirect_uri": provider_options.redirect_url(provider_options.service_name)
            },
            function (err, access_token, refresh_token, results){
                var oauth_data = {'access_token':access_token, 'refresh_token':refresh_token, 'raw':results}
                if(err) return deferred.reject(err);
                return deferred.resolve(oauth_data);
            });
        return deferred.promise;
    }
    this.CreateClient = function(oauth_data){
        var BoxClient = require('./box_client')
        var client = new BoxClient(oauth_data,provider_options)
        return Q.when(client);
    }
}

