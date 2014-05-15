[![build status](https://secure.travis-ci.org/toddself/jsonpject.png)](http://travis-ci.org/toddself/jsonpject)
# JSONPject

Takes a JSONP script (one that has a callback=) in the query string and a callback and provides a new script URL specifiying a new callback which wraps the passed in callback.  The included script will call the provided callback, ensuring your callback is only called when the JSONP script has finished loading.

# Usage
This sort of assumes you're using something to let you use CommonJS modules on the browser end.

```javascript
var jsonpject = require('jsonpject');

function my_callback(data){
    do_something_with(data);
}

var jsonp = jsonpject('http://test.com/a_script.js?callback=?');
window[jsonp.fn_name] = jsonp.fn;
var scr = document.createElement('script');
scr.src = jsonp.url;
document.head.appendChild(scr);
```

# Testing

Uses grunt to do testing. Test is available from npm

`npm install`
`npm test`

# License
JSONPject is provided under the terms of the [MIT License](/LICENSE)
Copyright 2013 Condé Nast