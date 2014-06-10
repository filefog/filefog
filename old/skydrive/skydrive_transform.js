function parseFileInformation(file_response){
    var transform = {};
    transform.is_file = (file_response.type != "folder");
    transform.is_folder = (file_response.type == "folder");
    transform.etag = '';
    transform.identifier = file_response.id;
    transform.parent_identifier = file_response.parent_id;
    transform.mimetype = ''
    transform.created_date = new Date(file_response.created_time);
    transform.modified_date = new Date(file_response.updated_time);
    transform.name = file_response.name;
    transform.description = file_response.description;
    //transform.extension = file_response.name.split('.')
    transform.checksum = null;
    transform.file_size = file_response.size;
    transform._raw = file_response;
    return transform;
}
exports.parseFileInformation = parseFileInformation;

function parseFolderInformation(folder_response){
    var transform = {};
    transform.is_file = (folder_response.type != "folder");
    transform.is_folder = (folder_response.type == "folder");
    transform.etag = '';
    transform.identifier = folder_response.id;
    transform.parent_identifier = folder_response.parent_id;
    transform.created_date = new Date(folder_response.created_time);
    transform.modified_date = new Date(folder_response.updated_time);
    transform.name = folder_response.name;
    transform.description = folder_response.description;
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
    transform.content = items_response.data.map(function(current_item){
        if(current_item.type != "folder"){
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
    transform.name = account_response.name;
    transform.email = account_response.emails.preferred;
    transform.avatar_url = '';
    transform.created_date = new Date(account_response.updated_time);
    transform.modified_date = new Date(account_response.updated_time);
    transform.id = account_response.id;
    transform._raw = account_response;
    return transform;
}
exports.parseAccountInfo = parseAccountInfo;

function parseQuota(quota_response){
    var transform = {};
    transform.total_bytes = quota_response.quota; //total space allocated in bytes
    transform.used_bytes = quota_response.quota - quota_response.available; //bytes used.
    transform.limits= {
    }
    transform._raw = quota_response;
    return transform;
}
exports.parseQuota = parseQuota;

