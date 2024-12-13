import { v4 as uuidv4 } from 'uuid';
import { Citizen } from '../models/Citizen';
import { RelationType, IRelationship } from '../types';
import { StorageService } from './StorageService';
import { OpenAIService } from './OpenAIService';

export class SocialNetworkManager {
    constructor(
        private dataStorage: StorageService,
        private aiService: OpenAIService
    ) {}

    // Generates a family unit based on the given citizens
    async assembleFamilyGroup(members: Citizen[]) {
        if (members.length < 3) return;

        const sortedMembers = members.sort((a, b) => b.age - a.age); // Sort by age
        const parents = sortedMembers.slice(0, 2);
        const children = sortedMembers.slice(2);

        if (parents.length === 2) {
            await this.linkSpouses(parents[0], parents[1]);
        }

        for (const parent of parents) {
            for (const child of children) {
                if (this.isParentChildRelationshipValid(parent, child)) {
                    await this.linkParentAndChild(parent, child);
                }
            }
        }

        for (let i = 0; i < children.length; i++) {
            for (let j = i + 1; j < children.length; j++) {
                await this.linkSiblings(children[i], children[j]);
            }
        }
    }

    private isParentChildRelationshipValid(parent: Citizen, child: Citizen): boolean {
        return parent.age >= child.age + 18;
    }

    private async establishConnection(
        source: Citizen,
        target: Citizen,
        type: RelationType,
        intensity: number,
        description?: string
    ) {
        const connection: IRelationship = {
            targetId: target.id,
            targetName: target.name,
            type,
            strength: intensity,
            context: description
        };

        source.addRelationship(connection);
        await this.dataStorage.updateCitizen(source);
    }

    async createSocialConnections(citizens: Citizen[]) {
        for (const citizen of citizens) {
            const newConnections = citizens.filter(
                (potential) => potential.id !== citizen.id && !this.isExistingConnection(citizen, potential)
            );

            for (const candidate of newConnections) {
                const relationType = this.pickRandomRelationType();
                if (relationType) {
                    await this.linkSocially(citizen, candidate, relationType);
                }
            }
        }
    }

    private pickRandomRelationType(): RelationType | null {
        const probability = Math.random();
        if (probability < 0.4) return 'acquaintance';
        if (probability < 0.6) return 'friend';
        if (probability < 0.7) return 'rival';
        if (probability < 0.75) return 'enemy';
        return null;
    }

    private async linkSocially(from: Citizen, to: Citizen, type: RelationType) {
        const intensity = type === 'enemy' || type === 'rival' 
            ? -(Math.random() * 0.5 + 0.5) 
            : Math.random() * 0.5 + 0.5;

        const description = await this.generateConnectionDescription(type, from, to);

        await this.establishConnection(from, to, type, intensity, description);
        const reciprocalType = this.getReciprocalType(type);
        await this.establishConnection(to, from, reciprocalType, intensity, description);
    }

    private getReciprocalType(type: RelationType): RelationType {
        switch (type) {
            case 'friend':
            case 'rival':
            case 'enemy':
            case 'acquaintance':
                return type;
            default:
                return type;
        }
    }

    private async generateConnectionDescription(type: RelationType, from: Citizen, to: Citizen): Promise<string> {
        const prompt = `Generate a short description for the ${type} connection between two individuals:
        
        - ${from.name} (${from.occupation}, ${from.traits.join(', ')}, ${from.values.join(', ')})
        - ${to.name} (${to.occupation}, ${to.traits.join(', ')}, ${to.values.join(', ')})
        `;

        return await this.aiService.generateRelationshipContext(prompt);
    }

    private isExistingConnection(person1: Citizen, person2: Citizen): boolean {
        return person1.relationships.some(rel => rel.targetId === person2.id);
    }

    private async linkSpouses(spouse1: Citizen, spouse2: Citizen) {
        await this.establishConnection(spouse1, spouse2, 'spouse', 0.8, 'Married');
        await this.establishConnection(spouse2, spouse1, 'spouse', 0.8, 'Married');
    }

    private async linkParentAndChild(parent: Citizen, child: Citizen) {
        await this.establishConnection(parent, child, 'parent', 0.8, 'Parent of this individual');
        await this.establishConnection(child, parent, 'child', 0.8, 'Child of this individual');
    }

    private async linkSiblings(sibling1: Citizen, sibling2: Citizen) {
        await this.establishConnection(sibling1, sibling2, 'sibling', 0.7, 'Siblings');
        await this.establishConnection(sibling2, sibling1, 'sibling', 0.7, 'Siblings');
    }
}
