import React from "react";
import Icon from "../../../components/AppIcon";

const SkillLevelDescription = ({ className = "" }) => {
  const adaptiveFeatures = [
    {
      icon: "Brain",
      title: "Question Difficulty",
      description:
        "AI adjusts question complexity based on your selected level and performance",
      levels: {
        basic: "Simple, foundational questions with clear explanations",
        intermediate: "Moderate complexity with practical scenarios",
        advanced: "Complex problems requiring deep understanding",
      },
    },
    {
      icon: "BookOpen",
      title: "Module Complexity",
      description:
        "Learning modules are tailored to match your current skill level",
      levels: {
        basic: "Step-by-step tutorials with visual examples",
        intermediate: "Project-based learning with guided practice",
        advanced: "Advanced concepts with real-world applications",
      },
    },
    {
      icon: "Zap",
      title: "Learning Pace",
      description:
        "The system adapts to provide optimal challenge without overwhelming you",
      levels: {
        basic: "Slower pace with more repetition and reinforcement",
        intermediate: "Balanced pace with moderate challenge progression",
        advanced: "Faster pace with complex problem-solving focus",
      },
    },
    {
      icon: "Target",
      title: "Success Criteria",
      description: "Achievement thresholds are calibrated to your skill level",
      levels: {
        basic: "70% accuracy to pass modules with detailed feedback",
        intermediate: "75% accuracy with performance insights",
        advanced: "80% accuracy with advanced analytics",
      },
    },
  ];

  return (
    <div
      className={`border-[#171717] bg-[#0a0a0a] rounded-xl border border-purple-500/20  p-6 ${className}`}
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#171717] flex items-center justify-center neon-glow">
          <Icon name="Settings" size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gradient mb-2">
          How Skill Level Affects Your Learning
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI-powered adaptive system personalizes your entire learning
          experience based on your selected skill level. Here's how your choice
          impacts different aspects of the platform:
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adaptiveFeatures?.map((feature, index) => (
          <div
            key={index}
            className="glass-surface border border-purple-500/10 rounded-lg p-4"
          >
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {feature?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-sm font-medium text-success">
                    Basic:{" "}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {feature?.levels?.basic}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-sm font-medium text-warning">
                    Intermediate:{" "}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {feature?.levels?.intermediate}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-error rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-sm font-medium text-error">
                    Advanced:{" "}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {feature?.levels?.advanced}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon
            name="Info"
            size={20}
            className="text-primary mt-0.5 flex-shrink-0"
          />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              Don't Worry About Getting It Perfect
            </h4>
            <p className="text-sm text-muted-foreground">
              Our adaptive algorithm continuously learns from your performance
              and adjusts accordingly. You can always change your skill level
              later, and the system will adapt your learning path in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillLevelDescription;
