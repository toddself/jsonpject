/* global describe, it, afterEach, beforeEach, xdescribe, xit */
/* jshint expr:true */

/*
 * JSONPject
 * https://github.com/condenast/jsonpject
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */
 'use strict';

var jsonpject = require('../index');
var expect = require('chai').expect;
var url = require('url');
var qstring = require('querystring');
var cb = function(){};

describe('JSONPject', function(){
    it('Should return no JSONP implementation', function(){
        var url = 'test.js';
        var jsonp = jsonpject(url, cb);
        expect(jsonp.fn_name).to.be.undefined;
        expect(jsonp.fn).to.a('function');
    });

    it('Should return a JSONP implementation with the URL altered', function(){
        var test_url = 'test.js?callback=?';
        var jsonp = jsonpject(test_url, cb);
        var qs = qstring.parse(url.parse(jsonp.url).query);
        expect(qs.callback).to.not.equal('?');
    });

    it('Should return a JSONP implemenation with a generated name', function(){
        var url = 'test.js?callback=?';
        var jsonp = jsonpject(url, cb);
        expect(jsonp.fn_name).to.not.be.undefined;
        expect(jsonp.fn_name).to.not.equal('?');
        expect(jsonp.fn).to.be.a('function');
    });

    it('Should return a JSONP implementation with a specified name', function(){
        var cb_name = 'testing1234';
        var url = 'test.js?callback='+cb_name;
        var jsonp = jsonpject(url, cb);
        expect(jsonp.fn_name).to.equal(cb_name);
    });

    it('Should throw an error if the callback is not typeof function', function(){
        var url = 'test.js';
        var jsonp;
        try{
            jsonp = jsonpject(url, null);
        } catch(e){
            expect(e.message).to.equal('Callback must be a function');
        }
    });
});
