/**
 * FITNESS APP TYPE DEFINITIONS
 * 
 * This file contains all core data structures for the fitness application.
 * Each interface represents a distinct domain entity with typed properties.
 */

/**
 * WORKOUT INTERFACE
 * Represents a workout routine containing multiple exercises
 * 
 * @property id - Unique identifier for the workout
 * @property name - Name/title of the workout
 * @property exercises - Array of exercises included in this workout
 * @property difficulty - Experience level required
 * @property duration - Estimated completion time in minutes
 * @property category - Type of workout (strength, cardio, etc.)
 * @property description - Detailed explanation of the workout
 * @property isCustom - Flag for user-created workouts (optional)
 */
export interface Workout {
    id: string;
    name: string;
    exercises: Exercise[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // in minutes
    category: 'strength' | 'cardio' | 'flexibility' | 'balance';
    description: string;
    isCustom?: boolean;
  }
  
  /**
   * EXERCISE INTERFACE
   * Represents an individual exercise within a workout
   * 
   * @property id - Unique identifier
   * @property name - Name of the exercise
   * @property sets - Number of sets (optional for duration-based exercises)
   * @property reps - Number of repetitions per set (optional)
   * @property duration - Time to perform in seconds (optional for rep-based exercises)
   * @property restTime - Recovery time between sets in seconds (optional)
   * @property description - Instructions for proper form/execution
   * @property image - URL to demonstration image/gif (optional)
   */
  export interface Exercise {
    id: string;
    name: string;
    sets?: number;
    reps?: number;
    duration?: number; // in seconds
    restTime?: number; // in seconds
    description: string;
    image?: string;
  }
  
  /**
   * CALORIE ENTRY INTERFACE
   * Tracks nutritional intake for a specific food item
   * 
   * @property id - Unique identifier
   * @property date - ISO date string of consumption
   * @property foodName - Name of food consumed
   * @property calories - Total calorie content
   * @property mealType - When the food was consumed
   * @property protein - Protein content in grams (optional)
   * @property carbs - Carbohydrate content in grams (optional)
   * @property fat - Fat content in grams (optional)
   */
  export interface CalorieEntry {
    id: string;
    date: string;
    foodName: string;
    calories: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    protein?: number;
    carbs?: number;
    fat?: number;
  }
  
  /**
   * WEIGHT ENTRY INTERFACE
   * Records body weight measurements over time
   * 
   * @property id - Unique identifier
   * @property date - ISO date string of measurement
   * @property weight - Measured weight in kilograms
   * @property notes - Optional observations/memo
   */
  export interface WeightEntry {
    id: string;
    date: string;
    weight: number;
    notes?: string;
  }
  
  /**
   * WORKOUT LOG INTERFACE
   * Tracks completed workout sessions
   * 
   * @property id - Unique identifier
   * @property workoutId - Reference to original workout
   * @property workoutName - Name of completed workout
   * @property date - ISO date string of completion
   * @property duration - Actual time taken in minutes
   * @property exercises - Details of completed exercises
   * @property notes - User comments about the session (optional)
   * @property rating - User satisfaction rating 1-5 (optional)
   */
  export interface WorkoutLog {
    id: string;
    workoutId: string;
    workoutName: string; 
    date: string;
    duration: number; // actual duration in minutes
    exercises: CompletedExercise[];
    notes?: string;
    rating?: 1 | 2 | 3 | 4 | 5; // user rating of the workout
  }
  
  /**
   * COMPLETED EXERCISE INTERFACE
   * Records performance data for a single exercise within a logged workout
   * 
   * @property id - Unique identifier
   * @property exerciseId - Reference to original exercise
   * @property name - Name of the exercise
   * @property sets - Number of sets completed (optional)
   * @property reps - Number of reps per set (optional)
   * @property duration - Time spent in seconds (optional)
   * @property weight - Resistance used in kg/lbs (optional)
   * @property completed - Whether exercise was fully completed
   */
  export interface CompletedExercise {
    id: string;
    exerciseId: string;
    name: string;
    sets?: number;
    reps?: number;
    duration?: number;
    weight?: number; // optional weight used
    completed: boolean;
  }
  
  /**
   * ACHIEVEMENT INTERFACE
   * Tracks user accomplishments and progress toward goals
   * 
   * @property id - Unique identifier
   * @property name - Title of the achievement
   * @property description - Explanation of requirements
   * @property icon - Visual representation (emoji/URL)
   * @property unlocked - Whether achievement has been earned
   * @property progress - Current progress toward completion
   * @property maxProgress - Required progress to unlock
   * @property reward - Optional incentive description (optional)
   */
  export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress: number;
    maxProgress: number;
    reward?: string;
  }
  
  /**
   * CHAT MESSAGE INTERFACE
   * Represents a message in the trainer chat interface
   * 
   * @property id - Unique identifier
   * @property sender - Origin of message (user or bot)
   * @property text - Message content
   * @property timestamp - ISO date string of when sent
   */
  export interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
  }
  
  /**
   * USER PROFILE INTERFACE
   * Contains all personal user data and preferences
   * 
   * @property name - User's display name
   * @property age - User's age in years (optional)
   * @property height - User's height in centimeters (optional)
   * @property currentWeight - Most recent weight in kg (optional)
   * @property targetWeight - Goal weight in kg (optional)
   * @property fitnessGoal - Primary objective (optional)
   * @property activityLevel - Daily activity classification (optional)
   * @property dailyCalorieGoal - Target caloric intake (optional)
   * @property achievements - Array of earned/locked achievements
   */
  export interface UserProfile {
    name: string;
    age?: number;
    height?: number; // in cm
    currentWeight?: number;
    targetWeight?: number;
    fitnessGoal?: 'lose weight' | 'gain muscle' | 'improve health' | 'increase strength';
    activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very active';
    dailyCalorieGoal?: number;
    achievements: Achievement[];
  }