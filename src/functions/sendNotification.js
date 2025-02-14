const { publishMessage } = require('../utils/snsHelper');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { orderID, message } = body;

  // Publish notification to SNS
  await publishMessage(process.env.SNS_TOPIC_ARN, { orderID, message });

  return {
    statusCode: 200,
    body: JSON.stringify({ orderID, status: 'Notification Sent' }),
  };
};
