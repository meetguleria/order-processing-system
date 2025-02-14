const { v4: uuidv4 } = require('uuid');
const { putItem } = require('../utils/dynamoHelper');
const { sendMessage } = require('../utils/sqsHelper');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const order = {
    orderID: uuidv4(),
    userID: body.userID,
    items: body.items,
    totalPrice: body.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await putItem(order);

  // Send payment processing task to SQS
  await sendMessage(process.env.SQS_QUEUE_URL, { orderID: order.orderID });

  return {
    statusCode: 201,
    body: JSON.stringify(order),
  };
};
