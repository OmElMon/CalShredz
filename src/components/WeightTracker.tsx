import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Scale, TrendingDown, TrendingUp, PlusCircle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { weightEntries as initialWeightEntries } from "@/lib/data";
import { WeightEntry } from "@/lib/types";
import { userProfile } from "@/lib/data";

/**
 * COMPONENT: WeightTracker
 * DESCRIPTION: A comprehensive weight tracking application that allows users to:
 * - Log and track weight entries over time
 * - View progress toward target weight
 * - See weight change trends
 * - Add notes to each entry
 * 
 * FEATURES:
 * - Add/edit weight entries with dates and notes
 * - Visual progress indicators
 * - Weight change calculations
 * - Target weight tracking
 * - Responsive layout
 */
const WeightTracker: React.FC = () => {
  // STATE MANAGEMENT
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>(initialWeightEntries);
  const [showAddForm, setShowAddForm] = useState(false); // Toggle for add form visibility
  const [newEntry, setNewEntry] = useState<Partial<WeightEntry>>({
    date: new Date().toISOString().split('T')[0], // Default to today's date
    weight: 0, // Default weight value
    notes: '' // Empty notes by default
  });

  // WEIGHT CALCULATIONS
  const latestWeight = weightEntries.length > 0 
    ? weightEntries[0].weight 
    : userProfile.currentWeight || 0; // Fallback to profile weight
  
  const previousWeight = weightEntries.length > 1 
    ? weightEntries[1].weight 
    : latestWeight; // Fallback to latest if no previous
  
  const weightChange = latestWeight - previousWeight; // Positive = gain, Negative = loss
  const hasWeightLoss = weightChange < 0; // Boolean for styling
  
  const targetWeight = userProfile.targetWeight || 0; // User's target weight
  const weightToTarget = latestWeight - targetWeight; // Difference from target
  
  // Calculate progress percentage (0-100)
  const progressPercentage = Math.max(0, Math.min(100, 
    100 - (weightToTarget / (userProfile.currentWeight! - targetWeight) * 100));

  /**
   * Handles adding a new weight entry
   * Validates required fields before adding
   */
  const handleAddEntry = () => {
    if (!newEntry.weight) return;
    
    const entry: WeightEntry = {
      id: `w${weightEntries.length + 1}`, // Generate simple ID
      date: newEntry.date || new Date().toISOString().split('T')[0],
      weight: typeof newEntry.weight === 'string' 
        ? parseFloat(newEntry.weight) 
        : newEntry.weight,
      notes: newEntry.notes || ''
    };
    
    // Add new entry and sort by date (newest first)
    setWeightEntries([entry, ...weightEntries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
    
    // Reset form state
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      weight: 0,
      notes: ''
    });
    setShowAddForm(false);
  };

  /**
   * Formats date string into readable format
   * @param dateString - ISO date string
   * @returns Formatted date string (e.g. "Jan 1, 2023")
   */
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <div>
          <h1 className="font-anime text-3xl text-anime-purple gradient-text mb-2">
            WEIGHT TRACKER
          </h1>
          <p className="text-gray-600">Track your transformation journey and witness your progress!</p>
        </div>
        {/* Add weight entry button */}
        <Button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="mt-4 md:mt-0 bg-anime-purple hover:bg-anime-purple/90"
        >
          <PlusCircle size={16} className="mr-2" />
          Log Weight
        </Button>
      </div>
      
      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - FORM AND HISTORY */}
        <div className="lg:col-span-2 space-y-6">
          {/* ADD WEIGHT FORM (CONDITIONAL) */}
          {showAddForm && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-anime text-xl">LOG NEW WEIGHT</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* DATE INPUT */}
                  <div>
                    <Label htmlFor="weight-date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        id="weight-date" 
                        type="date" 
                        value={newEntry.date} 
                        onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {/* WEIGHT INPUT */}
                  <div>
                    <Label htmlFor="weight-value">Weight (kg)</Label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input 
                        id="weight-value" 
                        type="number" 
                        step="0.1"
                        value={newEntry.weight || ''} 
                        onChange={(e) => setNewEntry({...newEntry, weight: parseFloat(e.target.value)})}
                        placeholder="e.g., 75.5"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* NOTES TEXTAREA */}
                <div className="mb-4">
                  <Label htmlFor="weight-notes">Notes (optional)</Label>
                  <Textarea 
                    id="weight-notes" 
                    value={newEntry.notes || ''} 
                    onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                    placeholder="How are you feeling? Any observations?"
                    rows={3}
                  />
                </div>
                
                {/* FORM ACTION BUTTONS */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  <Button 
                    onClick={handleAddEntry}
                    className="bg-anime-purple hover:bg-anime-purple/90"
                    disabled={!newEntry.weight}
                  >
                    Save Entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* WEIGHT HISTORY CARD */}
          <Card className="shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="font-anime text-xl">WEIGHT HISTORY</CardTitle>
                {/* Navigation buttons (currently non-functional) */}
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* EMPTY STATE */}
              {weightEntries.length === 0 ? (
                <div className="text-center py-8">
                  <Scale size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No weight entries yet. Add your first weight!</p>
                </div>
              ) : (
                /* WEIGHT ENTRIES LIST */
                <div className="space-y-3">
                  {weightEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center p-4 bg-gray-50 rounded-md shadow-sm">
                      {/* WEIGHT ICON */}
                      <div className="p-3 rounded-full bg-anime-blue/10 mr-3">
                        <Scale size={20} className="text-anime-blue" />
                      </div>
                      
                      {/* ENTRY DETAILS */}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{formatDate(entry.date)}</h3>
                          <p className="font-pixel text-lg">{entry.weight} kg</p>
                        </div>
                        {/* OPTIONAL NOTES */}
                        {entry.notes && (
                          <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* RIGHT COLUMN - STATS AND TIPS */}
        <div className="space-y-6">
          {/* CURRENT STATS CARD */}
          <Card className="shadow-md border-t-4 border-anime-blue">
            <CardHeader className="pb-2">
              <CardTitle className="font-anime text-xl">CURRENT STATS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-4">
                {/* CURRENT WEIGHT DISPLAY */}
                <div className="flex justify-center">
                  <Scale size={40} className="text-anime-blue" />
                </div>
                <h2 className="text-4xl font-bold mt-2">{latestWeight} kg</h2>
                
                {/* WEIGHT CHANGE INDICATOR */}
                <div className={`flex items-center justify-center mt-1 ${hasWeightLoss ? 'text-green-500' : 'text-red-500'}`}>
                  {hasWeightLoss ? (
                    <>
                      <TrendingDown size={16} />
                      <span className="ml-1">{Math.abs(weightChange).toFixed(1)} kg</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp size={16} />
                      <span className="ml-1">{weightChange.toFixed(1)} kg</span>
                    </>
                  )}
                </div>
                
                {/* TARGET WEIGHT PROGRESS */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Target Weight: {targetWeight} kg</h3>
                  {/* PROGRESS BAR */}
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-200">
                      <div 
                        style={{ width: `${progressPercentage}%` }} 
                        className="bg-anime-blue transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Current: {latestWeight} kg</span>
                    <span>Target: {targetWeight} kg</span>
                  </div>
                  
                  {/* PROGRESS MESSAGE */}
                  <div className={`mt-4 p-3 rounded-md ${weightToTarget > 0 ? 'bg-yellow-50' : 'bg-green-50'}`}>
                    <p className="text-sm">
                      {weightToTarget > 0
                        ? `${weightToTarget.toFixed(1)} kg to go! You're making great progress!`
                        : 'Congratulations! You\'ve reached your target weight!'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* WEIGHT TIP CARD */}
          <Card className="shadow-md border-t-4 border-anime-purple">
            <CardHeader className="pb-2">
              <CardTitle className="font-anime text-xl">WEIGHT TIP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-anime-purple/10 rounded-md">
                <h3 className="font-medium text-anime-purple mb-2">Progress Takes Time!</h3>
                <p className="text-sm text-gray-700">
                  Remember that healthy weight loss is about 0.5-1 kg per week. 
                  Focus on consistency rather than quick results for long-term success!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WeightTracker;