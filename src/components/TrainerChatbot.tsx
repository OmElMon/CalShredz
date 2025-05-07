import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, ChevronRight, Info, Menu } from "lucide-react";
import { chatMessages as initialChatMessages } from "@/lib/data";
import { ChatMessage } from "@/lib/types";
import { cn } from '@/lib/utils';

/**
 * COMPONENT: TrainerChatbot
 * DESCRIPTION: A virtual fitness trainer chatbot interface with:
 * - Real-time messaging with a virtual trainer
 * - Suggested questions sidebar
 * - Typing indicators
 * - Responsive design for mobile/desktop
 * - Trainer profile information
 * 
 * FEATURES:
 * - Animated message bubbles
 * - Auto-scrolling to newest messages
 * - Predefined trainer responses
 * - Mobile-friendly sidebar toggle
 * - Suggested questions quick-select
 */
const TrainerChatbot: React.FC = () => {
  // STATE MANAGEMENT
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState(''); // Current message input
  const [isTyping, setIsTyping] = useState(false); // Typing indicator state
  const [showSidebar, setShowSidebar] = useState(false); // Mobile sidebar visibility
  const messagesEndRef = useRef<HTMLDivElement>(null); // Reference for auto-scrolling
  
  // TRAINER RESPONSES
  // Predefined responses the bot can randomly select from
  const trainerResponses = [
    "Remember, it's not just about how much you lift, it's about your form. Quality over quantity, hero!",
    "When you feel like giving up, that's when you need to push through. Your body is stronger than you think!",
    "Rest days are as important as workout days. That's when your muscles grow stronger!",
    "Hydration is key! Make sure you're drinking enough water during your workouts.",
    "Everyone starts somewhere. Don't compare your beginning to someone else's middle chapter!",
    "You're doing great! Every workout brings you closer to your goals.",
    "Try incorporating active recovery into your routine - light walks or gentle stretching can help reduce muscle soreness.",
    "Nutrition is just as important as exercise. Make sure you're fueling your body properly!",
    "Remember to track your progress! It's the best way to see how far you've come.",
    "Mental fitness is just as important as physical fitness. Take care of your mind too!"
  ];
  
  // EFFECT: Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  /**
   * Scrolls the chat to the bottom
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  /**
   * Handles sending a new message
   */
  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: `m${messages.length + 1}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate trainer response after a delay
    setTimeout(() => {
      const randomResponse = trainerResponses[Math.floor(Math.random() * trainerResponses.length)];
      
      const trainerMessage: ChatMessage = {
        id: `m${messages.length + 2}`,
        sender: 'bot',
        text: randomResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, trainerMessage]);
      setIsTyping(false);
    }, 1500); // 1.5 second delay to simulate typing
  };
  
  /**
   * Handles Enter key press in input field
   * @param e - Keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  /**
   * Formats timestamp into readable time
   * @param timestamp - ISO timestamp string
   * @returns Formatted time string (e.g. "2:30 PM")
   */
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Suggested questions for quick selection
  const suggestedQuestions = [
    "How do I improve my form?",
    "What should I eat after a workout?",
    "How many rest days should I take?",
    "I'm feeling sore, what should I do?",
    "How to stay motivated?",
    "Is my workout plan effective?"
  ];

  return (
    <div className="p-4 relative h-[calc(100vh-6rem)] flex flex-col md:flex-row">
      {/* SIDEBAR - TRAINER INFO & SUGGESTED QUESTIONS */}
      <div className={cn(
        "fixed md:relative top-0 left-0 h-full md:h-auto w-72 bg-anime-dark text-white z-40 shadow-xl transition-transform duration-300 transform",
        showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Trainer header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="font-anime text-2xl text-anime-yellow">KENJI</h2>
          <p className="text-xs text-anime-teal mt-1">YOUR VIRTUAL FITNESS SENSEI</p>
        </div>
        
        {/* Trainer info section */}
        <div className="p-4">
          <h3 className="text-white/60 text-sm font-medium mb-3">TRAINER INFO</h3>
          <div className="bg-white/5 p-4 rounded-lg mb-6">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-anime-purple/20 rounded-full mr-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm">Specializes in strength training</p>
            </div>
            <div className="flex items-center mb-3">
              <div className="p-2 bg-anime-purple/20 rounded-full mr-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm">5+ years experience</p>
            </div>
            <div className="flex items-center">
              <div className="p-2 bg-anime-purple/20 rounded-full mr-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-sm">Motivational coaching style</p>
            </div>
          </div>
          
          {/* Suggested questions section */}
          <h3 className="text-white/60 text-sm font-medium mb-3">SUGGESTED QUESTIONS</h3>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button 
                key={index}
                className="w-full text-left p-3 bg-white/5 hover:bg-anime-purple/20 rounded-md text-sm transition-colors flex items-center"
                onClick={() => {
                  setInput(question);
                  setShowSidebar(false); // Auto-close sidebar on mobile
                }}
              >
                <span className="flex-1 truncate">{question}</span>
                <ChevronRight size={14} className="ml-2 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col h-full">
        <Card className="flex-1 overflow-hidden shadow-md flex flex-col">
          {/* Chat header */}
          <CardHeader className="py-3 px-4 border-b flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {/* Mobile sidebar toggle button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden mr-2" 
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  <Menu size={20} />
                </Button>
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-anime-purple text-white">KJ</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-anime text-lg">KENJI - FITNESS TRAINER</CardTitle>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Info size={18} />
              </Button>
            </div>
          </CardHeader>
          
          {/* Messages container */}
          <CardContent className="p-0 overflow-y-auto flex-1">
            <div className="p-4 space-y-4">
              {/* Render all messages */}
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-2xl p-4",
                      message.sender === 'user' 
                        ? "bg-anime-purple text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    )}
                  >
                    <p>{message.text}</p>
                    <p 
                      className={cn(
                        "text-xs mt-1 text-right",
                        message.sender === 'user' ? "text-white/70" : "text-gray-500"
                      )}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none max-w-[80%] p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Empty div for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          {/* Message input area */}
          <div className="p-4 border-t flex items-center">
            <Input
              placeholder="Ask your fitness trainer anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 mr-2"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={input.trim() === '' || isTyping}
              className="bg-anime-purple hover:bg-anime-purple/90"
            >
              <Send size={18} />
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Mobile sidebar overlay (click to close) */}
      {showSidebar && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30" 
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </div>
  );
};

export default TrainerChatbot;