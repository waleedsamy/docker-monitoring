var when = require("when"),
    redis = require("redis");

var client;


module.exports = {
    init: function(settings) {
        return when.promise(function(resolve, reject) {
            client = redis.createClient({
                port: settings.storage.redis.port || 6379,
                host: settings.storage.redis.host || '127.0.0.1',
            });
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
