var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    settings = require("./settings"),
    mongoStorage = require("./storage/mongo"),
    redisStrorage = require("./storage/redis"),
    log = require("./log"),
    server;

mongoStorage.init(settings).then(function() {
    return redisStrorage.init(settings);
}).then(function() {

    var app = express();

    server = http.createServer(function(req, res) {
        app(req, res);
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get('/', function(req, res, next) {
        mongoStorage.getAllAnimales().then(function(animals) {
            log.info("animal fetched correctly");
            return res.status(200).json(animals);
        }).otherwise(function(err) {
            log.error(err.response);
            return res.status(500).json(err.response);
        });
    });

    app.post('/animal', function(req, res, next) {
        mongoStorage.createAnimals({
            name: req.body.name
        }).then(function(animal) {
            log.info("animal created");
            redisStrorage.plusOne(animal.name).then(function(count) {
                log.info("animal count increased");
                return res.status(200).json(animal);
            }).otherwise(function(err) {
                log.error(err.response);
                return res.status(500).json(err.response);
            });
        }).otherwise(function(err) {
            log.error(err.response);
            return res.status(500).json(err.response);
        });
    });

    var getListenPath = function() {
        return "http://" + settings.host + ":" + settings.port;
    };

    server.on("error", function(err) {
        if (err.errno === "EADDRINUSE") {
            log.error("Unable to listen on " + getListenPath());
            log.error("Error: port in use");
        } else {
            log.error("Uncaught Exception:");
            if (err.stack) {
                log.error(err.stack);
            } else {
                log.error(err);
            }
        }
        process.exit(1);
    });

    server.listen(settings.port, settings.host, function() {
        process.title = "node";
        log.info("Server now running at " + getListenPath());
        log.help("To stop app gracefully just type in shell pkill node");
    });

}).otherwise(function(err) {
    log.error("mongoStorage error " + err.message);
});

process.on("uncaughtException", function(err) {
    log.error("[node] Uncaught Exception:");
    if (err.stack) {
        log.error(err.stack);
    } else {
        log.error(err);
    }
    process.exit(1);
});

process.on("unhandledRejection", function(err) {
    log.error("[node] unhandled Rejection:");
    if (err.stack) {
        log.error(err.stack);
    } else {
        log.error(err);
    }
    // in production forever daemon will restart the app , so don"t worry
    // should we use cluster and fork node app here ??!!
    process.exit(1);
});

process.on("SIGINT", function() {
    log.prompt("[node] IS DOWN NOW");
    process.exit();
});
