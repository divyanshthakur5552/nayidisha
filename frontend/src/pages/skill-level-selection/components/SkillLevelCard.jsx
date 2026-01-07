import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SkillLevelCard = ({
  level,
  isSelected,
  onSelect,
  technology = "JavaScript",
  className = "",
}) => {
  // Dynamic content based on technology
  const getLevelConfig = (tech) => {
    const configs = {
      JavaScript: {
        basic: {
          prerequisites: [
            "Basic computer literacy",
            "Understanding of HTML & CSS",
            "Familiarity with web browsers",
          ],
          concepts: [
            "JavaScript syntax and variables",
            "Functions and control flow",
            "DOM manipulation basics",
            "Event handling fundamentals",
          ],
          outcomes: [
            "Write basic JavaScript programs",
            "Manipulate web page elements",
            "Handle user interactions",
            "Understand core JS concepts",
          ],
        },
        intermediate: {
          prerequisites: [
            "Solid JavaScript fundamentals",
            "Understanding of async programming",
            "Basic API knowledge",
            "Familiarity with ES6+ features",
          ],
          concepts: [
            "Advanced ES6+ features",
            "Promises and async/await",
            "Modern framework basics",
            "API integration patterns",
          ],
          outcomes: [
            "Build interactive web applications",
            "Work with REST APIs",
            "Use modern JavaScript frameworks",
            "Implement complex logic",
          ],
        },
        advanced: {
          prerequisites: [
            "Expert JavaScript/TypeScript skills",
            "Framework experience (React, Vue, etc.)",
            "Understanding of design patterns",
            "Knowledge of build tools",
          ],
          concepts: [
            "Advanced design patterns",
            "Performance optimization",
            "State management solutions",
            "Testing and debugging strategies",
          ],
          outcomes: [
            "Architect scalable applications",
            "Optimize performance and bundle size",
            "Lead frontend projects",
            "Implement advanced patterns",
          ],
        },
      },
      Python: {
        basic: {
          prerequisites: [
            "Basic computer literacy",
            "Understanding of files and folders",
            "Logical thinking ability",
          ],
          concepts: [
            "Python syntax and data types",
            "Functions and modules",
            "Basic data structures (lists, dicts)",
            "File handling basics",
          ],
          outcomes: [
            "Write Python scripts",
            "Work with data structures",
            "Handle files and data",
            "Understand core Python concepts",
          ],
        },
        intermediate: {
          prerequisites: [
            "Solid Python fundamentals",
            "Understanding of OOP concepts",
            "Basic knowledge of libraries",
            "Familiarity with pip and venv",
          ],
          concepts: [
            "Object-oriented programming",
            "Working with popular libraries",
            "Exception handling",
            "Basic web frameworks or data tools",
          ],
          outcomes: [
            "Build web applications or data tools",
            "Work with databases",
            "Use frameworks like Django/Flask",
            "Analyze and visualize data",
          ],
        },
        advanced: {
          prerequisites: [
            "Expert Python programming skills",
            "Framework experience (Django, Flask, etc.)",
            "Understanding of async programming",
            "Knowledge of testing and deployment",
          ],
          concepts: [
            "Advanced design patterns",
            "Performance optimization",
            "Microservices architecture",
            "ML/Data Science pipelines",
          ],
          outcomes: [
            "Architect scalable systems",
            "Optimize Python applications",
            "Lead development teams",
            "Build production-ready solutions",
          ],
        },
      },
      React: {
        basic: {
          prerequisites: [
            "Solid JavaScript fundamentals",
            "Understanding of HTML & CSS",
            "Basic knowledge of ES6+",
          ],
          concepts: [
            "React components and JSX",
            "Props and state basics",
            "Event handling in React",
            "Basic hooks (useState, useEffect)",
          ],
          outcomes: [
            "Build simple React components",
            "Manage component state",
            "Handle user interactions",
            "Create basic React applications",
          ],
        },
        intermediate: {
          prerequisites: [
            "Strong React fundamentals",
            "Understanding of component lifecycle",
            "Experience with hooks",
            "Familiarity with React Router",
          ],
          concepts: [
            "Advanced hooks patterns",
            "State management (Context, Redux)",
            "Performance optimization",
            "Testing React components",
          ],
          outcomes: [
            "Build complex React applications",
            "Implement state management",
            "Optimize component performance",
            "Write testable React code",
          ],
        },
        advanced: {
          prerequisites: [
            "Expert React development skills",
            "Deep understanding of React internals",
            "Experience with TypeScript",
            "Knowledge of advanced patterns",
          ],
          concepts: [
            "Advanced patterns and architecture",
            "Custom hooks and HOCs",
            "Server-side rendering (Next.js)",
            "React performance tuning",
          ],
          outcomes: [
            "Architect large-scale React apps",
            "Create reusable component libraries",
            "Lead React development teams",
            "Optimize production applications",
          ],
        },
      },
      "Node.js": {
        basic: {
          prerequisites: [
            "Good JavaScript fundamentals",
            "Understanding of async concepts",
            "Basic command line knowledge",
          ],
          concepts: [
            "Node.js runtime and modules",
            "NPM and package management",
            "Basic Express.js",
            "File system operations",
          ],
          outcomes: [
            "Build simple Node.js applications",
            "Create basic REST APIs",
            "Work with npm packages",
            "Handle server-side logic",
          ],
        },
        intermediate: {
          prerequisites: [
            "Strong Node.js fundamentals",
            "Understanding of Express.js",
            "Database knowledge (SQL/NoSQL)",
            "RESTful API concepts",
          ],
          concepts: [
            "Advanced Express patterns",
            "Database integration",
            "Authentication and security",
            "Error handling and logging",
          ],
          outcomes: [
            "Build production-ready APIs",
            "Implement authentication systems",
            "Work with multiple databases",
            "Deploy Node.js applications",
          ],
        },
        advanced: {
          prerequisites: [
            "Expert Node.js development skills",
            "Microservices architecture knowledge",
            "Understanding of scalability",
            "DevOps and deployment experience",
          ],
          concepts: [
            "Microservices architecture",
            "Message queues and event-driven design",
            "Performance optimization",
            "Docker and Kubernetes",
          ],
          outcomes: [
            "Architect scalable backend systems",
            "Build microservices architecture",
            "Optimize Node.js performance",
            "Lead backend development",
          ],
        },
      },
    };

    return configs[tech] || configs.JavaScript;
  };

  const techConfig = getLevelConfig(technology);

  const levelConfig = {
    basic: {
      icon: "Book",
      title: "Basic",
      subtitle: "Just Getting Started",
      description:
        "Perfect for beginners with little to no programming experience",
      prerequisites: techConfig.basic.prerequisites,
      concepts: techConfig.basic.concepts,
      outcomes: techConfig.basic.outcomes,
      estimatedTime: "2-3 months",
      color: "success",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    intermediate: {
      icon: "TreePine",
      title: "Intermediate",
      subtitle: "Building Confidence",
      description:
        "For learners with some programming background and basic development knowledge",
      prerequisites: techConfig.intermediate.prerequisites,
      concepts: techConfig.intermediate.concepts,
      outcomes: techConfig.intermediate.outcomes,
      estimatedTime: "3-4 months",
      color: "warning",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
    },
    advanced: {
      icon: "Mountain",
      title: "Advanced",
      subtitle: "Ready for Challenges",
      description:
        "For experienced developers looking to master complex concepts and best practices",
      prerequisites: techConfig.advanced.prerequisites,
      concepts: techConfig.advanced.concepts,
      outcomes: techConfig.advanced.outcomes,
      estimatedTime: "4-6 months",
      color: "primary",
      gradient: "from-purple-500/20 to-blue-500/20",
      borderColor: "border-purple-500/30",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
  };

  const config = levelConfig?.[level];

  return (
    <div
      className={`
        relative bg-[#0a0a0a] border-[#171717] transition-all duration-300 cursor-pointer group
        ${
          isSelected
            ? `border-2 ${config?.borderColor} neon-glow bg-[#262626] `
            : "border border-purple-500/20 hover:border-purple-500/40"
        }
        hover:shadow-glass-lg animate-fade-in
        ${className}
      `}
      onClick={onSelect}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center neon-glow animate-spring">
          <Icon name="Check" size={14} className="text-white" />
        </div>
      )}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div
            className={`w-12 h-12 rounded-lg ${config?.iconBg} flex items-center justify-center`}
          >
            <Icon name={config?.icon} size={24} className={config?.iconColor} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              {config?.title}
            </h3>
            <p className="text-sm text-muted-foreground">{config?.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {config?.description}
        </p>

        {/* Prerequisites */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2 text-primary" />
            Prerequisites
          </h4>
          <ul className="space-y-2">
            {config?.prerequisites?.map((prereq, index) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-xs text-muted-foreground"
              >
                <Icon
                  name="Dot"
                  size={12}
                  className="mt-1 text-primary flex-shrink-0"
                />
                <span>{prereq}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Concepts */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Lightbulb" size={16} className="mr-2 text-secondary" />
            Key Concepts
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {config?.concepts?.map((concept, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></div>
                <span className="text-xs text-muted-foreground">{concept}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Target" size={16} className="mr-2 text-accent" />
            You'll Be Able To
          </h4>
          <ul className="space-y-2">
            {config?.outcomes?.map((outcome, index) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-xs text-muted-foreground"
              >
                <Icon
                  name="ArrowRight"
                  size={12}
                  className="mt-1 text-accent flex-shrink-0"
                />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Estimated Time */}
        <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Estimated Duration
            </span>
          </div>
          <span className="text-sm font-medium text-primary">
            {config?.estimatedTime}
          </span>
        </div>

        {/* Selection Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className={`
            w-full mt-4 transition-all duration-200
            ${isSelected ? "neon-glow" : "hover:bg-white/5"}
          `}
          iconName={isSelected ? "Check" : "ArrowRight"}
          iconPosition="right"
          iconSize={16}
        >
          {isSelected ? "Selected" : `Choose ${config?.title}`}
        </Button>
      </div>
    </div>
  );
};

export default SkillLevelCard;
