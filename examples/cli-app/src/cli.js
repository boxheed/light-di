#!/usr/bin/env node

// src/cli.js
// The main entry point for our CLI tool.
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import container from './container.js';
import { GreetingService } from './services/GreetingService.js';

// We define our CLI commands using yargs.
yargs(hideBin(process.argv))
  .command(
    'greet <name>',
    'Greets the specified name',
    (yargs) => {
      return yargs.positional('name', {
        describe: 'The name to greet',
        type: 'string',
      });
    },
    async (argv) => {
      // Resolve the GreetingService from our DI container.
      const greetingService = await container.resolve(GreetingService);
      // Use the injected service to execute the command logic.
      greetingService.sayHello(argv.name);
    }
  )
  .demandCommand(1, 'You must provide a command to run.')
  .help().argv;
