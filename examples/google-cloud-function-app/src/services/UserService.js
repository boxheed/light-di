// services/UserService.js
// This service is completely decoupled from the Google Cloud Functions runtime.

export class UserService {
    constructor(loggerService) {
      this.logger = loggerService;
    }
  
    async getUser(id) {
      this.logger.log(`Fetching user with ID: ${id}`);
      
      // Simulate an async operation like a database query or API call
      await new Promise(resolve => setTimeout(resolve, 100));
  
      // Return mock data
      return {
        id: id,
        name: `GCPUser_${id}`,
        email: `user_${id}@googlecloud.com`
      };
    }
  }
  
  export class LoggerService {
    constructor(context) {
      this.context = context;
    }
  
    log(message) {
      // We use the function context to write to the logs
      console.log(`[GCP Logger]: ${message}`);
    }
  }
  