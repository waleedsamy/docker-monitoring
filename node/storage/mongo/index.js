var when = require("when"),
    mongoose = require("mongoose"),
    animalSchema = require("./models/animal"),
    settings, $animal;

/**
 * @param request instance of ./models/animal.js
 **/
function createAnimals(animals) {
    return when.promise(function(resolve, reject) {
        if (!(animals instanceof Array)) {
            animals = [animals];
        }
        $animal.collection.insert(animals, function(err, docs) {
            if (err) {
                return reject(err);
            }
            return resolve(docs.ops);
        });
    });
}

function getAllAnimales() {
    return when.promise(function(resolve, reject) {
        $animal.find({}, function(err, logs) {
            if (err) {
                return reject(err);
            }
            return resolve(logs);
        });
    });
}


module.exports = {
    init: function(_settings) {
        return when.promise(function(resolve, reject) {
            settings = _settings;
            var uri = "mongodb://" + settings.storage.mongo.ip + ":" + settings.storage.mongo.port + "/" + settings.storage.mongo.database;
            var options = {
                db: {
                    native_parser: true
                },
                server: {
                    poolSize: 5
                },
                user: settings.storage.mongo.username || "",
                pass: settings.storage.mongo.password || ""
            };
            var conn;
            try {
                conn = mongoose.createConnection(uri, options);
            } catch (e) {
                return reject(e);
            }
            // why => http://stackoverflow.com/a/12807133
            $animal = conn.model("animal", animalSchema, "animal");
            return resolve();
        });
    },
    createAnimals: createAnimals,
    getAllAnimales: getAllAnimales
};
