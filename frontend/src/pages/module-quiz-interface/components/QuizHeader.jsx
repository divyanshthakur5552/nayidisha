import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuizHeader = ({
  moduleTitle = "JavaScript Fundamentals",
  currentQuestion = 1,
  totalQuestions = 15,
  timeElapsed = 0,
  onExitQuiz = null,
  className = "",
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, "0")}:${secs
      ?.toString()
      ?.padStart(2, "0")}`;
  };

  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div
      className={`glass-card border border-purple-500/20 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Module Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon name="BookOpen" size={16} className="text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {moduleTitle}
            </h1>
            <p className="text-xs text-muted-foreground">
              Adaptive Quiz Assessment
            </p>
          </div>
        </div>

        {/* Exit Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onExitQuiz}
          iconName="X"
          className="hover:bg-white/5 text-muted-foreground hover:text-error"
        >
          Exit
        </Button>
      </div>

      {/* Progress Section */}
      <div className="space-y-3">
        {/* Question Counter & Timer */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="HelpCircle" size={16} className="text-primary" />
            <span className="text-muted-foreground">Question</span>
            <span className="px-2 py-1 bg-primary/20 text-primary rounded-md font-mono text-xs">
              {currentQuestion} / {totalQuestions}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-secondary" />
            <span className="text-muted-foreground">Time:</span>
            <span className="font-mono text-secondary">
              {formatTime(timeElapsed)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-mono">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
