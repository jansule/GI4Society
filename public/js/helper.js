/**
 * Helper for general functionality of page
 */
'use strict';
var helper = {};
helper.invalid = false;
helper.submit = function(vals){
        var _url = '/?';
        for(var i in vals){
            _url += i + '=' +  vals[i] + '&';
        }
        var _finalUrl = _url.substring(0, _url.length-1);
        window.location = _finalUrl;
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
        } 
        console.debug('queries', helper.queries);
    } else {
        location.search = 'ageDist=0&popDensity=0&citizenship=0&malefemale=0&employment=0&pricesqm=0';
        helper.queries.ageDist = 0;
        helper.queries.popDensity = 0;
        helper.queries.citizenship = 0;
        helper.queries.malefemale = 0;
        helper.queries.employment = 0;
        helper.queries.pricesqm = 0;
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
    ageDist: [0.3, 0.6, 1],
    popDensity: [0.3, 0.6, 1],
    citizenship: [0.3, 0.6, 1],
    malefemale: [0.3, 0.6, 1],
    employment: [0.3, 0.6, 1],
    pricesqm: [0.3, 0.6, 1]
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
    var result = 0;
    for(var i in obj.ranks){
        result = result + (helper.factors[i] * obj.ranks[i]);
    }
    return result;
};

helper.giveFeedback = function(setup, helpful){
    console.log('setup', JSON.stringify(setup));
    console.log('helpful', JSON.stringify(helpful));
    $.ajax({
        url: 'feedback',
        method: 'POST',
        data: {setup: setup, helpful: helpful},
        success: function(data, textStatus, xhr){
            console.log('in success of feedback');
        },
        error: function(xhr, textStatus, errorThrown){
            console.log('error in feedback');
        }
    });
    /**
     * url: '/muenster',
        method: 'GET',
        success: function(data, textStatus, xhr){
        error: function(xhr, textStatus, errorThrown){ 
     */
}