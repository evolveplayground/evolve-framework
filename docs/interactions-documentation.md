# Interaction Framework Documentation
# Comprehensive guide to understanding and implementing interactions within the Evolve Framework.

## Core Overview
# Interactions serve as pivotal moments within the simulation, capturing events and encounters between characters.

### Key Components of an Interaction
# Every interaction consists of the following attributes:
- `interactionId`: A unique identifier for tracking the event.
- `participants`: A list of character IDs involved in the event.
- `timestamp`: The time when the interaction occurred.
- `type`: The category of the interaction (e.g., "conversation", "collaboration", "dispute").

### Memory Association
# Each interaction generates multiple memories:
- Every participant records their perspective as a unique memory.
- Memories capture emotional context and the personal significance of the event.

## Measuring Emotional Impact
# Interactions are quantified based on their emotional effect on participants.

### Emotional Metrics
- `emotionalImpact`: Scale from 0 to 1 indicating emotional significance:
  - **0.9-1.0**: Profoundly life-changing.
  - **0.7-0.8**: Highly significant.
  - **0.5-0.6**: Moderately impactful.
  - **0.3-0.4**: Slightly meaningful.
  - **0.1-0.2**: Minimal impact.

### Importance Rating
- `importance`: Scale from 0 to 1, often correlating with emotional impact:
  - Reflects long-term effects on character relationships and development.
  - Plays a critical role in adjusting relationship dynamics.

## Types of Interactions
# Common categories include:

1. **Collaborative Activities**
   - Joint ventures, such as community initiatives or creative projects.

2. **Social Engagements**
   - Informal gatherings, casual conversations, or group events.

3. **Professional Encounters**
   - Workplace discussions, partnerships, or competitive scenarios.

4. **Conflicts and Disputes**
   - Clashes over resources, ideology, or approaches.

## Relationship Impact
# How interactions shape connections between participants:

### Positive Influences
- Build trust through cooperation.
- Strengthen bonds via shared experiences.
- Encourage mutual understanding and empathy.

### Negative Consequences
- Foster rivalries from disagreements.
- Damage pre-existing relationships.
- Create hostile or adversarial dynamics.

## Memory Formation Process
# How interactions transition into personal memories:

1. **Event Occurrence**
   - The interaction takes place and participants perceive it individually.

2. **Perspective Logging**
   - Each participant records a memory based on their viewpoint.
   - Personal emotions and context are captured.

3. **Impact Assessment**
   - Emotional intensity and importance are determined.
   - Updates to relationships are applied based on outcomes.

## Storytelling Applications
# Utilizing interactions to enrich narratives:

1. **Character Evolution**
   - Showcase growth and changing beliefs.
   - Highlight unique traits and values.

2. **Relationship Dynamics**
   - Forge new bonds or intensify existing ones.
   - Introduce conflicts and resolutions.

3. **Plot Progression**
   - Drive the storyline with cause-and-effect events.
   - Build compelling story arcs through meaningful interactions.

## Technical Aspects
# Implementation details for managing interactions.

### Data Storage
- Stored as standalone interaction events.
- Linked to character memories via `interactionId`.
- Indexed for quick access.

### Retrieval Methods
- Access interactions by:
  - Interaction ID.
  - Participant IDs.
  - Timeframe or type of interaction.

### Maintenance Protocols
- Regularly update relationship metrics.
- Archive outdated interactions.
- Ensure consistency in memory linkage and data accuracy.
