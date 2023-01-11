import IoRedis, { RedisOptions } from 'ioredis'

const options: RedisOptions = {
  host: 'cache',
  port: 6379,
}

// option of session;
const client = new IoRedis(options);

client.on('error', (err: Error) => {
  console.error('Session Redis error: ' + err);
});
client.on('connect', () => {
  console.log('Session connected to redis');
});

export default client