// services/UserService.js
// This service depends on the DatabaseService to perform its work.

export class UserService {
  constructor(databaseService) {
    this.databaseService = databaseService;
  }

  async getUserById(id) {
    const connection = this.databaseService.getConnection();
    if (!connection) {
      throw new Error('Database connection not available.');
    }

    console.log(`Querying database for user with ID: ${id}`);
    // Simulate a database query
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Simulate returning a user object
    return {
      id: id,
      name: `User_${id}`,
      email: `user${id}@example.com`,
    };
  }
}
