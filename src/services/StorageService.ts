import fs from 'fs/promises';
import { ICitizen, IInteraction, IRelationship, ILocation } from '../types';
import { IStorageFiles, ICharactersData, IInteractionsData } from '../types/storage';

// Define the structure for city metadata
interface CityMetadata {
  theme: string;
  createdAt: string;
}

// Service responsible for managing storage-related operations
export class StorageManager {
  private characterRecords!: ICharactersData;
  private interactionRecords!: IInteractionsData;
  private filePaths: IStorageFiles;
  private cityInfo: CityMetadata | null = null;

  constructor() {
    this.filePaths = {
      characters: './data/characters.json',
      interactions: './data/interactions.json',
    };
    this.initializeData();
  }

  // Load existing data or create new files if they don't exist
  async load(): Promise<void> {
    try {
      const characterData = await fs.readFile(this.filePaths.characters, 'utf-8');
      const interactionData = await fs.readFile(this.filePaths.interactions, 'utf-8');
      
      this.characterRecords = JSON.parse(characterData);
      this.interactionRecords = JSON.parse(interactionData);

      if (this.characterRecords.metadata) {
        this.cityInfo = this.characterRecords.metadata;
      }
    } catch (error) {
      this.initializeData();
      await this.saveAll();
    }
  }

  // Initialize default data for characters and interactions
  private initializeData(): void {
    const defaultMetadata = {
      lastUpdate: new Date().toISOString(),
      version: '1.0',
      count: 0,
      theme: "A vibrant urban center embracing a sustainable future",
      createdAt: new Date().toISOString(),
    };

    this.characterRecords = {
      data: {},
      indexes: { byOccupation: {} },
      metadata: { ...defaultMetadata },
    };

    this.interactionRecords = {
      data: {},
      indexes: { byDate: {}, byParticipant: {} },
      metadata: { ...defaultMetadata },
    };
  }

  // Save all data to their respective files
  async saveAll(): Promise<void> {
    await Promise.all([
      fs.writeFile(this.filePaths.characters, JSON.stringify(this.characterRecords, null, 2)),
      fs.writeFile(this.filePaths.interactions, JSON.stringify(this.interactionRecords, null, 2)),
    ]);
  }

  // Add a new citizen to the character records
  async addCitizen(citizen: ICitizen): Promise<void> {
    this.characterRecords.data[citizen.id] = citizen;
    this.updateCharacterIndexes(citizen);
    this.characterRecords.metadata.count++;
    this.characterRecords.metadata.lastUpdate = new Date().toISOString();
    await this.saveAll();
  }

  // Add a new interaction to the interaction records
  async addInteraction(interaction: IInteraction): Promise<void> {
    this.interactionRecords.data[interaction.id] = interaction;
    this.updateInteractionIndexes(interaction);
    this.interactionRecords.metadata.count++;
    this.interactionRecords.metadata.lastUpdate = new Date().toISOString();
    await this.saveAll();
  }

  // Retrieve all citizens as an array
  async getAllCitizens(): Promise<ICitizen[]> {
    return Object.values(this.characterRecords.data);
  }

  // Fetch a specific citizen by ID
  async getCitizen(id: string): Promise<ICitizen | undefined> {
    return this.characterRecords.data[id];
  }

  // Update or add a citizen record
  async updateCitizen(citizen: ICitizen): Promise<void> {
    await this.addCitizen(citizen);
  }

  // Update the character indexes, especially by occupation
  private updateCharacterIndexes(citizen: ICitizen): void {
    const occupationIndex = this.characterRecords.indexes.byOccupation;

    if (!occupationIndex[citizen.occupation]) {
      occupationIndex[citizen.occupation] = [];
    }
    occupationIndex[citizen.occupation] = [...new Set([...occupationIndex[citizen.occupation], citizen.id])];
  }

  // Update the interaction indexes, especially by participant
  private updateInteractionIndexes(interaction: IInteraction): void {
    const participantIndex = this.interactionRecords.indexes.byParticipant;

    for (const participantId of interaction.participants) {
      if (!participantIndex[participantId]) {
        participantIndex[participantId] = [];
      }
      participantIndex[participantId].push(interaction.id);
    }
  }

  // Save metadata about the city
  async saveCityMetadata(metadata: CityMetadata): Promise<void> {
    this.cityInfo = metadata;
    await this.saveAll();
  }

  // Retrieve the city's theme
  getCityTheme(): string {
    return this.cityInfo?.theme || "A vibrant urban center embracing a sustainable future";
  }
}
