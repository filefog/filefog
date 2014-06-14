/**
 * Module dependencies.
 */
var initialize = require('../middleware/initialize')

/**
 * Framework support for Connect/Express.
 * This module provides support for using FileFog with Express.  It exposes
 * middleware that conform to the `fn(req, res, next)` signature and extends
 * Node's built-in HTTP request object with useful authentication-related
 * functions.
 * @api protected
 * @method exports
 * @return ObjectExpression
 */
module.exports = function() {


    return {
        initialize: initialize
    };
};