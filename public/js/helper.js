/**
 * Helper for general functionality of page
 */
'use strict';
var helper = {};
helper.invalid = false;
helper.submit = function(vals){
        // var _url = '/?val1=' + vals.val1 + '&val2=' + vals.val2 + '&val3=' + vals.val3;
        var _url = '/?';
        for(var i in vals){
            _url += i + '=' +  vals[i] + '&';
        }
        window.location = _url;
    };

helper.factors = {};
helper.queries = {};
helper.setFactorsAndQueries = function(){
    if(location.search.length != 0){

        var url_query = location.search.replace('?', '');
        var queries = url_query.split('&');
        for(var i in queries){
            var query = queries[i].split('=');
            var val = parseInt(query[1]);
            switch(val){
                case -1:
                    helper.factors[query[0]] = 0;
                    helper.queries[query[0]] = -1
                    break;
                case 0:
                    helper.factors[query[0]] = 1;
                    helper.queries[query[0]] = 0;
                    break;
                case 1:
                    helper.factors[query[0]] = 2;
                    helper.queries[query[0]] = 1;
                    break;
                default:
                    helper.invalid = true;
                    break;
            }
            // if((val == 1){
            //     helper.factors[query[0]] = 2;
            // } else {
            //     throw 'Invalid value in query';
            //     helper.invalid = true;
            // }
            // if(val > 1) val = 1;
            // else if(val < -1) val = -1;
            // $('#' + query[0]).slider('setValue', val);
            // vals[query[0]] = val;
        } 
        console.debug('queries', helper.queries);
    } else {
        helper.queries.first = 0;
        helper.queries.second = 0;
    }
}
helper.setSliders = function(queries){
    for(var i in queries){
        $('#' + i).slider('setValue', queries[i]);
    }
    // if(location.search.length != 0){

    //     var url_query = location.search.replace('?', '');
    //     var queries = url_query.split('&');
    //     for(var i in queries){
    //         var query = queries[i].split('=');
    //         var val = parseInt(query[1]);
    //         if(val > 1) val = 1;
    //         else if(val < -1) val = -1;
    //         $('#' + query[0]).slider('setValue', val);
    //         vals[query[0]] = val;
    //     }
    // }
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

helper.overallRanking = function(obj){
    // console.debug('queries', helper.factors);
    var result = 0;
    for(var i in obj.ranks){
        result = result + (helper.factors[i] * obj.ranks[i]);
    }
    return result;
};