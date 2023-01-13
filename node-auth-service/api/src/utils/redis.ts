import IoRedis, { RedisOptions } from 'ioredis'

const options: RedisOptions = {
  host: process.env.REDIS_IP,
  port: Number(process.env.REDIS_PORT),
}

// option of session;
export function redisClient() {
  const client = new IoRedis(options);

  client.on('error', (err: Error) => {
    console.error('Session Redis error: ' + err);
  });
  client.on('connect', () => {
    console.log('Session connected to redis');
  });
  return client
}
