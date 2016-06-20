var express = require('express'),
    settings = require("./settings"),
    http = require('http'),
    mongoStorage = require("./storage/mongo"),
    redisStrorage = require("./storage/redis"),
    log = require("./log").logger;

mongoStorage.init(settings).then(function() {
    return redisStrorage.init(settings);
}).then(function() {
    return log.init(settings);
}).then(function() {

    var app = express();
    
    app.get('/', function(req, res, next) {
        mongoStorage.getAllAnimales().then(function(animals) {
            return res.status(200).json(animals);
        }).otherwise(function(err) {
            return res.status(500).json(err.response);
        });
    });

    app.post('/animal', function(req, res, next) {
        mongoStorage.createAnimals({
            name: req.params.name
        }).then(function(animal) {
            redisStrorage.plusOne(animal.name).then(function(count) {
                return res.status(200).json(animal);
            }).otherwise(function(err) {
                return res.status(500).json(err.response);
            });
        }).otherwise(function(err) {
            return res.status(500).json(err.response);
        });
    });

    app.listen(settings.port || 4000, settings.host || "0.0.0.0", function() {
        process.title = "node";
        log.info("Server now running at " + (process.env.PORT || 8080));
        log.help("To stop app gracefully just type in shell pkill node");
    });

});
