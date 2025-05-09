// This component will never be rendered but exists to help Tailwind detect used classes
const ForceTailwindSafelist = () => {
  return (
    <div className="hidden">
      {/* Layout and theme */}
      <div className="bg-background text-foreground border-border min-h-screen"></div>
      {/* Typography and colors */}
      <div className="text-white text-red-500 text-blue-500 text-sm text-xl font-pixel"></div>
      {/* Buttons and animations */}
      <div className="retro-btn glitch gradient-text rounded-md overflow-hidden"></div>
      {/* Custom backgrounds */}
      <div className="bg-anime-purple bg-anime-red bg-anime-blue bg-anime-teal"></div>
      {/* Utility classes */}
      <div className="p-4 px-6 py-3 transition-colors duration-300 ease-in-out"></div>
    </div>
  );
};

export default ForceTailwindSafelist;