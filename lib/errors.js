var util = require('util');

/**
 * Thrown when a parameter provided is absent, malformed or invalid for other reasons
 * @constructor FFParameterRejected
 * @method FFParameterRejected
 * @param {String} parameter - the name of the parameter that is invalid
 * @return 
 */
function FFParameterRejected(parameter) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'A parameter provided is absent, malformed or invalid for other reasons: '+parameter;
}
util.inherits(FFParameterRejected, Error);
exports.FFParameterRejected = FFParameterRejected;

/**
 * Thrown when the signature provided does not match the one calculated by the service.
 * @constructor FFSignatureInvalid
 * @method FFSignatureInvalid
 * @param {String} message
 * @return 
 */
function FFSignatureInvalid(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The signature provided does not match the one calculated by the service.'+ (message ||'');
}
util.inherits(FFSignatureInvalid, Error);
exports.FFSignatureInvalid = FFSignatureInvalid;

/**
 * Thrown when the consumer key/client key provided is unsupported.
 * @constructor FFCustomerKeyUnknown
 * @method FFCustomerKeyUnknown
 * @param {String} message
 * @return 
 */
function FFCustomerKeyUnknown(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The consumer key provided is unsupported.'+ (message ||'');
}
util.inherits(FFCustomerKeyUnknown, Error);
exports.FFCustomerKeyUnknown = FFCustomerKeyUnknown;


/**
 * Thrown when the access token provided is expired, revoked, malformed or invalid for other reasons.
 * @constructor FFTokenRejected
 * @method FFTokenRejected
 * @param {String} message
 * @return 
 */
function FFTokenRejected(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The access token provided is expired, revoked, malformed or invalid for other reasons.'+ (message ||'');
}
util.inherits(FFTokenRejected, Error);
exports.FFTokenRejected = FFTokenRejected;

/**
 * The access token does not have the correct access scopes.
 * @constructor FFAdditionalAuthorizationRequired
 * @method FFAdditionalAuthorizationRequired
 * @param {String} message
 * @return 
 */
function FFAdditionalAuthorizationRequired(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The access token does not have the correct access scopes.' +(message ||'');
}
util.inherits(FFAdditionalAuthorizationRequired, Error);
exports.FFAdditionalAuthorizationRequired = FFAdditionalAuthorizationRequired;

/**
 * Thrown when the rate limit has been reached.
 * @constructor FFRateLimit
 * @method FFRateLimit
 * @param {String} message
 * @return 
 */
function FFRateLimit(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The rate limit has been reached.' +(message ||'');
}
util.inherits(FFRateLimit, Error);
exports.FFRateLimit = FFRateLimit;



/**
 * Thrown when the file or folder you tried to access does not exist.
 * @constructor FFItemDoesNotExist
 * @method FFItemDoesNotExist
 * @param {String} message
 * @return 
 */
function FFItemDoesNotExist(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The file or folder you tried to access does not exist.' +(message ||'');
}
util.inherits(FFItemDoesNotExist, Error);
exports.FFItemDoesNotExist = FFItemDoesNotExist;

/**
 * Thrown when could not complete action. User is over quota
 * @constructor FFOverQuota
 * @method FFOverQuota
 * @param {String} message
 * @return 
 */
function FFOverQuota(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'Could not complete action. User is over quota' +(message ||'');
}
util.inherits(FFOverQuota, Error);
exports.FFOverQuota = FFOverQuota;