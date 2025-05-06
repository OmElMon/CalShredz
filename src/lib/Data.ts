import { Workout, Achievement, CalorieEntry, WeightEntry, ChatMessage, UserProfile, Exercise, WorkoutLog, CompletedExercise } from "./types";

// Sample exercises
export const exercises: Exercise[] = [
  {
    id: "ex1",
    name: "Push-ups",
    sets: 3,
    reps: 10,
    restTime: 60,
    description: "Place your hands on the ground, slightly wider than shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up.",
    image: "/placeholder.svg"
  },
  {
    id: "ex2",
    name: "Squats",
    sets: 3,
    reps: 15,
    restTime: 60,
    description: "Stand with feet shoulder-width apart, then bend your knees and lower your hips as if sitting in a chair. Return to standing position.",
    image: "/placeholder.svg"
  },
  {
    id: "ex3",
    name: "Plank",
    duration: 30,
    sets: 3,
    restTime: 45,
    description: "Start in a push-up position, then bend your elbows and rest your weight on your forearms. Keep your body in a straight line.",
    image: "/placeholder.svg"
  },
  {
    id: "ex4",
    name: "Jumping Jacks",
    duration: 60,
    sets: 3,
    restTime: 30,
    description: "Stand with feet together, arms at sides, then jump while spreading legs and raising arms overhead. Return to starting position.",
    image: "/placeholder.svg"
  },
  {
    id: "ex5",
    name: "Lunges",
    sets: 3,
    reps: 10,
    restTime: 60,
    description: "Step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle. Return to starting position.",
    image: "/placeholder.svg"
  }
];

// Sample workouts
export const workouts: Workout[] = [
  {
    id: "w1",
    name: "Ninja Training",
    exercises: [exercises[0], exercises[1], exercises[2]],
    difficulty: "beginner",
    duration: 30,
    category: "strength",
    description: "A quick full-body workout to build ninja-like reflexes and strength."
  },
  {
    id: "w2",
    name: "Super Saiyan Cardio",
    exercises: [exercises[3], exercises[4]],
    difficulty: "intermediate",
    duration: 45,
    category: "cardio",
    description: "Intense cardio workout to boost your power level over 9000!"
  },
  {
    id: "w3",
    name: "Samurai Strength",
    exercises: [exercises[0], exercises[1], exercises[4]],
    difficulty: "advanced",
    duration: 60,
    category: "strength",
    description: "Build the disciplined strength of a samurai warrior."
  }
];

// Sample workout logs
export const workoutLogs: WorkoutLog[] = [
  {
    id: "wl1",
    workoutId: "w1",
    workoutName: "Ninja Training",
    date: "2025-04-13",
    duration: 32,
    exercises: [
      {
        id: "ce1",
        exerciseId: "ex1",
        name: "Push-ups",
        sets: 3,
        reps: 10,
        completed: true
      },
      {
        id: "ce2",
        exerciseId: "ex2",
        name: "Squats",
        sets: 3,
        reps: 15,
        completed: true
      },
      {
        id: "ce3",
        exerciseId: "ex3",
        name: "Plank",
        sets: 3,
        duration: 30,
        completed: true
      }
    ],
    notes: "Felt great today. Increased push-ups by 2 reps on the last set.",
    rating: 5
  },
  {
    id: "wl2",
    workoutId: "w2",
    workoutName: "Super Saiyan Cardio",
    date: "2025-04-11",
    duration: 40,
    exercises: [
      {
        id: "ce4",
        exerciseId: "ex3",
        name: "Jumping Jacks",
        sets: 3,
        duration: 60,
        completed: true
      },
      {
        id: "ce5",
        exerciseId: "ex4",
        name: "Lunges",
        sets: 3,
        reps: 10,
        completed: true
      }
    ],
    notes: "Felt tired but pushed through.",
    rating: 4
  }
];

// Sample achievements
export const achievements: Achievement[] = [
  {
    id: "a1",
    name: "First Step",
    description: "Complete your first workout",
    icon: "🥋",
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    reward: "New profile badge"
  },
  {
    id: "a2",
    name: "Consistent Hero",
    description: "Complete workouts 3 days in a row",
    icon: "🔥",
    unlocked: false,
    progress: 2,
    maxProgress: 3,
    reward: "+100 XP"
  },
  {
    id: "a3",
    name: "Weight Watcher",
    description: "Track your weight for 7 days",
    icon: "⚖️",
    unlocked: false,
    progress: 5,
    maxProgress: 7,
    reward: "Unlock weight prediction feature"
  },
  {
    id: "a4",
    name: "Calorie Master",
    description: "Stay under your calorie goal for 5 days",
    icon: "🍱",
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    reward: "Special meal plan"
  },
  {
    id: "a5",
    name: "Power Level Rising",
    description: "Increase workout difficulty",
    icon: "💪",
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: "New workout unlocked"
  }
];

// Sample calorie entries
export const calorieEntries: CalorieEntry[] = [
  {
    id: "c1",
    date: "2025-04-13",
    foodName: "Miso Ramen",
    calories: 450,
    mealType: "lunch",
    protein: 15,
    carbs: 60,
    fat: 12
  },
  {
    id: "c2",
    date: "2025-04-13",
    foodName: "Grilled Chicken",
    calories: 250,
    mealType: "dinner",
    protein: 30,
    carbs: 0,
    fat: 10
  },
  {
    id: "c3",
    date: "2025-04-12",
    foodName: "Protein Shake",
    calories: 180,
    mealType: "breakfast",
    protein: 25,
    carbs: 10,
    fat: 3
  }
];

// Sample weight entries
export const weightEntries: WeightEntry[] = [
  {
    id: "w1",
    date: "2025-04-13",
    weight: 75.5,
    notes: "Morning weight after workout"
  },
  {
    id: "w2",
    date: "2025-04-10",
    weight: 76.2,
    notes: "Before bed"
  },
  {
    id: "w3",
    date: "2025-04-07",
    weight: 76.8
  }
];

// Sample chat messages
export const chatMessages: ChatMessage[] = [
  {
    id: "m1",
    sender: "bot",
    text: "Konnichiwa! I'm Kenji, your virtual fitness sensei! How can I help you level up today?",
    timestamp: "2025-04-13T09:15:00"
  },
  {
    id: "m2",
    sender: "user",
    text: "I'm feeling tired today but still want to workout",
    timestamp: "2025-04-13T09:16:00"
  },
  {
    id: "m3",
    sender: "bot",
    text: "Even the greatest heroes have days when their energy is low! How about trying a lighter 15-minute recovery workout? It will help your body restore while still making progress!",
    timestamp: "2025-04-13T09:16:30"
  }
];

// Sample user profile
export const userProfile: UserProfile = {
  name: "Fitness Hero",
  age: 28,
  height: 175,
  currentWeight: 75.5,
  targetWeight: 70,
  fitnessGoal: "lose weight",
  activityLevel: "moderate",
  dailyCalorieGoal: 2200,
  achievements: achievements
};