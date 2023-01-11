import IoRedis, { RedisOptions } from 'ioredis'

const sessionOptions: RedisOptions = {
  host: '192.168.158.42',
  port: 6379,
}

// option of session;
export function sessionClient() {
  const sessionClient = new IoRedis(sessionOptions);

  sessionClient.on('error', (err: Error) => {
    console.error('Session Redis error: ' + err);
  });
  sessionClient.on('connect', () => {
    console.log('Session connected to redis');
  });
  return sessionClient
}
