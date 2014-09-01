var Game = require('../models/game');

module.exports = function(req, res){
    
    var slug = req.param('game');
    
    Game.findOne({slug: slug}, function(error, game){
        
        if(error)
            return res.send('Error in Game Model: ' + error);
    
        if(!game)
            return res.send('404 - No game with slug: "' + slug + '"');
        
        res.render('game', {game: game});
        
    })
}