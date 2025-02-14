const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.sendMessage = async (queueUrl, messageBody) => {
  const params = {
    MessageBody: JSON.stringify(messageBody),
    QueueUrl: queueUrl,
  };
  await sqs.sendMessage(params).promise();
};
