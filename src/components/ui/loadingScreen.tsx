import React from "react";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading amazing events...",
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-primary-light/20 to-background flex items-center justify-center z-50">
      <div className="text-center space-y-8 px-4">
        {/* Central Animation */}
        <div className="relative w-20 h-20 mx-auto">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>

          {/* Inner pulsing circle */}
          <div className="absolute inset-4 bg-gradient-primary rounded-full animate-pulse opacity-80"></div>

          {/* Central U */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white font-bold text-lg">U</div>
          </div>
        </div>

        {/* Brand name */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gradient animate-fade-in">
            Univibe
          </h1>
          <div className="w-24 h-1 bg-gradient-primary rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Loading message */}
        <p className="text-muted-foreground text-sm md:text-base animate-fade-in animation-delay-300">
          {message}
        </p>

        {/* Floating dots animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-150"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce animation-delay-300"></div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-glow/5 rounded-full blur-xl animate-pulse animation-delay-500"></div>
      <div className="absolute top-1/2 left-20 w-20 h-20 bg-accent/10 rounded-full blur-lg animate-bounce-soft"></div>
    </div>
  );
};

export default LoadingScreen;
