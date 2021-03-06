# Node Redis Queue / Pub-sub demo

## Intro

Rather than making one service dependent on another, this demo uses a queue and pub-sub model to allow one service to emit events and another another service to listen for events and dequeue messages.

The pub-sub model allows listeners to be notified. The queue ensures that messages are guaranteed to be read.

Uses Node and Redis.

## Setup and running

Requires:
- docker
- docker-compose

```
cd frontend && npm i && cd -
cd backendend && npm i && cd -
docker-compose up
```

Once running, go to: ```http://localhost:3001/?msg=YOUR MESSAGE HERE``` and then view the console logs to see the pick by the backend service.
