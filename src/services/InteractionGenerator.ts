import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from './OpenAIService';
import { StorageService } from './StorageService';
import { Citizen } from '../models/Citizen';
import { IInteraction, IMemory } from '../types';
import { Memory } from '../models/Memory';

export class InteractionBuilder {
    constructor(
        private aiService: OpenAIService,
        private dataStore: StorageService
    ) {}

    // Generates a detailed interaction scenario and conversation.
    async createInteraction(participants, messageLimit, theme) {
        const participantNames = participants.map(participant => participant.name);

        // Generate a base scenario using AI with an optional theme.
        const scenario = await this.aiService.generateScenario(participantNames, theme);

        console.log('\nScenario:', scenario.scenario);

        let messages = [];
        let context = scenario.scenario;

        console.log('\nConversation:');

        // Create a conversation based on the scenario and participants.
        for (let count = 0; count < messageLimit; count++) {
            const speaker = participants[count % participants.length];
            const nextSpeaker = participants[(count + 1) % participants.length];

            const speakerContext = this.buildContext(speaker, nextSpeaker);

            const reply = await this.aiService.generateResponse(speakerContext, context);

            console.log(`${speaker.name}:`, reply);

            messages.push({
                speaker: speaker.name,
                message: reply,
                context: speakerContext
            });

            context += `\n${speaker.name}: ${reply}`;
        }

        const interaction = {
            id: uuidv4(),
            participants: participants.map(person => person.id),
            scenario: scenario.scenario,
            messages
        };

        await this.updateMemories(participants, interaction);
        await this.dataStore.addInteraction(interaction);

        return interaction;
    }

    // Builds context for the current participant in the conversation.
    buildContext(current, target) {
        const recentMemories = current.memories
            .sort((a, b) => b.importance - a.importance)
            .slice(0, 5);

        const relationships = current.relationships
            .filter(relation => relation.targetId === target.id)
            .map(relation => `${relation.type} (strength: ${relation.strength.toFixed(2)})`);

        return `
            Name: ${current.name}
            Age: ${current.age}
            Occupation: ${current.occupation}
            Traits: ${current.traits.join(', ')}
            Recent Memories: ${recentMemories.map(memory => memory.description).join('. ')}
            Relationship with ${target.name}: ${relationships.join(', ') || 'none'}
        `;
    }

    // Updates participant memories based on the interaction.
    async updateMemories(participants, interaction) {
        for (const participant of participants) {
            if (participant.memories.length > 50) {
                await this.summarizeOldMemories(participant);
            }

            const emotionalEffect = await this.calculateImpact(participant, interaction, participants);

            const perspective = await this.aiService.generateMemoryPerspective(
                participant.name,
                interaction.scenario,
                interaction.messages,
                participant.traits,
                emotionalEffect
            );

            const newMemory = new Memory({
                id: uuidv4(),
                description: perspective,
                participants: interaction.participants,
                emotionalImpact: emotionalEffect,
                type: 'interaction',
                importance: emotionalEffect,
                interactionId: interaction.id
            });

            participant.addMemory(newMemory);
            await this.updateRelationships(participant, interaction, emotionalEffect);
            await this.dataStore.updateCitizen(participant);
        }
    }

    // Summarizes and collapses old memories into a single memory.
    async summarizeOldMemories(citizen) {
        const olderMemories = citizen.memories
            .sort((a, b) => b.importance - a.importance)
            .slice(30);

        if (olderMemories.length > 0) {
            const summary = await this.aiService.generateMemorySummary(olderMemories);
            const condensedMemory = new Memory({
                description: summary,
                type: 'event',
                emotionalImpact: olderMemories.reduce((total, memory) => total + memory.emotionalImpact, 0) / olderMemories.length,
                participants: [...new Set(olderMemories.flatMap(memory => memory.participants))]
            });

            citizen.memories = citizen.memories.filter(memory => !olderMemories.includes(memory));
            citizen.addMemory(condensedMemory);
        }
    }

    // Calculates the emotional impact of an interaction for a participant.
    async calculateImpact(participant, interaction, group) {
        const individualContext = `${participant.name}, ${participant.occupation}, traits: ${participant.traits.join(', ')}`;
        const others = group.filter(person => person.id !== participant.id).map(person => person.name).join(', ');

        const scenarioDescription = `${interaction.scenario}\nInteracted with: ${others}\nOutcome: ${interaction.messages.map(msg => msg.message).join('\n')}`;

        const impact = await this.aiService.generateMemoryImpact(scenarioDescription, individualContext);
        return impact.emotionalImpact;
    }

    // Updates relationships for a participant based on interaction outcomes.
    async updateRelationships(participant, interaction, impact) {
        const otherIds = interaction.participants.filter(id => id !== participant.id);

        for (const targetId of otherIds) {
            let relation = participant.relationships.find(rel => rel.targetId === targetId);
            const target = await this.dataStore.getCitizen(targetId);

            if (!target) continue;

            if (!relation) {
                relation = {
                    targetId,
                    targetName: target.name,
                    type: 'acquaintance',
                    strength: 0.5,
                    context: ''
                };
                participant.relationships.push(relation);
            }

            const adjustment = impact * 0.1;
            relation.strength = Math.max(0, Math.min(1, relation.strength + adjustment));
        }
    }
}