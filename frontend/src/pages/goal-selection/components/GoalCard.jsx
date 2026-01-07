import React from "react";
import Icon from "../../../components/AppIcon";

const GoalCard = ({ goal, isSelected, onSelect, className = "" }) => {
  const getGoalIcon = (goalType) => {
    switch (goalType) {
      case "web-development":
        return "Globe";
      case "data-structures":
        return "Database";
      case "full-stack":
        return "Layers";
      default:
        return "Target";
    }
  };

  const getGoalGradient = (goalType) => {
    switch (goalType) {
      case "web-development":
        return "from--500 to-cyan-500";
      case "data-structures":
        return "from--500 to-emerald-500";
      case "full-stack":
        return "from-p-500 to-pink-500";
      default:
        return "from- to-secondary";
    }
  };

  return (
    <div
      className={`
        relative group cursor-pointer transition-all duration-300 hover:scale-105
        ${isSelected ? "scale-105" : ""}
        ${className}
      `}
      onClick={onSelect}
    >
      <div
        className={`
          bg-[#171717]/300 rounded-xl border border-[#737373]  transition-all duration-300 p-6 h-full
          ${
            isSelected
              ? "border-primary neon-glow bg-primary/5"
              : "border-purple-500/20 hover:border-purple-500/40"
          }
        `}
      >
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center ">
            <Icon name="Check" size={16} className="text-white" />
          </div>
        )}

        {/* Icon */}
        <div className="mb-6">
          <div
            className={`
              w-16 h-16 rounded-2xl bg-gradient-to-br ${getGoalGradient(
                goal?.type
              )} 
              flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300
              ${isSelected ? "neon-glow" : ""}
            `}
          >
            <Icon
              name={getGoalIcon(goal?.type)}
              size={32}
              className="text-white"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {goal?.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {goal?.description}
            </p>
          </div>

          {/* Key Focus Areas */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Key Focus Areas:
            </h4>
            <div className="flex flex-wrap gap-2">
              {goal?.focusAreas?.map((area, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/5 text-xs text-muted-foreground rounded-md border border-white/10"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Career Outcomes */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Career Outcomes:
            </h4>
            <ul className="space-y-1">
              {goal?.careerOutcomes?.map((outcome, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-xs text-muted-foreground"
                >
                  <Icon
                    name="ArrowRight"
                    size={12}
                    className="mt-0.5 text-primary flex-shrink-0"
                  />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Duration & Difficulty */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {goal?.estimatedDuration}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon
                name="BarChart3"
                size={14}
                className="text-muted-foreground"
              />
              <span className="text-xs text-muted-foreground">
                {goal?.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div
          className={`
            absolute inset-0 rounded-lg bg-gradient-to-br ${getGoalGradient(
              goal?.type
            )} 
            opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none
          `}
        ></div>
      </div>
    </div>
  );
};

export default GoalCard;
