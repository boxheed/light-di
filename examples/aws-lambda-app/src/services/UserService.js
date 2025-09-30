// services/UserService.js
// This service simulates fetching user data from a database or API.

export class UserService {
    constructor(loggerService) {
      this.logger = loggerService;
    }
  
    async getUser(id) {
      this.logger.log(`Fetching user with ID: ${id}`);
      
      // Simulate an async operation like a database query
      await new Promise(resolve => setTimeout(resolve, 100));
  
      // Return mock data
      return {
        id: id,
        name: `LambdaUser_${id}`,
        email: `user_${id}@example.com`
      };
    }
  }
  
  export class LoggerService {
    log(message) {
      // In a real Lambda, this would write to CloudWatch Logs
      console.log(`[Lambda Logger]: ${message}`);
    }
  }
  