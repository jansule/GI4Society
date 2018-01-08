(function(){
    'use strict';
    // var vals = {};
    // vals.val1 = 0;
    // vals.val2 = 0;
    // vals.val3 = 0;

    var muenster;
    var mapcontrol;
    var maplegend;


    $(window).ready(function(){
        helper.setFactorsAndQueries();
        // TODO
        // show error page if values are invalid
        // use helper.invalid for this
        helper.setSliders(helper.queries);
        mapcontrol = mapper.createMapControl();
        mapcontrol.addTo(mapper.mymap);

        maplegend = mapper.createLegend();
        maplegend.addTo(mapper.mymap);
        
        mapper.prepareMap(mapcontrol, muenster);
    });

    $('#first').slider().on('change', function(){
        console.log('fired event');
        helper.queries.first = $('#first').slider('getValue');//.data('slider')['$element'][0].dataset.value;
        console.log(helper.queries.first);
    });

    $('#second').slider().on('change', function(){
        console.log('fired event');
        helper.queries.second = $('#second').slider('getValue');//.data('slider')['$element'][0].dataset.value);
        console.log(helper.queries.second);
        console.log(typeof helper.queries.second);
    });

    // $('#val3').slider().on('change', function(){
    //     console.log('fired event');
    //     vals.val3 = $('#val3').slider('getValue');//.data('slider')['$element'][0].dataset.value;
    //     console.log(vals.val3);
    // });

    $('#submit').on('click', function(){
        helper.submit(helper.queries);
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