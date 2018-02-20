/**
 * Helper functions related to leaflet.
 * Includes tilelayers, overlays and (custom) mapcontrols as well as styles
 */

'use strict';
var mapper = {};
mapper.mymap = L.map('mapid').setView([51, 7], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'OSM Contributors &amp; <a href="https://www.github.com/webwurst" target="_blank">Tobias Bradtke aka webwurst</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoianNoYiIsImEiOiJjaW5nbW12M2kwMDA2dzdrbGVoNTNhaGsxIn0.DCS2ApHL4A5RSVvqnFPZ8Q'
}).addTo(mapper.mymap);

mapper.prepareMap = function(control, lyrname, data){
    console.log('received data in mapper.prepareMap', data);
    // $.ajax({
    //     url: '/muenster',
    //     method: 'GET',
    //     success: function(data, textStatus, xhr){
            // create ranking for each feature
            // for(var i in data.features[0].features){
                // var feature = data.features[0].features[i];
                /**
                 * REMOVE THIS PART AND REPLACE WITH ACTUAL VALUES
                 */
                // feature.properties.vals = {};
                // feature.properties.vals.ageDist = Math.random();
                // feature.properties.vals.popDensity = Math.random();
                // feature.properties.vals.citizenship = Math.random();
                // feature.properties.vals.malefemale = Math.random();
                // feature.properties.vals.employment = Math.random();
                // feature.properties.vals.pricesqm = Math.random();

                /**
                 * END REMOVING
                 */
                // create real ranking
                // feature.properties.ranks = {};
                // helper.rank(feature.properties);
                // feature.properties.overallScore = helper.overallScore(feature.properties);
                // console.debug('overallResult', feature.properties);
            // }
            // helper.overallRanking(data.features[0].features);

            // layer actions and styles
            lyrname = new L.GeoJSON(data, {
                onEachFeature: function(feature, layer){
                    layer.on({
                        click: function(e){
                            control.update(e.target);
                        },
                        mouseover: function(e){
                            e.target.setStyle({
                                color: 'white'
                            });
                            e.target.bringToFront();
                        },
                        mouseout: function(e){
                            e.target.setStyle({
                                color: '#808080'
                            });
                        }
                    });
                },
                style: mapper.setStyle
            }).addTo(mapper.mymap);
            mapper.mymap.fitBounds(lyrname.getBounds());
    //     },
    //     error: function(xhr, textStatus, errorThrown){ 
    //         console.log(errorThrown);
    //     }
    // });
};

mapper.createMapControl = function(){
    var control = L.control();
    
    control.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'gi4control');
        this.update();
        return this._div;
    };

    control.update = function(props){
        this._div.innerHTML = '<h4>Details</h4>';
        if(props){
            var districtName = props.feature.properties.vals.uri.split('http://vocab.demographics.de/')[1];
            this._div.innerHTML += districtName + '<br>';
            this._div.innerHTML += '<h5>Overall Score: ' + props.feature.properties.overallScore + '</h5>';
            var tab = '<table class="gi4table">';
            tab += '<tr><td></td><td>Value</td><td>Score</td></tr>';
            var pr = props.feature.properties.vals;
            for(var i in helper.classes){
                tab += '<tr><td>' + i + '</td><td>' + pr[i].toFixed(2) + '</td><td class="gi4rank">' + props.feature.properties.ranks[i] + '</td></tr>';
            }
            tab += '</table>';
            this._div.innerHTML += tab;
        } else {
            this._div.innerHTML += 'Click on district to get some information';
        }
    }

    return control;
};

mapper.createLegend = function(){
    var ct = L.control({position: 'bottomleft'});
    ct.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'col gi4control');
        var classes = [1,2,3];
        // for(var i in helper.classes.ageDist){
        //     classes.push(parseInt(i) + 1);
        // }
        for(var i in classes){
            this._div.innerHTML += '<div class="gi4div"><i class="gi4legend" style="background:' + mapper.legendColor(classes[i]) + '"></i> ' + mapper.getLabel(classes[i])+ '</div>';
        }
        return this._div;
    };

    return ct;
 };

mapper.getColor = function(val){
    return val >= helper.percentile75 ? '#5cb85c' : // green
           val >= helper.percentile25 ? '#f0ad4e' : // orange
                     '#d9534f';  // red
};

mapper.legendColor = function(val){
    return val > 2 ? '#5cb85c' : // green
           val > 1 ? '#f0ad4e' : // orange
                '#d9534f';  // red
}

mapper.setStyle = function(feat){
    return {
        fillColor: mapper.getColor(feat.properties.overallScore),
        weight: 1.5,
        opacity: 1,
        color: '#808080',
        fillOpacity: 0.7
    };
};

mapper.getLabel = function(val){
    return val > 2 ? 'very good' : // green
    val > 1 ? 'good' : // orange
              'poor';  // red
};