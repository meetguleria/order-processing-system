const { putItem, updateItem, deleteItem } = require('../utils/dynamoHelper');
const { sendMessage } = require('../utils/sqsHelper');
const { publishMessage } = require('../utils/snsHelper');

jest.mock('../utils/dynamoHelper');
jest.mock('../utils/sqsHelper');
jest.mock('../utils/snsHelper');

describe('Utility Functions', () => {
  it('should put an item into DynamoDB', async () => {
    const item = { orderID: 'mock-order-id', userID: 'user123' };
    const putItemMock = putItem.mockResolvedValue();
    await putItem(item);
    expect(putItemMock).toHaveBeenCalledWith(item);
  });

  it('should update an item in DynamoDB', async () => {
    const orderID = 'mock-order-id';
    const updates = { status: 'Confirmed', updatedAt: new Date().toISOString() };
    const updateItemMock = updateItem.mockResolvedValue();
    await updateItem(orderID, updates);
    expect(updateItemMock).toHaveBeenCalledWith(orderID, updates);
  });

  it('should delete an item from DynamoDB', async () => {
    const orderID = 'mock-order-id';
    const deleteItemMock = deleteItem.mockResolvedValue();
    await deleteItem(orderID);
    expect(deleteItemMock).toHaveBeenCalledWith(orderID);
  });

  it('should send a message to SQS', async () => {
    const queueUrl = 'mock-queue-url';
    const messageBody = { orderID: 'mock-order-id' };
    const sendMessageMock = sendMessage.mockResolvedValue();
    await sendMessage(queueUrl, messageBody);
    expect(sendMessageMock).toHaveBeenCalledWith(queueUrl, messageBody);
  });

  it('should publish a message to SNS', async () => {
    const topicArn = 'mock-topic-arn';
    const messageBody = { orderID: 'mock-order-id', message: 'Order confirmed' };
    const publishMessageMock = publishMessage.mockResolvedValue();
    await publishMessage(topicArn, messageBody);
    expect(publishMessageMock).toHaveBeenCalledWith(topicArn, messageBody);
  });
});
