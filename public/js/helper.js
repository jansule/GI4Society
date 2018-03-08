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
helper.percentile25;
helper.percentile75;
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
        // console.debug('queries', helper.queries);
    } else {
        location.search = 'AverageAge=0&AverageHouseHoldSize=0&populationDensity=0&unemployment=0&populationPctMen=0&ProportionCitizenship=0&AverageMonthlyRentalPrice=0';
        helper.queries.AverageAge = 0;
        helper.queries.AverageHouseHoldSize = 0;
        helper.queries.populationDensity = 0;
        helper.queries.unemployment = 0;
        helper.queries.populationPctMen = 0;
        helper.queries.ProportionCitizenship = 0;
        helper.queries.AverageMonthlyRentalPrice = 0;
    }
}
helper.setSliders = function(queries){
    for(var i in queries){
        $('#' + i).slider('setValue', queries[i]);
    }
};

// define classes from top to bottom
helper.classes = {
    AverageAge: [40.255, 42.873],
    AverageHouseHoldSize: [1.594, 2.06],
    populationDensity: [31.49, 65.0],
    unemployment: [0.013, 0.018],
    populationPctMen: [0.475, 0.49],
    ProportionCitizenship: [0.893, 0.921],
    AverageMonthlyRentalPrice: [9.724, 11.202]
};

// rank all values for a single subdistrict
helper.rank = function(obj){

    obj.ranks = {};
    for(var i in this.classes){
        switch(i){
            case 'AverageHouseHoldSize':
                _specialRank(i, helper.queries.AverageHouseHoldSize);
                break;
            case 'populationDensity':
                _specialRank(i, helper.queries.populationDensity);
                break;
            case 'populationPctMen':
                _specialRank(i, helper.queries.populationPctMen);
                break;
            case 'ProportionCitizenship':
                _specialRank(i, helper.queries.ProportionCitizenship);
                break;
            case 'AverageMonthlyRentalPrice':
                _specialRank(i, helper.queries.AverageMonthlyRentalPrice);
                break;
            case 'AverageAge':
                _specialRank(i, helper.queries.AverageAge);
                break;
            default:
                _normalRank(i, helper.queries.unemployment);
                break;
        }
    }

    function _specialRank(index, query){
        if(obj.vals[index] == -1){
            obj.ranks[index] = 0;
        }
        if(query == 0){
            if(obj.vals[index] < helper.classes[index][0] || obj.vals[index] > helper.classes[index][1]){
                obj.ranks[index] = 2;
            } else {
                obj.ranks[index] = 3;
            }
        } else if(query == -1){
            if(obj.vals[index] < helper.classes[index][0]) obj.ranks[index] = 3;
            else if(obj.vals[index] <= helper.classes[index][1]) obj.ranks[index] = 2;
            else obj.ranks[index] = 1;
        } else if(query == 1){
            if(obj.vals[index] < helper.classes[index][0]) obj.ranks[index] = 1;
            else if(obj.vals[index] <= helper.classes[index][1]) obj.ranks[index] = 2;
            else obj.ranks[index] = 3;
        }
    }

    function _normalRank(index, query){
        if(query == 0){
            if(obj.vals[index] < helper.classes[index][0]) obj.ranks[index] = 3;
            else if(obj.vals[index] <= helper.classes[index][1]) obj.ranks[index] = 2;
            else if(obj.vals[index] > helper.classes[index][1]) obj.ranks[index] = 1;
        } 
        else if(query == -1) {
            obj.ranks[index] = 0;
        }
        else if(query == 1){
            if(obj.vals[index] < helper.classes[index][0]) obj.ranks[index] = 4;
            else if(obj.vals[index] <= helper.classes[index][1]) obj.ranks[index] = 2;
            else if(obj.vals[index] > helper.classes[index][1]) obj.ranks[index] = 1;
        }
    }
    // obj.ranks = {};
    // for(var i in obj.vals){
    //     var foundClass = false;
    //     for(var j in this.classes[i]){
    //         if(obj.vals[i] <= this.classes[i][j]){
    //             if(!foundClass) obj.ranks[i] = parseInt(j) + 1;
    //             foundClass = true;
    //         }
    //     }
    // }
};

/**
 * compute overall score
 */
helper.overallScore = function(obj){
    var result = 0;
    for(var i in obj.ranks){
        result += obj.ranks[i];
    }
    return result;
};

/**
 * compute overall ranking
 */
