function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

exports.guid = function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

//These methods are synchronous, as they will be used in the test files.
function loadAccessToken(service_type){
    var path = require('path')
        ,fs = require('fs')

    var access_tokens = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'test_access_tokens.json'), 'UTF-8'));
    if(service_type){
        return access_tokens[service_type];
    }
    else{
        return access_tokens
    }

}
exports.loadAccessToken = loadAccessToken

function saveAccessToken(service_type, new_access_token){
    var path = require('path')
        ,fs = require('fs')
    var access_tokens = loadAccessToken();
    access_tokens[service_type] = new_access_token

    fs.writeFileSync(path.resolve(__dirname, 'test_access_tokens.json'), JSON.stringify(access_tokens, null, 4));

}
exports.saveAccessToken = saveAccessToken