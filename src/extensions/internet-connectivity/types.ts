// Evolve Framework Web Interaction Types

// This module defines types used for web-based interactions in the Evolve Framework.
// It includes structures for search results, interactions, knowledge, and preferences.

// Interface for representing a web search result
export interface WebSearchResult {
  url: string; // URL of the search result
  title: string; // Title of the result
  snippet: string; // Summary snippet of the content
  timestamp: number; // Timestamp when the result was retrieved
  relevanceScore: number; // Relevance score of the result (scale: 1-100)
  source: string; // Source of the result (e.g., domain or platform)
}

// Interface for web interactions performed by agents
export interface WebInteraction {
  id: string; // Unique identifier for the interaction
  timestamp: number; // Timestamp of the interaction
  url: string; // URL of the interaction
  type: WebInteractionType; // Type of web interaction
  content: string; // Content retrieved or generated during the interaction
  sentiment?: number; // Optional sentiment score (scale: -1 to 1)
  importance: number; // Importance score (scale: 1-10)
}

// Enum for types of web interactions
export enum WebInteractionType {
  SEARCH = 'SEARCH',
  READ = 'READ',
  SOCIAL = 'SOCIAL',
  COMMERCE = 'COMMERCE',
  LEARNING = 'LEARNING'
}

// Interface for web-based knowledge acquired by agents
export interface WebKnowledge {
  topic: string; // Topic of the knowledge
  source: string; // Source of the knowledge
  content: string; // Content of the knowledge
  confidence: number; // Confidence level (scale: 1-10)
  lastUpdated: number; // Timestamp of the last update
  relatedTopics: string[]; // List of related topics
}

// Interface for agent web preferences
export interface WebPreferences {
  favoriteTopics: string[]; // Topics the agent frequently searches for
  blockedDomains: string[]; // List of domains the agent avoids
  searchFrequency: number; // Frequency of web searches (times per day)
  privacyLevel: PrivacyLevel; // Privacy settings for web interactions
}

// Enum for levels of privacy in web interactions
export enum PrivacyLevel {
  PUBLIC = 'PUBLIC',
  SEMI_PRIVATE = 'SEMI_PRIVATE',
  PRIVATE = 'PRIVATE',
  ANONYMOUS = 'ANONYMOUS'
}

/*
Note: This module is currently experimental and is not yet fully integrated with the Evolve Framework core.
The implementation is subject to significant changes and should not be used in production environments.
For further details, visit: https://github.com/evolveplayground/evolve-framework
*/
