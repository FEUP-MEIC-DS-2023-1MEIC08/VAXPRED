const express = require('express');
const cors = require('cors');
const { Kafka } = require('kafkajs');

const app = express();
app.use(cors());
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['127.0.0.1:9092'],
});

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();
  console.log('Kafka producer connected');
};

runProducer().catch(console.error);

app.use(express.json());

app.post('/log-to-kafka', async (req, res) => {
  const { action, pluginId } = req.body;

  if (!action || !pluginId) {
    return res.status(400).send('Invalid request: action and pluginId are required');
  }

  const kafkaMessage = {
    action,
    pluginId,
    timestamp: Date.now(),
  };

  try {
    await producer.send({
      topic: 'testTopic',
      messages: [{ value: JSON.stringify(kafkaMessage) }],
    });

    res.status(200).send('Logged to Kafka successfully');
  } catch (error) {
    console.error('Error sending message to Kafka:', error);
    res.status(500).send('Error sending message to Kafka');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
