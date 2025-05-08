import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart2, Calendar, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { weightEntries, calorieEntries, workouts } from "@/lib/data";
import { cn } from '@/lib/utils';

// Main component for tracking progress through data visualization
const ProgressTracker: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('week');
  const [chartType, setChartType] = useState('weight');

  // Generate data for weight progress chart
  const generateWeightData = () => {
    const baseData = [...weightEntries]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(entry => ({ date: entry.date, weight: entry.weight }));

    const today = new Date();
    if (baseData.length < 7) {
      const lastWeight = baseData.length > 0 ? baseData[baseData.length - 1].weight : 75;
      for (let i = baseData.length; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (7 - i));
        const weight = lastWeight + (Math.random() * 0.6 - 0.3);
        baseData.push({
          date: date.toISOString().split('T')[0],
          weight: parseFloat(weight.toFixed(1))
        });
      }
    }

    return baseData.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
  };

  // Generate data for calorie intake chart
  const generateCalorieData = () => {
    const today = new Date();
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const dayEntries = calorieEntries.filter(entry => entry.date === dateString);
      const calories = dayEntries.length > 0 
        ? dayEntries.reduce((sum, entry) => sum + entry.calories, 0)
        : Math.floor(Math.random() * 800) + 1400;
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        calories
      });
    }
    return data;
  };

  // Generate data for workout sessions chart
  const generateWorkoutData = () => {
    const today = new Date();
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const hadWorkout = Math.random() < 0.7;
      const minutes = hadWorkout ? Math.floor(Math.random() * 45) + 15 : 0;
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        minutes,
        workout: hadWorkout ? workouts[Math.floor(Math.random() * workouts.length)].name : ''
      });
    }
    return data;
  };

  const weightData = generateWeightData();
  const calorieData = generateCalorieData();
  const workoutData = generateWorkoutData();

  // Chart logic based on chartType selection
  const getChartData = () => {
    switch (chartType) {
      case 'weight': return weightData;
      case 'calories': return calorieData;
      case 'workouts': return workoutData;
      default: return weightData;
    }
  };

  const getValueKey = () => {
    switch (chartType) {
      case 'weight': return 'weight';
      case 'calories': return 'calories';
      case 'workouts': return 'minutes';
      default: return 'weight';
    }
  };

  const getChartColor = () => {
    switch (chartType) {
      case 'weight': return '#57c7ff';
      case 'calories': return '#ff5757';
      case 'workouts': return '#9b87f5';
      default: return '#9b87f5';
    }
  };

  const getChartTitle = () => {
    switch (chartType) {
      case 'weight': return 'Weight Progress';
      case 'calories': return 'Calorie Intake';
      case 'workouts': return 'Workout Minutes';
      default: return 'Progress';
    }
  };

  const getChartUnit = () => {
    switch (chartType) {
      case 'weight': return 'kg';
      case 'calories': return 'cal';
      case 'workouts': return 'min';
      default: return '';
    }
  };

  return (
    <div className="p-4">
      {/* Main dashboard UI and chart rendering handled below */}
      {/* Code removed for brevity. See original for rendering cards and graphs */}
    </div>
  );
};

export default ProgressTracker;