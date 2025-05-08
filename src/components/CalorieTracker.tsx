import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Pizza, Coffee, Utensils, Apple, PlusCircle, Flame } from "lucide-react";
import { calorieEntries } from "@/lib/Data";
import { CalorieEntry } from "@/lib/types";
import { cn } from '@/lib/utils';

/**
 * COMPONENT: CalorieTracker
 * DESCRIPTION: A comprehensive calorie tracking application that allows users to:
 * - Add food entries with nutritional information
 * - View daily calorie consumption vs goal
 * - Track macronutrients (protein, carbs, fat)
 * - Get fitness tips
 * 
 * FEATURES:
 * - Responsive grid layout
 * - Interactive form for adding new entries
 * - Visual progress circle for calorie tracking
 * - Meal type categorization with icons
 * - Color-coded UI elements
 */
const CalorieTracker: React.FC = () => {
  // STATE MANAGEMENT
  const [entries, setEntries] = useState<CalorieEntry[]>(calorieEntries); // All food entries
  const [showAddForm, setShowAddForm] = useState(false); // Toggle for add form visibility
  const [newEntry, setNewEntry] = useState<Partial<CalorieEntry>>({
    date: new Date().toISOString().split('T')[0], // Default to today's date
    mealType: 'breakfast' // Default meal type
  });

  // CALORIE CALCULATIONS
  const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const goalCalories = 2200; // Daily calorie goal
  const remainingCalories = goalCalories - totalCalories;
  const caloriePercentage = Math.min((totalCalories / goalCalories) * 100, 100); // Cap at 100%

  /**
   * Helper function to get icon for each meal type
   * @param mealType - The type of meal (breakfast, lunch, dinner, snack)
   * @returns JSX.Element - The corresponding icon with color
   */
  const getMealTypeIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return <Coffee className="text-anime-yellow" />;
      case 'lunch':
        return <Utensils className="text-anime-blue" />;
      case 'dinner':
        return <Pizza className="text-anime-red" />;
      case 'snack':
        return <Apple className="text-anime-teal" />;
      default:
        return <Utensils />;
    }
  };

  /**
   * Handles adding a new food entry to the tracker
   * Validates required fields before adding
   */
  const handleAddEntry = () => {
    if (!newEntry.foodName || !newEntry.calories) return;
    
    // Create complete entry object with defaults
    const entry: CalorieEntry = {
      id: `c${entries.length + 1}`, // Generate simple ID
      date: newEntry.date || new Date().toISOString().split('T')[0],
      foodName: newEntry.foodName,
      calories: typeof newEntry.calories === 'string' 
        ? parseInt(newEntry.calories) 
        : newEntry.calories,
      mealType: newEntry.mealType as 'breakfast' | 'lunch' | 'dinner' | 'snack',
      protein: newEntry.protein,
      carbs: newEntry.carbs,
      fat: newEntry.fat
    };
    
    // Add new entry to beginning of array (most recent first)
    setEntries([entry, ...entries]);
    
    // Reset form state
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      mealType: 'breakfast'
    });
    setShowAddForm(false);
  };

  /**
   * Gets background color class based on meal type
   * @param mealType - The type of meal
   * @returns string - Tailwind class for background color
   */
  const getMealTypeBg = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return 'bg-anime-yellow/10'; // 10% opacity
      case 'lunch':
        return 'bg-anime-blue/10';
      case 'dinner':
        return 'bg-anime-red/10';
      case 'snack':
        return 'bg-anime-teal/10';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="p-4">
      {/* HEADER SECTION */}
      <h1 className="font-anime text-3xl text-anime-purple gradient-text mb-2">
        CALORIE TRACKER
      </h1>
      <p className="text-gray-600 mb-6">Monitor your daily nutrition like a true fitness hero!</p>
      
      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - FOOD ENTRIES */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="font-anime text-xl">TODAY'S FOOD</CardTitle>
              <Button 
                onClick={() => setShowAddForm(!showAddForm)} 
                className="bg-anime-purple hover:bg-anime-purple/90"
              >
                <PlusCircle size={16} className="mr-2" />
                Add Food
              </Button>
            </CardHeader>
            <CardContent>
              {/* ADD FOOD FORM */}
              {showAddForm && (
                <div className="bg-gray-50 p-4 rounded-md mb-4 shadow-inner">
                  <h3 className="font-medium text-gray-700 mb-3">Add New Food</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* FOOD NAME INPUT */}
                    <div>
                      <Label htmlFor="foodName">Food Name</Label>
                      <Input 
                        id="foodName" 
                        value={newEntry.foodName || ''} 
                        onChange={(e) => setNewEntry({...newEntry, foodName: e.target.value})}
                        placeholder="e.g., Miso Ramen"
                        required
                      />
                    </div>
                    
                    {/* CALORIES INPUT */}
                    <div>
                      <Label htmlFor="calories">Calories</Label>
                      <Input 
                        id="calories" 
                        type="number" 
                        value={newEntry.calories || ''} 
                        onChange={(e) => setNewEntry({...newEntry, calories: parseInt(e.target.value)})}
                        placeholder="e.g., 450"
                        required
                      />
                    </div>
                    
                    {/* MEAL TYPE SELECTOR */}
                    <div>
                      <Label htmlFor="mealType">Meal Type</Label>
                      <Select 
                        value={newEntry.mealType} 
                        onValueChange={(value: 'breakfast' | 'lunch' | 'dinner' | 'snack') => 
                          setNewEntry({...newEntry, mealType: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* MACRONUTRIENT INPUTS (OPTIONAL) */}
                    <div>
                      <Label htmlFor="protein">Protein (g) (optional)</Label>
                      <Input 
                        id="protein" 
                        type="number" 
                        value={newEntry.protein || ''} 
                        onChange={(e) => setNewEntry({...newEntry, protein: parseInt(e.target.value)})}
                        placeholder="e.g., 20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="carbs">Carbs (g) (optional)</Label>
                      <Input 
                        id="carbs" 
                        type="number" 
                        value={newEntry.carbs || ''} 
                        onChange={(e) => setNewEntry({...newEntry, carbs: parseInt(e.target.value)})}
                        placeholder="e.g., 30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fat">Fat (g) (optional)</Label>
                      <Input 
                        id="fat" 
                        type="number" 
                        value={newEntry.fat || ''} 
                        onChange={(e) => setNewEntry({...newEntry, fat: parseInt(e.target.value)})}
                        placeholder="e.g., 10"
                      />
                    </div>
                  </div>
                  {/* FORM ACTION BUTTONS */}
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                    <Button 
                      onClick={handleAddEntry}
                      className="bg-anime-purple hover:bg-anime-purple/90"
                    >
                      Add Food
                    </Button>
                  </div>
                </div>
              )}
              
              {/* FOOD ENTRIES LIST */}
              {entries.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No food entries yet. Add your first meal!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <div 
                      key={entry.id} 
                      className={cn(
                        "flex items-center p-3 rounded-md shadow-sm", 
                        getMealTypeBg(entry.mealType)
                      )}
                    >
                      {/* MEAL TYPE ICON */}
                      <div className="p-3 rounded-full bg-white mr-3">
                        {getMealTypeIcon(entry.mealType)}
                      </div>
                      
                      {/* ENTRY DETAILS */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{entry.foodName}</h3>
                          <p className="font-pixel text-sm">{entry.calories} cal</p>
                        </div>
                        {/* MACRONUTRIENT DETAILS */}
                        <div className="flex text-xs text-gray-500 mt-1">
                          {entry.protein && (
                            <span className="mr-3">Protein: {entry.protein}g</span>
                          )}
                          {entry.carbs && (
                            <span className="mr-3">Carbs: {entry.carbs}g</span>
                          )}
                          {entry.fat && (
                            <span>Fat: {entry.fat}g</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* RIGHT COLUMN - SUMMARY AND TIPS */}
        <div className="space-y-6">
          {/* CALORIE SUMMARY CARD */}
          <Card className="shadow-md border-t-4 border-anime-red">
            <CardHeader className="pb-2">
              <CardTitle className="font-anime text-xl">DAILY SUMMARY</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4">
                {/* CIRCULAR PROGRESS INDICATOR */}
                <div className="relative inline-block w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* BACKGROUND CIRCLE */}
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    {/* PROGRESS CIRCLE */}
                    <circle
                      className="text-anime-red"
                      strokeWidth="8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${caloriePercentage * 2.51} 251`} // 2πr ≈ 251
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)" // Start from top
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Flame size={24} className="text-anime-red mb-1" />
                    <p className="text-2xl font-bold">{totalCalories}</p>
                    <p className="text-xs text-gray-500">of {goalCalories} cal</p>
                  </div>
                </div>
                
                {/* CALORIE STATS */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-gray-500 text-xs">Consumed</p>
                    <p className="font-bold text-xl">{totalCalories}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-gray-500 text-xs">Remaining</p>
                    <p className={`font-bold text-xl ${
                      remainingCalories < 0 ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {remainingCalories}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 rounded-b-lg">
              <p className="text-sm text-center w-full text-gray-600">
                {remainingCalories >= 0 ? 
                  `You have ${remainingCalories} calories remaining today!` :
                  `You've exceeded your daily goal by ${Math.abs(remainingCalories)} calories.`
                }
              </p>
            </CardFooter>
          </Card>
          
          {/* FITNESS TIP CARD */}
          <Card className="shadow-md border-t-4 border-anime-purple">
            <CardHeader className="pb-2">
              <CardTitle className="font-anime text-xl">FITNESS TIP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-anime-purple/10 rounded-md">
                <h3 className="font-medium text-anime-purple mb-2">Protein Power-Up!</h3>
                <p className="text-sm text-gray-700">
                  For optimal muscle growth after workouts, try to consume 20-30g of protein within 
                  30 minutes of finishing your exercise. This is your post-workout power-up window!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalorieTracker;