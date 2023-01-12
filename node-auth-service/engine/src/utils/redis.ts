import IoRedis, { RedisOptions } from 'ioredis'

const options: RedisOptions = {
  host: process.env.REDIS_IP,
  port: Number(process.env.REDIS_PORT),
}

// option of session;
export function sessionClient() {
  const sessionClient = new IoRedis(options);

  sessionClient.on('error', (err: Error) => {
    console.error('Session Redis error: ' + err);
  });
  sessionClient.on('connect', () => {
    console.log('Session connected to redis');
  });
  return sessionClient
}
