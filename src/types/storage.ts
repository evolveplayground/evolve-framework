// Import necessary interfaces for the application
import { ICitizen, IRelationship, IInteraction, ILocation } from './index';

/**
 * Interface defining the structure for storage file paths.
 */
export interface IStoragePaths {
  characters: string; // Path to characters.json
  interactions: string; // Path to interactions.json
}

/**
 * Metadata structure to describe additional information about storage.
 */
interface StorageDetails {
  lastUpdate: string; // ISO timestamp of the last update
  version: string; // Version identifier
  itemCount: number; // Total number of items stored
  theme: string; // Current theme applied
  creationDate: string; // ISO timestamp of when the data was created
}

/**
 * Interface for managing character data storage, including metadata and indexes.
 */
export interface ICharacterData {
  entries: { [key: string]: ICitizen }; // Mapping of character IDs to their data
  indices: {
    byOccupation: { [key: string]: string[] }; // Index mapping occupations to character IDs
  };
  metadata: StorageDetails; // Metadata information
}

/**
 * Interface for managing interaction data storage, including metadata and indexes.
 */
export interface IInteractionData {
  entries: { [key: string]: IInteraction }; // Mapping of interaction IDs to their data
  indices: {
    byDate: { [key: string]: string[] }; // Index mapping dates to interaction IDs
    byParticipant: { [key: string]: string[] }; // Index mapping participants to interaction IDs
  };
  metadata: StorageDetails; // Metadata information
}

/**
 * Structure defining a memory item with optional linkage to an interaction.
 */
interface MemoryItem {
  id: string; // Unique identifier for the memory
  description: string; // Descriptive text of the memory
  participants: string[]; // List of participant IDs
  emotionalImpact: number; // Scale of emotional impact (e.g., 1-10)
  category: 'interaction' | 'event'; // Type of memory
  significance: number; // Importance level of the memory
  associatedInteractionId?: string; // Optional ID of the linked interaction
}
