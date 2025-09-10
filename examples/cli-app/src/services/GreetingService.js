// This service contains the core business logic for the 'greet' command.
export class GreetingService {
  constructor(loggerService) {
    this.logger = loggerService;
  }

  sayHello(name) {
    this.logger.log(`Hello, ${name}!`);
  }
}

// A simple service to handle logging.
export class LoggerService {
  log(message) {
    console.log(message);
  }
}
