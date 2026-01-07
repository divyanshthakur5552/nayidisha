import React from "react";
import TechnologyCard from "./TechnologyCard";

const TechnologyGrid = ({
  technologies = [],
  selectedTechnology = null,
  onTechnologySelect = () => {},
  className = "",
}) => {
  return (
    <div className={className}>
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Choose Your <span className="text-primary">Technology</span> Focus
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the programming technology you want to master. This choice will
          shape your personalized learning roadmap and adaptive quiz experience.
        </p>
      </div>
      {/* Technology Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {technologies?.map((technology) => (
          <TechnologyCard
            key={technology?.id}
            technology={technology}
            isSelected={selectedTechnology?.id === technology?.id}
            onSelect={() => onTechnologySelect(technology)}
            className="animate-fade-in"
            style={{ animationDelay: `${technology?.id * 100}ms` }}
          />
        ))}
      </div>
      {/* Helper Text */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Don't worry - you can explore other technologies after completing your
          current roadmap
        </p>
      </div>
    </div>
  );
};

export default TechnologyGrid;
