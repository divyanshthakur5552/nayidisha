import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuizSidebar = ({
  questions = [],
  currentQuestionIndex = 0,
  completedQuestions = [],
  accuracy = 0,
  timeElapsed = 0,
  isCollapsed = false,
  onToggleCollapse = null,
  onQuestionJump = null,
  className = "",
}) => {
  const getQuestionStatus = (index) => {
    if (index < currentQuestionIndex) {
      return completedQuestions?.[index]?.isCorrect ? "correct" : "incorrect";
    }
    if (index === currentQuestionIndex) return "current";
    return "upcoming";
  };

  const getQuestionIcon = (index) => {
    const status = getQuestionStatus(index);
    switch (status) {
      case "correct":
        return "CheckCircle";
      case "incorrect":
        return "XCircle";
      case "current":
        return "PlayCircle";
      default:
        return "Circle";
    }
  };

  const getQuestionColor = (index) => {
    const status = getQuestionStatus(index);
    switch (status) {
      case "correct":
        return "text-success";
      case "incorrect":
        return "text-error";
      case "current":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, "0")}`;
  };

  const correctAnswers = completedQuestions?.filter(
    (q) => q?.isCorrect
  )?.length;
  const totalAnswered = completedQuestions?.length;

  if (isCollapsed) {
    return (
      <div
        className={`glass-surface border border-purple-500/10 rounded-lg p-3 ${className}`}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName="ChevronRight"
          className="w-full hover:bg-white/5"
        />
        {/* Compact Stats */}
        <div className="mt-3 space-y-2 text-center">
          <div className="text-xs text-muted-foreground">
            Q {currentQuestionIndex + 1}/{questions?.length}
          </div>
          <div className="text-xs text-primary font-mono">
            {Math.round(accuracy)}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`glass-surface border border-purple-500/10 rounded-lg p-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-foreground">Quiz Progress</h3>
        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            iconName="ChevronLeft"
            className="hover:bg-white/5 p-1"
          />
        )}
      </div>
      {/* Stats Overview */}
      <div className="space-y-3 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {currentQuestionIndex + 1}
            </div>
            <div className="text-xs text-muted-foreground">Current</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">
              {questions?.length}
            </div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Accuracy</span>
            <span className="text-primary font-mono">
              {Math.round(accuracy)}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Time</span>
          <span className="text-secondary font-mono">
            {formatTime(timeElapsed)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Correct</span>
          <span className="text-success font-medium">
            {correctAnswers}/{totalAnswered}
          </span>
        </div>
      </div>
      {/* Question List */}
      <div className="space-y-1">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">
          Questions
        </h4>
        <div className="max-h-64 overflow-y-auto space-y-1">
          {questions?.map((question, index) => {
            const status = getQuestionStatus(index);
            const canJump = index < currentQuestionIndex && onQuestionJump;

            return (
              <button
                key={index}
                onClick={() => canJump && onQuestionJump(index)}
                disabled={!canJump}
                className={`
                  w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-all duration-200
                  ${
                    status === "current"
                      ? "bg-primary/20 border border-primary/30"
                      : canJump
                      ? "hover:bg-white/5 cursor-pointer"
                      : "cursor-default"
                  }
                `}
              >
                <div className="flex-shrink-0">
                  <Icon
                    name={getQuestionIcon(index)}
                    size={16}
                    className={getQuestionColor(index)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">
                      Q{index + 1}
                    </span>
                    {question?.difficulty && (
                      <span
                        className={`text-xs px-1 py-0.5 rounded ${
                          question?.difficulty === "easy"
                            ? "bg-success/20 text-success"
                            : question?.difficulty === "medium"
                            ? "bg-warning/20 text-warning"
                            : "bg-error/20 text-error"
                        }`}
                      >
                        {question?.difficulty}
                      </span>
                    )}
                  </div>

                  {question?.topic && (
                    <div className="text-xs text-muted-foreground truncate">
                      {question?.topic}
                    </div>
                  )}
                </div>
                {completedQuestions?.[index] && (
                  <div className="flex-shrink-0 text-xs font-mono">
                    {completedQuestions?.[index]?.timeSpent}s
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      {/* Performance Indicators */}
      <div className="mt-4 pt-4 border-t border-purple-500/10">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Performance</span>
            <div className="flex items-center space-x-1">
              {accuracy >= 80 && (
                <Icon name="TrendingUp" size={12} className="text-success" />
              )}
              {accuracy >= 60 && accuracy < 80 && (
                <Icon name="Minus" size={12} className="text-warning" />
              )}
              {accuracy < 60 && (
                <Icon name="TrendingDown" size={12} className="text-error" />
              )}
              <span
                className={
                  accuracy >= 80
                    ? "text-success"
                    : accuracy >= 60
                    ? "text-warning"
                    : "text-error"
                }
              >
                {accuracy >= 80
                  ? "Excellent"
                  : accuracy >= 60
                  ? "Good"
                  : "Needs Focus"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSidebar;
