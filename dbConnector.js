"use strict";

var mongoose = require('mongoose');

var feedbackSchema = new mongoose.Schema({
    AverageAge: Number,
    AverageHouseHoldSize: Number,
    populationDensity: Number,
    unemployment: Number,
    populationPctMen: Number,
    ProportionCitizenship: Number,
    AverageMonthlyRentalPrice: Number,
    positive: Number,
    negative: Number
});

	
var feedbackModel = mongoose.model('Feedback', feedbackSchema);



exports.connect = function(dbAdress, dbName, callback){
	var uri = 'mongodb://' + dbAdress + '/' + dbName;
	var options = {};
	mongoose.connect(uri, options);

	mongoose.connection.on('error', function(){ callback('database connection error'); });
	mongoose.connection.once('open', function(){ callback(null); });
};

exports.feedbacks = feedbackModel;