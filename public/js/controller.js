(function(){
    'use strict';
    var vals = {};
    vals.val1 = 0;
    vals.val2 = 0;
    vals.val3 = 0;

    var layer;

    $(window).ready(function(){
        prepareData();
        prepareMap();
    });

    $('#val1').slider().on('change', function(){
        console.log('fired event');
        vals.slider1 = $('#slider1').slider().data('slider')['$element'][0].dataset.value;
        console.log(vals.val1);
    });

    $('#val2').slider().on('change', function(){
        console.log('fired event');
        vals.slider1 = $('#slider2').slider().data('slider')['$element'][0].dataset.value;
        console.log(vals.val2);
    });

    $('#val3').slider().on('change', function(){
        console.log('fired event');
        vals.slider1 = $('#slider3').slider().data('slider')['$element'][0].dataset.value;
        console.log(vals.val3);
    });

    $('#submit').on('click', function(){
        submit();
    });

    ////////////

    function submit(){
        console.log(vals);
        var _url = '/?val1=' + vals.slider1 + '&val2=' + vals.slider2 + '&val3=' + vals.slider3;
        console.log(_url);
        window.location = _url;
    }

    function prepareData(){
        console.log('hello world');
        console.log(location.search);
        var url_query = location.search.replace('?', '');
        var queries = url_query.split('&');
        for(var i in queries){
            var query = queries[i].split('=');
            // vals[query[0]] = parseInt(query[1]);
            $('#' + query[0]).slider('setValue', parseInt(query[1]));
        }
        console.log(url_query);
        console.log(queries);
        console.log(vals);
    }

    function prepareMap(){
        $.getJSON('../muenster.json', function(json){
            layer = new L.GeoJSON(json).addTo(mymap);
            mymap.fitBounds(layer.getBounds());
        });
    }
})();