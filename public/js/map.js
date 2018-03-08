/**
 * Helper functions related to leaflet.
 * Includes tilelayers, overlays and (custom) mapcontrols as well as styles
 */

'use strict';
var mapper = {};

// setting up map
mapper.mymap = L.map('mapid').setView([51, 7], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'OSM Contributors &amp; <a href="https://www.github.com/webwurst" target="_blank">Tobias Bradtke aka webwurst</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoianNoYiIsImEiOiJjaW5nbW12M2kwMDA2dzdrbGVoNTNhaGsxIn0.DCS2ApHL4A5RSVvqnFPZ8Q'
}).addTo(mapper.mymap);

// creating map
mapper.prepareMap = function(control, lyrname, data){
    console.log('received data in mapper.prepareMap', data);
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
};

// creating Info pane in map
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

// create legend
mapper.createLegend = function(){
    var ct = L.control({position: 'bottomleft'});
    ct.onAdd = function(map){
        this._div = L.DomUtil.create('div', 'col gi4control');
        var classes = [1,2,3];
        for(var i in classes){
            this._div.innerHTML += '<div class="gi4div"><i class="gi4legend" style="background:' + mapper.legendColor(classes[i]) + '"></i> ' + mapper.getLabel(classes[i])+ '</div>';
        }
        return this._div;
    };
    return ct;
};

// depending on respective class, color of sub-district changes
mapper.getColor = function(val){
    return val >= helper.percentile75 ? '#5cb85c' : // green
           val >= helper.percentile25 ? '#f0ad4e' : // orange
                     '#d9534f';  // red
};

// defining colors for legend
mapper.legendColor = function(val){
    return val > 2 ? '#5cb85c' : // green
           val > 1 ? '#f0ad4e' : // orange
                '#d9534f';  // red
}

// setting style for sub-districts in maps
mapper.setStyle = function(feat){
    return {
        fillColor: mapper.getColor(feat.properties.overallScore),
        weight: 1.5,
        opacity: 1,
        color: '#808080',
        fillOpacity: 0.7
    };
};

// setting labels for legend
mapper.getLabel = function(val){
    return val > 2 ? 'very good' : // green
    val > 1 ? 'good' : // orange
              'poor';  // red
};