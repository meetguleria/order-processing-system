```markdown
# Order Processing System Using AWS SAM

A serverless application that processes orders using AWS Lambda, API Gateway, DynamoDB, SQS, and SNS. This project demonstrates how to build a scalable, event-driven order processing workflow using AWS SAM (Serverless Application Model) and Node.js.

---

## Overview

This project implements an order processing workflow where:

- **Orders are created** via a REST API.
- **Order data is stored** in a DynamoDB table.
- **Asynchronous tasks** (such as payment processing) are handled via an SQS queue.
- **Notifications** are sent using SNS.
- A scheduled function periodically cleans up orders.

All of these components are defined in the SAM template (`template.yaml`), which provides a reproducible, version-controlled infrastructure.

---

## Architecture & Design

**Key Components:**

- **AWS Lambda Functions:**
  - **CreateOrderFunction:** Processes order creation requests.
  - **ProcessPaymentFunction:** Handles asynchronous payment processing via SQS.
  - **UpdateOrderFunction:** Updates existing orders.
  - **SendNotificationFunction:** Publishes notifications via SNS.
  - **CleanupOrdersFunction:** Performs scheduled cleanup tasks.

- **Amazon API Gateway:**  
  Exposes RESTful endpoints (e.g., POST `/orders`, PUT `/orders/{orderID}`) to trigger the Lambda functions.

- **Amazon DynamoDB:**  
  Stores order records in the **OrdersTable**.

- **Amazon SQS:**  
  Queues messages for asynchronous processing.

- **Amazon SNS:**  
  Sends notifications regarding order processing events.

---

## Setup & Installation

### Prerequisites

- [AWS CLI](https://aws.amazon.com/cli/)
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- [Node.js](https://nodejs.org/)
- An AWS account with permissions to manage Lambda, API Gateway, DynamoDB, SQS, SNS, and CloudFormation resources.

### Installation Steps

1. **Install Dependencies:**  
   Run the following in your project directory:
   ```
   npm install
   ```

2. **Configure Environment Variables:**  
   Create a `.env` file in the project root with your environment-specific values (e.g., AWS credentials and region).  
   **Note:** Ensure that the `.env` file is excluded from version control.

---

## Local Development & Testing

### Local Development

1. **Build the Application:**
   ```bash
   sam build
   ```

2. **Start the Local API:**
   ```bash
   sam local start-api
   ```
   This command launches a local HTTP server (typically on port 3000) that emulates API Gateway, so you can test endpoints such as `http://localhost:3000/orders`.

3. **Run Tests:**
   Execute your tests (e.g., with `npm test`) to validate function behavior locally.

### Testing the Deployed Application

1. **Obtain the API Endpoint:**
   - In the AWS API Gateway console (us-east-1 region), locate your API.
   - If your API ID is, for example, `roxg24u4zj` and the stage is `Prod`, your invoke URL will be:
     ```
     https://<api-id>.execute-api.<region>.amazonaws.com/Prod/orders
     ```

2. **Test Order Creation:**
   Send a POST request to create an order using curl:
   ```bash
   curl -X POST https://<api-id>.execute-api.<region>.amazonaws.com/Prod/orders \
     -H "Content-Type: application/json" \
     -d '{
           "userID": "user123",
           "items": [
             { "price": 10, "quantity": 2 },
             { "price": 15, "quantity": 1 }
           ]
         }'
   ```
   A successful response should include order details such as orderID, status, and timestamps.

3. **Verify Execution:**
   - **CloudWatch Logs:** Check the logs for your Lambda functions to confirm they executed successfully.
   - **DynamoDB:** Verify that the order record is created in the **OrdersTable**.
   - **SQS & SNS:** If applicable, ensure that messages are sent to the SQS queue and notifications are published via SNS.

---