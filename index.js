var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('./dbConnector.js');
var feedbacks = mongo.feedbacks;

var app = express();

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}));

app.use(bodyParser.json({limit: '5mb'}));
app.use('/', express.static(__dirname + '/public'));

mongo.connect('127.0.0.1:27017', 'feedbackDB', function(err){
    if(err){
        console.error('Aborting: ' + err);
        process.exit(1);
    }

    console.log('connection to database established on ' + '123.0.0.1:27017');
    app.listen(8080, function(){
        console.log('http server now listening on port 8080');
    });
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/feedback', function(req, res){
    var setup = req.body.setup;
    for(var i in setup){
        setup[i] = parseInt(setup[i]); 
    }
    if(req.body.helpful == 'true') {
        console.log('received positive feedback');
    } else {
        console.log('received negative feedback');
    }
    feedbacks.findOne({
        AverageAge: setup.AverageAge,
        AverageHouseHoldSize: setup.AverageHouseHoldSize,
        populationDensity: setup.populationDensity,
        unemployment: setup.unemployment,
        populationPctMen: setup.populationPctMen,
        ProportionCitizenship: setup.ProportionCitizenship,
        AverageMonthlyRentalPrice: setup.AverageMonthlyRentalPrice
    }, function(err, value){
        if(err){
            console.error(err);
            res.status(400).send(err);
        } else {
            if(value){
                // increase counter
                console.log('found existing configuration.');
                if(req.body.helpful == 'true'){
                    console.log('incrementing positive counter');
                    feedbacks.findByIdAndUpdate(value._id, {positive: value.positive+1}, function(err){
                        console.log('done');
                        if(err) console.error(err);
                    });
                } else {
                    console.log('incrementing negative counter');
                    feedbacks.findByIdAndUpdate(value._id, {negative: value.negative+1}, function(err){
                        console.log('done');
                        if(err) console.error(err);
                    });
                }
            } else {
                console.log('creating new configuration');
                // create new db entry
                var feedback = new feedbacks({
                    AverageAge: setup.AverageAge,
                    AverageHouseHoldSize: setup.AverageHouseHoldSize,
                    populationDensity: setup.populationDensity,
                    unemployment: setup.unemployment,
                    populationPctMen: setup.populationPctMen,
                    ProportionCitizenship: setup.ProportionCitizenship,
                    AverageMonthlyRentalPrice: setup.AverageMonthlyRentalPrice
                });
                if(req.body.helpful == 'true'){
                    feedback.positive = 1;
                    feedback.negative = 0;
                } else {
                    feedback.positive = 0;
                    feedback.negative = 1;
                }
                feedback.save(function(err){
                    if(err) console.error(err);
                });
            }
            res.status(202).send('everything is fine');
        }
    });
});

app.get('/feedback', function(req, res){
    console.log('seding feedback');
    feedbacks.find({}, function(err, value){
        if(err) console.error(err);
        res.send(value);
    })
});


