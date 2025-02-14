const { handler } = require('../functions/processPayment');
const { updateItem } = require('../utils/dynamoHelper');

jest.mock('../utils/dynamoHelper');

describe('processPayment handler', () => {
  it('should update the order status to Confirmed', async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify({ orderID: 'mock-order-id' }),
        },
      ],
    };

    const updateItemMock = updateItem.mockResolvedValue();

    const result = await handler(event);

    expect(updateItemMock).toHaveBeenCalledWith('mock-order-id', {
      status: 'Confirmed',
      updatedAt: expect.any(String),
    });

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        orderID: 'mock-order-id',
        status: 'Confirmed',
      }),
    });
  });
});
