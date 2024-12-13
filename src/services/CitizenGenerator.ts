// Import necessary modules and services
import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from './OpenAIService';
import { StorageService } from './StorageService';
import { Citizen } from '../models/Citizen';
import { NameRegistry } from './NameRegistry';

// Main class for generating citizens
export class CitizenCreator {
    // Private properties for name registry, gender balance, and occupation pool
    #nameRegistry;
    #genderBalance;
    #occupationPool = [];

    // Constructor initializing dependencies and gender balance
    constructor(openAIService, storageService) {
        this.openAIService = openAIService;
        this.storageService = storageService;
        this.#nameRegistry = NameRegistry.getInstance();
        this.#genderBalance = Math.floor(Math.random() * 4); // Random initial gender balance
    }

    /**
     * Generates a citizen based on provided traits, hobbies, and occupation.
     * @param {Object} promptData - Contains traits, hobbies, and occupation.
     * @returns {Promise<Citizen>} - A new citizen object.
     */
    async createCitizen({ traits, hobbies, occupation }) {
        const personalityProfile = await this.openAIService.generateCitizenPersonality(traits, hobbies, occupation);
        const citizen = new Citizen(personalityProfile);
        await this.storageService.addCitizen(citizen);
        return citizen;
    }

    /**
     * Generates a thematic citizen based on a given theme.
     * @param {string} theme - The theme for the citizen.
     * @returns {Promise<Citizen>} - A thematic citizen object.
     */
    async createCitizenWithTheme(theme) {
        if (this.#occupationPool.length === 0) {
            const occupationsPrompt = `Generate a list of 20 diverse and unique occupations that would exist in ${theme}. 
                Format the response as a JSON array of strings, without markdown formatting.`;

            try {
                const response = await this.openAIService.generateSimpleResponse(occupationsPrompt);
                this.#occupationPool = JSON.parse(response);
            } catch (error) {
                console.error('Error parsing occupations:', error);
                this.#occupationPool = ["Urban Planner", "Sustainability Consultant", "Community Organizer"];
            }
        }

        // Select a random occupation and adjust gender balance
        const randomIndex = Math.floor(Math.random() * this.#occupationPool.length);
        const occupation = this.#occupationPool.splice(randomIndex, 1)[0];
        const preferredGender = this.#genderBalance <= 1 ? 'male' : 'female';
        this.#genderBalance += preferredGender === 'male' ? 1 : -1;

        // Reset gender balance if out of bounds
        if (this.#genderBalance < 0 || this.#genderBalance > 3) {
            this.#genderBalance = Math.floor(Math.random() * 4);
        }

        const citizenPrompt = `Create a unique citizen for ${theme}.
            The citizen should be ${preferredGender} gender and work as a "${occupation}".
            Include:
            - A unique full name reflecting diverse cultural backgrounds (only one last name)
            - Age (18-80)
            - Personality traits, values, strengths, weaknesses, hobbies, quirks, and background story
            Format as JSON.`;

        let citizenData;
        let attempts = 0;
        const maxRetries = 3;

        do {
            citizenData = await this.openAIService.generateCitizenData(citizenPrompt);
            attempts++;
        } while (this.#nameRegistry.isNameTaken(citizenData.name) && attempts < maxRetries);

        if (this.#nameRegistry.isNameTaken(citizenData.name)) {
            throw new Error(`Unable to generate unique name after ${maxRetries} attempts.`);
        }

        this.#nameRegistry.registerName(citizenData.name);
        return new Citizen(citizenData);
    }
}

