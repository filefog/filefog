var q = require('q')
    , extend = require('node.extend');

/**
 * `FileFog` constructor.
 * @api public
 * @constructor FileFog
 * @method FileFog
 * @return 
 */
function FileFog() {
    this._key = 'filefog';
    this._provider_definitions = {};
    this._serializers = [];
    this._deserializers = [];
    this._infoTransformers = [];
    this._framework = null;

    this.init();
}

/**
 * Initialize authenticator.
 * @api protected
 * @method init
 * @return 
 */
FileFog.prototype.init = function() {
    this.framework(require('./framework/connect')());
};

/**
 * Utilize the given `provider` with optional `configuration`
 * Examples:
 *     filefog.use('dropbox', require('filefog-dropbox'), {client_key : 'sl47p7pijvtp73h',client_secret : 'j6vluc5yq7dxnj6'});;
 * @api public
 * @method use
 * @param {String} name
 * @param {Object} provider_definition
 * @param {Object} config
 * @return ThisExpression
 */
FileFog.prototype.use = function(name, provider_definition,config) {

    if(!provider_definition || !provider_definition.provider || !provider_definition.transform || !provider_definition.client || !provider_definition.config){
        var message = ""
        if(!provider_definition) {message+=" Provider Definition is null or undefined."}
        if(!provider_definition.provider) {message+=" Provider is null or undefined."}
        if(!provider_definition.transform) {message+=" Transform is null or undefined."}
        if(!provider_definition.client) {message+=" Client is null or undefined."}
        if(!provider_definition.config) {message+=" Config is null or undefined."}

        throw new Error("Could not register provider, it is invalid." + message)
    }
    else if(!name){
        throw new Error("Provider name is missing")
    }

    config = extend(true,provider_definition.config, config);
    delete provider_definition.config;

    this._provider_definitions[name] = {
        classes:provider_definition,
        config: config
    };
    return this;
};

/**
 * Un-utilize the `provider` with given `name`.
 * In typical applications, the necessary authentication strategies are static,
 * configured once and always available.  As such, there is often no need to
 * invoke this function.
 * However, in certain situations, applications may need dynamically configure
 * and de-configure authentication strategies.  The `use()`/`unuse()`
 * combination satisfies these scenarios.
 * Examples:
 *     FileFog.unuse('legacy-api');
 * @api public
 * @method unuse
 * @param {String} name
 * @return ThisExpression
 */
FileFog.prototype.unuse = function(name) {
    if(!name){
        throw new Exception("Provider name is missing")
    }
    delete this._provider_definitions[name];
    return this;
};

/**
 * Setup FileFog to be used under framework.
 * By default, FileFog exposes middleware that operate using Connect-style
 * middleware using a `fn(req, res, next)` signature.  Other popular frameworks
 * have different expectations, and this function allows FileFog to be adapted
 * to operate within such environments.
 * If you are using a Connect-compatible framework, including Express, there is
 * no need to invoke this function.
 * Examples:
 *     filefog.framework(require('hapi-passport')());
 * @api public
 * @method framework
 * @param {Object} fw
 * @return ThisExpression
 */
FileFog.prototype.framework = function(fw) {
    this._framework = fw;
    return this;
};
/**
 * FileFog's primary initialization middleware.
 * This middleware must be in use by the Connect/Express application for
 * FileFog to operate.
 * *
 * Examples:
 *     app.configure(function() {
 *       app.use(FileFog.initialize());
 *     });
 * @api public
 * @method initialize
 * @return CallExpression
 */
FileFog.prototype.initialize = function() {

    return this._framework.initialize(this);
};

/**
 * Method that will return an instance of a wrapped Provider when given `provider` name,
 * Examples:
 *     var dropboxProvider = FileFog.provider('dropbox');
 * @api public
 * @method provider
 * @param {String} name
 * @param {Object} default_filefog_options
 * @return CallExpression
 */
FileFog.prototype.provider = function(name,default_filefog_options) {
    var definition = this._provider_definitions[name];
    if(!definition){
        throw new Exception("Provider name is missing.")
    }

    var ProviderWrapper = require('./wrapper/provider_wrapper');
    if(!definition){
        throw new Exception("Could not find provider for that name.")
    }
    return ProviderWrapper(name,definition.classes, definition.config,default_filefog_options);
};

/**
 * Direct method to instantiate a Client, if you already have the credentials needed to use it
 * Examples:
 *     var dropboxClient = FileFog.client('dropbox', {
 * access_token: 'ya29.1.AADtN_W5vWUjYklaE_ZNkJBd2y9Ot60jF4SewLivnLgLHDYhmiadzbPPZntHmL4nceXs0w',
 * refresh_token: '1/IMcWJR9KJPVguuKLUrHzMjRl-XECLf6mK2YoUYnbQaU'
 * });
 * @api public
 * @method client
 * @param {String} name
 * @param {Object} credentials
 * @param {Object} default_filefog_options
 * @return CallExpression
 */
FileFog.prototype.client = function(name, credentials, default_filefog_options){
    var ClientWrapper = require('./wrapper/client_wrapper');
    var definition = this._provider_definitions[name];
    return q.when(ClientWrapper(name,definition.classes.client, definition.classes.transform, definition.config, credentials,default_filefog_options))
}

/**
 * Return provider definition with given `name`.
 *
 * @param {String} name
 * @return {definition}
 * @api private
 */
FileFog.prototype._definition = function(name) {
    return this._provider_definitions[name];
};


/**
 * Expose `FileFog`.
 */
module.exports = new FileFog();

