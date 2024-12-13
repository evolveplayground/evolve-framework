// Define the structure for a Citizen object
export interface ICitizen {
    id: string;               // Unique identifier for the citizen
    name: string;             // Full name of the citizen
    age: number;              // Age of the citizen
    occupation: string;       // Job or role of the citizen
    traits: string[];         // Key personality traits
    hobbies: string[];        // Hobbies or leisure activities
    strengths: string[];      // Strengths or positive attributes
    weaknesses: string[];     // Weaknesses or negative attributes
    quirks: string[];         // Unique or unusual behaviors
    values: string[];         // Core beliefs or values
    fears: string[];          // Fears or anxieties
    dreams: string[];         // Aspirations or long-term goals
    background: string;       // Brief background or history
    relationships: IRelationship[]; // List of relationships with other citizens
    memories: IMemory[];      // List of significant memories
}

// Define possible relationship types
type RelationType = 
    'parent' |       // Parent-child relationship
    'child' |        // Child-parent relationship
    'spouse' |       // Marriage or partnership
    'friend' |       // Close friendship
    'acquaintance' | // Casual or superficial acquaintance
    'rival' |        // Rivalry or competition
    'enemy' |        // Hostility or enmity
    'sibling';       // Brother or sister

// Define the structure for a Relationship object
export interface IRelationship {
    targetId: string;         // ID of the related individual
    targetName: string;       // Name of the related individual
    type: RelationType;       // Type of relationship
    strength: number;         // Strength of the relationship (0-1 scale)
    context?: string;         // Additional context or history
}

// Define the structure for a Memory object
export interface IMemory {
    id: string;               // Unique identifier for the memory
    description: string;      // Description of the memory
    participants: string[];   // People involved in the memory
    emotionalImpact: number;  // Emotional significance of the memory
    type: 'interaction' | 'event'; // Type of memory (interaction or event)
    importance: number;       // Importance level of the memory
    interactionId?: string;   // ID linking to a related interaction
}

// Define the structure for an Interaction object
export interface IInteraction {
    id: string;               // Unique identifier for the interaction
    participants: string[];   // People involved in the interaction
    scenario: string;         // Description of the scenario
    messages: {
        speaker: string;      // Name of the speaker
        message: string;      // Content of the message
        context: string;      // Context or tone of the message
    }[];
}

// Define the structure for a Location object
export interface ILocation {
    district: string;         // District name
    street: string;           // Street name
    houseNumber: string;      // House number
    familyHomeId: string;     // ID linking to the family home
}

// Define the structure for a Scenario object
export interface IScenario {
    scenario: string;         // Description of the scenario
}

// Repository reference
// GitHub Repository: https://github.com/evolveplayground/evolve-framework
