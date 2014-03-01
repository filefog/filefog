function parseFileInformation(file_response){
    var transform = {};
    transform.etag = file_response.etag;
    transform.identifier = file_response.id;
    transform.parent_identifier = file_response.parent.id;
    transform.mimetype = ""
    transform.created_date = file_response.created_at;
    transform.modified_date = file_response.modified_at;
    transform.name = file_response.name;
    transform.description = file_response.description;
    //transform.extension = file_response.name.split('.')
    transform.checksum = file_response.sha1;
    transform.file_size = file_response.size;
    transform.raw = file_response;
    return transform;
}
exports.parseFileInformation = parseFileInformation;

function parseFolderInformation(folder_response){
    console.log("PARSING FOLDER INFORMATION")
    var transform = {};
    transform.etag = folder_response.etag;
    transform.identifier = folder_response.id;
    transform.parent_identifier = folder_response.parent.id;
    transform.created_date = folder_response.created_at;
    transform.modified_date = folder_response.modified_at;
    transform.name = folder_response.name;
    transform.description = folder_response.description;
    transform.raw = folder_response;
    return transform;
}
exports.parseFolderInformation = parseFolderInformation;

function parseAccountInfo(account_response){

    var transform = {};
    transform.name = account_response.name;
    transform.email = account_response.login;
    transform.avatar_url = account_response.avatar_url;
    transform.created_date = account_response.created_at;
    transform.modified_date = account_response.modified_at;
    transform.id = account_response.id;
    return transform;
}
exports.parseAccountInfo = parseAccountInfo;

function parseQuota(quota_response){
    var transform = {};
    transform.total_space = quota_response.space_amount;
    transform.used_space = quota_response.space_used;
    transform.max_upload_size = quota_response.max_upload_size;
    return transform;
}
exports.parseQuota = parseQuota;