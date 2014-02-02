delete require.cache[require.resolve("../lib/main.js")]
var FileFog = require("../lib/main.js")

FileFog.setConfig({
    google : {
        client_key : '777041726477-a5o1tp6f3i9m1me3tj5vhpnrn1jge43c.apps.googleusercontent.com',
        client_secret : 'mWURYHmMKZxr6aeR7DTjRu-q',
        client_scope : "https://www.googleapis.com/auth/drive"
    },
    skydrive : {
        client_key : '',
        client_secret : '',
        client_scope : "wl.basic wl.emails wl.offline_access wl.skydrive_update"
    },
    box : {
        client_key : 'cch3sssk23ueqsbdh2k2zlv2i7rz06lp',
        client_secret : '6v7ywbCdut5FRdIjDeREofrFGc2ymGmA'
    },
    dropbox : {
        client_key : 'sl47p7pijvtp73h',
        client_secret : 'j6vluc5yq7dxnj6'
    }
});
var provider = FileFog.provider('box');


var readline = require('readline')
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('Visit the url: ', provider.oAuthGetAuthorizeUrl());
rl.question('Enter the code here:', function(code){
    provider.oAuthGetAccessToken(code).then(function(access_tokens){
        console.log(access_tokens)
    })
});

