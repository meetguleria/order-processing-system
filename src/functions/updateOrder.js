const { updateItem } = require('../utils/dynamoHelper');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { orderID, updates } = body;

  // Update order in DynamoDB
  await updateItem(orderID, { ...updates, updatedAt: new Date().toISOString() });

  return {
    statusCode: 200,
    body: JSON.stringify({ orderID, status: 'Updated' }),
  };
};
