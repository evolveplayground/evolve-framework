// Evolve Framework Event Definitions

// This module defines the core structure and types for events within the Evolve Framework.
// It includes interfaces and enums for events, locations, participants, requirements, budgets, and impacts.

// Interface for defining an event
export interface Event {
  id: string; // Unique identifier for the event
  name: string; // Name of the event
  type: EventType; // Type/category of the event
  description: string; // Detailed description of the event
  startDate: number; // Start date as a timestamp
  endDate: number; // End date as a timestamp
  location: EventLocation; // Location details of the event
  capacity: number; // Maximum number of participants
  participants: Participant[]; // List of participants involved
  traditions: string[]; // Associated traditions
  culturalSignificance: number; // Level of cultural significance (scale: 1-10)
  requirements: EventRequirement[]; // List of event requirements
  budget: EventBudget; // Financial details for the event
}

// Enum for event types
export enum EventType {
  FESTIVAL = 'FESTIVAL',
  CELEBRATION = 'CELEBRATION',
  CEREMONY = 'CEREMONY',
  PARADE = 'PARADE',
  EXHIBITION = 'EXHIBITION',
  PERFORMANCE = 'PERFORMANCE',
  WORKSHOP = 'WORKSHOP'
}

// Interface for defining an event location
export interface EventLocation {
  name: string; // Name of the location
  coordinates: {
    x: number; // X-coordinate
    y: number; // Y-coordinate
  };
  capacity: number; // Maximum capacity of the location
  indoor: boolean; // Indicates if the location is indoors
  accessibility: number; // Accessibility score (scale: 1-10)
}

// Interface for defining participants
export interface Participant {
  id: string; // Unique identifier for the participant
  role: ParticipantRole; // Role of the participant in the event
  joinedAt: number; // Timestamp when the participant joined
  contribution: number; // Contribution score (scale: 1-100)
  satisfaction?: number; // Optional satisfaction score (scale: 1-100)
}

// Enum for participant roles
export enum ParticipantRole {
  ORGANIZER = 'ORGANIZER',
  PERFORMER = 'PERFORMER',
  ATTENDEE = 'ATTENDEE',
  VOLUNTEER = 'VOLUNTEER',
  VENDOR = 'VENDOR'
}

// Interface for event requirements
export interface EventRequirement {
  type: RequirementType; // Type of requirement
  quantity: number; // Quantity required
  priority: number; // Priority level (scale: 1-10)
  fulfilled: boolean; // Indicates if the requirement is fulfilled
}

// Enum for requirement types
export enum RequirementType {
  SPACE = 'SPACE',
  STAFF = 'STAFF',
  EQUIPMENT = 'EQUIPMENT',
  PERMITS = 'PERMITS',
  SECURITY = 'SECURITY'
}

// Interface for managing event budgets
export interface EventBudget {
  total: number; // Total budget allocated
  allocated: Map<string, number>; // Allocated budget by category
  spent: Map<string, number>; // Spent budget by category
  revenue: number; // Revenue generated from the event
  currency: string; // Currency used for the budget
}

// Interface for event impact assessment
export interface EventImpact {
  culturalShift: number; // Impact on cultural dynamics (scale: 1-10)
  socialCohesion: number; // Impact on social cohesion (scale: 1-10)
  economicImpact: number; // Economic impact (scale: 1-10)
  memorability: number; // Memorability score (scale: 1-10)
}

/*
Note: This file is currently experimental and not fully integrated with the Evolve Framework core.
The implementation is subject to change and should not be used in production environments.
For more details, visit: https://github.com/evolveplayground/evolve-framework
*/