helper.overallRanking = function(obj){
    var ranks = [];
    for(var i in obj){
        ranks.push(obj[i].properties.overallScore);
    }
    ranks.sort(helper.sortFct);
    // console.log(ranks);
    var pos25 = Math.floor(ranks.length * 0.25);
    var pos75 = Math.floor(ranks.length * 0.75);
    helper.percentile25 = ranks[pos25];
    helper.percentile75 = ranks[pos75];
};

// sort function
helper.sortFct = function(a,b){
    return a-b;
};

// feedback functionality
helper.giveFeedback = function(setup, helpful){
    $.ajax({
        url: '/feedback',
        method: 'POST',
        data: {setup: setup, helpful: helpful},
        success: function(data, textStatus, xhr){
            console.log('in success of feedback');
        },
        error: function(xhr, textStatus, errorThrown){
            console.log('error in feedback');
        }
    });
}

// get data from triple store
helper.getData = function(callback){
    $.ajax({
        url: "http://giv-oct2.uni-muenster.de:8890/sparql?default-graph-uri=http%3A%2F%2Fcourse.geoinfo2017.org%2FGB&query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+xsd%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0D%0APREFIX+dbo%3A+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%3E%0D%0APREFIX+geom%3A+%3Chttp%3A%2F%2Fgeovocab.org%2Fgeometry%23%3E%0D%0APREFIX+iso37120%3A+%3Chttp%3A%2F%2Fontology.eil.utoronto.ca%2FISO37120.owl%23%3E%0D%0APREFIX+pcount%3A+%3Chttp%3A%2F%2Fwww.ontotext.com%2Fproton%2Fprotontop%23%3E%0D%0APREFIX+demog%3A+%3Chttp%3A%2F%2Fvocab.demographics.de%3E%0D%0APREFIX+example%3A+%3Chttp%3A%2F%2Fexample.org%2Fdata%2F%3E%0D%0A%0D%0ASELECT+distinct+*%0D%0A%0D%0AWHERE%0D%0A%7B%0D%0A%3Furi+dbo%3ApopulationDensity+%3FpopulationDensity.%0D%0A%3Furi+dbo%3Acity+%3Fcity.%0D%0A%3Furi+dbo%3ApopulationPctMen+%3FpopulationPctMen.%0D%0A%3Furi+dbo%3ApopulationPctWomen+%3FpopulationPctWomen.%0D%0A%3Furi+demog%3AAverageHouseHoldSize+%3FAverageHouseHoldSize.%0D%0A%3Furi+demog%3AAverageMonthlyRentalPrice+%3FAverageMonthlyRentalPrice.%0D%0A%3Furi+demog%3AProportionCitizenship+%3FProportionCitizenship.%0D%0A%3Furi+demog%3AAverageAge+%3FAverageAge.%0D%0A%3Furi+pcount%3ApopulationCount+%3FpopulationCount.%0D%0A%3Furi+iso37120%3A5.1+%3Funemployment.%0D%0A%3Furi+demog%3AAge_0-19+%3FAge_0_19.%0D%0A%3Furi+demog%3AAge_20-39+%3FAge_20_39.%0D%0A%3Furi+demog%3AAge_40-59+%3FAge_40_59.%0D%0A%3Furi+demog%3AAge_60-79+%3FAge_60_79.%0D%0A%3Furi+demog%3AAge_80-inf+%3FAge_80_inf.%0D%0A%3Furi+geom%3APolygon+%3Fpolygon.%0D%0A%7D%0D%0A&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on",
        method: "GET",
        success: function(data, textStatus, xhr){
            console.log("Got data from triple store", data);
            var featCol = {
                "type": "FeatureCollection",
                "features": []
            };
            for(var i in data.results.bindings){
                var feat = data.results.bindings[i].polygon.value.replace(/'/g, "\"");
                feat = JSON.parse(feat);
                feat.properties = {};
                feat.properties.vals = {};
                for(var j in data.head.vars){
                    var val;
                    if(data.head.vars[j] == "polygon") continue;
                    // is float
                    if(data.results.bindings[i][data.head.vars[j]].datatype == "http://www.w3.org/2001/XMLSchema#decimal")
                    {
                        val = parseFloat(data.results.bindings[i][data.head.vars[j]].value);
                    }
                    // is integer
                    else if(data.results.bindings[i][data.head.vars[j]].datatype == "http://www.w3.org/2001/XMLSchema#integer")
                    {
                        val = parseInt(data.results.bindings[i][data.head.vars[j]].value);
                    } 
                    // is string
                    else{
                        val = data.results.bindings[i][data.head.vars[j]].value;
                    }
                    feat.properties.vals[data.head.vars[j]] = val;
                }
                featCol.features.push(feat);
            }
            console.log("created geojson", featCol);
            return callback(featCol);
        },
        error: function(xhr, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
};