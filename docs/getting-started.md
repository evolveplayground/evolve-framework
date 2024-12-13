# Getting Started with Evolve Framework
# A guide to setting up and utilizing the Evolve Framework for intelligent agent-based simulations.

## Installation Process
# Steps to install and configure the Evolve Framework.

### System Prerequisites
# Ensure your system meets the following requirements:
- Node.js (version 14 or later).
- npm (Node.js package manager).
- A valid OpenAI API key for integration.

### Framework Setup
# Follow these steps to initialize the framework:
```bash
# Clone the repository
git clone https://github.com/evolveplaground/evolve-framework.git
cd evolve-framework

# Install all necessary dependencies
npm install

# Configure the environment
cp .env.example .env
# Edit .env to include your OpenAI API key
```

## Core Commands for Stable Features
# Utilize these commands to interact with the framework's main features.

### Initialize a Simulation
```bash
npm run initiate [theme]
```
- `theme` (optional): A descriptive theme for your simulation.
- Default theme: "A vibrant solarpunk city blending diverse cultures."
- Automatically generates an initial population of 10 citizens and sets up basic relationships.

### Add New Entities
```bash
npm run addCitizens
```
- Specify:
  - The number of citizens to add.
  - Optionally: Names, ages, and occupations.
- Automatically fills in unspecified details.

### Generate Social Interactions
```bash
npm run addInteractions
```
- Creates random interactions between existing citizens.
- Updates relationships and memory logs accordingly.

### Directly Interact with Entities
```bash
npm run chat [firstName] [lastName]
```
- Opens a chat interface with a specified citizen.
- If no name is provided, selects a random citizen.
- Exit the conversation by typing `exit`.

### Manual Interaction Creation
```bash
npm run specificInteraction
```
- Select specific citizens to interact.
- Define interaction type and context.
- Generates a detailed interaction report.

## Data Structure Overview
# Understanding the internal data organization.

### Citizen Data
# Stored in `data/characters.json`:
```json
{
  "citizens": [
    {
      "id": "uuid",
      "name": "John Doe",
      "age": 30,
      "occupation": "Engineer",
      "traits": ["creative", "analytical"],
      "values": ["integrity", "innovation"],
      "background": "Background narrative here.",
      "relationships": [],
      "memories": []
    }
  ]
}
```

## Troubleshooting and Debugging
# Resolving common issues within the framework.

### API Key Problems
- Ensure the `.env` file exists and contains a valid OpenAI API key.
- Verify API key permissions and usage quota.

### Citizen Creation Errors
- Check if `characters.json` exists and contains valid JSON data.
- Ensure write permissions are enabled for the `data` directory.

### Interaction Failures
- Confirm that at least two citizens exist in the system.
- Validate citizen IDs or names before initiating interactions.

## Notes on Future Features
# Upcoming functionalities currently in development:
- Multi-city simulation support.
- Comprehensive economic systems with trade and currency.
- Integration of internet-like virtual connectivity.
- Realistic cultural events and community dynamics.
- An advanced educational system for skill and knowledge development.

> **Reminder**: Refer to the extensions section of the documentation for more information on these experimental features.
