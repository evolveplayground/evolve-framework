// Evolve Framework Character Attributes Module

// This module defines attributes for characters within the Evolve Framework. 
// It includes various personality traits, hobbies, occupations, and relationship types to create dynamic character profiles.

export const characterAttributes = {

  // Personality traits that define character behavior
  personalities: [
    'extrovert', 'introvert', 'analytical', 'creative', 'organized', 'spontaneous',
    'ambitious', 'relaxed', 'traditional', 'progressive', 'optimistic', 'realistic',
    'emotional', 'rational', 'adventurous', 'cautious', 'confident', 'humble'
  ],

  // Hobbies for character customization and story enrichment
  hobbies: [
    'reading', 'painting', 'gardening', 'cooking', 'photography', 'music',
    'sports', 'traveling', 'writing', 'dancing', 'meditation', 'gaming',
    'hiking', 'collecting', 'volunteering', 'fishing', 'crafting'
  ],

  // Occupations to define a character's role in the virtual world
  occupations: [
    'teacher', 'doctor', 'engineer', 'artist', 'chef', 'writer',
    'entrepreneur', 'police officer', 'nurse', 'architect', 'mechanic',
    'programmer', 'lawyer', 'musician', 'shopkeeper', 'librarian'
  ],

  // Relationship types to establish social connections between characters
  relationshipTypes: [
    { type: 'friend', maxCount: 5 },
    { type: 'spouse', maxCount: 1 },
    { type: 'parent', maxCount: 2 },
    { type: 'child', maxCount: 4 }
  ]
};

/*
This configuration ensures flexibility and variety in character design while maintaining realistic constraints.
For more information, visit: https://github.com/evolveplayground/evolve-framework
*/
