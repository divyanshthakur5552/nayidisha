import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const AdaptiveFeedback = ({
  isVisible = false,
  isCorrect = false,
  streakCount = 0,
  difficultyChange = null,
  accuracy = 0,
  onClose = null,
  autoCloseDelay = 3000,
  className = "",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);

      if (autoCloseDelay > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);

        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, autoCloseDelay]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose && onClose();
    }, 200);
  };

  if (!isVisible) return null;

  const getFeedbackIcon = () => {
    if (isCorrect) {
      if (streakCount >= 3) return "Zap";
      return "CheckCircle";
    }
    return "XCircle";
  };

  const getFeedbackColor = () => {
    if (isCorrect) {
      if (streakCount >= 3) return "text-warning";
      return "text-success";
    }
    return "text-error";
  };

  const getFeedbackTitle = () => {
    if (isCorrect) {
      if (streakCount >= 3) return "Excellent Streak!";
      if (streakCount >= 2) return "Great Job!";
      return "Correct!";
    }
    return "Incorrect";
  };

  const getFeedbackMessage = () => {
    if (isCorrect) {
      if (streakCount >= 3) {
        return `${streakCount} correct answers in a row! You're mastering this topic.`;
      }
      return "Well done! You're understanding the concepts well.";
    }
    return "Don't worry, learning from mistakes helps you improve.";
  };

  const getDifficultyMessage = () => {
    if (!difficultyChange) return null;

    switch (difficultyChange) {
      case "increased":
        return "Questions will be more challenging based on your performance.";
      case "decreased":
        return "Questions will be adjusted to help you build confidence.";
      case "maintained":
        return "Difficulty level remains optimal for your learning.";
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Feedback Card */}
      <div
        className={`
          relative glass-card border border-purple-500/20 rounded-lg p-6 max-w-md w-full
          ${isAnimating ? "animate-spring" : "animate-fade-in"}
          ${className}
        `}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Icon name="X" size={16} className="text-muted-foreground" />
        </button>

        {/* Feedback Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="mb-4">
            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                isCorrect
                  ? streakCount >= 3
                    ? "bg-warning/20 neon-glow"
                    : "bg-success/20"
                  : "bg-error/20"
              }`}
            >
              <Icon
                name={getFeedbackIcon()}
                size={32}
                className={getFeedbackColor()}
              />
            </div>
          </div>

          {/* Title */}
          <h3 className={`text-xl font-semibold mb-2 ${getFeedbackColor()}`}>
            {getFeedbackTitle()}
          </h3>

          {/* Message */}
          <p className="text-muted-foreground mb-4">{getFeedbackMessage()}</p>

          {/* Streak Indicator */}
          {isCorrect && streakCount > 1 && (
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Flame" size={16} className="text-warning" />
              <span className="text-sm text-warning font-medium">
                {streakCount} in a row
              </span>
            </div>
          )}

          {/* Accuracy Display */}
          <div className="flex items-center justify-center space-x-4 mb-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Target" size={16} className="text-primary" />
              <span className="text-muted-foreground">Accuracy:</span>
              <span className="text-primary font-mono">
                {Math.round(accuracy)}%
              </span>
            </div>
          </div>

          {/* Difficulty Change Message */}
          {getDifficultyMessage() && (
            <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-3 mb-4">

              <p className="text-xs text-muted-foreground">
                {getDifficultyMessage()}
              </p>
            </div>
          )}

          {/* Auto-close indicator */}
          {autoCloseDelay > 0 && (
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>Auto-closing in {Math.ceil(autoCloseDelay / 1000)}s</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdaptiveFeedback;
