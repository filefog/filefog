var BoxProvider = require('./box/box_provider.js').provider
    , DropboxProvider = require('./dropbox/dropbox_provider.js').provider
    , GoogleProvider = require('./google_drive/google_drive_provider.js').provider
    , SkydriveProvider = require('./skydrive/skydrive_provider.js').provider
    , extend = require('node.extend');


var config = {
    google : {
        client_key : '',
        client_secret : '',
        client_scope : "https://www.googleapis.com/auth/drive"
    },
    skydrive : {
        client_key : '',
        client_secret : '',
        client_scope : "wl.basic wl.emails wl.offline_access wl.skydrive_update"
    },
    box : {
        client_key : '',
        client_secret : ''
    },
    dropbox : {
        client_key : '',
        client_secret : ''
    }
}

exports.getConfig = function(){
    return config;
}
exports.setConfig = function(new_config){
    config = extend(true, config, new_config);
}

function redirect_url(service){
    var service_name = service.toLowerCase();
    return 'http://localhost:3000/service/callback/' + service_name
}
exports.redirect_url = redirect_url;

function generateProviderOptions(service,provider_options){
    //provider_options.client_key
    //provider_options.client_secret
    //provider_options.client_scope
    //provider_options.redirect_url

    provider_options = provider_options || {}
    provider_options = extend(true, config[service], provider_options);
    provider_options.service_name = service;
    provider_options.redirect_url = provider_options.redirect_url || redirect_url;
    return provider_options;
}
exports.generateProviderOptions = generateProviderOptions;

exports.provider = function(service,provider_options){
    service = service.toLowerCase();
    provider_options = generateProviderOptions(service, provider_options);
    if(service == "box") {
        return new BoxProvider(provider_options);
    }
    else if(service == "dropbox") {
        return new DropboxProvider(provider_options);
    }
    else if(service == "google") {
        return new GoogleProvider(provider_options);
    }
    else if(service == "skydrive"){
        return new SkydriveProvider(provider_options);
    }
    else
        throw new Error("Provider Not Found: "+service);
}