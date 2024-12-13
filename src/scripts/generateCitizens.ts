// Import necessary services and configurations
import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { CitizenGenerator } from '../services/CitizenGenerator';
import { characterAttributes } from '../config/characterAttributes';
import { config } from '../config/config';
import { Citizen } from '../models/Citizen';
import { RelationshipManager } from '../services/RelationshipManager';

// Main class to handle the generation of citizens and their relationships
export class PopulationManager {

  // Constructor initializing required services
  constructor(
    private aiService: OpenAIService,
    private dataStorage: StorageService,
    private personGenerator: CitizenGenerator
  ) {}

  // Utility function to randomly pick elements from an array
  private selectRandomItems<T>(list: T[], quantity: number): T[] {
    const randomized = [...list].sort(() => Math.random() - 0.5);
    return randomized.slice(0, quantity);
  }

  // Create a personality prompt based on random attributes
  private async createPersonalityTemplate() {
    const selectedTraits = this.selectRandomItems(characterAttributes.personalities, 3);
    const chosenHobbies = this.selectRandomItems(characterAttributes.hobbies, 2);
    const job = this.selectRandomItems(characterAttributes.occupations, 1)[0];
    return { selectedTraits, chosenHobbies, job };
  }

  // Function to generate a group of citizens
  async createPopulation(size: number) {
    console.log(`Initiating the generation of ${size} citizens.`);

    const relationshipHandler = new RelationshipManager(this.dataStorage, this.aiService);
    const generatedCitizens: Citizen[] = [];

    // Loop to create each citizen
    for (let index = 0; index < size; index++) {
      const template = await this.createPersonalityTemplate();
      const citizen = await this.personGenerator.createCitizen(template);
      generatedCitizens.push(citizen);
      console.log(`Citizen ${index + 1}/${size} created.`);
    }

    // Group citizens into family units
    const availableCitizens = [...generatedCitizens];
    while (availableCitizens.length >= 3) {
      const familyGroupSize = Math.floor(Math.random() * 3) + 3; // Family size between 3 to 5
      const familyGroup = availableCitizens.splice(0, familyGroupSize);
      await relationshipHandler.createFamily(familyGroup);
    }

    // Establish social connections among citizens
    await relationshipHandler.buildSocialConnections(generatedCitizens);
  }

  // Generate citizens with a specific theme
  async createThemedPopulation(size: number, theme: string): Promise<Citizen[]> {
    const themedCitizens: Citizen[] = [];

    for (let index = 0; index < size; index++) {
      const citizen = await this.personGenerator.createCitizenWithTheme(theme);
      await this.dataStorage.saveCitizen(citizen);
      themedCitizens.push(citizen);
      console.log(`Themed citizen ${index + 1}/${size} created: ${citizen.name}`);
    }

    return themedCitizens;
  }
}