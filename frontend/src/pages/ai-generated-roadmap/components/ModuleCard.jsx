import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ModuleCard = ({
  module = null,
  index = 0,
  viewMode = "timeline",
  onModuleStart = null,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const defaultModule = {
    id: index + 1,
    title: `Module ${index + 1}: JavaScript Fundamentals`,
    description:
      "Master the core concepts of JavaScript programming including variables, functions, objects, and control structures.",
    estimatedTime: "2-3 hours",
    difficulty: "Beginner",
    status: index === 0 ? "available" : index < 3 ? "completed" : "locked",
    progress: index < 3 ? 100 : index === 3 ? 45 : 0,
    learningObjectives: [
      "Understand JavaScript syntax and basic concepts",
      "Work with variables, data types, and operators",
      "Create and use functions effectively",
      "Manipulate objects and arrays",
    ],
    keyConcepts: [
      "Variables & Data Types",
      "Functions & Scope",
      "Objects & Arrays",
      "Control Structures",
    ],
    prerequisites: index > 0 ? [`Module ${index}: Previous Concepts`] : [],
    score: index < 3 ? Math.floor(Math.random() * 20) + 80 : null,
    timeSpent:
      index < 3 ? `${Math.floor(Math.random() * 60) + 90} minutes` : null,
  };

  const moduleData = module || defaultModule;

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "CheckCircle";
      case "in-progress":
        return "PlayCircle";
      case "available":
        return "Play";
      case "locked":
        return "Lock";
      default:
        return "Circle";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "in-progress":
        return "text-primary";
      case "available":
        return "text-secondary";
      case "locked":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "text-success";
      case "intermediate":
        return "text-warning";
      case "advanced":
        return "text-error";
      default:
        return "text-muted-foreground";
    }
  };

  const handleModuleAction = () => {
    if (moduleData?.status === "locked") return;

    if (onModuleStart) {
      onModuleStart(moduleData);
    } else {
      navigate("/module-quiz-interface", { state: { module: moduleData } });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getActionButtonText = () => {
    switch (moduleData?.status) {
      case "completed":
        return "Review Module";
      case "in-progress":
        return "Continue Learning";
      case "available":
        return "Start Module";
      case "locked":
        return "Locked";
      default:
        return "Start Module";
    }
  };

  const getActionButtonIcon = () => {
    switch (moduleData?.status) {
      case "completed":
        return "RotateCcw";
      case "in-progress":
        return "Play";
      case "available":
        return "Play";
      case "locked":
        return "Lock";
      default:
        return "Play";
    }
  };

  // Timeline connector for timeline view
  const TimelineConnector = () =>
    viewMode === "timeline" && (
      <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent"></div>
    );

  return (
    <div
      className={`
      relative
      ${viewMode === "timeline" ? "flex items-start space-x-6 mb-8" : ""}
      ${viewMode === "grid" ? "w-full" : ""}
      ${viewMode === "accordion" ? "w-full mb-4" : ""}
    `}
    >
      {/* Timeline Node */}
      {viewMode === "timeline" && (
        <div className="flex-shrink-0  relative z-10">
          <div
            className={`
              w-12 h-12 rounded-full flex items-center bg-[#0a0a0a] justify-center border-4 border-background
              ${
                moduleData?.status === "completed"
                  ? "bg-success neon-glow"
                  : moduleData?.status === "in-progress"
                  ? "bg-primary neon-glow animate-pulse"
                  : moduleData?.status === "available"
                  ? "bg-secondary"
                  : "bg-muted"
              }
            `}
          >
            <Icon
              name={getStatusIcon(moduleData?.status)}
              size={20}
              className="text-white"
            />
          </div>
          <TimelineConnector />
        </div>
      )}
      {/* Module Card */}
      <div
        className={`
          glass-card border border-purple-500/20 rounded-lg transition-all duration-300 hover:border-purple-500/40
          ${
            moduleData?.status === "locked"
              ? "opacity-60"
              : "hover:shadow-glass-lg"
          }
          ${viewMode === "timeline" ? "flex-1" : "w-full"}
        `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3 flex-1">
              {viewMode !== "timeline" && (
                <div
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${
                      moduleData?.status === "completed"
                        ? "bg-success/20 text-success"
                        : moduleData?.status === "in-progress"
                        ? "bg-primary/20 text-primary"
                        : moduleData?.status === "available"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-muted/20 text-muted-foreground"
                    }
                  `}
                >
                  <Icon name={getStatusIcon(moduleData?.status)} size={20} />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {moduleData?.title}
                  </h3>
                  {moduleData?.score && (
                    <span className="px-2 py-1 bg-success/20 text-success text-xs rounded-md font-mono">
                      {moduleData?.score}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {moduleData?.description}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              className="hover:bg-white/5 ml-2"
            />
          </div>

          {/* Progress Bar */}
          {moduleData?.progress > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-mono text-primary">
                  {moduleData?.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${moduleData?.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Icon
                  name="Clock"
                  size={14}
                  className="text-muted-foreground"
                />
                <span className="text-muted-foreground">
                  {moduleData?.estimatedTime}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <Icon
                  name="BarChart3"
                  size={14}
                  className={getDifficultyColor(moduleData?.difficulty)}
                />
                <span className={getDifficultyColor(moduleData?.difficulty)}>
                  {moduleData?.difficulty}
                </span>
              </div>

              {moduleData?.timeSpent && (
                <div className="flex items-center space-x-1">
                  <Icon name="Timer" size={14} className="text-secondary" />
                  <span className="text-secondary">
                    {moduleData?.timeSpent}
                  </span>
                </div>
              )}
            </div>

            <div
              className={`text-xs font-medium ${getStatusColor(
                moduleData?.status
              )}`}
            >
              {moduleData?.status?.replace("-", " ")}
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="border-t border-purple-500/20 pt-4 animate-fade-in">
              {/* Learning Objectives */}
              {moduleData?.learningObjectives &&
                moduleData?.learningObjectives?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                      <Icon name="Target" size={16} className="text-primary" />
                      <span>Learning Objectives</span>
                    </h4>
                    <div className="space-y-1">
                      {moduleData?.learningObjectives?.map(
                        (objective, objIndex) => (
                          <div
                            key={objIndex}
                            className="flex items-start space-x-2 text-xs"
                          >
                            <Icon
                              name="ArrowRight"
                              size={12}
                              className="text-muted-foreground mt-0.5"
                            />
                            <span className="text-muted-foreground">
                              {objective}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Key Concepts */}
              {moduleData?.keyConcepts &&
                moduleData?.keyConcepts?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                      <Icon
                        name="Lightbulb"
                        size={16}
                        className="text-warning"
                      />
                      <span>Key Concepts</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {moduleData?.keyConcepts?.map((concept, conceptIndex) => (
                        <span
                          key={conceptIndex}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Prerequisites */}
              {moduleData?.prerequisites &&
                moduleData?.prerequisites?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
                      <Icon name="Link" size={16} className="text-secondary" />
                      <span>Prerequisites</span>
                    </h4>
                    <div className="space-y-1">
                      {moduleData?.prerequisites?.map((prereq, prereqIndex) => (
                        <div
                          key={prereqIndex}
                          className="flex items-center space-x-2 text-xs"
                        >
                          <Icon
                            name="CheckCircle"
                            size={12}
                            className="text-success"
                          />
                          <span className="text-muted-foreground">
                            {prereq}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* Action Button */}
          <Button
            variant={moduleData?.status === "completed" ? "outline" : "default"}
            size="sm"
            onClick={handleModuleAction}
            disabled={moduleData?.status === "locked"}
            iconName={getActionButtonIcon()}
            iconPosition="left"
            iconSize={16}
            className={`
              w-full floating-action
              ${moduleData?.status === "locked" ? "cursor-not-allowed" : ""}
            `}
          >
            {getActionButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
