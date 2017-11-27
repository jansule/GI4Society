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
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/muenster', function(req, res){
    res.sendFile(__dirname + '/public/muenster.json');
});

app.listen(8080, function(){
    console.log('http server now listening on port 8080');
});

