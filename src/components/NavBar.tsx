import React, { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Heart, Dumbbell, BarChart2, Trophy, MessageCircle, Scale, Home } from "lucide-react";
import { cn } from '@/lib/Utils';

// Props for NavBar component
interface NavBarProps {
  onNavigate: (page: string) => void; // Callback when user clicks a nav item
  activePage: string; // Currently active page
}

const NavBar: React.FC<NavBarProps> = ({ onNavigate, activePage }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile nav toggle

  // Navigation items with icons
  const menuItems = [
    { name: 'Home', icon: <Home size={20} />, id: 'home' },
    { name: 'Calories', icon: <Heart size={20} />, id: 'calories' },
    { name: 'Workouts', icon: <Dumbbell size={20} />, id: 'workouts' },
    { name: 'Progress', icon: <BarChart2 size={20} />, id: 'progress' },
    { name: 'Weight', icon: <Scale size={20} />, id: 'weight' },
    { name: 'Achievements', icon: <Trophy size={20} />, id: 'achievements' },
    { name: 'Trainer', icon: <MessageCircle size={20} />, id: 'trainer' },
  ];

  // Handles page change and closes mobile menu
  const handleNavigation = (pageId: string) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  return (
    <>
      {/* ---------- MOBILE NAVIGATION ---------- */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-anime-dark shadow-md">
        <div className="flex justify-between items-center p-4">
          {/* Branding */}
          <div className="flex flex-col">
            <h1 className="text-anime-yellow font-anime text-2xl">SHONEN-FIT</h1>
            <p className="text-xs text-anime-teal mt-0.5">LEVEL UP YOUR FITNESS</p>
          </div>

          {/* Hamburger toggle button */}
          <Button 
            variant="ghost" 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:bg-anime-purple/20"
          >
            {isOpen ? (
              // Close icon
              <svg width="24" height="24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" /></svg>
            ) : (
              // Hamburger icon
              <svg width="24" height="24" fill="none"><path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" /></svg>
            )}
          </Button>
        </div>

        {/* Mobile nav menu */}
        {isOpen && (
          <div className="bg-anime-dark py-2 px-4 border-t border-anime-purple/20 animate-fade-in">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={cn(
                  "w-full flex items-center gap-2 py-3 px-4 rounded-md text-left transition-colors",
                  activePage === item.id 
                    ? "bg-anime-purple text-white" 
                    : "text-white hover:bg-anime-purple/20"
                )}
                onClick={() => handleNavigation(item.id)}
              >
                {item.icon}
                <span>{item.name}</span>
                {/* "Active" badge */}
                {activePage === item.id && (
                  <span className="ml-2 text-xs bg-anime-yellow text-anime-dark px-1 rounded animate-pulse-retro">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ---------- DESKTOP NAVIGATION ---------- */}
      <div className="hidden md:flex fixed left-0 top-0 h-full bg-anime-dark text-white flex-col w-64 shadow-lg z-50">
        {/* Logo and subtitle */}
        <div className="p-6 border-b border-anime-purple/30">
          <h1 className="font-anime text-3xl text-anime-yellow">SHONEN-FIT</h1>
          <p className="text-xs text-anime-teal mt-1">LEVEL UP YOUR FITNESS</p>
        </div>

        {/* Navigation links */}
        <div className="p-4 flex-1 flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex items-center gap-2 py-3 px-4 rounded-md text-left transition-all",
                activePage === item.id
                  ? "bg-anime-purple text-white shadow-[4px_4px_0px_0px_rgba(26,31,44,0.5)]" 
                  : "text-white hover:bg-anime-purple/20 hover:translate-x-1 transition-transform"
              )}
              onClick={() => handleNavigation(item.id)}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
              {activePage === item.id && (
                <span className="ml-auto text-xs bg-anime-yellow text-anime-dark px-1 rounded animate-pulse-retro">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>

        {/* XP tracker at bottom of sidebar */}
        <div className="p-4 border-t border-anime-purple/30">
          <div className="text-center pixel-border p-3 bg-anime-dark rounded-md">
            <p className="text-anime-teal font-pixel text-xs">FITNESS LEVEL</p>
            <div className="pixel-progress-container mt-2">
              <div className="pixel-progress-bar" style={{ width: '65%' }}></div>
            </div>
            <p className="mt-2 text-sm text-anime-yellow">XP: 650/1000</p>
          </div>
        </div>
      </div>

      {/* Spacing to prevent layout shift for mobile and desktop fixed nav */}
      <div className="md:hidden h-20"></div> {/* Mobile header offset */}
      <div className="hidden md:block w-64"></div> {/* Desktop sidebar offset */}
    </>
  );
};

export default NavBar;