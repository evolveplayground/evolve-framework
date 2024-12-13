// Evolve Framework Learning System Types

// This module defines the types used within the Evolve Framework Learning System.
// It includes structures for skills, courses, learning styles, institutions, and more.

// Interface representing a skill
export interface Skill {
  id: string; // Unique identifier for the skill
  name: string; // Name of the skill
  category: SkillCategory; // Category/type of the skill
  level: number; // Current level of the skill
  maxLevel: number; // Maximum achievable level for the skill
  prerequisites: string[]; // List of required skills or knowledge
  timeToLearn: number; // Time required to learn the skill (in hours)
  practicalValue: number; // Practical value score of the skill (scale: 1-10)
}

// Enum for skill categories
export enum SkillCategory {
  TECHNICAL = 'TECHNICAL',
  SOCIAL = 'SOCIAL',
  CREATIVE = 'CREATIVE',
  PHYSICAL = 'PHYSICAL',
  COGNITIVE = 'COGNITIVE'
}

// Interface representing a course
export interface Course {
  id: string; // Unique identifier for the course
  name: string; // Name of the course
  description: string; // Brief description of the course
  skills: string[]; // Skills taught in the course
  duration: number; // Duration of the course (in hours)
  difficulty: number; // Difficulty level (scale: 1-10)
  capacity: number; // Maximum number of students
  enrolledStudents: string[]; // IDs of enrolled students
  schedule: CourseSchedule; // Schedule of the course
  instructor: string; // Instructor ID
  institution: string; // Institution offering the course
}

// Interface for course schedules
export interface CourseSchedule {
  startDate: number; // Start date (timestamp)
  endDate: number; // End date (timestamp)
  sessions: CourseSession[]; // List of individual sessions
  totalHours: number; // Total duration of the course (in hours)
}

// Interface for individual course sessions
export interface CourseSession {
  day: number; // Day of the week (1-7, where 1 = Monday)
  startTime: number; // Start time (in hours, 24-hour format)
  duration: number; // Duration of the session (in hours)
  location: string; // Location of the session
  type: SessionType; // Type of session
}

// Enum for session types
export enum SessionType {
  LECTURE = 'LECTURE',
  PRACTICAL = 'PRACTICAL',
  WORKSHOP = 'WORKSHOP',
  EXAM = 'EXAM',
  DISCUSSION = 'DISCUSSION'
}

// Interface representing knowledge
export interface Knowledge {
  id: string; // Unique identifier for the knowledge piece
  topic: string; // Topic of the knowledge
  level: number; // Proficiency level (scale: 1-10)
  acquiredAt: number; // Timestamp when the knowledge was acquired
  lastPracticed: number; // Timestamp of last practice
  confidence: number; // Confidence score (scale: 1-10)
  relatedSkills: string[]; // Skills related to this knowledge
}

// Interface representing an educational institution
export interface EducationalInstitution {
  id: string; // Unique identifier for the institution
  name: string; // Name of the institution
  type: InstitutionType; // Type of institution
  reputation: number; // Reputation score (scale: 1-10)
  capacity: number; // Maximum capacity of the institution
  courses: string[]; // List of course IDs offered
  faculty: string[]; // List of faculty IDs
  facilities: Facility[]; // List of facilities available
}

// Enum for institution types
export enum InstitutionType {
  UNIVERSITY = 'UNIVERSITY',
  COLLEGE = 'COLLEGE',
  TRADE_SCHOOL = 'TRADE_SCHOOL',
  ACADEMY = 'ACADEMY',
  RESEARCH_CENTER = 'RESEARCH_CENTER'
}

// Interface representing a facility in an institution
export interface Facility {
  id: string; // Unique identifier for the facility
  name: string; // Name of the facility
  type: FacilityType; // Type/category of the facility
  capacity: number; // Maximum capacity of the facility
  equipment: string[]; // List of available equipment
  availability: boolean; // Availability status of the facility
}

// Enum for facility types
export enum FacilityType {
  CLASSROOM = 'CLASSROOM',
  LABORATORY = 'LABORATORY',
  LIBRARY = 'LIBRARY',
  WORKSHOP = 'WORKSHOP',
  AUDITORIUM = 'AUDITORIUM'
}

// Enum for learning styles
export enum LearningStyle {
  VISUAL = 'VISUAL',
  AUDITORY = 'AUDITORY',
  KINESTHETIC = 'KINESTHETIC',
  READING_WRITING = 'READING_WRITING'
}

/*
Note: This module is currently experimental and is not yet fully integrated with the Evolve Framework core.
The implementation is subject to significant changes and should not be used in production environments.
For further details, visit: https://github.com/evolveplayground/evolve-framework
*/
