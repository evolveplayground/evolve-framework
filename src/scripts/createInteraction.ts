// Import necessary services and models
const { AIIntegrationService } = require('../services/AIIntegrationService');
const { DataPersistenceService } = require('../services/DataPersistenceService');
const { ScenarioBuilder } = require('../services/ScenarioBuilder');
const { Individual } = require('../models/Individual');

// Main function to generate interaction
async function initiateScenario() {
  // Extract theme and participants from command-line arguments
  const [topic, ...members] = process.argv.slice(2);

  // Validate input arguments
  if (!topic || members.length < 2) {
    console.error('Usage: npm run scenario "topic" "FirstName LastName" "FirstName LastName" ...');
    process.exit(1);
  }

  // Initialize required services
  const aiService = new AIIntegrationService();
  const dataService = new DataPersistenceService();

  // Load stored data
  await dataService.initialize();

  // Retrieve all individuals
  const individuals = await dataService.fetchAllIndividuals();
  const selectedMembers = [];

  // Validate and select participants
  for (const name of members) {
    const individualRecord = individuals.find(ind => 
      ind.name.toLowerCase() === name.toLowerCase()
    );

    if (!individualRecord) {
      console.error(`Error: Individual "${name}" not found`);
      process.exit(1);
    }

    selectedMembers.push(new Individual(individualRecord));
  }

  // Display scenario details
  console.log('\nPreparing scenario with the following participants:');
  console.log(selectedMembers.map(m => m.name).join(', '));
  console.log(`Topic: ${topic}\n`);

  // Generate interaction scenario
  const scenarioBuilder = new ScenarioBuilder(aiService, dataService);
  const messageCount = Math.floor(Math.random() * 3) + 5; // Randomized message count

  const scenario = await scenarioBuilder.buildComprehensiveScenario(
    selectedMembers,
    messageCount,
    topic
  );

  // Display scenario and interaction details
  console.log('\nScenario:', scenario.description);
  console.log('-------------------');
}

// Execute the main function
initiateScenario().catch(console.error);
