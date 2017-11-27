(function(){
    'use strict';
    var vals = {};
    vals.val1 = 0;
    vals.val2 = 0;
    vals.val3 = 0;

    var muenster;
    var mapcontrol;


    $(window).ready(function(){
        helper.prepareData(vals);
        mapcontrol = mapper.createMapControl();
        mapcontrol.addTo(mapper.mymap);
        mapper.prepareMap(mapcontrol, muenster);
    });

    $('#val1').slider().on('change', function(){
        console.log('fired event');
        vals.val1 = $('#val1').slider('getValue');//.data('slider')['$element'][0].dataset.value;
        console.log(vals.val1);
    });

    $('#val2').slider().on('change', function(){
        console.log('fired event');
        vals.val2 = $('#val2').slider('getValue');//.data('slider')['$element'][0].dataset.value);
        console.log(vals.val2);
        console.log(typeof vals.val2);
    });

    $('#val3').slider().on('change', function(){
        console.log('fired event');
        vals.val3 = $('#val3').slider('getValue');//.data('slider')['$element'][0].dataset.value;
        console.log(vals.val3);
    });

    $('#submit').on('click', function(){
        helper.submit(vals);
    });

    $('#success-btn').on('click', function(){
        /**
         * TODO:
         * Write function that calls api-endpoint with positive feedback
         */
    });

    $('#fail-btn').on('click', function(){
        /**
         * TODO:
         * Write function that calls api-endpoint with negative feedback
         */
    });
})();