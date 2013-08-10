/*
 * JSONPject
 * https://github.com/condenast/jsonpject
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */
'use strict';

var url = require('url');
var qstring = require('querystring');

/**
 * Return a bunch of JSONP info if necessary from a remote script tag
 * @method jsonpject
 * @param  {String}   remote_url The URL of your JSONP script
 * @param  {Function} cb         The callback to invoke when the JSONP script has finished loading
 * @return {Object}
 *         @param {String}    fn_name The name of the JSONP-callback to attach to the `window` object
 *         @param {Function}  fn      The JSONP-callback
 *         @param {String}    url     The JSONP-replaced URL for injecting
 */
module.exports = function jsonpject(remote_url, cb){
  var fnName;
  var fn = function(){};
  var urls = url.parse(remote_url);
  var queries = qstring.parse(urls.query);

  if(typeof cb !== 'function'){
    throw new Error("Callback must be a function");
  }

  if('callback' in queries){
    if(queries.callback === '?'){
      fnName = 'jsonpject_'+require('randomstring').generate(7);
      queries.callback = fnName;
    } else {
      fnName = queries.callback;
    }
    
    // http://nodejs.org/api/url.html: search is prefered over query, so we use search otherwise
    // we'd have to do urls.search = undefined as well
    urls.search = qstring.stringify(queries);
    remote_url = url.format(urls);

    fn = function(){
        cb.apply(window, Array.prototype.slice(arguments, 0));
    };
  }

  return {
    fnName: fnName,
    fn: fn,
    url: remote_url
  };
};
