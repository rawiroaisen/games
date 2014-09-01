var fs = require('fs');

var json = {
    categories: require('../../json/categories-gamex.json'),
    games: require('../../json/games-extended.json')
}

var files = {
    categories: __dirname + '/categories.json',
    games: __dirname + '/games.json'
}

var catid = 1;
var gameid = 1;

var categoriesCid = Object.create(null);

function GetCategory(cid){
    return categoriesCid[cid];
}

var map = {
    
    /*
     * var schema = mongoose.Schema({
            id: Number,
            name: String,
            slug: String,
            frip: {
                id: Number,
                url: String
            }
        })
     */
    
    categories: function(c){
        var id = catid++;
        var fripid = c.gamex.cid | 0
        
        categoriesCid[fripid] = id;
        
        return {
            id: id,
            name: c.name,
            slug: c.gamex.category.replace(/-games$/, ''),
            frip: {
                id: c.gamex.cid | 0,
                url: c.url
            }
        };
    },
    
    
    
    
    
    games: function(g){
        return {
            id: gameid++,
            name: g.title,
            slug: g.alias,
            format: g.format,
            categories: g.categories.map(GetCategory),
            
            screen: {
                width: g.extended.gwidth | 0,
                height: g.extended.gheight | 0,
                resizable: !!g.extended.resizable
            },
            
            flashvars: !(g.extended.flashParam instanceof Array) ? g.extended.flashParam : {},
                
            frip: {
                id: g.mid | 0,
                url: 'http://www.frip.com' + g.game_url,
                thumbsup: g.thumbsup | 0,
                played: g.played | 0,
                categories: g.categories.map(Number)
            }
        };
    }
}


fs.writeFileSync(files.categories, JSON.stringify(json.categories.map(map.categories), null, 2));
console.log('Categories saved to:', files.categories);

fs.writeFileSync(files.games, JSON.stringify(json.games.map(map.games), null, 2));
console.log('Games saved to:', files.games);