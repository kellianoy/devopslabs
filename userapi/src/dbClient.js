var redis = require("redis");
var retryStrategy = require("node-redis-retry-strategy");
const configure = require('./configure')

const config = configure()
var client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  retry_strategy: retryStrategy({
    allow_to_start_without_connection: true,
    number_of_retry_attemps: 1000,
    wait_time: 1000,
  })
})

process.on('SIGINT', function() {
  client.quit();
});

module.exports = client
