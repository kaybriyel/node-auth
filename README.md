# Instruction

Please follow the instruction and do not try to modify any file

## Run docker compose
docker-compose up -d

- portal runs at port 8080
- engine runs at port 8081
- api runs at port 8082
- socket runs at port 8083
- cache (redis) runs at port 8084

## Visit app
- open browser
- visit http://localhost:8080

By default, engine saves session-cookie into redis cache whenever the portal interacts with engine.

## sign up, sign in, sign out
- POST  : portal -> engine -> api
- RES   : api -> engine -> portal

## get users, data
- GET   : portal -> engine -> api
- RES   : api -> engine -> portal

## sid, authenticate
- GET   : portal -> engine
- RES   : engine -> portal

## hi
- EMIT  : portal -> socket
- EMIT  : socket -> portal

## sockets
- GET   : portal -> socket
- RES   : socket -> portal