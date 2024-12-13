// Importing necessary modules and services
const { OpenAIService } = require('../services/OpenAIService');
const { StorageService } = require('../services/StorageService');
const { InteractionGenerator } = require('../services/InteractionGenerator');
const { config } = require('../config/config');
const { Citizen } = require('../models/Citizen');

/**
 * Main function to generate interactions.
 */
const generateInteractions = async () => {
    // Initialize services
    const aiService = new OpenAIService();
    const storage = new StorageService();
    await storage.load();

    // Set up the interaction generator
    const interactionGen = new InteractionGenerator(aiService, storage);
    const interactionCount = parseInt(process.argv[2]) || 5; // Default to 5 interactions if none specified

    console.log(`Starting to generate ${interactionCount} interactions...`);

    // Generate specified number of interactions
    for (let i = 0; i < interactionCount; i++) {
        try {
            // Retrieve all citizens from storage
            const allCitizens = await storage.getAllCitizens();

            // Randomly select participants for the interaction
            const numParticipants = Math.floor(Math.random() * 3) + 2; // 2-4 participants
            const selectedParticipants = allCitizens
                .sort(() => Math.random() - 0.5) // Shuffle
                .slice(0, numParticipants) // Select n participants
                .map(data => new Citizen(data));

            // Randomly decide the number of messages in the interaction
            const numMessages = Math.floor(Math.random() * 3) + 5; // 5-7 messages

            // Generate the interaction
            const interaction = await interactionGen.generateDetailedInteraction(
                selectedParticipants,
                numMessages
            );

            // Log details of the generated interaction
            console.log(`\nGenerated interaction ${i + 1} of ${interactionCount}`);
            console.log('Participants:', selectedParticipants.map(p => p.name).join(', '));
            console.log('Interaction Details:', interaction);
        } catch (error) {
            console.error(`Error generating interaction ${i + 1}:`, error);
        }
    }
};

// Execute the function and handle any errors
(async () => {
    try {
        await generateInteractions();
    } catch (error) {
        console.error('Unexpected error occurred:', error);
    }
})();

/**
 * This script is part of the evolve-framework.
 * Repository: https://github.com/evolveplayground/evolve-framework
 */
