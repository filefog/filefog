delete require.cache[require.resolve("./lib/main.js")]
var FileFog = require("./lib/main.js")

//The following are test keys for a FileFog Integration Test applications. Please don't (ab)use these keys are they are used for automated testing.
//If you want to use your own set of access tokens within the test harness you can generate them with this file, just modify the FileFog.provider('box') line.


FileFog.setConfig({
    google : {
        client_key : '777041726477-a5o1tp6f3i9m1me3tj5vhpnrn1jge43c.apps.googleusercontent.com',
        client_secret : 'mWURYHmMKZxr6aeR7DTjRu-q',
        client_scope : "https://www.googleapis.com/auth/drive"
    },
    skydrive : {
        client_key : '000000004C10EA03',
        client_secret : 'YfSMQ7El6nN5hotB4zDKtrpishCd1P4M',
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
var provider_options = { redirect_url :function (service){
        var service_name = service.toLowerCase();
        if(service_name == "skydrive")
            return "http://www.example.edu/service/callback/skydrive";
        else
            return 'http://www.example.com:3000/service/callback/' + service_name
    }
}
var provider = FileFog.provider('skydrive',provider_options);


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

