const { handler } = require('../functions/createOrder');
const { putItem } = require('../utils/dynamoHelper');
const { sendMessage } = require('../utils/sqsHelper');
const { v4: uuidv4 } = require('uuid');

jest.mock('../utils/dynamoHelper');
jest.mock('../utils/sqsHelper');
jest.mock('uuid');

describe('createOrder handler', () => {
  it('should create an order and send a payment processing task to SQS', async () => {
    const event = {
      body: JSON.stringify({
        userID: 'user123',
        items: [{ price: 10, quantity: 2 }],
      }),
    };

    const orderID = 'mock-order-id';
    uuidv4.mockReturnValue(orderID);

    const putItemMock = putItem.mockResolvedValue();
    const sendMessageMock = sendMessage.mockResolvedValue();

    const result = await handler(event);

    // Parse the returned body from the handler
    const parsedBody = JSON.parse(result.body);

    expect(putItemMock).toHaveBeenCalledWith({
      orderID,
      userID: 'user123',
      items: [{ price: 10, quantity: 2 }],
      totalPrice: 20,
      status: 'Pending',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    expect(sendMessageMock).toHaveBeenCalledWith(process.env.SQS_QUEUE_URL, { orderID });

    // Assert on the parsed object rather than the JSON string
    expect(result.statusCode).toEqual(201);
    expect(parsedBody).toEqual({
      orderID,
      userID: 'user123',
      items: [{ price: 10, quantity: 2 }],
      totalPrice: 20,
      status: 'Pending',
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
