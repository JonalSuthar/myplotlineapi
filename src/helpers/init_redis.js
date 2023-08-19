const Redis = require('ioredis');

// Create a Redis client instance
// const redis = new Redis({
//   host: 'localhost', // Redis server hostname
//   port: 6379,        // Redis server port 
// });

// // Example: Set a key-value pair
// redis.set('myKey', 'Hello, Redis!');

// // Example: Get the value of a key
// redis.get('myKey').then((value) => {
//   console.log('Value:', value);
// });

// // Close the connection when done
// redis.quit();


const client = new Redis({
  port: 6379,
  host: '127.0.0.1',
});

client.on('connect', () => {
  console.log('Client connected to Redis...');
});

client.on('ready', () => {
  console.log('Client connected to Redis and ready to use...');
});

client.on('error', (err) => {
  console.log(err.message);
});

client.on('close', () => {
  console.log('Client disconnected from Redis');
});

process.on('SIGINT', () => {
  client.quit();
});

module.exports = client;