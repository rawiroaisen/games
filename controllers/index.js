var Category = require('../models/category');

module.exports = function IndexController(req, res){
    
    //res.send('Hola!');
    
    Category.find(function(error, docs){
        
        if(error)
            return res.send('Category model Error:', error);
        
        //res.set('Content-Type', 'application/json');
        
        res.render('index', {categories: docs});
        
        //res.send(JSON.stringify(docs, null, 2));
        
    })
}