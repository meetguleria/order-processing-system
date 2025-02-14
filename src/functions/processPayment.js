const { updateItem } = require('../utils/dynamoHelper');

exports.handler = async (event) => {
  const record = JSON.parse(event.Records[0].body);
  const { orderID } = record;

  // Simulate payment processing
  const paymentStatus = 'Confirmed';

  // Update order status in DynamoDB
  await updateItem(orderID, { status: paymentStatus, updatedAt: new Date().toISOString() });

  return {
    statusCode: 200,
    body: JSON.stringify({ orderID, status: paymentStatus }),
  };
};
