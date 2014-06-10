/**
 * Module dependencies.
 */
var initialize = require('../middleware/initialize')

/**
 * Framework support for Connect/Express.
 *
 * This module provides support for using FileFog with Express.  It exposes
 * middleware that conform to the `fn(req, res, next)` signature and extends
 * Node's built-in HTTP request object with useful authentication-related
 * functions.
 *
 * @return {Object}
 * @api protected
 */
module.exports = function() {


    return {
        initialize: initialize
    };
};