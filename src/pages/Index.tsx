import React, { useState } from 'react';
import NavBar from "@/components/NavBar";
import Dashboard from "@/components/Dashboard";
import CalorieTracker from "@/components/CalorieTracker";
import WorkoutPlanner from "@/components/WorkoutPlanner";
import WeightTracker from "@/components/WeightTracker";
import AchievementSystem from "@/components/AchievementSystem";
import ProgressTracker from "@/components/ProgressTracker";
import TrainerChatbot from "@/components/TrainerChatbot";

/**
 * MAIN APPLICATION COMPONENT
 * DESCRIPTION: The root component that serves as the application shell and router.
 * Manages navigation between different feature pages of the fitness application.
 * 
 * FEATURES:
 * - Stateful navigation between application sections
 * - Responsive layout with sidebar navigation
 * - Centralized page rendering logic
 * - Clean component composition
 */
const Index = () => {
  // STATE: Tracks the currently active page/view
  const [activePage, setActivePage] = useState<'home' | 'calories' | 'workouts' | 'weight' | 'achievements' | 'progress' | 'trainer'>('home');
  
  /**
   * RENDER PAGE FUNCTION
   * Determines which component to render based on activePage state
   * @returns JSX.Element - The component for the current active page
   */
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Dashboard />;
      case 'calories':
        return <CalorieTracker />;
      case 'workouts':
        return <WorkoutPlanner />;
      case 'weight':
        return <WeightTracker />;
      case 'achievements':
        return <AchievementSystem />;
      case 'progress':
        return <ProgressTracker />;
      case 'trainer':
        return <TrainerChatbot />;
      default:
        // Fallback to dashboard if unknown page
        return <Dashboard />;
    }
  };
  
  return (
    // Main application container
    <div className="min-h-screen bg-gray-50 flex">
      {/* Navigation sidebar - controls page switching */}
      <NavBar 
        onNavigate={setActivePage} 
        activePage={activePage} 
      />
      
      {/* Main content area - shows current page */}
      <main className="flex-1 md:ml-64">
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;