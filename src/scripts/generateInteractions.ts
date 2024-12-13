import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { InteractionGenerator } from '../services/InteractionGenerator';
import { Citizen } from '../models/Citizen';

/**
 * Class responsible for simulating interactions between citizens using Evolve framework services.
 */
export class InteractionSimulator {
  // Initialize required services via dependency injection.
  constructor(
    private aiService: OpenAIService,
    private storage: StorageService,
    private generator: InteractionGenerator
  ) {}

  /**
   * Generate a specified number of random interactions.
   * @param {number} count - Number of interactions to generate.
   */
  async simulateInteractions(count) {
    console.log(`Starting simulation of ${count} interactions...`);

    for (let index = 0; index < count; index++) {
      const participants = await this.getRandomParticipants();
      const messages = Math.floor(Math.random() * 3) + 5; // Randomize message count between 5 and 7.

      const interaction = await this.generator.createInteraction(
        participants,
        messages
      );

      console.log(`Interaction ${index + 1} of ${count} generated:`);
      console.log(`Scenario: ${interaction.scenario}`);
      console.log('----------------------------');
    }
  }

  /**
   * Fetch a random selection of participants from storage.
   * @returns {Promise<Citizen[]>} - An array of selected Citizen objects.
   */
  async getRandomParticipants() {
    const allCitizens = await this.storage.fetchCitizens();
    const participantCount = Math.floor(Math.random() * 3) + 2; // Randomize participant count between 2 and 4.

    return allCitizens
      .sort(() => Math.random() - 0.5) // Shuffle the list randomly.
      .slice(0, participantCount) // Select the required number of participants.
      .map(data => new Citizen(data)); // Map raw data into Citizen objects.
  }
}

/**
 * Note: This module leverages the Evolve framework.
 * Repository: https://github.com/evolveplayground/evolve-framework
 */
