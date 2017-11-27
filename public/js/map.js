/**
 * Helper functions related to leaflet.
 * Includes tilelayers, overlays and (custom) mapcontrols as well as styles
 */

'use strict';
var mapper = {};
mapper.mymap = L.map('mapid').setView([51, 7], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'OSM Contributors &amp; <a href="github.com/webwurst">Tobias Bradtke aka webwurst</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoianNoYiIsImEiOiJjaW5nbW12M2kwMDA2dzdrbGVoNTNhaGsxIn0.DCS2ApHL4A5RSVvqnFPZ8Q'
}).addTo(mapper.mymap);

mapper.prepareMap = function(control, lyrname){
    $.ajax({
        url: '/muenster',
        method: 'GET',
        success: function(data, textStatus, xhr){
            lyrname = new L.GeoJSON(data, {
                onEachFeature: function(feature, layer){
                    layer.on({
                        click: function(e){
                            control.update(e.target);
                        },
                        mouseover: function(e){
                            e.target.setStyle({
                                color: 'black'
                            });
                        },
                        mouseout: function(e){
                            e.target.setStyle({
                                color: 'blue'
                            });
                        }
                    });
                }
            }).addTo(mapper.mymap);
            mapper.mymap.fitBounds(lyrname.getBounds());
            console.log(data);
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
            this._div.innerHTML += props.feature.properties.Name;
        } else {
            this._div.innerHTML += 'Click on district to get some information';
        }
    }

    return control;
};