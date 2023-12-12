const { Kafka } = require('kafkajs');
const fs = require('fs');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092'],
  groupId: 'my-consumer-group',
});

const consumer = kafka.consumer({ groupId: 'my-group' });

const logFilePath = 'kafka_messages.log'; // Change this to your desired file path

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'testTopic' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const logData = {
        value: message.value.toString(),
        partition,
        offset: message.offset,
      };
      const logLine = JSON.stringify(logData) + '\n'; // Format the log data as needed

      // Log to console
      console.log(logLine);

      // Write to log file
      fs.appendFile(logFilePath, logLine, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        }
      });
    },
  });
};

runConsumer().catch(console.error);
