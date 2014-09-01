var express = require('express');
var app = express();

var db = require('./models/db');

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.set('strict routing', true);

app.use('/static', express.static(__dirname + '/static'));

app.get('/', require('./controllers/index'));

/*
app.get('/all-images', function(req, res){
    
    var body = '';
    
    require('./models/game').find(function(error, games){
        
        res.type('html');
        
        games.forEach(function(game){
            body += '<img src="' + game.thumb_url + '" width="60" height="60">';
        })
        
        res.send(body);
    })
})
*/

app.get('/screens', function(req, res){
    var Game = require('./models/game');
    Game.find(function(error, games){
        var json = {
            width: {
                max: -Infinity,
                min: Infinity
            },
            height: {
                max: -Infinity,
                min: Infinity
            }
        }
        
        for(var i = 0, game; game = games[i]; i++){
            
            var screen = game.screen;
            
            if(screen.width > json.width.max)
                json.width.max = screen.width;
            if(screen.width < json.width.min)
                json.width.min = screen.width;
            if(screen.height > json.height.max)
                json.height.max = screen.height;
            if(screen.height < json.height.min)
                json.height.min = screen.height;
            
        }
        
        res.type('json');
        res.send(JSON.stringify(json, null, 2));
    })
})

app.get('/address', function(req, res){
    res.type('json');
    res.send(JSON.stringify(server.address(), null, 2));
})

app.get('/:category', require('./controllers/category'));
app.get('/games/:game', require('./controllers/game'));


var server = app.listen(3000, function(){
    console.log('Listening on port %d', server.address().port);
})