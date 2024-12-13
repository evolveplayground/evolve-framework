// Import necessary services and configurations
import readline from 'readline';
import { OpenAIService } from '../services/OpenAIService';
import { StorageService } from '../services/StorageService';
import { config } from '../config/config';
import { Citizen } from '../models/Citizen';

// Main class for handling citizen chat interactions
export class CitizenChatHandler {
  constructor(
    private aiService: OpenAIService, // Handles AI-driven responses
    private dataStorage: StorageService // Manages data persistence and retrieval
  ) {}

  // Entry point for starting the chat session
  async initiateChat(citizenIdentifier: string) {
    const citizenRecord = await this.dataStorage.getCitizen(citizenIdentifier);
    if (!citizenRecord) return;

    const citizenInstance = new Citizen({
      ...citizenRecord,
      memories: citizenRecord.memories,
    });

    const fullContext = this.composeContext(citizenInstance);
    console.log(`\nEngaging with ${citizenInstance.name}`);

    while (true) {
      const userInput = await this.captureUserInput();
      if (userInput.toLowerCase() === 'exit') break;

      const aiReply = await this.aiService.generateChatResponse(fullContext, userInput);
      console.log(`\n${citizenInstance.name}: ${aiReply}\n`);
    }
  }

  // Generates the complete context for AI interaction
  private composeContext(citizen: Citizen): string {
    const relationshipDetails = this.formatRelationships(citizen);
    const significantMemories = citizen.memories
      .sort((a, b) => b.importance - a.importance)
      .slice(0, 5);

    return `
      Name: ${citizen.name}
      Age: ${citizen.age}
      Role: ${citizen.occupation}
      Personality Traits: ${citizen.traits.join(', ')}
      Core Values: ${citizen.values.join(', ')}
      History: ${citizen.background}

      Social Bonds:
      ${relationshipDetails}

      Notable Memories:
      ${significantMemories.map(memory => `- ${memory.description}`).join('\n')}

      Please respond as ${citizen.name}, considering the above details.
    `;
  }

  // Formats relationships into a readable string
  private formatRelationships(citizen: Citizen): string {
    return citizen.relationships
      .map(relationship => {
        const relationshipDescription = relationship.context
          ? `(${relationship.context})`
          : `(Strength: ${relationship.strength.toFixed(2)})`;
        return `- ${relationship.targetName}: ${relationship.type} ${relationshipDescription}`;
      })
      .join('\n');
  }

  // Captures user input asynchronously
  private captureUserInput(): Promise<string> {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise(resolve => {
      interface.question('You: ', input => {
        interface.close();
        resolve(input);
      });
    });
  }
}

// Updated repository URL
// Framework Source: https://github.com/evolveplayground/evolve-framework
