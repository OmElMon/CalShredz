// Import React and necessary components
import React from 'react';
// UI Components from shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
// Icons from Lucide React
import { Trophy, Lock, Check, Star, Gift, Zap, Award } from "lucide-react";
// Data and types
import { achievements } from "@/lib/Data";
import { Achievement } from "@/lib/Types";
// Utility function for conditional class names
import { cn } from '@/lib/utils';

/**
 * AchievementSystem Component
 * 
 * Displays a gamified achievement system with:
 * - Unlocked/locked achievement tracking
 * - Progress indicators
 * - Reward display
 * - Filterable tabs
 */
const AchievementSystem: React.FC = () => {
  // Filter achievements by unlocked status
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  
  /**
   * Helper function to render individual achievement cards
   * @param achievement - The achievement object to render
   * @returns JSX element for the achievement card
   */
  const renderAchievement = (achievement: Achievement) => {
    const isUnlocked = achievement.unlocked;
    // Calculate progress percentage for the progress bar
    const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
    
    return (
      <div 
        key={achievement.id} 
        className={cn(
          "group relative rounded-lg overflow-hidden transition-all duration-300",
          isUnlocked ? "shadow-md" : "shadow-sm opacity-80"
        )}
      >
        {/* Main achievement card content */}
        <div className={cn(
          "p-6 relative z-10",
          isUnlocked 
            ? "bg-gradient-to-r from-anime-purple/90 to-anime-purple/70 text-white" 
            : "bg-gray-100 text-gray-700"
        )}>
          <div className="flex items-start">
            {/* Icon container */}
            <div className={cn(
              "p-3 rounded-lg mr-4 text-3xl",
              isUnlocked 
                ? "bg-white/20" 
                : "bg-white"
            )}>
              {achievement.icon}
            </div>
            
            {/* Achievement details */}
            <div>
              {/* Title and status indicator */}
              <div className="flex items-center">
                <h3 className="font-anime text-lg">{achievement.name}</h3>
                {/* Status badge (checkmark or lock) */}
                {isUnlocked ? (
                  <div className="ml-2 p-1 bg-anime-yellow rounded-full">
                    <Check size={12} className="text-anime-dark" />
                  </div>
                ) : (
                  <div className="ml-2 p-1 bg-gray-300 rounded-full">
                    <Lock size={12} className="text-gray-600" />
                  </div>
                )}
              </div>
              
              {/* Description */}
              <p className="text-sm mt-1 opacity-90">{achievement.description}</p>
              
              {/* Progress bar section */}
              <div className="mt-3">
                <div className="w-full bg-black/10 h-2 rounded-full">
                  <div 
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      isUnlocked 
                        ? "bg-anime-yellow" 
                        : "bg-gray-400"
                    )} 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                {/* Progress text and reward */}
                <div className="flex justify-between text-xs mt-1">
                  <span>Progress: {achievement.progress}/{achievement.maxProgress}</span>
                  {achievement.reward && (
                    <span className="flex items-center">
                      <Gift size={12} className="mr-1" />
                      {achievement.reward}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Confetti overlay effect for unlocked achievements */}
        {isUnlocked && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full"></div>
            <div className="absolute top-1/4 -right-2 w-6 h-6 bg-anime-yellow rounded-full"></div>
            <div className="absolute bottom-1/3 -left-3 w-5 h-5 bg-anime-blue rounded-full"></div>
            <div className="absolute -bottom-4 right-1/4 w-10 h-10 bg-anime-red rounded-full"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Header section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-anime text-3xl text-anime-purple gradient-text mb-2">
            ACHIEVEMENTS
          </h1>
          <p className="text-gray-600">Complete special tasks to unlock awesome rewards!</p>
        </div>
        {/* Unlocked count badge */}
        <div className="bg-anime-yellow/20 p-3 rounded-lg">
          <div className="flex items-center">
            <Trophy className="text-anime-yellow w-5 h-5 mr-2" />
            <span className="font-medium">{unlockedAchievements.length}/{achievements.length} Unlocked</span>
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-3 shadow-md border-b-4 border-anime-yellow">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
              {/* Achievements earned card */}
              <div className="p-6 text-center">
                <div className="p-3 rounded-full bg-anime-yellow/20 inline-flex mb-3">
                  <Trophy className="text-anime-yellow w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">{unlockedAchievements.length}</h3>
                <p className="text-sm text-gray-500">Achievements Earned</p>
              </div>
              
              {/* XP gained card */}
              <div className="p-6 text-center">
                <div className="p-3 rounded-full bg-anime-purple/20 inline-flex mb-3">
                  <Zap className="text-anime-purple w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">650</h3>
                <p className="text-sm text-gray-500">Total XP Gained</p>
              </div>
              
              {/* Special rewards card */}
              <div className="p-6 text-center">
                <div className="p-3 rounded-full bg-anime-red/20 inline-flex mb-3">
                  <Award className="text-anime-red w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">2</h3>
                <p className="text-sm text-gray-500">Special Rewards</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for filtering achievements */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 bg-gray-100">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-anime-purple data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="unlocked" 
            className="data-[state=active]:bg-anime-purple data-[state=active]:text-white"
          >
            Unlocked
          </TabsTrigger>
          <TabsTrigger 
            value="locked" 
            className="data-[state=active]:bg-anime-purple data-[state=active]:text-white"
          >
            In Progress
          </TabsTrigger>
        </TabsList>
        
        {/* All achievements tab */}
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {achievements.map(renderAchievement)}
          </div>
        </TabsContent>
        
        {/* Unlocked achievements tab */}
        <TabsContent value="unlocked" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {unlockedAchievements.length > 0 ? (
              unlockedAchievements.map(renderAchievement)
            ) : (
              <div className="col-span-full text-center py-12">
                <Star size={48} className="mx-auto text-gray-300 mb-3" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Achievements Unlocked Yet</h3>
                <p className="text-gray-500">Complete your fitness goals to earn achievements!</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Locked achievements tab */}
        <TabsContent value="locked" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {lockedAchievements.length > 0 ? (
              lockedAchievements.map(renderAchievement)
            ) : (
              <div className="col-span-full text-center py-12">
                <Trophy size={48} className="mx-auto text-anime-yellow mb-3" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">All Achievements Unlocked!</h3>
                <p className="text-gray-500">Congratulations! You've unlocked all available achievements.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AchievementSystem;