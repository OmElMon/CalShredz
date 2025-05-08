import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/TextArea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Progress } from "@/components/ui/Progress";
import { X, Clock, CheckSquare, Star, Timer, Save } from "lucide-react";
import { Workout, Exercise, WorkoutLog, CompletedExercise } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { cn } from '@/lib/utils';

interface WorkoutTrackingModalProps {
  workout: Workout;
  onClose: () => void;
  onComplete: (log: WorkoutLog) => void;
}

const WorkoutTrackingModal: React.FC<WorkoutTrackingModalProps> = ({ workout, onClose, onComplete }) => {
  // TRACKING ACTIVE EXERCISE
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);

  // TRACKING COMPLETED EXERCISES
  const [completedExercises, setCompletedExercises] = useState<CompletedExercise[]>(
    workout.exercises.map(exercise => ({
      id: `completed-${exercise.id}`,
      exerciseId: exercise.id,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      duration: exercise.duration,
      completed: false
    }))
  );

  // WORKOUT TIMER
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // USER INPUT: RATING AND NOTES
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [notes, setNotes] = useState('');

  // TIMER EFFECT
  React.useEffect(() => {
    let interval: number | null = null;

    if (isActive) {
      interval = window.setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  // FORMAT TIME MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // TOGGLE EXERCISE COMPLETION
  const handleToggleExerciseCompletion = (index: number) => {
    const updatedExercises = [...completedExercises];
    updatedExercises[index].completed = !updatedExercises[index].completed;
    setCompletedExercises(updatedExercises);

    // AUTO ADVANCE TO NEXT EXERCISE
    if (updatedExercises[index].completed && index === activeExerciseIndex) {
      if (index < workout.exercises.length - 1) {
        setActiveExerciseIndex(index + 1);
      }
    }
  };

  // START WORKOUT TIMER
  const handleStartWorkout = () => {
    setIsActive(true);
  };

  // PAUSE WORKOUT TIMER
  const handlePauseWorkout = () => {
    setIsActive(false);
  };

  // COMPLETE WORKOUT AND LOG IT
  const handleCompleteWorkout = () => {
    const totalCompleted = completedExercises.filter(ex => ex.completed).length;
    if (totalCompleted === 0) return;

    const workoutLog: WorkoutLog = {
      id: `log-${Date.now()}`,
      workoutId: workout.id,
      workoutName: workout.name,
      date: new Date().toISOString().split('T')[0],
      duration: Math.ceil(elapsedTime / 60),
      exercises: completedExercises,
      notes: notes,
      rating: rating
    };

    onComplete(workoutLog);
    onClose();
  };

  const progress = Math.round((completedExercises.filter(ex => ex.completed).length / completedExercises.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* MODAL HEADER */}
        <CardHeader className="bg-gradient-to-r from-anime-purple/90 to-anime-purple/60 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="font-anime text-2xl">{workout.name}</CardTitle>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full">
              <X size={16} />
            </Button>
          </div>
          {/* TIMER AND PROGRESS */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <div className="bg-black/20 px-3 py-1.5 rounded-full flex items-center">
                <Timer size={16} className="mr-1.5" />
                <span className="font-mono">{formatTime(elapsedTime)}</span>
              </div>
              <div>
                <Progress value={progress} className="h-2 w-24" />
                <p className="text-xs mt-1">{progress}% completed</p>
              </div>
            </div>
            <div>
              {!isActive ? (
                <Button onClick={handleStartWorkout} className="bg-green-500 hover:bg-green-600 text-white h-9">
                  Start Workout
                </Button>
              ) : (
                <Button onClick={handlePauseWorkout} variant="outline" className="border-white text-white hover:bg-white/20 h-9">
                  Pause
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {/* MODAL CONTENT */}
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* EXERCISE LIST */}
            <div>
              <h3 className="font-medium text-lg mb-3">Exercise List</h3>
              <div className="space-y-3">
                {workout.exercises.map((exercise, index) => (
                  <div key={exercise.id} className={cn(
                    "border rounded-md overflow-hidden transition-all",
                    activeExerciseIndex === index ? "ring-2 ring-anime-purple" : "",
                    completedExercises[index].completed ? "bg-gray-50 dark:bg-gray-800/50" : ""
                  )}>
                    <div className="p-3 flex items-center justify-between bg-secondary/30">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Checkbox 
                            checked={completedExercises[index].completed}
                            onCheckedChange={() => handleToggleExerciseCompletion(index)}
                          />
                        </div>
                        <div>
                          <h4 className={cn("font-medium", completedExercises[index].completed ? "line-through opacity-70" : "")}>{exercise.name}</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {exercise.sets && <Badge variant="outline" className="text-xs">{exercise.sets} sets</Badge>}
                            {exercise.reps && <Badge variant="outline" className="text-xs">{exercise.reps} reps</Badge>}
                            {exercise.duration && <Badge variant="outline" className="text-xs">{exercise.duration}s</Badge>}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setActiveExerciseIndex(index)} className={cn("text-xs", activeExerciseIndex === index ? "bg-primary/10" : "")}>{activeExerciseIndex === index ? "Active" : "View"}</Button>
                    </div>
                    {activeExerciseIndex === index && (
                      <div className="p-4 bg-secondary/10">
                        <p className="text-sm mb-3">{exercise.description}</p>
                        <div className="flex justify-between">
                          {exercise.restTime && <Badge variant="outline" className="flex items-center"><Clock size={12} className="mr-1" />Rest: {exercise.restTime}s</Badge>}
                          <Button size="sm" className={cn(
                            completedExercises[index].completed ? "bg-green-500 hover:bg-green-600" : "bg-anime-purple hover:bg-anime-purple/90"
                          )} onClick={() => handleToggleExerciseCompletion(index)}>
                            <CheckSquare size={14} className="mr-1.5" />{completedExercises[index].completed ? "Completed" : "Mark Complete"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* WORKOUT SUMMARY */}
            <div className="border-t pt-4">
              <h3 className="font-medium text-lg mb-3">Workout Summary</h3>
              <div className="space-y-4">
                {/* RATING */}
                <div>
                  <Label htmlFor="rating">Rate your workout</Label>
                  <div className="flex mt-1 space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button key={star} type="button" size="sm" variant="ghost" className={cn("p-0 h-8 w-8", rating >= star ? "text-yellow-500" : "text-gray-300 dark:text-gray-600")} onClick={() => setRating(star as 1 | 2 | 3 | 4 | 5)}>
                        <Star className="h-6 w-6 fill-current" />
                      </Button>
                    ))}
                  </div>
                </div>

                {/* NOTES */}
                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did the workout feel? Any adjustments made?" rows={3} />
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleCompleteWorkout} disabled={completedExercises.filter(ex => ex.completed).length === 0} className="bg-green-500 hover:bg-green-600">
                <Save size={16} className="mr-2" />
                Complete Workout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutTrackingModal;