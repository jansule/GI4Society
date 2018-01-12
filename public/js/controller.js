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

    $('#ageDist').slider().on('change', function(){
        helper.queries.ageDist = $('#ageDist').slider('getValue');
    });

    $('#popDensity').slider().on('change', function(){
        helper.queries.popDensity = $('#popDensity').slider('getValue');
    });

    $('#citizenship').slider().on('change', function(){
        helper.queries.citizenship = $('#citizenship').slider('getValue');
    });

    $('#malefemale').slider().on('change', function(){
        helper.queries.malefemale = $('#malefemale').slider('getValue');
    });

    $('#employment').slider().on('change', function(){
        helper.queries.employment = $('#employment').slider('getValue');
    });

    $('#pricesqm').slider().on('change', function(){
        helper.queries.pricesqm = $('#pricesqm').slider('getValue');
    });

    $('#submit').on('click', function(){
        helper.submit(helper.queries);
    });

    $('#success-btn').on('click', function(){
        helper.giveFeedback(helper.queries, true);
        /**
         * TODO:
         * Write function that calls api-endpoint with positive feedback
         */
    });

    $('#fail-btn').on('click', function(){
        helper.giveFeedback(helper.queries, false);
        /**
         * TODO:
         * Write function that calls api-endpoint with negative feedback
         */
    });
})();