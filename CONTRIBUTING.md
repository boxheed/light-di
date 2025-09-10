# Contributing to light-di

Thank you for your interest in contributing to `light-di`! We welcome and appreciate all contributions, whether they are bug reports, feature requests, or code changes. By participating in this project, you agree to abide by our Code of Conduct.

## How to Contribute

There are several ways you can contribute:

- **Report a Bug**: If you find a bug, please check the existing issues to see if it has already been reported. If not, please open a new issue using the bug report template.
- **Suggest a Feature**: Have an idea for a new feature? We'd love to hear it. Please open a new issue using the feature request template to start a discussion.
- **Submit a Pull Request**: If you want to contribute code, please follow the process outlined below.

## Getting Started

To get your local development environment set up, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.

```bash
git clone https://github.com/your-username/light-di.git
cd light-di
```

3. Install dependencies.npm install

## Development Workflow

### Running Tests

Before submitting a pull request, make sure all tests pass.

```bash
npm test
```

### Building the Project

To compile the source code and generate the distributable files in the dist/ directory, run the build command.

```
npm run build
```

### Linting and Formatting

We use ESLint and Prettier to maintain a consistent code style. Before pushing your changes, please run the following commands to check for errors and automatically format your code.

```bash
# Check for linting errors
npm run lint

# Automatically format the code
npm run format
```

## Submitting a Pull Request

Follow these steps to submit a pull request:

1. Create a new branch for your changes.

```
git checkout -b feature/my-new-feature
```

2. Make your changes, ensuring you follow the project's code style and conventions.
3. Add tests for your changes. If you are adding a new feature, a new test suite is expected. If you are fixing a bug, a new test that reproduces the bug and then passes after your fix is required.
4. Commit your changes with a descriptive commit message.
5. Push your branch to your forked repository.

```
git push origin feature/my-new-feature
```

6. Open a Pull Request from your branch to the `develop` branch of the original repository.
   - In your PR description, please provide a clear and concise summary of your changes.
   - If your PR is related to an existing issue, link to it in the description (e.g., `Closes #123`).

Thank you for your help in making this project better!
