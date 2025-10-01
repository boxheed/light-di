// src/cli.ts
import { Command } from 'commander';
import container from './container.js';
import { GreetingService } from './GreetingService.js';

const program = new Command();

async function runCli() {
  // Setup CLI command structure
  program
    .version('1.0.0')
    .description('A CLI demonstrating light-di with TypeScript')
    .option('-n, --name <string>', 'Name of the user to greet', 'World')
    .action(async (options) => {
      try {
        // Resolve the main service from the container.
        // It brings all necessary dependencies (like the Logger) with it.
        const greetingService: GreetingService = await container.resolve(
          GreetingService
        );

        const greeting = greetingService.generateGreeting(options.name);
        console.log(`\n${greeting}\n`);
      } catch (error: any) {
        console.error('\n--- CLI Error ---');
        console.error(error?.message ? error.message : error);
        console.error('------------------\n');
        process.exit(1);
      }
    });

  await program.parseAsync(process.argv);
}

runCli();
