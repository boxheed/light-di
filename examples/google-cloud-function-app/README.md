# Google Cloud Functions Application Example

This is a simple example of a Google Cloud Function that demonstrates how to use the `light-di` container. This project can be run locally using the Google Cloud Functions Framework.

## Key Concepts

- **Cold Start**: The DI container is initialized in the global scope of the function handler, ensuring that the dependency graph is only built once during a cold start, which optimizes for faster subsequent invocations.
- **functions-framework**: Google's open-source framework for writing portable functions. It provides a local development environment and a consistent interface for the `request` and `response` objects, similar to Express.js.
- **Service Decoupling**: The business logic is contained within the `UserService` and `LoggerService`, which are completely decoupled from the Google Cloud Functions specifics. The function handler is a thin layer that delegates to these services.

## How to Run Locally

1. **Install the Functions Framework**:

```
cd examples/google-cloud-functions-app
npm install
```

2. **Start the Function App**:

```
npm start
```

This will start a local server on port 8080.

3. Test the Endpoint:

- You can test the endpoint by navigating to the local URL with a query parameter:
  `http://localhost:8080/userFunction?id=123`
- Or from the command line using curl:
  `curl "http://localhost:8080/userFunction?id=123"`
  When you access this URL, the function will execute, and you will see a JSON response with the user data in your terminal or browser.

## How to Deploy to Google Cloud

1. **Install Google Cloud SDK**: If you haven't already, follow the official guide to install the gcloud CLI.
2. **Deploy the Function**:

```
gcloud functions deploy userFunction \
--gen2 \
--runtime=nodejs20 \
--region=us-central1 \
--source=. \
--entry-point=userFunction \
--trigger-http \
--allow-unauthenticated
```

3. **Test the Endpoint**: After deployment, the `gcloud` CLI will provide a URL for your function. You can test it by accessing this URL with an `id` query parameter.
