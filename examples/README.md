# light-di Examples

This directory contains a collection of complete, runnable applications that demonstrate how to use l`ight-di` in various environments. Each example is a standalone project with its own `package.json` and a detailed `README.md` file explaining the project's architecture and how to run it.

## Table of Contents

| Example | Description |
| ------- | ----------- |
| Express.js Application | A classic Node.js server demonstrating how to use light-di to manage services for an HTTP API. |
| AWS Lambda Function | Shows how to configure light-di in a serverless environment to optimize for cold starts and decouple business logic. |
| Azure Functions | A simple function app demonstrating integration with the Azure Functions runtime and its context object. |
| Google Cloud Functions | A Google Cloud Function that uses the functions-framework and light-di to manage dependencies. |
| Cloudflare Worker | A serverless example for an edge computing environment, demonstrating the use of light-di in a Cloudflare Worker. |
| React Application | A front-end example showing how to use light-di with React Context and custom hooks to manage application services. |
CLI Tool | A non-web example demonstrating how to use the container to organize the commands and services of a command-line utility. |
| WebSocket Server | A real-time server example that uses a singleton service to manage connections and broadcast messages to all clients.

Feel free to browse through the examples to find the one most relevant to your project. Each project is designed to be a best-practice guide for using light-di effectively.