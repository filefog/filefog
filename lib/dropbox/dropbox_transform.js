function parseFileInformation(file_response){
    var transform = {};
    transform.is_file = file_response.isFile;
    transform.is_folder = file_response.isFolder;
    transform.etag = file_response.versionTag;
    transform.identifier = file_response.path;
    var path_parts = file_response.path.split('/')
    path_parts.pop();
    var parent_path = path_parts.join('/')
    transform.parent_identifier = parent_path;
    transform.mimetype = file_response.mime_type
    transform.created_date = new Date(file_response.modifiedAt);
    transform.modified_date = new Date(file_response.modifiedAt);
    transform.name = file_response.name;
    transform.description = '';
    //transform.extension = file_response.name.split('.')
    transform.checksum = file_response.contentHash;
    transform.file_size = file_response.size;
    transform._raw = file_response;
    return transform;
}
exports.parseFileInformation = parseFileInformation;

function parseFolderInformation(folder_response){
    var transform = {};
    transform.is_file = folder_response.isFile;
    transform.is_folder = folder_response.isFolder;
    transform.etag = folder_response.versionTag;
    transform.identifier = folder_response.path;
    var path_parts = folder_response.path.split('/')
    path_parts.pop();
    var parent_path = path_parts.join('/')
    transform.parent_identifier = parent_path;
    transform.created_date = new Date(folder_response.modifiedAt);
    transform.modified_date = new Date(folder_response.modifiedAt);
    transform.name = folder_response.name;
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

    /*
     "total_count": 0,
     "entries": [],
     "offset": 0,
     "limit": 100,
     "order": [
     {
     "by": "type",
     "direction": "ASC"
     },
     {
     "by": "name",
     "direction": "ASC"
     }
     ]
     * */

    var transform = {};
    transform.total_items = null;
    transform.content = items_response.content_stat_array.map(function(current_item){
        if(current_item.isFile){
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
    transform.email = account_response.email;
    transform.avatar_url = '';
    transform.created_date = null;
    transform.modified_date = null;
    transform.id = account_response.uid;
    transform._raw = account_response;
    return transform;
}
exports.parseAccountInfo = parseAccountInfo;

function parseQuota(quota_response){
    var transform = {};
    transform.total_bytes = quota_response.quota; //total space allocated in bytes
    transform.used_bytes = quota_response.usedQuota; //bytes used.
    transform.limits= {
    }
    transform._raw = quota_response;
    return transform;
}
exports.parseQuota = parseQuota;

