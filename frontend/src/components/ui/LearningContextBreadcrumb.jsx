import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const LearningContextBreadcrumb = ({
  context = null,
  showOnQuizOnly = true,
  isCollapsible = true,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isQuizPage = location?.pathname === "/module-quiz-interface";

  // Don't show if configured to show only on quiz pages and we're not on quiz page
  if (showOnQuizOnly && !isQuizPage) return null;

  // Default context structure
  const defaultContext = {
    technology: "JavaScript",
    goal: "Full Stack Development",
    module: {
      name: "DOM Manipulation",
      id: 2,
      totalQuestions: 15,
    },
    currentQuestion: {
      number: 7,
      topic: "Event Handling",
    },
    difficulty: "Intermediate",
  };

  const contextData = context || defaultContext;

  const breadcrumbItems = [
    {
      label: contextData?.technology,
      icon: "Code2",
      path: "/subject-selection",
      description: "Technology Focus",
    },
    {
      label: contextData?.goal,
      icon: "Target",
      path: "/goal-selection",
      description: "Learning Goal",
    },
    {
      label: contextData?.module?.name,
      icon: "BookOpen",
      path: "/ai-generated-roadmap",
      description: "Current Module",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Mobile compact view
  const MobileCompactView = () => (
    <div className="sm:hidden">
      <div className="glass-surface border border-purple-500/10 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground truncate">
              {contextData?.module?.name}
            </span>
            {contextData?.currentQuestion && (
              <span className="text-xs text-muted-foreground font-mono">
                Q {contextData?.currentQuestion?.number}/
                {contextData?.module?.totalQuestions}
              </span>
            )}
          </div>

          {isCollapsible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              className="hover:bg-white/5 p-1"
            />
          )}
        </div>

        {/* Expanded Mobile Context */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-purple-500/10 animate-fade-in">
            <div className="space-y-2">
              {breadcrumbItems?.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name={item?.icon}
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span className="text-xs text-muted-foreground">
                      {item?.description}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation(item?.path)}
                    className="text-xs hover:bg-white/5 px-2 py-1 h-auto"
                  >
                    {item?.label}
                  </Button>
                </div>
              ))}

              {contextData?.currentQuestion?.topic && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Lightbulb"
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span className="text-xs text-muted-foreground">
                      Current Topic
                    </span>
                  </div>
                  <span className="text-xs text-primary font-medium">
                    {contextData?.currentQuestion?.topic}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Desktop full view
  const DesktopView = () => (
    <div className="hidden sm:block">
      <nav className="glass-surface border border-purple-500/10 rounded-lg px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2">
            {breadcrumbItems?.map((item, index) => (
              <React.Fragment key={index}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={14}
                  className="hover:bg-white/5 text-sm px-3 py-1 h-auto"
                >
                  {item?.label}
                </Button>

                {index < breadcrumbItems?.length - 1 && (
                  <Icon
                    name="ChevronRight"
                    size={14}
                    className="text-muted-foreground"
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Current Context Info */}
          <div className="flex items-center space-x-4 text-sm">
            {contextData?.currentQuestion && (
              <div className="flex items-center space-x-2">
                <Icon name="HelpCircle" size={16} className="text-primary" />
                <span className="text-muted-foreground">Question</span>
                <span className="px-2 py-1 bg-primary/20 text-primary rounded-md font-mono text-xs">
                  {contextData?.currentQuestion?.number} /{" "}
                  {contextData?.module?.totalQuestions}
                </span>
              </div>
            )}

            {contextData?.currentQuestion?.topic && (
              <div className="flex items-center space-x-2">
                <Icon name="Lightbulb" size={16} className="text-warning" />
                <span className="text-muted-foreground">Topic:</span>
                <span className="text-foreground font-medium">
                  {contextData?.currentQuestion?.topic}
                </span>
              </div>
            )}

            {contextData?.difficulty && (
              <div className="flex items-center space-x-2">
                <Icon name="BarChart3" size={16} className="text-secondary" />
                <span className="text-muted-foreground">Level:</span>
                <span className="text-secondary font-medium">
                  {contextData?.difficulty}
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      <MobileCompactView />
      <DesktopView />
    </div>
  );
};

export default LearningContextBreadcrumb;
