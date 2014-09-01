var async = require('async');

var Category = require('../model/game');
var Game = require('../model/game');

function MapCategory(cat){
    var ret = {};
    ret.name = cat.name;
    ret.
}
/*
 {
    "name": "Action",
    "title": "Action Games",
    "url": "http://www.frip.com/action-games",
    "gamex": {
      "s": "1",
      "d": "frip.com",
      "baseUrl": "http://www.frip.com/",
      "siteUrl": "http://www.frip.com/",
      "parentUrl": "http://www.frip.com/",
      "staticUrl": "http://srv1.us.gamex.com/files/",
      "thumbsUrl": [
        "img1.us.gamex.com",
        "img2.us.gamex.com",
        "img3.us.gamex.com",
        "img4.us.gamex.com"
      ],
      "thumbsDir": "files/thumbs",
      "imgLogo": "http://srv1.us.gamex.com/files/logo/frip.com.png",
      "cols": "16",
      "rows": "8",
      "so": "su",
      "pageWidth": 1280,
      "pageHeight": 640,
      "minwidth": 960,
      "thumbsize": 80,
      "thumbWidth": 60,
      "thumbHeight": 60,
      "margin": 0,
      "tid": "1",
      "cid": "40",
      "category": "action-games",
      "cpage": 1,
      "lp": 4,
      "emp": [],
      "m": 0,
      "sp": "1",
      "v": "2"
    }
  }
 */

function MapGame(game){

}

var json = {
    games: require('../../json/games.json'),
    categories: require('../../json/catgories-gamex.json')
};

Game.remove(function(error, count){
    
    if(error)
        return console.log('Error ocurred removing Games', error);
        
    console.log('All games removes (' + count + ')');
    
    Category.remove(function(){
        
        if(error)
            return console.log('Error ocurred removing Games', error);
    
        console.log('All games removes (' + count + ')');
        
        
        
    })
})




