import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const ProgressNavigationBar = ({
  isVisible = true,
  currentModule = null,
  overallProgress = 0,
  totalModules = 0,
  className = "",
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const isQuizPage = location?.pathname === "/module-quiz-interface";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isQuizPage) {
        setIsCollapsed(currentScrollY > lastScrollY && currentScrollY > 100);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isQuizPage]);

  const handleBackToRoadmap = () => {
    navigate("/ai-generated-roadmap");
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed top-20 left-0 right-0 z-40 transition-transform duration-300 ease-out
        ${isCollapsed ? "-translate-y-full" : "translate-y-0"}
        ${className}
      `}
    >
      <div className="px-6">
        <div className="glass-card border border-purple-500/20 rounded-lg">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Progress Info */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToRoadmap}
                  iconName="ArrowLeft"
                  iconPosition="left"
                  iconSize={16}
                  className="hover:bg-white/5 text-muted-foreground hover:text-primary"
                >
                  Roadmap
                </Button>

                {currentModule && (
                  <>
                    <div className="w-px h-6 bg-border"></div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Icon
                          name="BookOpen"
                          size={16}
                          className="text-primary"
                        />
                        <span className="text-sm font-medium text-foreground">
                          {currentModule?.title}
                        </span>
                      </div>

                      {currentModule?.questionProgress && (
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>Question</span>
                          <span className="px-2 py-1 bg-primary/20 text-primary rounded-md font-mono">
                            {currentModule?.questionProgress?.current} /{" "}
                            {currentModule?.questionProgress?.total}
                          </span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Overall Progress */}
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-3">
                  <span className="text-xs text-muted-foreground">
                    Overall Progress
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                        style={{ width: `${overallProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono text-primary">
                      {Math.round(overallProgress)}%
                    </span>
                  </div>
                </div>

                {/* Module Counter */}
                {totalModules > 0 && (
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Layers" size={14} />
                    <span className="font-mono">
                      {Math.ceil((overallProgress / 100) * totalModules)} /{" "}
                      {totalModules}
                    </span>
                  </div>
                )}

                {/* Collapse Toggle for Quiz Pages */}
                {isQuizPage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggleCollapse}
                    iconName={isCollapsed ? "ChevronDown" : "ChevronUp"}
                    className="hover:bg-white/5 text-muted-foreground"
                  />
                )}
              </div>
            </div>

            {/* Mobile Progress Bar */}
            <div className="sm:hidden mt-3 pt-3 border-t border-purple-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs font-mono text-primary">
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Hint for Collapsed State */}
      {isCollapsed && isQuizPage && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
          <div
            className="glass-surface px-3 py-1 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
            onClick={handleToggleCollapse}
          >
            <Icon
              name="ChevronDown"
              size={16}
              className="text-muted-foreground"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressNavigationBar;
