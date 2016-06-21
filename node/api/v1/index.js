var mongoStorage = require("../../storage/mongo"),
    redisStrorage = require("../../storage/redis"),
    log = require("../../log");

module.exports = {

    getAll: function(req, res, next) {
        mongoStorage.getAllAnimales().then(function(animals) {
            log.info("animals fetched correctly");
            return res.status(200).json(animals);
        }).otherwise(function(err) {
            log.error(err.response);
            return res.status(500).json(err.response);
        });
    },
    createAnimal: function(req, res, next) {
        mongoStorage.createAnimal(req.body.name).then(function(animal) {
            log.info("animal " + animal.name + " created");
            redisStrorage.plusOne(animal.name).then(function(count) {
                log.info("animal " + animal.name + " count increased to " + count);
                return res.status(200).json(animal);
            }).otherwise(function(err) {
                log.error(err.response);
                return res.status(500).json(err.response);
            });
        }).otherwise(function(err) {
            log.error(err.response);
            return res.status(500).json(err.response);
        });
    }
}
