// Singleton class for name registration and validation
export class NameValidator {
    // Static property to hold the singleton instance
    private static _singletonInstance: NameValidator;

    // Internal storage for registered names
    private readonly _nameStorage: Set<string>;

    // Private constructor to prevent external instantiation
    private constructor() {
        this._nameStorage = new Set();
    }

    /**
     * Retrieve the singleton instance of NameValidator.
     * If the instance does not exist, it will be created.
     * @returns {NameValidator} The singleton instance.
     */
    static getInstance(): NameValidator {
        if (!this._singletonInstance) {
            this._singletonInstance = new NameValidator();
        }
        return this._singletonInstance;
    }

    /**
     * Check if a given name is already registered.
     * @param {string} name - The name to check.
     * @returns {boolean} True if the name is already registered, otherwise false.
     */
    isRegistered(name: string): boolean {
        return this._nameStorage.has(name.toLowerCase());
    }

    /**
     * Register a new name if it is not already taken.
     * @param {string} name - The name to register.
     */
    addName(name: string): void {
        this._nameStorage.add(name.toLowerCase());
    }

    /**
     * Clear all registered names from the storage.
     */
    reset(): void {
        this._nameStorage.clear();
    }
}

// For more information, visit: https://github.com/evolveplayground/evolve-framework
