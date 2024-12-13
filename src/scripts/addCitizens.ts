// Import necessary services and models
import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { CitizenGenerator } from '../services/CitizenGenerator';
import { PopulationGenerator } from './generateCitizens';
import { RelationshipManager } from '../services/RelationshipManager';
import { Citizen } from '../models/Citizen';

/**
 * Main function to add new citizens to the city population.
 * It integrates thematic population generation and relationship building.
 */
async function addCitizens() {
  // Get the number of citizens to add, default is 5
  const citizenCount = process.argv[2] ? parseInt(process.argv[2]) : 5;

  // Initialize necessary services
  const aiService = new OpenAIService();
  const storage = new StorageService();
  await storage.load();

  // Retrieve the current city theme from storage
  const cityTheme = storage.getCityTheme();
  console.log(`\nAdding ${citizenCount} new citizens to the city...\n`);

  // Setup citizen and population generators
  const citizenGen = new CitizenGenerator(aiService, storage);
  const populationGen = new PopulationGenerator(aiService, storage, citizenGen);

  // Generate new citizens based on the city theme
  const generatedCitizens = await populationGen.generateThematicPopulation(citizenCount, cityTheme);

  // Establish relationships between new and existing citizens
  console.log("\nEstablishing relationships with existing citizens...");
  const relationshipMgr = new RelationshipManager(storage, aiService);
  const existingCitizens = (await storage.getAllCitizens()).map(data => new Citizen(data));
  await relationshipMgr.generateSocialRelationships([...existingCitizens, ...generatedCitizens]);

  console.log("\nSuccessfully added new citizens!");
}

// Execute the addCitizens function and handle errors
addCitizens().catch(error => console.error(error));
