# React Application Example
This is a simple React application that demonstrates how to integrate the `light-di` container to manage services and their dependencies.

## Key Concepts
* **React Context**: The `light-di` container is provided to the entire application using a React Context. This makes the container accessible from any component in the tree without prop drilling.
* **Custom Hook**: The `useService` custom hook simplifies the process of resolving services from the container within components. It also adds a helpful error message if the hook is used outside the provider.
* **Decoupled Components**: The `UserProfile` component is completely unaware of how the `UserService` is created or what its dependencies are. It simply uses the `useService` hook to get an instance, making it cleaner and easier to test.

## How to Run

1. Navigate to the `examples/react-app` directory.
```
cd examples/react-app
```
2. Install the dependencies.
```
npm install
```
3. Start the application.
```
npm start
```
4. Open your web browser and navigate to `http://localhost:3000`. You will see the application load. Click the "Fetch User" button to see the `UserService` and `ApiClient` in action, logging their operations to the console and updating the UI.