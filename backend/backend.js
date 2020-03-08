var Redis = require("ioredis");
var redis = new Redis('redis://redis');
const RSMQPromise = require("rsmq-promise");
const rsmq = new RSMQPromise( {host: 'redis', port: 6379, ns: 'rsmq'} );

const queueName = 'myqueue'
const queueChannel = 'rsmq:rt:myqueue'


async function main(){

  await processQueue();

  redis.subscribe(queueChannel, function(err, count) {
    console.log('Subscribed to %s!', queueName)
  });

  redis.on("message", async function(channel, message) {
    await processQueue();
  });
}



async function processQueue(){
  while(await hasMessages()){
    const message = await rsmq.receiveMessage({ qname: queueName });
    console.log('receiveMessage: { id: %s, message: %s }', message.id, message.message);

    const result = await rsmq.deleteMessage({ qname: queueName, id: message.id });
    console.log('deleteMessage:', result);
  }
}

async function hasMessages(){
  const attributes = await rsmq.getQueueAttributes({ qname: queueName });
  console.log('getQueueAttributes (msgs):', attributes.msgs);
  return attributes.msgs > 0;
}

main();