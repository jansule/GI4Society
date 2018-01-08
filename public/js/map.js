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

mapper.prepareMap = function(control, lyrname){
    $.ajax({
        url: '/muenster',
        method: 'GET',
        success: function(data, textStatus, xhr){
            // create ranking for each feature
            for(var i in data.features[0].features){
                var feature = data.features[0].features[i];
                // set dummy values
                feature.properties.vals = {};
                feature.properties.vals.first = Math.random();
                feature.properties.vals.second = Math.random();

                // create real ranking
                feature.properties.ranks = {};
                helper.rank(feature.properties);
                feature.properties.overallRanking = helper.overallRanking(feature.properties);
                console.debug('overallResult', feature.properties);
            }

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
        },
        error: function(xhr, textStatus, errorThrown){ 
            console.log(errorThrown);
        }
    });
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
            this._div.innerHTML += props.feature.properties.Name + '<br>';
            this._div.innerHTML += '<h5>Overall Ranking: ' + props.feature.properties.overallRanking + '</h5>';
            var tab = '<table class="gi4table">';
            tab += '<tr><td>Factor</td><td>Value</td><td>Rank</td></tr>';
            var pr = props.feature.properties.vals;
            for(var i in pr){
                tab += '<tr><td>' + i + '</td><td>' + pr[i] + '</td><td class="gi4rank">' + props.feature.properties.ranks[i] + '</td></tr>';
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
        var classes = [];
        for(var i in helper.classes.first){
            classes.push(parseInt(i) + 1);
        }
        for(var i in classes){
            this._div.innerHTML += '<div class="gi4div"><i class="gi4legend" style="background:' + mapper.getColor(classes[i]) + '"></i> ' + mapper.getLabel(classes[i])+ '</div>';
        }
        return this._div;
    };

    return ct;
 };

mapper.getColor = function(val){
    return val > 2 ? '#5cb85c' : // green
           val > 1 ? '#f0ad4e' : // orange
                     '#d9534f';  // red
};

mapper.setStyle = function(feat){
    return {
        fillColor: mapper.getColor(feat.properties.ranks.first),
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