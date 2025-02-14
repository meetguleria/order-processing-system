const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.publishMessage = async (topicArn, messageBody) => {
  const params = {
    Message: JSON.stringify(messageBody),
    TopicArn: topicArn,
  };
  await sns.publish(params).promise();
};
