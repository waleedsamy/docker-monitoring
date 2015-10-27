var express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    redis = require('redis');

var app = express();

console.log('REDIS ' + process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);
console.log('MONGO ' + process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT);

// APPROACH 1: Using environment variables created by Docker
 var client = redis.createClient(
 	process.env.REDIS_PORT_6379_TCP_PORT,
   	process.env.REDIS_PORT_6379_TCP_ADDR
 );

// APPROACH 2: Using host entries created by Docker in /etc/hosts (RECOMMENDED)
//var client = redis.createClient('6379', 'redis');

mongoose.connect('mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT + '/testsss');

var Cat = mongoose.model('Cat', { name: String , count: Number});

app.get('/', function(req, res, next) {
  client.incr('counter', function(err, counter) {
    if(err) return next(err);
    var cat = { name: 'Zildjian' , count: counter};
    var kitty = new Cat(cat);
    kitty.save(function (err) {
      if (err) return next(err);
      res.send('This page has been viewed ' + counter + ' times! you has ' + JSON.stringify(cat) );
    });
  });
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});