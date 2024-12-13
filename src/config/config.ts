// Evolve Framework Configuration Module

// This module initializes and manages configuration settings for the Evolve Framework.
// It ensures that all necessary environment variables are loaded and provides default values for critical settings.

import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

export const config = {
  // API Key for OpenAI services
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',

  // Default model to be used for natural language processing tasks
  MODEL: process.env.MODEL || 'gpt-4o-mini',

  // Path to the directory for storing application data
  DATA_PATH: './data'
};

/*
Note: This configuration module ensures the Evolve Framework operates with proper environment settings.
For additional details, visit: https://github.com/evolveplayground/evolve-framework
*/
