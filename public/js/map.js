    'use strict';
    var mymap = L.map('mapid').setView([51, 7], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'balbla',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoianNoYiIsImEiOiJjaW5nbW12M2kwMDA2dzdrbGVoNTNhaGsxIn0.DCS2ApHL4A5RSVvqnFPZ8Q'
    }).addTo(mymap);