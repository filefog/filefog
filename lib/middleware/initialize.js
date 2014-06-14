
/**
 * This is a placeholder initialization function for connect supported frameworks.
 * It can be used to save session state, but is currently not implemented.
 * @method exports
 * @param {} filefog
 * @return FunctionExpression
 */
module.exports = function initialize(filefog) {

    return function initialize(req, res, next) {
//        req._passport = {};
//        req._passport.instance = passport;
//
//        if (req.session && req.session[passport._key]) {
//            // load data from existing session
//            req._passport.session = req.session[passport._key];
//        } else if (req.session) {
//            // initialize new session
//            req.session[passport._key] = {};
//            req._passport.session = req.session[passport._key];
//        } else {
//            // no session is available
//            req._passport.session = {};
//        }

        next();
    };
};