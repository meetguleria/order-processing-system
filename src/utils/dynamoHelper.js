const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DYNAMO_TABLE_NAME;

exports.putItem = async (item) => {
  const params = {
    TableName: tableName,
    Item: item,
  };
  await dynamo.put(params).promise();
};

exports.updateItem = async (orderID, updates) => {
  const params = {
    TableName: tableName,
    Key: { orderID },
    UpdateExpression: 'set #status = :status, updatedAt = :updatedAt',
    ExpressionAttributeNames: { '#status': 'status' },
    ExpressionAttributeValues: { ':status': updates.status, ':updatedAt': updates.updatedAt },
  };
  await dynamo.update(params).promise();
};

exports.deleteItem = async (orderID) => {
  const params = {
    TableName: tableName,
    Key: { orderID },
  };
  await dynamo.delete(params).promise();
};
