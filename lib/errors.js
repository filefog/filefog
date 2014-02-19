var util = require('util');

function FFParameterRejected(parameter) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'A parameter provided is absent, malformed or invalid for other reasons: '+parameter;
}
util.inherits(FFParameterRejected, Error);
exports.FFParameterRejected = FFParameterRejected;

function FFSignatureInvalid(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The signature provided does not match the one calculated by the service.'+ (message ||'');
}
util.inherits(FFSignatureInvalid, Error);
exports.FFSignatureInvalid = FFSignatureInvalid;

function FFCustomerKeyUnknown(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The consumer key provided is unsupported.'+ (message ||'');
}
util.inherits(FFCustomerKeyUnknown, Error);
exports.FFCustomerKeyUnknown = FFCustomerKeyUnknown;


function FFTokenRejected(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The access token provided is expired, revoked, malformed or invalid for other reasons.'+ (message ||'');
}
util.inherits(FFTokenRejected, Error);
exports.FFTokenRejected = FFTokenRejected;

function FFAdditionalAuthorizationRequired(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The access token does not have the correct access scopes.' +(message ||'');
}
util.inherits(FFAdditionalAuthorizationRequired, Error);
exports.FFAdditionalAuthorizationRequired = FFAdditionalAuthorizationRequired;

function FFRateLimit(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The rate limit has been reached.' +(message ||'');
}
util.inherits(FFRateLimit, Error);
exports.FFRateLimit = FFRateLimit;



function FFItemDoesNotExist(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The file or folder you tried to access does not exist.' +(message ||'');
}
util.inherits(FFItemDoesNotExist, Error);
exports.FFItemDoesNotExist = FFItemDoesNotExist;

function FFOverQuota(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'Could not complete action. User is over quota' +(message ||'');
}
util.inherits(FFOverQuota, Error);
exports.FFOverQuota = FFOverQuota;