/*
 * JSONPject
 * https://github.com/condenast/jsonpject
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */
'use strict';

var url = require('url');
var qstring = require('querystring');

module.exports = function jsonpject(remote_url, cb){
  var fn_name;
  var new_url = remote_url;
  var fn = function(){};
  var urls = url.parse(remote_url);
  var queries = qstring.parse(urls.query);

  if(typeof cb !== 'function'){
    throw new Error("Callback must be a function");
  }

  if('callback' in queries){
    if(queries.callback === '?'){
      fn_name = 'jsonpject_'+require('randomstring').generate(7);
      queries.callback = fn_name;
    } else {
      fn_name = queries.callback;
    }

    urls.query = qstring.stringify(queries);
    new_url = url.format(urls);
    fn = function(){
        cb.call(window);
    };
  }

  return {
    fn_name: fn_name,
    fn: fn,
    url: new_url
  };
};