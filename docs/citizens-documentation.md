# Character Attributes and System Overview
# Documentation for the character data structure and its functionality.

## Character Definition
# Each character is represented as an object with unique attributes for defining their individuality and interactions.

### Core Information
# Basic identifiers and roles for each character.
- `id`: A universally unique identifier (UUID) for the character.
- `name`: The character's complete name.
- `age`: The character's numeric age.
- `profession`: The professional or primary role of the character.

### Personal Details
# Attributes that define the character's personality and interests.
- `personality`: A list describing the character's key traits.
- `interests`: A collection of activities the character enjoys.
- `advantages`: Highlights the character's strengths.
- `challenges`: Describes the character's weaknesses.
- `eccentricities`: A list of unique habits or behaviors.
- `principles`: Core values and beliefs of the character.
- `anxieties`: Fears that the character may have (can be empty).
- `ambitions`: Aspirations and goals for the future (can be empty).
- `history`: A textual summary of the character's background and motivations.

### Interpersonal Dynamics
# Relationships of a character with others within the system.
- `connections`: A list of relationship objects defined as follows:
  - `relatedId`: UUID of the other character involved.
  - `relatedName`: Name of the other character.
  - `relationshipType`: The nature of the relationship (e.g., "ally", "adversary", "colleague").
  - `bondStrength`: A numeric indicator of relationship strength (-1 to 1):
    - Positive values signify positive relationships.
    - Negative values denote negative or conflicting relationships.
    - Values close to 0 imply weak or neutral bonds.
    - Extremes (-1 or 1) indicate very strong connections.
  - `description`: A detailed narrative explaining the relationship.

### Event Records
# Documentation of significant events and interactions in a character's life.
- `events`: A collection of event objects with these attributes:
  - `eventId`: Unique identifier for the event.
  - `details`: Descriptive text of the event.
  - `participants`: A list of character IDs involved in the event.
  - `emotionalLevel`: A numeric value (0-1) representing the emotional intensity.
  - `category`: Type of event (e.g., "interaction", "milestone").
  - `priority`: Numeric value (0-1) indicating its significance.
  - `linkedInteraction`: An optional ID linking to a specific interaction.

## Data Structure
# Organization of character data within the system.

### Key Components
- `registry`: Dictionary containing character objects indexed by their UUIDs.
- `indices`: Alternative methods to access or organize the data:
  - `byProfession`: Groups characters based on their professions.

### System Metadata
# Information regarding data management and updates.
- `lastModified`: Timestamp for the most recent update.
- `schemaVersion`: The current version of the data structure.
- `characterCount`: Total number of characters in the dataset.
- `themeSetting`: The overarching theme for the character set.
- `createdOn`: Timestamp for when the data was initialized.

## Relationship Categories
# Explanation of predefined relationship types:
1. **Partner**: A close personal relationship (strength usually >0.8).
2. **Ally**: A strong positive association (strength between 0.6-1.0).
3. **Associate**: A casual or professional relationship (strength between 0.4-0.7).
4. **Rival**: A competitive dynamic (strength often negative).
5. **Adversary**: Hostile or conflicting relationship (strength <0).
6. **Family**: Relatives, with varying strengths.

## Event and Memory Utility
# Capturing and quantifying character experiences.
- Emotional narrative captures character perspectives and sentiments.
- Participants list ensures traceability of those involved in events.
- Emotional and importance values provide quantitative insights.
- Unique IDs maintain consistency and trackability across the dataset.

## Notes on Use
# Practical considerations for utilizing the system.
- Normalization: All numeric indicators range between -1 and 1 for consistency.
- Empty fields: Attributes like anxieties or ambitions are optional and can remain empty.
- Bond Strength: Useful for assessing the intensity and quality of relationships.
- Event Records: Provide depth and context to character interactions and history.
