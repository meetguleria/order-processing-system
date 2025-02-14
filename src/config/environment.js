module.exports = {
  DYNAMO_TABLE_NAME: process.env.DYNAMO_TABLE_NAME,
  SQS_QUEUE_URL: process.env.SQS_QUEUE_URL,
  SNS_TOPIC_ARN: process.env.SNS_TOPIC_ARN,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
};
