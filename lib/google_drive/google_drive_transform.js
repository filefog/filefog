function parseFileInformation(file_response){
    var transform = {};
    transform.is_file = (file_response.mimeType != "application/vnd.google-apps.folder");
    transform.is_folder = (file_response.mimeType == "application/vnd.google-apps.folder");
    transform.etag = file_response.etag;
    transform.identifier = file_response.id;
    transform.parent_identifier = file_response.parents[0].id;
    transform.mimetype = file_response.mimeType
    transform.created_date = new Date(file_response.createdDate);
    transform.modified_date = new Date(file_response.modifiedDate);
    transform.name = file_response.title;
    transform.description = '';
    //transform.extension = file_response.name.split('.')
    transform.checksum = file_response.md5Checksum;
    transform.file_size = file_response.fileSize;
    transform._raw = file_response;
    return transform;
}
exports.parseFileInformation = parseFileInformation;

function parseFolderInformation(folder_response){
    var transform = {};
    transform.is_file = (folder_response.mimeType != "application/vnd.google-apps.folder");
    transform.is_folder = (folder_response.mimeType == "application/vnd.google-apps.folder");
    transform.etag = folder_response.etag;
    transform.identifier = folder_response.id;
    transform.parent_identifier = folder_response.parents[0].id;
    transform.created_date = new Date(folder_response.createdDate);
    transform.modified_date = new Date(folder_response.modifiedDate);
    transform.name = folder_response.title;
    transform.description = '';
    transform._raw = folder_response;
    return transform;
}
exports.parseFolderInformation = parseFolderInformation;

function parseDeletion(deletion_response){
    var transform = {}
    transform.success = true;
    transform._raw = '';
    return transform;
}
exports.parseDeletion = parseDeletion;

function parseFolderItems(items_response){
    var transform = {};
    transform.total_items = null;
    transform.content = items_response.items.map(function(current_item){
        if(current_item.mimeType != "application/vnd.google-apps.folder"){
            return parseFileInformation(current_item);
        }
        else{
            return parseFolderInformation(current_item);
        }
    });
    return transform;
}

exports.parseFolderItems = parseFolderItems;


function parseAccountInfo(account_response){

    var transform = {};
    transform.name = account_response.user.displayName;
    transform.email = '';
    transform.avatar_url = '';
    transform.created_date = null;
    transform.modified_date = null;
    transform.id = account_response.permissionId;
    transform._raw = account_response;
    return transform;
}
exports.parseAccountInfo = parseAccountInfo;

function parseQuota(quota_response){
    var transform = {};
    transform.total_bytes = quota_response.quotaBytesTotal; //total space allocated in bytes
    transform.used_bytes = quota_response.quotaBytesUsed; //bytes used.
    transform.limits= {
        upload_size : '10737418240'
    }
    transform._raw = quota_response;
    return transform;
}
exports.parseQuota = parseQuota;

