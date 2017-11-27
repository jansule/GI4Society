/**
 * Helper for general functionality of page
 */
'use strict';
var helper = {};
helper.submit = function(vals){
        var _url = '/?val1=' + vals.val1 + '&val2=' + vals.val2 + '&val3=' + vals.val3;
        window.location = _url;
    };

helper.prepareData = function(vals){
    console.log(location.search);
    if(location.search.length != 0){

        var url_query = location.search.replace('?', '');
        var queries = url_query.split('&');
        for(var i in queries){
            var query = queries[i].split('=');
            var val = parseInt(query[1]);
            if(val > 1) val = 1;
            else if(val < -1) val = -1;
            $('#' + query[0]).slider('setValue', val);
            vals[query[0]] = val;
        }
    }
};