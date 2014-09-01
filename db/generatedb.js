var async = require('async');
var mongoose = require('mongoose');

var Category = require('../models/category');
var Game = require('../models/game');

function save(obj, done){
    obj.save(logdone(obj.name + ' saved', done));
}

function _new(constructor){
    return function(arg){
        return new constructor(arg);
    }
}

function logdone(log, done){
    return function(error){
        if(error){
            console.log(log + ' - Error:', error);
        } else{
            console.log(log);
        }
        
        if(done){
            done(error);
        }
    }
}

mongoose.connect('mongodb://localhost/test');

 mongoose.connection.on('error', function(error){
    console.log('Error connecting mongoose', error);
})

async.series([
    
    function(done){
         mongoose.connection.once('open', logdone('Database opened', done));
    },
    
    function(done){
        Category.collection.remove(logdone('Category collection removed', done));
    },
    
    function(done){
        Game.collection.remove(logdone('Game collection removed', done));
    },
    
    function(done){
        var cats = require('./categories.json').map(_new(Category));
        async.each(cats, save, logdone('Categories saved', done));
    },
    
    function(done){
        var games = require('./games.json').map(_new(Game));
        async.each(games, save, logdone('Games saved', done));
    },
    
    function(done){
        console.log('All loaded');
        done();
    }
])
