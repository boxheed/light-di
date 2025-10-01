# AWS Lambda Function Example

This is a simple example of an AWS Lambda function using the `light-di` container. It demonstrates how to leverage dependency injection in a serverless environment to keep your handler functions clean and your services testable.

## Key Concepts

- **Async Initialization & Cold Start Optimization**: The example includes a `DatabaseService` with an asynchronous factory method that simulates a 1-second connection delay. During a cold start (the first invocation), `await container.resolve()` in the global scope will pause until this service is ready. For all subsequent warm starts, the service is instantly available, eliminating the delay.
- **Handler Logic**: The handler itself contains minimal logic. Its primary responsibility is to parse the event, resolve the necessary services from the pre-configured container, and then call the service methods.
- **Service Decoupling**: The `UserService` is completely unaware that it is being used within a Lambda function. It just knows it needs a `LoggerService`, which the container provides.

## Running and Testing Locally (Recommended)

You can run this example locally using the AWS Serverless Application Model (SAM) CLI, which uses Docker to create a precise Lambda environment simulation.

1. **Prerequisites**: Ensure you have Docker and the AWS SAM CLI installed.
2. Navigate to the Example:

```
cd examples/aws-lambda-app
```

3. Install Dependencies:

```
# You will need to copy `light-di` from the parent directory or install it via npm.
npm install
```

4. Start the Local API Gateway: This command starts a local server that simulates the API Gateway endpoint defined in `template.yaml`.

```
sam local start-api

# You should see output similar to:
# Mounted API Gateway to [http://127.0.0.1:3000/users/](http://127.0.0.1:3000/users/){id}
# Starting to listen on port 3000
```

5. Test the Endpoint: Open your web browser or use curl to access the local endpoint:

```
curl http://localhost:3000/users/123
```

You will see the JSON response from the Lambda function.

## How to Deploy to AWS

1. **Install SAM**: Ensure the AWS SAM CLI is installed.
2. **Build**: Run `sam build` to prepare the package.
3. **Deploy**: Run `sam deploy --guided` and follow the prompts.
4. **Test the Endpoint**: Once deployed, use the actual API Gateway URL (e.g., `https://[your-id].amazonaws.com/users/123`).
