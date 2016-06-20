var when = require("when"),
    redis = require("redis");

var client;


module.exports = {
    init: function(settings) {
        return when.promise(function(resolve, reject) {
            client = redis.createClient({
                host: settings.storage.redis.ip,
                port: settings.storage.redis.port
            });
            return resolve();
        });
    },
    plusOne: function(animal) {
        return when.promise(function(resolve, response) {
            client.incr("animals:" + animal + ":count", function(err, counter) {
                if (err)
                    return reject(err);
                else
                    return resolve(counter);
            });
        });
    }
};
