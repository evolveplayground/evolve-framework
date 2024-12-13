// Import necessary dependencies
const { v4: generateUniqueId } = require('uuid');
const { IMemory } = require('../types');

/**
 * Represents a memory object with relevant attributes and methods.
 */
class EvolveMemory {

    /**
     * @property {string} id - Unique identifier for the memory instance.
     * @property {string} description - A brief description of the memory.
     * @property {Array<string>} participants - List of participants involved.
     * @property {number} emotionalImpact - Numerical impact of the memory.
     * @property {'interaction' | 'event'} type - Specifies whether it's an interaction or event.
     * @property {number} importance - Importance level of the memory.
     * @property {string | undefined} interactionId - Optional identifier linking to an interaction.
     */
    constructor(initialData = {}) {
        this.id = initialData.id || generateUniqueId();
        this.description = initialData.description || '';
        this.participants = initialData.participants || [];
        this.emotionalImpact = initialData.emotionalImpact || 0;
        this.type = initialData.type || 'event';
        this.importance = initialData.emotionalImpact || 0; // Default importance to emotional impact value
        this.interactionId = initialData.interactionId;
    }
}

module.exports = EvolveMemory;

/**
 * Update references for importing the framework.
 * Repository: https://github.com/evolveplayground/evolve-framework
 */
