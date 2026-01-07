import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const RoadmapHeader = ({
  roadmapData = null,
  onFilterChange = null,
  currentFilter = "all",
  onViewModeChange = null,
  viewMode = "timeline",
}) => {
  const defaultRoadmapData = {
    title: "JavaScript Full Stack Development",
    description:
      "A comprehensive learning path tailored to your intermediate skill level, focusing on modern JavaScript development and full-stack web applications.",
    totalModules: 10,
    estimatedTime: "24-30 hours",
    difficulty: "Intermediate",
    completedModules: 3,
    aiRecommendations: [
      "Focus on practical projects to reinforce concepts",
      "Practice coding daily for 1-2 hours",
      "Join developer communities for peer learning",
    ],
  };

  const data = roadmapData || defaultRoadmapData;
  const completionPercentage = Math.round(
    (data?.completedModules / data?.totalModules) * 100
  );

  const filterOptions = [
    { value: "all", label: "All Modules", icon: "Layers" },
    { value: "available", label: "Available", icon: "Play" },
    { value: "in-progress", label: "In Progress", icon: "Clock" },
    { value: "completed", label: "Completed", icon: "CheckCircle" },
  ];

  const viewModeOptions = [
    { value: "timeline", label: "Timeline", icon: "GitBranch" },
    { value: "grid", label: "Grid", icon: "Grid3X3" },
    { value: "accordion", label: "Accordion", icon: "List" },
  ];

  return (
    <div className="bg-[#0a0a0a] border shadow-[inset_0px_0px_30px_#000000] rounded-lg p-6 mb-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
        <div className="flex-1 mb-6 lg:mb-0">
          <div className="flex items-center space-x-3 mb-3">
            <div>
              <h1 className="text-2xl lg:text-3xl font-mono font-bold text-[#d4d4d4]">
                {data?.title}
              </h1>
              <p className="text-sm mt-4 text-[#262626]">
                AI-Generated Learning Roadmap
              </p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4 max-w-2xl text-[#262626]">
            {data?.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-surface border border-purple-500/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Layers" size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground text-[#d4d4d4]">
                  Modules
                </span>
              </div>
              <div className="text-lg font-semibold text-foreground text-[#d4d4d4]">
                {data?.totalModules}
              </div>
            </div>

            <div className="glass-surface border border-purple-500/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Clock" size={16} className="text-secondary" />
                <span className="text-xs text-muted-foreground">Est. Time</span>
              </div>
              <div className="text-lg font-semibold text-foreground text-[#d4d4d4]">
                {data?.estimatedTime}
              </div>
            </div>

            <div className="glass-surface border border-purple-500/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="BarChart3" size={16} className="text-warning" />
                <span className="text-xs text-muted-foreground">Level</span>
              </div>
              <div className="text-lg font-semibold text-foreground text-[#d4d4d4]">
                {data?.difficulty}
              </div>
            </div>

            <div className="glass-surface border border-purple-500/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">Progress</span>
              </div>
              <div className="text-lg font-semibold text-foreground text-[#d4d4d4]">
                {completionPercentage}%
              </div>
            </div>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="flex-shrink-0 lg:ml-8">
          <div className="relative w-32 h-32">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted/20"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${completionPercentage * 2.83} 283`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(139, 92, 246)" />
                  <stop offset="100%" stopColor="rgb(6, 182, 212)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gradient">
                {completionPercentage}%
              </span>
              <span className="text-xs text-muted-foreground">Complete</span>
            </div>
          </div>
        </div>
      </div>
      {/* AI Recommendations */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Sparkles" size={20} className="text-primary" />
          <span>AI Recommendations</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data?.aiRecommendations?.map((recommendation, index) => (
            <div
              key={index}
              className="glass-surface border border-purple-500/10 rounded-lg p-3"
            >
              <div className="flex items-start space-x-2">
                <Icon
                  name="Lightbulb"
                  size={16}
                  className="text-warning mt-0.5"
                />
                <span className="text-sm text-muted-foreground">
                  {recommendation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        {/* Filter Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground mr-2">Filter:</span>
          <div className="flex items-center space-x-1">
            {filterOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={currentFilter === option?.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onFilterChange && onFilterChange(option?.value)}
                iconName={option?.icon}
                iconPosition="left"
                iconSize={14}
                className={`
                  transition-all duration-200
                  ${
                    currentFilter === option?.value
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "hover:bg-white/5"
                  }
                `}
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* View Mode Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground mr-2">View:</span>
          <div className="flex items-center space-x-1">
            {viewModeOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={viewMode === option?.value ? "default" : "ghost"}
                size="sm"
                onClick={() =>
                  onViewModeChange && onViewModeChange(option?.value)
                }
                iconName={option?.icon}
                className={`
                  transition-all duration-200
                  ${
                    viewMode === option?.value
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "hover:bg-white/5"
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHeader;
