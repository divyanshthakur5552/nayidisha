import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const QuestionCard = ({
  question = null,
  onAnswerSelect = null,
  selectedAnswer = null,
  showFeedback = false,
  isSubmitted = false,
  className = "",
}) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
    return () => setAnimateIn(false);
  }, [question?.id]);

  if (!question) return null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-success";
      case "medium":
        return "text-warning";
      case "hard":
        return "text-error";
      default:
        return "text-muted-foreground";
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "Circle";
      case "medium":
        return "CircleDot";
      case "hard":
        return "Zap";
      default:
        return "Circle";
    }
  };

  const getOptionStatus = (optionId) => {
    if (!isSubmitted) return "default";
    if (optionId === question?.correctAnswer) return "correct";
    if (optionId === selectedAnswer && optionId !== question?.correctAnswer)
      return "incorrect";
    return "default";
  };

  const getOptionIcon = (optionId) => {
    const status = getOptionStatus(optionId);
    if (status === "correct") return "CheckCircle";
    if (status === "incorrect") return "XCircle";
    return selectedAnswer === optionId ? "Circle" : "Circle";
  };

  const getOptionClasses = (optionId) => {
    const status = getOptionStatus(optionId);
    const isSelected = selectedAnswer === optionId;

    let baseClasses =
      "w-full p-4 text-left border rounded-lg transition-all duration-200 hover:border-purple-500/40";

    if (isSubmitted) {
      if (status === "correct") {
        baseClasses += " border-success/50 bg-success/10 text-success";
      } else if (status === "incorrect") {
        baseClasses += " border-error/50 bg-error/10 text-error";
      } else {
        baseClasses += " border-purple-500/20 bg-white/5";
      }
    } else if (isSelected) {
      baseClasses += " border-primary bg-primary/20 text-primary neon-glow";
    } else {
      baseClasses += " border-purple-500/20 bg-white/5 hover:bg-white/10";
    }

    return baseClasses;
  };

  return (
    <div
      className={`glass-card border border-purple-500/20 rounded-lg p-6 ${
        animateIn ? "animate-fade-in" : ""
      } ${className}`}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Icon name="MessageSquare" size={16} className="text-primary" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Question {question?.number}
              </span>
              {question?.topic && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-primary">
                    {question?.topic}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Difficulty Indicator */}
        {question?.difficulty && (
          <div className="flex items-center space-x-2">
            <Icon
              name={getDifficultyIcon(question?.difficulty)}
              size={16}
              className={getDifficultyColor(question?.difficulty)}
            />
            <span
              className={`text-sm font-medium ${getDifficultyColor(
                question?.difficulty
              )}`}
            >
              {question?.difficulty}
            </span>
          </div>
        )}
      </div>
      {/* Question Text */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 leading-relaxed">
          {question?.text}
        </h2>

        {/* Code Block if present */}
        {question?.codeExample && (
          <div className="bg-muted/20 border border-purple-500/20 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Code2" size={16} className="text-secondary" />
              <span className="text-sm text-muted-foreground">
                Code Example
              </span>
            </div>
            <pre className="text-sm font-mono text-foreground overflow-x-auto">
              <code>{question?.codeExample}</code>
            </pre>
          </div>
        )}

        {/* Context if present */}
        {question?.context && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Context</span>
            </div>
            <p className="text-sm text-muted-foreground">{question?.context}</p>
          </div>
        )}
      </div>
      {/* Answer Options */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Select your answer:
        </h3>

        {question?.options?.map((option) => (
          <button
            key={option?.id}
            onClick={() =>
              !isSubmitted && onAnswerSelect && onAnswerSelect(option?.id)
            }
            disabled={isSubmitted}
            className={getOptionClasses(option?.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Icon
                  name={getOptionIcon(option?.id)}
                  size={20}
                  className={
                    getOptionStatus(option?.id) === "correct"
                      ? "text-success"
                      : getOptionStatus(option?.id) === "incorrect"
                      ? "text-error"
                      : selectedAnswer === option?.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">{option?.label}</span>
                </div>
                <p className="text-sm text-left">{option?.text}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Feedback Section */}
      {showFeedback && isSubmitted && question?.explanation && (
        <div className="mt-6 pt-6 border-t border-purple-500/20 animate-fade-in">
          <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Lightbulb" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-secondary">
                Explanation
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {question?.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
