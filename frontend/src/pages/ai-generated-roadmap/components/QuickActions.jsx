import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const QuickActions = ({
  onAction = null,
  completedModules = 3,
  totalModules = 10,
  className = "",
}) => {
  const navigate = useNavigate();

  const quickActionItems = [
    {
      id: "continue",
      title: "Continue Learning",
      description: "Resume your current module",
      icon: "Play",
      color: "primary",
      action: () => navigate("/module-quiz-interface"),
    },
    {
      id: "dashboard",
      title: "View Dashboard",
      description: "Check your progress and stats",
      icon: "BarChart3",
      color: "secondary",
      action: () => navigate("/dashboard"),
    },
    {
      id: "goals",
      title: "Update Goals",
      description: "Modify your learning objectives",
      icon: "Target",
      color: "warning",
      action: () => navigate("/goal-selection"),
    },
    {
      id: "regenerate",
      title: "Regenerate Roadmap",
      description: "Create a new learning path",
      icon: "RefreshCw",
      color: "error",
      action: () => handleRegenerateRoadmap(),
    },
  ];

  const handleRegenerateRoadmap = () => {
    if (onAction) {
      onAction("regenerate");
    } else {
      // Default behavior - navigate to skill level selection
      navigate("/skill-level-selection");
    }
  };

  const handleQuickAction = (actionItem) => {
    if (onAction) {
      onAction(actionItem?.id);
    } else {
      actionItem?.action();
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20";
      case "secondary":
        return "bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20";
      case "warning":
        return "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20";
      case "error":
        return "bg-error/10 text-error border-error/20 hover:bg-error/20";
      case "success":
        return "bg-success/10 text-success border-success/20 hover:bg-success/20";
      default:
        return "bg-muted/10 text-muted-foreground border-muted/20 hover:bg-muted/20";
    }
  };

  const progressPercentage = Math.round(
    (completedModules / totalModules) * 100
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Summary */}
      <div className="bg-[#0a0a0a] border  rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Learning Progress
            </h3>
            <p className="text-sm text-muted-foreground">
              {completedModules} of {totalModules} modules completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gradient">
              {progressPercentage}%
            </div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-success">
              {completedModules}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-primary">
              {Math.max(0, totalModules - completedModules - 1)}
            </div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-warning">
              {completedModules < totalModules ? 1 : 0}
            </div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-primary" />
          <span>Quick Actions</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActionItems?.map((item) => (
            <button
              key={item?.id}
              onClick={() => handleQuickAction(item)}
              className={`
                p-4 rounded-lg border transition-all duration-200 text-left
                hover:scale-105 hover:shadow-lg
                ${getColorClasses(item?.color)}
              `}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon name={item?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm mb-1">{item?.title}</div>
                  <div className="text-xs opacity-80">{item?.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Learning Tips */}
      <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} className="text-warning" />
          <span>Learning Tips</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 glass-surface border border-purple-500/10 rounded-lg">
            <Icon name="Clock" size={16} className="text-primary mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                Consistent Practice
              </div>
              <div className="text-xs text-muted-foreground">
                Dedicate 30-60 minutes daily for better retention and progress.
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 glass-surface border border-purple-500/10 rounded-lg">
            <Icon name="Users" size={16} className="text-secondary mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                Join Communities
              </div>
              <div className="text-xs text-muted-foreground">
                Connect with other learners for support and motivation.
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 glass-surface border border-purple-500/10 rounded-lg">
            <Icon name="Code" size={16} className="text-success mt-0.5" />
            <div>
              <div className="text-sm font-medium text-foreground mb-1">
                Practice Projects
              </div>
              <div className="text-xs text-muted-foreground">
                Apply concepts in real projects to solidify understanding.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Achievement Badge */}
      {progressPercentage >= 30 && (
        <div className="bg-[#0a0a0a] border border-success/20 rounded-lg p-6 bg-success/5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
              <Icon name="Award" size={24} className="text-success" />
            </div>
            <div>
              <div className="text-lg font-semibold text-success">
                Great Progress!
              </div>
              <div className="text-sm text-muted-foreground">
                You're {progressPercentage}% through your learning journey. Keep
                it up!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
