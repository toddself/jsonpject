/*
 * JSONPject
 * https://github.com/condenast/jsonpject
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */
'use strict';

var url = require('url');
var qstring = require('querystring');

module.exports = function jsonpject(url, cb){
  var fn_name;
  var new_url = url;
  var fn = function(){};
  var url_parts = url.parse(url);
  var query_parts = qstring.parse(url_parts.query);

  if('callback' in Object.keys(query_parts)){
    fn_name = 'bromote_'+require('randomstring').generate(7);
    query_parts.callback = fn_name;
    url_parts.query = qstring.stringify(query_parts);
    new_url = url.format(url_parts);
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