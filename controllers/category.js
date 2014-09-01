var Category = require('../models/category');
var Game = require('../models/game');

module.exports = function(req, res){
    
    var slug = req.param('category');
    
    Category.findOne({slug: slug}, function(error, category){
        
        if(error)
            return res.send('Category Model Error: \n' + error);
        
        if(!category)
            return res.send('404 - No category with slug: "' + slug + '"');
        
        Game.find({categories: category.id}, function(error, games){
            
            if(error)
                return res.send('Game Model Error: \n' + error);
            
            res.render('category', {category: category, games: games});
        })        
    })
}