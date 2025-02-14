const { deleteItem } = require('../utils/dynamoHelper');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { orderID } = body;

  // Delete order from DynamoDB
  await deleteItem(orderID);

  return {
    statusCode: 200,
    body: JSON.stringify({ orderID, status: 'Deleted' }),
  };
};
