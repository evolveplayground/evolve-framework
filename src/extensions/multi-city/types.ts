// Evolve Framework InterCity Event Types

// This module defines the types and structures used for managing inter-city events and relationships
// within the Evolve Framework. It includes enums and interfaces for events and city relations.

// Interface representing an inter-city event
export interface InterCityEvent {
  id: string; // Unique identifier for the event
  sourceCity: string; // ID of the city initiating the event
  targetCity: string; // ID of the target city
  type: InterCityEventType; // Type of the inter-city event
  data: any; // Additional data associated with the event
  timestamp: number; // Timestamp of when the event occurred
}

// Enum for different types of inter-city events
export enum InterCityEventType {
  CITIZEN_MIGRATION = 'CITIZEN_MIGRATION', // Movement of citizens between cities
  TRADE = 'TRADE', // Trade agreements or transactions
  CULTURAL_EXCHANGE = 'CULTURAL_EXCHANGE', // Sharing cultural assets or activities
  DIPLOMATIC_RELATION = 'DIPLOMATIC_RELATION', // Diplomatic interactions between cities
  JOINT_PROJECT = 'JOINT_PROJECT' // Collaborative projects between cities
}

// Interface representing a relationship between two cities
export interface CityRelation {
  cityId1: string; // ID of the first city
  cityId2: string; // ID of the second city
  relationshipType: CityRelationType; // Type of relationship
  strength: number; // Strength of the relationship (scale: 1-100)
  establishedAt: number; // Timestamp when the relationship was established
  lastInteraction: number; // Timestamp of the most recent interaction
}

// Enum for different types of city relationships
export enum CityRelationType {
  ALLIED = 'ALLIED', // Allied relationship
  TRADING_PARTNERS = 'TRADING_PARTNERS', // Partnership focused on trade
  CULTURAL_EXCHANGE = 'CULTURAL_EXCHANGE', // Cultural exchange programs
  COMPETITIVE = 'COMPETITIVE', // Competitive relationship
  NEUTRAL = 'NEUTRAL' // Neutral stance between cities
}

/*
Note: This module is currently experimental and is not yet fully integrated with the Evolve Framework core.
The implementation is subject to significant changes and should not be used in production environments.
For further details, visit: https://github.com/evolveplayground/evolve-framework
*/
