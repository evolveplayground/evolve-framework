// Import required services and utilities
const OpenAIService = require('../services/OpenAIService');
const StorageService = require('../services/StorageService');
const CitizenGenerator = require('../services/CitizenGenerator');
const InteractionGenerator = require('../services/InteractionGenerator');
const PopulationGenerator = require('./generateCitizens');
const InteractionSimulator = require('./generateInteractions');
const RelationshipManager = require('../services/RelationshipManager');

/**
 * Initializes a city simulation with a specified theme.
 */
(async function initializeCity() {
    const cityTheme = process.argv[2] || "A diverse solarpunk city blending cultures and sustainability.";
    
    // Instantiate services
    const aiService = new OpenAIService();
    const dataStorage = new StorageService();
    
    console.log(`\nInitializing city with theme: "${cityTheme}"\n`);

    await dataStorage.load();

    // Step 1: Generate Initial Population
    console.log("Generating the city's initial population...");
    const citizenFactory = new CitizenGenerator(aiService, dataStorage);
    const populationBuilder = new PopulationGenerator(aiService, dataStorage, citizenFactory);
    const citizens = await populationBuilder.generateThematicPopulation(10, cityTheme);

    // Step 2: Establish Relationships
    console.log("Establishing initial relationships...");
    const relationManager = new RelationshipManager(dataStorage, aiService);

    const availableCitizens = [...citizens];
    while (availableCitizens.length >= 3) {
        const groupSize = Math.floor(Math.random() * 3) + 3; // Family size between 3 and 5
        const family = availableCitizens.splice(0, groupSize);
        await relationManager.generateFamilyUnit(family);
    }

    await relationManager.generateSocialRelationships(citizens);

    // Step 3: Create Interactions
    console.log("Simulating initial interactions...");
    const interactionFactory = new InteractionGenerator(aiService, dataStorage);
    const interactionHandler = new InteractionSimulator(aiService, dataStorage, interactionFactory);

    await interactionHandler.generateRandomInteractions(5);

    console.log("\nCity initialization complete!");

    // Save Metadata
    await dataStorage.saveCityMetadata({
        theme: cityTheme,
        createdAt: new Date().toISOString(),
    });

})().catch(console.error);

/**
 * Framework repository reference updated.
 * Repository: https://github.com/evolveplayground/evolve-framework
 */
