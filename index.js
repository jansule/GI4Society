var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}));

app.use(bodyParser.json({limit: '5mb'}));
app.use('/', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.send(__dirname + 'index.html');
});

app.listen(8080, function(){
    console.log('http server now listening on port 8080');
});

