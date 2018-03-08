(function(){
    'use strict';

    var muenster;
    var mapcontrol;
    var maplegend;


    /**
     * Main controller. Putting together all required setup and handlings
     */
    $(window).ready(function(){
        helper.setFactorsAndQueries();
        helper.setSliders(helper.queries);
        mapcontrol = mapper.createMapControl();
        mapcontrol.addTo(mapper.mymap);

        maplegend = mapper.createLegend();
        maplegend.addTo(mapper.mymap);
        // Load data from triple store
        helper.getData(function(data){
            for(var i in data.features){
                helper.rank(data.features[i].properties);
                data.features[i].properties.overallScore = helper.overallScore(data.features[i].properties);
            }
            // computing overall ranking and preparing Map
            helper.overallRanking(data.features);
            mapper.prepareMap(mapcontrol, muenster, data);
        });
    });

    /**
     * Listeners for the different sliders
     */
    $('#populationDensity').slider().on('change', function(){
        helper.queries.populationDensity = $('#populationDensity').slider('getValue');
    });

    $('#populationPctMen').slider().on('change', function(){
        helper.queries.populationPctMen = $('#populationPctMen').slider('getValue');
    });

    $('#AverageHouseHoldSize').slider().on('change', function(){
        helper.queries.AverageHouseHoldSize = $('#AverageHouseHoldSize').slider('getValue');
    });

    $('#AverageMonthlyRentalPrice').slider().on('change', function(){
        helper.queries.AverageMonthlyRentalPrice = $('#AverageMonthlyRentalPrice').slider('getValue');
    });

    $('#ProportionCitizenship').slider().on('change', function(){
        helper.queries.ProportionCitizenship = $('#ProportionCitizenship').slider('getValue');
    });

    $('#AverageAge').slider().on('change', function(){
        helper.queries.AverageAge = $('#AverageAge').slider('getValue');
    });

    $('#unemployment').slider().on('change', function(){
        helper.queries.unemployment = $('#unemployment').slider('getValue');
    });

    $('#submit').on('click', function(){
        helper.submit(helper.queries);
    });

    $('#success-btn').on('click', function(){
        helper.giveFeedback(helper.queries, true);
    });

    $('#fail-btn').on('click', function(){
        helper.giveFeedback(helper.queries, false);
    });
})();