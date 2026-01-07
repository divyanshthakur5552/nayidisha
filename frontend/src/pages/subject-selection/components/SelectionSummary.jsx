import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SelectionSummary = ({
  selectedTechnology = null,
  onContinue = () => {},
  onReset = () => {},
  className = "",
}) => {
  if (!selectedTechnology) return null;

  const getTechnologyIcon = (tech) => {
    const iconMap = {
      Python: "Code2",
      JavaScript: "Zap",
      React: "Atom",
      "Node.js": "Server",
    };
    return iconMap?.[tech] || "Code";
  };

  const getTechnologyColor = (tech) => {
    const colorMap = {
      Python: "from-blue-500 to-green-500",
      JavaScript: "from-yellow-400 to-orange-500",
      React: "from-cyan-400 to-blue-500",
      "Node.js": "from-green-400 to-emerald-500",
    };
    return colorMap?.[tech] || "from-primary to-secondary";
  };

  return (
    <div
      className={` border border-primary/30 bg-[#171717] rounded-xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]  ${className}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
            <Icon name="Check" size={16} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Technology Selected
            </h3>
            <p className="text-sm text-[#737373] ">
              Ready to proceed to goal selection
            </p>
          </div>
        </div>

        {/* Selected Technology Display */}
        <div className="flex items-center space-x-4 mb-6 p-4 glass-surface rounded-lg border border-[text-[#0a0a0a]]">
          <div
            className={`
              w-12 h-12 rounded-lg bg-gradient-to-br ${getTechnologyColor(
                selectedTechnology?.name
              )} 
              flex items-center justify-center neon-glow
            `}
          >
            <Icon
              name={getTechnologyIcon(selectedTechnology?.name)}
              size={24}
              className="text-white"
            />
          </div>

          <div className="flex-1">
            <h4 className="text-lg font-semibold text-foreground mb-1">
              {selectedTechnology?.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {selectedTechnology?.description}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {selectedTechnology?.estimatedModules}
            </div>
            <div className="text-xs text-muted-foreground">
              Learning Modules
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#a3a3a3] mb-1">
              {selectedTechnology?.estimatedHours}h
            </div>
            <div className="text-xs text-muted-foreground">Estimated Time</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            className="flex-1 hover:border-primary/50"
          >
            Change
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={onContinue}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
            className="flex-1 floating-action"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectionSummary;
