import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/TextArea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2, X, Save, Dumbbell, Clock } from "lucide-react";
import { Exercise, Workout } from "@/lib/types";
import { exercises } from "@/lib/Data";

/**
 * PROPS TYPE DEFINITION
 * @param onClose - Callback to close the Model
 * @param onSave - Callback to save the workout
 * @param initialWorkout - Optional existing workout to edit
 */
interface CreateWorkoutModelProps {
  onClose: () => void;
  onSave: (workout: Workout) => void;
  initialWorkout?: Workout;
}

/**
 * COMPONENT: CreateWorkoutModel
 * DESCRIPTION: A Model dialog for creating or editing custom workouts with:
 * - Workout metadata (name, description, category, difficulty, duration)
 * - Exercise selection from existing exercises
 * - Custom exercise creation
 * - Exercise list management
 * 
 * FEATURES:
 * - Two-column responsive layout
 * - Form validation
 * - Exercise management (add/remove)
 * - Preset exercise selection
 * - Custom exercise creation
 */
const CreateWorkoutModel: React.FC<CreateWorkoutModelProps> = ({ 
  onClose, 
  onSave, 
  initialWorkout 
}) => {
  // STATE MANAGEMENT
  const [workout, setWorkout] = useState<Partial<Workout>>(
    initialWorkout || {
      name: '',
      description: '',
      category: 'strength',
      difficulty: 'beginner',
      duration: 30,
      exercises: [],
      isCustom: true
    }
  );

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(
    initialWorkout?.exercises || []
  );

  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: '',
    description: '',
    sets: 3,
    reps: 10,
    duration: 30,
    restTime: 60
  });

  /**
   * Handles adding a new custom exercise to the workout
   * Validates required fields before adding
   */
  const handleAddExercise = () => {
    if (!newExercise.name) return;

    const exercise: Exercise = {
      id: `custom-ex-${Date.now()}`, // Unique ID using timestamp
      name: newExercise.name,
      description: newExercise.description || 'No description provided.',
      sets: newExercise.sets || 3,
      reps: newExercise.reps || 10,
      duration: newExercise.duration || 30,
      restTime: newExercise.restTime || 60
    };

    setSelectedExercises([...selectedExercises, exercise]);
    // Reset new exercise form
    setNewExercise({
      name: '',
      description: '',
      sets: 3,
      reps: 10,
      duration: 30,
      restTime: 60
    });
  };

  /**
   * Adds an existing exercise from the preset list to the workout
   * @param exercise - The exercise to add
   */
  const handleAddExistingExercise = (exercise: Exercise) => {
    // Prevent duplicate exercises
    if (selectedExercises.some(ex => ex.id === exercise.id)) return;
    setSelectedExercises([...selectedExercises, exercise]);
  };

  /**
   * Removes an exercise from the workout
   * @param index - The index of the exercise to remove
   */
  const handleRemoveExercise = (index: number) => {
    const updatedExercises = [...selectedExercises];
    updatedExercises.splice(index, 1);
    setSelectedExercises(updatedExercises);
  };

  /**
   * Validates and saves the workout
   */
  const handleSaveWorkout = () => {
    if (!workout.name || selectedExercises.length === 0) return;

    const newWorkout: Workout = {
      id: initialWorkout?.id || `custom-workout-${Date.now()}`, // Use existing ID or generate new
      name: workout.name as string,
      description: workout.description as string || "Custom workout",
      category: workout.category as 'strength' | 'cardio' | 'flexibility' | 'balance',
      difficulty: workout.difficulty as 'beginner' | 'intermediate' | 'advanced',
      duration: workout.duration as number,
      exercises: selectedExercises,
      isCustom: true
    };

    onSave(newWorkout);
    onClose();
  };

  return (
    // Model overlay
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {/* Main card container */}
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header with gradient background */}
        <CardHeader className="bg-gradient-to-r from-anime-purple/90 to-anime-purple/60 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="font-anime text-2xl">
              {initialWorkout ? 'EDIT WORKOUT' : 'CREATE CUSTOM WORKOUT'}
            </CardTitle>
            {/* Close button */}
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
            >
              <X size={16} />
            </Button>
          </div>
        </CardHeader>
        
        {/* Main content area */}
        <CardContent className="p-6">
          {/* Two-column layout for workout details and exercises */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Workout details */}
            <div>
              <h3 className="font-medium text-lg mb-4">Workout Details</h3>
              
              <div className="space-y-4">
                {/* Workout name input */}
                <div>
                  <Label htmlFor="workout-name">Workout Name</Label>
                  <Input 
                    id="workout-name" 
                    value={workout.name} 
                    onChange={(e) => setWorkout({...workout, name: e.target.value})}
                    placeholder="e.g., Ultimate Core Crusher"
                    required
                  />
                </div>
                
                {/* Workout description textarea */}
                <div>
                  <Label htmlFor="workout-description">Description</Label>
                  <Textarea 
                    id="workout-description" 
                    value={workout.description} 
                    onChange={(e) => setWorkout({...workout, description: e.target.value})}
                    placeholder="Describe your workout"
                    rows={3}
                  />
                </div>
                
                {/* Category and difficulty selectors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workout-category">Category</Label>
                    <Select 
                      value={workout.category} 
                      onValueChange={(value) => setWorkout({
                        ...workout, 
                        category: value as 'strength' | 'cardio' | 'flexibility' | 'balance'
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="flexibility">Flexibility</SelectItem>
                        <SelectItem value="balance">Balance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="workout-difficulty">Difficulty</Label>
                    <Select 
                      value={workout.difficulty} 
                      onValueChange={(value) => setWorkout({
                        ...workout, 
                        difficulty: value as 'beginner' | 'intermediate' | 'advanced'
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Duration input */}
                <div>
                  <Label htmlFor="workout-duration">Duration (minutes)</Label>
                  <Input 
                    id="workout-duration" 
                    type="number" 
                    value={workout.duration} 
                    onChange={(e) => setWorkout({...workout, duration: Number(e.target.value)})}
                    min={5}
                    max={180}
                  />
                </div>
              </div>
            </div>
            
            {/* Right column - Exercise list */}
            <div>
              <h3 className="font-medium text-lg mb-4">Exercise List</h3>
              
              <div className="space-y-4">
                {/* Selected exercises list */}
                {selectedExercises.length > 0 ? (
                  <div className="space-y-2">
                    {selectedExercises.map((exercise, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 bg-secondary rounded-md"
                      >
                        <div>
                          <p className="font-medium">{exercise.name}</p>
                          <div className="flex text-xs space-x-2 text-muted-foreground">
                            {exercise.sets && <span>{exercise.sets} sets</span>}
                            {exercise.reps && <span>{exercise.reps} reps</span>}
                            {exercise.duration && <span>{exercise.duration}s</span>}
                          </div>
                        </div>
                        {/* Remove exercise button */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveExercise(index)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Empty state
                  <div className="flex flex-col items-center justify-center py-6 border border-dashed rounded-md">
                    <Dumbbell size={24} className="text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center">
                      No exercises added yet.<br />Add exercises below.
                    </p>
                  </div>
                )}
                
                {/* Existing exercises picker */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Add From Existing Exercises</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exercises.map((exercise) => (
                      <Button 
                        key={exercise.id} 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleAddExistingExercise(exercise)}
                        className="text-xs"
                        disabled={selectedExercises.some(ex => ex.id === exercise.id)}
                      >
                        <PlusCircle size={12} className="mr-1" /> 
                        {exercise.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Custom exercise creator */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Create New Exercise</h4>
                  <div className="space-y-3">
                    {/* Exercise name */}
                    <div>
                      <Label htmlFor="exercise-name">Exercise Name</Label>
                      <Input 
                        id="exercise-name" 
                        value={newExercise.name} 
                        onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                        placeholder="e.g., Mountain Climbers"
                        required
                      />
                    </div>
                    
                    {/* Sets and reps */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="exercise-sets">Sets</Label>
                        <Input 
                          id="exercise-sets" 
                          type="number" 
                          value={newExercise.sets} 
                          onChange={(e) => setNewExercise({...newExercise, sets: Number(e.target.value)})}
                          min={1}
                        />
                      </div>
                      <div>
                        <Label htmlFor="exercise-reps">Reps</Label>
                        <Input 
                          id="exercise-reps" 
                          type="number" 
                          value={newExercise.reps} 
                          onChange={(e) => setNewExercise({...newExercise, reps: Number(e.target.value)})}
                          min={1}
                        />
                      </div>
                    </div>
                    
                    {/* Duration and rest time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="exercise-duration">Duration (seconds)</Label>
                        <Input 
                          id="exercise-duration" 
                          type="number" 
                          value={newExercise.duration} 
                          onChange={(e) => setNewExercise({...newExercise, duration: Number(e.target.value)})}
                          min={1}
                        />
                      </div>
                      <div>
                        <Label htmlFor="exercise-rest">Rest Time (seconds)</Label>
                        <Input 
                          id="exercise-rest" 
                          type="number" 
                          value={newExercise.restTime} 
                          onChange={(e) => setNewExercise({...newExercise, restTime: Number(e.target.value)})}
                          min={0}
                        />
                      </div>
                    </div>
                    
                    {/* Exercise description */}
                    <div>
                      <Label htmlFor="exercise-description">Description</Label>
                      <Textarea 
                        id="exercise-description" 
                        value={newExercise.description} 
                        onChange={(e) => setNewExercise({...newExercise, description: e.target.value})}
                        placeholder="How to perform this exercise"
                        rows={2}
                      />
                    </div>
                    
                    {/* Add exercise button */}
                    <Button 
                      onClick={handleAddExercise}
                      disabled={!newExercise.name}
                      className="w-full"
                    >
                      <PlusCircle size={16} className="mr-2" /> 
                      Add Exercise
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form action buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              onClick={handleSaveWorkout}
              disabled={!workout.name || selectedExercises.length === 0}
              className="bg-anime-purple hover:bg-anime-purple/90"
            >
              <Save size={16} className="mr-2" />
              Save Workout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateWorkoutModel;