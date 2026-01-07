import React from "react";
import ModuleCard from "./ModuleCard";
import Icon from "../../../components/AppIcon";

const RoadmapTimeline = ({
  modules = [],
  viewMode = "timeline",
  currentFilter = "all",
  onModuleStart = null,
}) => {
  // Fallback default modules (only used if no modules provided)
  const defaultModules = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description:
        "Master the core concepts of JavaScript programming including variables, functions, objects, and control structures. Build a solid foundation for advanced topics.",
      estimatedTime: "2-3 hours",
      difficulty: "Beginner",
      status: "completed",
      progress: 100,
      score: 92,
      timeSpent: "2h 45m",
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
      prerequisites: [],
    },
    {
      id: 2,
      title: "DOM Manipulation",
      description:
        "Learn to interact with HTML elements using JavaScript. Master event handling, element selection, and dynamic content creation for interactive web pages.",
      estimatedTime: "1.5-2 hours",
      difficulty: "Intermediate",
      status: "completed",
      progress: 100,
      score: 88,
      timeSpent: "1h 52m",
      learningObjectives: [
        "Select and manipulate DOM elements",
        "Handle user events effectively",
        "Create dynamic content and interactions",
        "Understand the Document Object Model structure",
      ],
      keyConcepts: [
        "Element Selection",
        "Event Handling",
        "Dynamic Content",
        "DOM Traversal",
      ],
      prerequisites: ["JavaScript Fundamentals"],
    },
    {
      id: 3,
      title: "ES6+ Features",
      description:
        "Explore modern JavaScript features including arrow functions, destructuring, modules, and async/await. Write cleaner, more efficient code.",
      estimatedTime: "2-4 hours",
      difficulty: "Intermediate",
      status: "in-progress",
      progress: 65,
      learningObjectives: [
        "Use arrow functions and template literals",
        "Apply destructuring and spread operators",
        "Work with modules and imports",
        "Understand let, const, and block scope",
      ],
      keyConcepts: [
        "Arrow Functions",
        "Destructuring",
        "Modules",
        "Template Literals",
      ],
      prerequisites: ["JavaScript Fundamentals", "DOM Manipulation"],
    },
    {
      id: 4,
      title: "Async Programming",
      description:
        "Master asynchronous JavaScript with Promises, async/await, and API calls. Handle complex data flows and error management in modern applications.",
      estimatedTime: "3-4 hours",
      difficulty: "Advanced",
      status: "available",
      progress: 0,
      learningObjectives: [
        "Understand Promises and async/await",
        "Make HTTP requests with Fetch API",
        "Handle errors in asynchronous code",
        "Work with multiple concurrent operations",
      ],
      keyConcepts: ["Promises", "Async/Await", "Fetch API", "Error Handling"],
      prerequisites: [
        "JavaScript Fundamentals",
        "DOM Manipulation",
        "ES6+ Features",
      ],
    },
    {
      id: 5,
      title: "React Fundamentals",
      description:
        "Introduction to React library for building user interfaces. Learn components, JSX, props, and state management for modern web applications.",
      estimatedTime: "4-5 hours",
      difficulty: "Intermediate",
      status: "locked",
      progress: 0,
      learningObjectives: [
        "Create React components and understand JSX",
        "Manage component state and props",
        "Handle events in React applications",
        "Understand component lifecycle",
      ],
      keyConcepts: ["Components", "JSX", "Props & State", "Event Handling"],
      prerequisites: [
        "JavaScript Fundamentals",
        "DOM Manipulation",
        "ES6+ Features",
        "Async Programming",
      ],
    },
    {
      id: 6,
      title: "React Hooks",
      description:
        "Deep dive into React Hooks for state management and side effects. Master useState, useEffect, and custom hooks for powerful React applications.",
      estimatedTime: "3-4 hours",
      difficulty: "Advanced",
      status: "locked",
      progress: 0,
      learningObjectives: [
        "Use useState and useEffect hooks",
        "Create custom hooks for reusable logic",
        "Manage complex state with useReducer",
        "Optimize performance with useMemo and useCallback",
      ],
      keyConcepts: [
        "useState",
        "useEffect",
        "Custom Hooks",
        "Performance Optimization",
      ],
      prerequisites: ["React Fundamentals"],
    },
    {
      id: 7,
      title: "Node.js Basics",
      description:
        "Server-side JavaScript with Node.js. Learn to build backend applications, work with file systems, and create HTTP servers.",
      estimatedTime: "3-4 hours",
      difficulty: "Intermediate",
      status: "locked",
      progress: 0,
      learningObjectives: [
        "Understand Node.js runtime environment",
        "Work with file system and modules",
        "Create HTTP servers and handle requests",
        "Use npm for package management",
      ],
      keyConcepts: ["Node.js Runtime", "File System", "HTTP Servers", "NPM"],
      prerequisites: ["JavaScript Fundamentals", "Async Programming"],
    },
    {
      id: 8,
      title: "Express.js Framework",
      description:
        "Build robust web applications with Express.js. Learn routing, middleware, and API development for full-stack applications.",
      estimatedTime: "4-5 hours",
      difficulty: "Advanced",
      status: "locked",
      progress: 0,
      learningObjectives: [
        "Set up Express.js applications",
        "Create routes and handle HTTP methods",
        "Use middleware for request processing",
        "Build RESTful APIs",
      ],
      keyConcepts: [
        "Routing",
        "Middleware",
        "RESTful APIs",
        "Request Handling",
      ],
      prerequisites: ["Node.js Basics"],
    },
    {
      id: 9,
      title: "Database Integration",
      description:
        "Connect your applications to databases. Learn MongoDB basics, data modeling, and CRUD operations for persistent data storage.",
      estimatedTime: "4-6 hours",
      difficulty: "Advanced",
      status: "locked",
      progress: 0,
      learningObjectives: [
        "Understand database concepts and MongoDB",
        "Design data models and schemas",
        "Perform CRUD operations",
        "Integrate databases with Express.js",
      ],
      keyConcepts: [
        "MongoDB",
        "Data Modeling",
        "CRUD Operations",
        "Database Integration",
      ],
      prerequisites: ["Express.js Framework"],
    },
    {
      id: 10,
      title: "Full-Stack Project",
      description:
        "Capstone project combining all learned concepts. Build a complete web application with React frontend and Node.js backend.",
      estimatedTime: "6-8 hours",
      difficulty: "Advanced",
      status: "locked",
      progress: 0,
      learningObjectives: [
        "Plan and architect a full-stack application",
        "Integrate frontend and backend components",
        "Implement authentication and authorization",
        "Deploy the application to production",
      ],
      keyConcepts: [
        "Full-Stack Architecture",
        "Authentication",
        "Deployment",
        "Project Management",
      ],
      prerequisites: ["React Hooks", "Database Integration"],
    },
  ];

  const moduleData = modules?.length > 0 ? modules : defaultModules;

  // Filter modules based on current filter
  const filteredModules = moduleData?.filter((module) => {
    if (currentFilter === "all") return true;
    return module.status === currentFilter;
  });

  // Empty state for filtered results
  if (filteredModules?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No modules found
        </h3>
        <p className="text-muted-foreground">
          No modules match the current filter. Try selecting a different filter
          option.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
      ${viewMode === "timeline" ? "relative" : ""}
      ${
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : ""
      }
      ${viewMode === "accordion" ? "space-y-4" : ""}
    `}
    >
      {/* Timeline Background Line */}
      {viewMode === "timeline" && filteredModules?.length > 1 && (
        <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-secondary/20 to-transparent"></div>
      )}
      {/* Render Modules */}
      {filteredModules?.map((module, index) => (
        <ModuleCard
          key={module.id}
          module={module}
          index={index}
          viewMode={viewMode}
          onModuleStart={onModuleStart}
        />
      ))}
    </div>
  );
};

export default RoadmapTimeline;
