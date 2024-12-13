// Evolve Framework Language Model Adapter Types and Factory

// This module defines types and a factory pattern for managing language model providers in the Evolve Framework.

// Interface for the response from a language model
export interface LLMResponse {
  text: string; // The generated text response
  metadata?: {
    model: string; // Name of the model used
    confidence?: number; // Optional confidence score for the response
    tokens?: number; // Optional token count of the response
  };
}

// Interface for the configuration required to initialize a language model
export interface LLMConfig {
  model: string; // Name of the language model
  temperature?: number; // Sampling temperature for response generation
  maxTokens?: number; // Maximum number of tokens to generate
  apiKey?: string; // API key for the language model provider
  endpoint?: string; // API endpoint for the language model
}

// Base interface for Language Model providers
export interface LLMProvider {
  initialize(config: LLMConfig): Promise<void>; // Initializes the provider with the given configuration
  generate(prompt: string): Promise<LLMResponse>; // Generates a response based on the provided prompt
  generateWithContext(prompt: string, context: string[]): Promise<LLMResponse>; // Generates a response using additional context
  estimateTokens(text: string): number; // Estimates the number of tokens in the given text
}

// Factory class for creating instances of language model providers
export class LLMProviderFactory {
  private static providers: Map<string, new () => LLMProvider> = new Map(); // Registered providers

  // Registers a new provider with the factory
  public static registerProvider(name: string, provider: new () => LLMProvider): void {
    this.providers.set(name, provider);
  }

  // Creates an instance of the specified provider
  public static createProvider(name: string): LLMProvider {
    const Provider = this.providers.get(name);
    if (!Provider) {
      throw new Error(`LLM provider '${name}' not found`);
    }
    return new Provider();
  }
}

/*
Note: This module is currently experimental and is not yet fully integrated with the Evolve Framework core.
The implementation is subject to significant changes and should not be used in production environments.
For further details, visit: https://github.com/evolveplayground/evolve-framework
*/
