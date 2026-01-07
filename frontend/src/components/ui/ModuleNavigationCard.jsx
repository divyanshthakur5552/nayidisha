import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const ModuleNavigationCards = ({
  modules = [],
  onModuleSelect = null,
  layout = "grid", // 'grid' | 'list'
  showProgress = true,
  className = "",
}) => {
  const [expandedModule, setExpandedModule] = useState(null);
  const navigate = useNavigate();

  const defaultModules = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Master the core concepts of JavaScript programming",
      estimatedTime: "2-3 hours",
      completionStatus: "completed",
      difficultyLevel: "beginner",
      progress: 100,
      topics: ["Variables", "Functions", "Objects", "Arrays"],
      prerequisites: [],
    },
    {
      id: 2,
      title: "DOM Manipulation",
      description: "Learn to interact with HTML elements using JavaScript",
      estimatedTime: "1.5-2 hours",
      completionStatus: "in-progress",
      difficultyLevel: "intermediate",
      progress: 65,
      topics: ["Element Selection", "Event Handling", "Dynamic Content"],
      prerequisites: ["JavaScript Fundamentals"],
    },
    {
      id: 3,
      title: "Async Programming",
      description: "Understanding Promises, async/await, and API calls",
      estimatedTime: "2-4 hours",
      completionStatus: "locked",
      difficultyLevel: "advanced",
      progress: 0,
      topics: ["Promises", "Async/Await", "Fetch API", "Error Handling"],
      prerequisites: ["JavaScript Fundamentals", "DOM Manipulation"],
    },
  ];

  const moduleData = modules?.length > 0 ? modules : defaultModules;

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "CheckCircle";
      case "in-progress":
        return "PlayCircle";
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
      case "locked":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
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

  const handleModuleAction = (module) => {
    if (module.completionStatus === "locked") return;

    if (onModuleSelect) {
      onModuleSelect(module);
    } else {
      navigate("/module-quiz-interface", { state: { module } });
    }
  };

  const toggleExpanded = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const ModuleCard = ({ module, index }) => {
    const isExpanded = expandedModule === module.id;
    const isLocked = module.completionStatus === "locked";

    return (
      <div
        className={`
          glass-card border border-purple-500/20 rounded-lg transition-all duration-300 hover:border-purple-500/40
          ${isLocked ? "opacity-60" : "hover:shadow-glass-lg"}
          ${layout === "list" ? "w-full" : ""}
        `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3 flex-1">
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${
                    module.completionStatus === "completed"
                      ? "bg-success/20 text-success"
                      : module.completionStatus === "in-progress"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted/20 text-muted-foreground"
                  }
                `}
              >
                <Icon name={getStatusIcon(module.completionStatus)} size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {module.description}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpanded(module.id)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              className="hover:bg-white/5 ml-2"
            />
          </div>

          {/* Progress Bar */}
          {showProgress && module.progress > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-mono text-primary">
                  {module.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${module.progress}%` }}
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
                  {module.estimatedTime}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <Icon
                  name="BarChart3"
                  size={14}
                  className={getDifficultyColor(module.difficultyLevel)}
                />
                <span className={getDifficultyColor(module.difficultyLevel)}>
                  {module.difficultyLevel}
                </span>
              </div>
            </div>

            <div
              className={`text-xs font-medium ${getStatusColor(
                module.completionStatus
              )}`}
            >
              {module.completionStatus?.replace("-", " ")}
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="border-t border-purple-500/20 pt-4 animate-fade-in">
              {/* Topics */}
              {module.topics && module.topics?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Topics Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {module.topics?.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {module.prerequisites && module.prerequisites?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Prerequisites
                  </h4>
                  <div className="space-y-1">
                    {module.prerequisites?.map((prereq, prereqIndex) => (
                      <div
                        key={prereqIndex}
                        className="flex items-center space-x-2 text-xs"
                      >
                        <Icon
                          name="ArrowRight"
                          size={12}
                          className="text-muted-foreground"
                        />
                        <span className="text-muted-foreground">{prereq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          <Button
            variant={
              module.completionStatus === "completed" ? "outline" : "default"
            }
            size="sm"
            onClick={() => handleModuleAction(module)}
            disabled={isLocked}
            iconName={
              module.completionStatus === "completed"
                ? "RotateCcw"
                : module.completionStatus === "in-progress"
                ? "Play"
                : module.completionStatus === "locked"
                ? "Lock"
                : "Play"
            }
            iconPosition="left"
            iconSize={16}
            className={`
              w-full floating-action
              ${isLocked ? "cursor-not-allowed" : ""}
            `}
          >
            {module.completionStatus === "completed"
              ? "Review Module"
              : module.completionStatus === "in-progress"
              ? "Continue Learning"
              : module.completionStatus === "locked"
              ? "Locked"
              : "Start Module"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Layout Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Learning Modules
          </h2>
          <p className="text-sm text-muted-foreground">
            {
              moduleData?.filter((m) => m?.completionStatus === "completed")
                ?.length
            }{" "}
            of {moduleData?.length} completed
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={layout === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setExpandedModule(null)}
            iconName="Grid3X3"
            className="hover:bg-white/5"
          />
          <Button
            variant={layout === "list" ? "default" : "ghost"}
            size="sm"
            iconName="List"
            className="hover:bg-white/5"
          />
        </div>
      </div>
      {/* Module Grid/List */}
      <div
        className={`
          ${
            layout === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        `}
      >
        {moduleData?.map((module, index) => (
          <ModuleCard key={module.id} module={module} index={index} />
        ))}
      </div>
      {/* Empty State */}
      {moduleData?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
            <Icon name="BookOpen" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No modules available
          </h3>
          <p className="text-muted-foreground">
            Complete your onboarding to generate your personalized learning
            roadmap.
          </p>
        </div>
      )}
    </div>
  );
};

export default ModuleNavigationCards;
