// Evolve Framework Entities Module

// This module defines core interfaces and enums for the Evolve Framework.
// It includes the structure for cities, agents, locations, relationships, memories, and emotions.

// Interface representing a virtual city
export interface City {
  id: string; // Unique identifier for the city
  name: string; // Name of the city
  theme: string; // Thematic style of the city
  citizens: Agent[]; // List of agents residing in the city
  locations: Location[]; // List of locations within the city
  createdAt: number; // Timestamp of city creation
  lastUpdated: number; // Timestamp of the last update
}

// Interface representing an agent (citizen) in the city
export interface Agent {
  id: string; // Unique identifier for the agent
  name: string; // Name of the agent
  age: number; // Age of the agent
  occupation: string; // Occupation of the agent
  traits: string[]; // List of personality traits
  values: string[]; // Core values of the agent
  background: string; // Background story of the agent
  relationships: Relationship[]; // Social connections of the agent
  memories: Memory[]; // Significant memories of the agent
}

// Interface representing a location within the city
export interface Location {
  id: string; // Unique identifier for the location
  name: string; // Name of the location
  type: LocationType; // Type/category of the location
  capacity: number; // Maximum capacity of the location
  currentOccupants: string[]; // List of agent IDs currently occupying the location
}

// Enum defining types of locations in the city
export enum LocationType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL',
  PUBLIC = 'PUBLIC',
  RECREATIONAL = 'RECREATIONAL'
}

// Interface representing a relationship between two agents
export interface Relationship {
  targetId: string; // ID of the related agent
  type: RelationType; // Type of relationship
  strength: number; // Strength of the relationship (scale: 1-100)
  context: string; // Context or description of the relationship
}

// Enum defining types of relationships between agents
export enum RelationType {
  FAMILY = 'FAMILY',
  FRIEND = 'FRIEND',
  COLLEAGUE = 'COLLEAGUE',
  ACQUAINTANCE = 'ACQUAINTANCE',
  ROMANTIC = 'ROMANTIC'
}

// Interface representing a memory associated with an agent
export interface Memory {
  id: string; // Unique identifier for the memory
  description: string; // Description of the memory
  importance: number; // Importance of the memory (scale: 1-10)
  timestamp: number; // Timestamp of when the memory occurred
  relatedCitizens: string[]; // List of agent IDs related to the memory
  emotions: Emotion[]; // Emotions associated with the memory
}

// Interface representing an emotion linked to a memory
export interface Emotion {
  type: EmotionType; // Type of emotion
  intensity: number; // Intensity of the emotion (scale: 1-100)
}

// Enum defining types of emotions
export enum EmotionType {
  JOY = 'JOY',
  SADNESS = 'SADNESS',
  ANGER = 'ANGER',
  FEAR = 'FEAR',
  SURPRISE = 'SURPRISE',
  TRUST = 'TRUST'
}

/*
This entities module ensures a consistent structure for virtual environments within the Evolve Framework.
For additional details, visit: https://github.com/evolveplayground/evolve-framework
*/
