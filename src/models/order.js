exports.orderSchema = {
  orderID: { type: 'string', required: true },
  userID: { type: 'string', required: true },
  items: { type: 'array', required: true },
  totalPrice: { type: 'number', required: true },
  status: { type: 'string', required: true },
  createdAt: { type: 'string', required: true },
  updatedAt: { type: 'string', required: true },
};
