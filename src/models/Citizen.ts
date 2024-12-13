// Evolve Framework Citizen Class Module

// This module defines the Citizen class for the Evolve Framework.
// It extends the Agent structure and adds methods for managing memories and relationships.

import { v4 as uuidv4 } from 'uuid';
import { Agent, Memory, Relationship } from './entities';

export class Citizen implements Agent {
  id: string; // Unique identifier for the citizen
  name: string; // Name of the citizen
  age: number; // Age of the citizen
  occupation: string; // Occupation of the citizen
  traits: string[]; // Personality traits
  hobbies: string[]; // Hobbies of the citizen
  strengths: string[]; // Strengths or positive traits
  weaknesses: string[]; // Weaknesses or negative traits
  quirks: string[]; // Unique quirks or behaviors
  values: string[]; // Core values of the citizen
  fears: string[]; // Fears of the citizen
  dreams: string[]; // Aspirations or dreams
  background: string; // Background story
  relationships: Relationship[]; // List of relationships
  memories: Memory[]; // List of significant memories

  constructor(data: Partial<Agent>) {
    this.id = data.id || uuidv4(); // Assign unique ID if not provided
    this.name = data.name || 'Unnamed Citizen';
    this.age = data.age || 0;
    this.occupation = data.occupation || 'Unemployed';
    this.traits = data.traits || [];
    this.hobbies = data.hobbies || [];
    this.strengths = data.strengths || [];
    this.weaknesses = data.weaknesses || [];
    this.quirks = data.quirks || [];
    this.values = data.values || [];
    this.fears = data.fears || [];
    this.dreams = data.dreams || [];
    this.background = data.background || 'No background information.';
    this.relationships = data.relationships || [];
    this.memories = data.memories || [];
  }

  // Adds a memory to the citizen's memory list
  addMemory(memory: Memory): void {
    this.memories.push(memory);
  }

  // Adds a relationship to the citizen's relationships
  addRelationship(relationship: Relationship): void {
    this.relationships.push(relationship);
  }

  // Retrieves memories filtered by type
  getMemoriesByType(type: Memory['type']): Memory[] {
    return this.memories.filter(memory => memory.type === type);
  }

  // Finds a specific relationship with another citizen by ID
  getRelationshipsWith(citizenId: string): Relationship | undefined {
    return this.relationships.find(rel => rel.targetId === citizenId);
  }

  // Groups relationships by target person
  getRelationshipsByPerson(): Map<string, Relationship[]> {
    const relationshipMap = new Map<string, Relationship[]>();
    for (const relationship of this.relationships) {
      const existing = relationshipMap.get(relationship.targetId) || [];
      existing.push(relationship);
      relationshipMap.set(relationship.targetId, existing);
    }
    return relationshipMap;
  }

  // Formats relationships into a readable string
  getFormattedRelationships(): string {
    const relationshipMap = this.getRelationshipsByPerson();
    let output = '';
    for (const [targetId, relationships] of relationshipMap) {
      const target = relationships[0].targetName || 'Unknown';
      output += `\n${target}:
`;
      relationships.forEach(r => {
        output += `  - ${r.type} (strength: ${r.strength.toFixed(2)})\n`;
      });
    }
    return output;
  }
}

/*
This Citizen class module enhances the functionality of agents within the Evolve Framework by providing tools for managing memories and relationships.
For additional details, visit: https://github.com/evolveplayground/evolve-framework
*/
