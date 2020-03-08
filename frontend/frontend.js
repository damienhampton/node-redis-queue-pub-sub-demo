const express = require('express');
const RSMQPromise = require("rsmq-promise");

const queueName = 'myqueue';

async function main(){
  const app = express();
  const rsmq = new RSMQPromise( {host: 'redis', port: 6379, ns: 'rsmq', realtime: true } );

  const queues = await rsmq.listQueues();
  if(!queues.find(q => q === queueName)){
    await rsmq.createQueue({qname: queueName});
  }

  app.use(async (req, res) => {
    console.log(req.url);
    const message = req.query.msg || 'my message';
    await rsmq.sendMessage({ qname: queueName, message })
    console.log('sendMessage', message)
    res.json({ name: 'frontend' });
  })

  app.listen(3001);
}

main();
