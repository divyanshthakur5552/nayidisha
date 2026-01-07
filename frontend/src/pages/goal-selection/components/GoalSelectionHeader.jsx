import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const GoalSelectionHeader = ({
  selectedSubject = null,
  onCompareGoals = null,
  className = "",
}) => {
  return (
    <div className={`text-center space-y-6 ${className}`}>
      {/* Main Heading */}
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full  flex items-center justify-center ">
            <Icon name="Target" size={30} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#f5f5f5]">
          Choose Your Learning Goal
        </h1>

        <p className="text-lg text-[#a3a3a3] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Define your career objective to get a personalized roadmap tailored to
          your aspirations. Each path is designed to maximize your learning
          efficiency and career readiness.
        </p>
      </div>

      {/* Selected Subject Context */}
      {selectedSubject && (
        <div className="glass-surface border border-purple-500/10 rounded-lg p-4 max-w-md shadow-[0_20px_50px_rgba(74,26,125,0.8)] mx-auto">
          <div className="flex items-center justify-center space-x-3">
            <Icon name="Code2" size={20} className="text-primary" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Selected Technology
              </p>
              <p className="text-foreground font-semibold">{selectedSubject}</p>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>2-8 months duration</span>
        </div>

        <div className="w-px h-4 bg-border"></div>

        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Users" size={16} />
          <span>Personalized for you</span>
        </div>

        <div className="w-px h-4 bg-border"></div>

        {onCompareGoals && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCompareGoals}
            iconName="GitCompare"
            iconPosition="left"
            iconSize={16}
            className="hover:bg-white/5 text-primary hover:text-primary"
          >
            Compare Goals
          </Button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <Icon name="CheckCircle" size={16} className="text-success" />
        <span>Subject Selected</span>
        <Icon name="ArrowRight" size={14} />
        <Icon name="Circle" size={16} className="text-primary animate-pulse" />
        <span className="text-primary font-medium">Choose Goal</span>
        <Icon name="ArrowRight" size={14} />
        <Icon name="Circle" size={16} />
        <span>Set Skill Level</span>
      </div>
    </div>
  );
};

export default GoalSelectionHeader;
