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

// define classes from top to bottom
helper.classes = {
    first: [0.3, 0.6, 1],
    second: [0.3, 0.6, 1]
};

// helper.rank = function(geojson){
//     var json = JSON.parse(JSON.stringify(geojson));
//     var feat = json.features[0].features;
//     for(var i in feat){
//         var featprop = feat[i].properties;
//         featprop.ranks = {};
//         for(var j in featprop.vals){
//             // var tmp = feat.sort(function(a,b){
//             //     if(a.properties[j] < b.properties[j]) return -1;
//             //     if(a.properties[j] > b.properties[j]) return 1;
//             //     return 0;
//             // });
//             // for(var k in tmp){
//             //     featprop.ranks[j] = k;
//             // }
//             // console.log('iterating over each val');
//             var foundClass = false;
//             for(var k in this.classes[j]){
//                 if(featprop.vals[j] <= this.classes[j][k]){
//                     if(!foundClass) featprop.ranks[j] = parseInt(k) + 1;
//                     foundClass = true;
//                 } 
//             }
//         }
//     }
//     console.log('after ranking', feat);
// };

helper.rank = function(obj){
    for(var i in obj.vals){
        var foundClass = false;
        for(var j in this.classes[i]){
            if(obj.vals[i] <= this.classes[i][j]){
                if(!foundClass) obj.ranks[i] = parseInt(j) + 1;
                foundClass = true;
            }
        }
    }
};