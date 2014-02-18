var util = require('util');

function FFParameterAbsent(parameter) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'Your request has a missing parameter: '+parameter;
}
util.inherits(FFParameterAbsent, Error);
exports.FFParameterAbsent = FFParameterAbsent;

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


function FFTokenExpired(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The access token provided is valid, but has expired.'+ (message ||'');
}
util.inherits(FFTokenExpired, Error);
exports.FFTokenExpired = FFTokenExpired;

function FFTokenRejected(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'The access token provided does not have the right format'+(message ||'');
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