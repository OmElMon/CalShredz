import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Heart, Flame, Scale, Trophy, ArrowUpRight } from "lucide-react";
import { userProfile, weightEntries, achievements, calorieEntries } from "@/lib/data";

/**
 * COMPONENT: Dashboard
 * DESCRIPTION: The main dashboard view showing fitness metrics, achievements, 
 * daily quests, and workout suggestions. Displays:
 * - User's current weight and tracking progress
 * - Daily calorie consumption vs goal
 * - Achievement progress
 * - Workout streak counter
 * - Daily quests with completion status
 * - Suggested workout routine
 * 
 * FEATURES:
 * - Responsive grid layout
 * - Color-coded metric cards
 * - Progress indicators
 * - Interactive elements
 * - Anime-inspired styling
 */
const Dashboard: React.FC = () => {
  // Get the latest weight entry from weight tracking history
  const latestWeight = weightEntries.length > 0 ? weightEntries[0].weight : null;
  
  // Calculate calories consumed today by filtering entries for today's date
  const today = new Date().toISOString().split('T')[0];
  const caloriesConsumed = calorieEntries
    .filter(entry => entry.date === today)
    .reduce((total, entry) => total + entry.calories, 0);
  
  // Calculate remaining calories based on user's daily goal
  const caloriesRemaining = userProfile.dailyCalorieGoal 
    ? userProfile.dailyCalorieGoal - caloriesConsumed 
    : 0;
  
  // Count unlocked achievements
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  
  // Generate a random workout streak (demo purposes)
  const workoutStreak = Math.floor(Math.random() * 14) + 1;

  return (
    <div className="p-4">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-6">
        <div>
          {/* Main welcome heading with anime-style gradient text */}
          <h1 className="font-anime text-3xl text-anime-purple gradient-text" data-text="WELCOME BACK, HERO!">
            WELCOME BACK, HERO!
          </h1>
          <p className="text-gray-600 mt-1">Your fitness journey continues today!</p>
        </div>
        {/* Streak counter badge with pixel-art style */}
        <div className="bg-anime-yellow px-4 py-2 rounded-md shadow-[4px_4px_0px_0px_rgba(26,31,44,0.5)]">
          <p className="text-anime-dark font-pixel text-sm">DAY {workoutStreak}</p>
        </div>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* WEIGHT CARD */}
        <Card className="border-2 border-anime-purple/50 shadow-[4px_4px_0px_0px_rgba(155,135,245,0.2)]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 font-medium">Current Weight</p>
                <p className="text-2xl font-bold">{latestWeight} kg</p>
              </div>
              <div className="p-3 bg-anime-blue/10 rounded-full">
                <Scale className="text-anime-blue w-6 h-6" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-green-500">
              <ArrowUpRight size={16} />
              <span className="ml-1">Tracking for 7 days</span>
            </div>
          </CardContent>
        </Card>

        {/* CALORIES CARD */}
        <Card className="border-2 border-anime-red/50 shadow-[4px_4px_0px_0px_rgba(255,87,87,0.2)]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 font-medium">Calories Today</p>
                <p className="text-2xl font-bold">{caloriesConsumed} / {userProfile.dailyCalorieGoal}</p>
              </div>
              <div className="p-3 bg-anime-red/10 rounded-full">
                <Heart className="text-anime-red w-6 h-6" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-blue-500">
              <Flame size={16} />
              <span className="ml-1">{caloriesRemaining} calories remaining</span>
            </div>
          </CardContent>
        </Card>

        {/* ACHIEVEMENTS CARD */}
        <Card className="border-2 border-anime-yellow/50 shadow-[4px_4px_0px_0px_rgba(255,189,89,0.2)]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 font-medium">Achievement Points</p>
                <p className="text-2xl font-bold">{unlockedAchievements}/{achievements.length}</p>
              </div>
              <div className="p-3 bg-anime-yellow/10 rounded-full">
                <Trophy className="text-anime-yellow w-6 h-6" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-purple-500">
              <ArrowUpRight size={16} />
              <span className="ml-1">Unlock more by working out!</span>
            </div>
          </CardContent>
        </Card>

        {/* STREAK CARD */}
        <Card className="border-2 border-anime-teal/50 shadow-[4px_4px_0px_0px_rgba(87,255,226,0.2)]">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 font-medium">Workout Streak</p>
                <p className="text-2xl font-bold">{workoutStreak} days</p>
              </div>
              <div className="p-3 bg-anime-teal/10 rounded-full">
                <Dumbbell className="text-anime-teal w-6 h-6" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-red-500">
              <Flame size={16} />
              <span className="ml-1">Don't break the chain!</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* LOWER SECTION - QUESTS AND WORKOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DAILY QUESTS CARD */}
        <Card className="col-span-1 shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="font-anime text-xl text-anime-purple">DAILY QUESTS</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {/* WORKOUT QUEST */}
              <li className="flex items-center p-3 bg-gray-100 rounded-md">
                <div className="mr-3 p-2 bg-anime-yellow text-anime-dark rounded-md">
                  <Dumbbell size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Complete a workout</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                    <div className="bg-anime-purple h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">+50 XP</span>
              </li>
              
              {/* MEAL TRACKING QUEST */}
              <li className="flex items-center p-3 bg-gray-100 rounded-md">
                <div className="mr-3 p-2 bg-anime-red text-white rounded-md">
                  <Heart size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Track all meals</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                    <div className="bg-anime-red h-2 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">+30 XP</span>
              </li>
              
              {/* WEIGHT LOGGING QUEST */}
              <li className="flex items-center p-3 bg-gray-100 rounded-md">
                <div className="mr-3 p-2 bg-anime-blue text-white rounded-md">
                  <Scale size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Log your weight</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                    <div className="bg-anime-blue h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <span className="text-xs bg-anime-yellow px-2 py-1 rounded text-anime-dark font-medium">COMPLETE! +20 XP</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        {/* SUGGESTED WORKOUT CARD */}
        <Card className="col-span-1 lg:col-span-2 shadow-lg border-t-4 border-anime-purple">
          <CardHeader className="pb-2">
            <CardTitle className="font-anime text-xl text-anime-purple">SUGGESTED WORKOUT</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gradient-to-r from-anime-dark to-anime-purple/90 text-white rounded-lg shadow-inner">
              {/* Workout title */}
              <h3 className="font-anime text-2xl text-anime-yellow">NINJA TRAINING</h3>
              <p className="opacity-80 mb-4">A quick full-body workout to build ninja-like reflexes and strength.</p>
              
              {/* Workout exercises list */}
              <div className="space-y-3">
                <div className="flex items-center bg-black/20 p-2 rounded">
                  <span className="w-8 h-8 flex items-center justify-center bg-anime-yellow text-anime-dark rounded-full mr-3 font-bold">1</span>
                  <span className="flex-1">Push-ups: 3 sets x 10 reps</span>
                </div>
                <div className="flex items-center bg-black/20 p-2 rounded">
                  <span className="w-8 h-8 flex items-center justify-center bg-anime-yellow text-anime-dark rounded-full mr-3 font-bold">2</span>
                  <span className="flex-1">Squats: 3 sets x 15 reps</span>
                </div>
                <div className="flex items-center bg-black/20 p-2 rounded">
                  <span className="w-8 h-8 flex items-center justify-center bg-anime-yellow text-anime-dark rounded-full mr-3 font-bold">3</span>
                  <span className="flex-1">Plank: 3 sets x 30 seconds</span>
                </div>
              </div>
              
              {/* Start workout button */}
              <button className="retro-btn w-full mt-6">
                START WORKOUT
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;