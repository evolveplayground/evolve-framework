// Import required modules and types
import { ICitizen, IScenario, IMemory } from '../types';
import OpenAI from 'openai';
import { config } from '../config/config';

// OpenAIService class for handling AI-related operations
export class OpenAIService {
    private aiClient: OpenAI;
    private modelName: string;

    constructor() {
        this.aiClient = new OpenAI({ apiKey: config.OPENAI_API_KEY });
        this.modelName = config.MODEL;
    }

    // Generate a citizen's personality based on traits, hobbies, and occupation
    async createCitizenProfile(traits: string[], hobbies: string[], occupation: string): Promise<ICitizen> {
        const query = `Generate a detailed character for a simulation with these specifics:
        {
          "name": "unique full name with one surname",
          "age": "number (18-80)",
          "occupation": "${occupation}",
          "traits": ${JSON.stringify(traits)},
          "hobbies": ${JSON.stringify(hobbies)},
          "strengths": ["three strengths"],
          "weaknesses": ["three weaknesses"],
          "quirks": ["two or three quirks"],
          "values": ["two or three values"],
          "fears": ["one or two fears"],
          "dreams": ["one or two dreams"],
          "background": "brief backstory (2-3 sentences)"
        }

        Ensure the character is complex and unique with a culturally diverse perspective.`;

        const result = await this.aiClient.chat.completions.create({
            model: this.modelName,
            messages: [{ role: "system", content: query }],
        });

        const output = result.choices[0].message.content || '{}';
        return JSON.parse(output.replace(/^```json|```$/g, '').trim());
    }

    // Generate a scenario involving participants with an optional theme
    async createInteractionScenario(participants: (string | ICitizen)[], theme?: string): Promise<IScenario> {
        const names = participants.map(p => typeof p === 'string' ? p : `${p.name} (${p.occupation})`).join(', ');

        const query = `Design an interaction scenario for the following characters:
        ${names}
        Theme: ${theme || 'General'}

        Response format:
        {
          "scenario": "detailed description"
        }`;

        const result = await this.aiClient.chat.completions.create({
            model: this.modelName,
            messages: [{ role: "system", content: query }],
            temperature: 0.8,
            max_tokens: 500
        });

        const output = result.choices[0].message.content || '{}';
        try {
            const parsed = JSON.parse(output.replace(/```json|```/g, '').trim());
            if (!parsed.scenario) throw new Error('Invalid scenario response');
            return parsed;
        } catch (err) {
            console.error('Failed to parse scenario:', err);
            return { scenario: "An informal gathering among participants." };
        }
    }

    // Generate a dialogue response for a character
    async getDialogue(characterContext: string, conversationContext: string): Promise<string> {
        const query = `Act as a character and generate dialogue:
        Character context:
        ${characterContext}

        Conversation context:
        ${conversationContext}

        Guidelines:
        - Stay in character
        - Be concise (1-2 sentences)
        - Show personality and consider emotional state
        - Respond naturally and in English`;

        const result = await this.aiClient.chat.completions.create({
            model: this.modelName,
            messages: [{ role: "system", content: query }],
        });

        return result.choices[0].message.content || '';
    }

    // Analyze a scenario's impact on a character
    async analyzeScenarioImpact(scenario: string, character: string): Promise<IMemory> {
        const query = `Evaluate the emotional impact of this scenario:
        Character: ${character}
        Scenario: ${scenario}

        Provide a JSON response with:
        {
          "emotionalImpact": number (0-1),
          "description": "memory description",
          "longTermEffect": "impact analysis",
          "mood": "current mood"
        }`;

        const result = await this.aiClient.chat.completions.create({
            model: this.modelName,
            messages: [{ role: "system", content: query }],
        });

        const output = result.choices[0].message.content || '{}';
        return JSON.parse(output.replace(/^```json|```$/g, '').trim());
    }

    // Summarize memories into a cohesive narrative
    async summarizeMemories(memories: IMemory[]): Promise<string> {
        const query = `Combine the following memories into a summary:
        ${memories.map(m => `- ${m.description} (Impact: ${m.emotionalImpact})`).join('\n')}

        Provide a single paragraph.`;

        const result = await this.aiClient.chat.completions.create({
            model: this.modelName,
            messages: [{ role: "system", content: query }],
        });

        return result.choices[0].message.content || '';
    }

    // Generate a chat response considering character and user input
    async handleChatInteraction(characterContext: string, userMessage: string): Promise<string> {
        const query = `Generate an interactive chat response:
        Character context:
        ${characterContext}
        User message:
        "${userMessage}"

        Response guidelines:
        - Stay in character
        - Reflect relationships and memories
        - Respond conversationally and naturally
        - Be consistent with personality traits and emotional state`;

        const result = await this.aiClient.chat.completions.create({
            model: this.modelName,
            messages: [{ role: "system", content: query }],
        });

        return result.choices[0].message.content || '';
    }
}
