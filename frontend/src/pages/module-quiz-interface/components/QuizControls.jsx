import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const QuizControls = ({
  selectedAnswer = null,
  isSubmitted = false,
  isLastQuestion = false,
  isLoading = false,
  onSubmitAnswer = null,
  onNextQuestion = null,
  onFinishQuiz = null,
  showHint = false,
  onToggleHint = null,
  className = "",
}) => {
  const canSubmit = selectedAnswer && !isSubmitted;
  const canProceed = isSubmitted;

  const handlePrimaryAction = () => {
    if (!isSubmitted && canSubmit) {
      onSubmitAnswer && onSubmitAnswer();
    } else if (isSubmitted && !isLastQuestion) {
      onNextQuestion && onNextQuestion();
    } else if (isSubmitted && isLastQuestion) {
      onFinishQuiz && onFinishQuiz();
    }
  };

  const getPrimaryButtonText = () => {
    if (!isSubmitted) return "Submit Answer";
    if (isLastQuestion) return "Finish Quiz";
    return "Next Question";
  };

  const getPrimaryButtonIcon = () => {
    if (!isSubmitted) return "Send";
    if (isLastQuestion) return "CheckCircle";
    return "ArrowRight";
  };

  return (
    <div
      className={`glass-card border border-purple-500/20 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        {/* Secondary Actions */}
        <div className="flex items-center space-x-2">
          {/* Hint Button */}
          {onToggleHint && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleHint}
              iconName={showHint ? "EyeOff" : "Eye"}
              iconPosition="left"
              iconSize={16}
              className="hover:bg-white/5 text-muted-foreground hover:text-secondary"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
          )}

          {/* Answer Status */}
          {selectedAnswer && (
            <div className="flex items-center space-x-2 text-sm">
              <Icon
                name={isSubmitted ? "CheckCircle" : "Circle"}
                size={16}
                className={isSubmitted ? "text-success" : "text-primary"}
              />
              <span className="text-muted-foreground">
                {isSubmitted ? "Answer submitted" : "Answer selected"}
              </span>
            </div>
          )}
        </div>

        {/* Primary Action */}
        <div className="flex items-center space-x-3">
          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
            {isLastQuestion ? (
              <span>Ready to finish</span>
            ) : (
              <span>
                {isSubmitted ? "Continue to next" : "Submit to proceed"}
              </span>
            )}
          </div>

          {/* Primary Button */}
          <Button
            variant={isLastQuestion && isSubmitted ? "success" : "default"}
            size="default"
            onClick={handlePrimaryAction}
            disabled={(!canSubmit && !canProceed) || isLoading}
            loading={isLoading}
            iconName={getPrimaryButtonIcon()}
            iconPosition="right"
            iconSize={18}
            className="floating-action min-w-[140px]"
          >
            {getPrimaryButtonText()}
          </Button>
        </div>
      </div>

      {/* Mobile Progress Text */}
      <div className="sm:hidden mt-3 pt-3 border-t border-purple-500/20">
        <p className="text-xs text-center text-muted-foreground">
          {!selectedAnswer && "Select an answer to continue"}
          {selectedAnswer &&
            !isSubmitted &&
            "Submit your answer to see results"}
          {isSubmitted && !isLastQuestion && "Continue to the next question"}
          {isSubmitted &&
            isLastQuestion &&
            "Complete the quiz to see your results"}
        </p>
      </div>
    </div>
  );
};

export default QuizControls;
