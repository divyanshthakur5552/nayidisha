import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingStepIndicator from "../../components/ui/OnboardingStepIndicator";
import Button from "../../components/ui/Button";
import GoalCard from "./components/GoalCard";
import GoalComparisonModal from "./components/GoalComparisonModal";
import GoalSelectionHeader from "./components/GoalSelectionHeader";

const GoalSelection = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Goals data organized by technology
  const goalsByTechnology = {
    JavaScript: [
      {
        id: "frontend-development",
        type: "frontend-development",
        title: "Frontend Development",
        description:
          "Master modern JavaScript and create interactive, responsive web applications with the latest frontend technologies.",
        focusAreas: [
          "Modern JavaScript ES6+",
          "DOM Manipulation",
          "Async Programming",
          "Frontend Frameworks",
          "Responsive Design",
        ],
        careerOutcomes: [
          "Frontend Developer",
          "JavaScript Developer",
          "UI Developer",
          "Web Developer",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 10,
        skillsGained: [
          "ES6+ Features",
          "Event Handling",
          "API Integration",
          "Modern Build Tools",
        ],
      },
      {
        id: "full-stack-js",
        type: "full-stack-js",
        title: "Full-Stack JavaScript",
        description:
          "Build complete web applications using JavaScript on both frontend and backend with Node.js ecosystem.",
        focusAreas: [
          "Frontend JavaScript",
          "Node.js Backend",
          "Databases",
          "RESTful APIs",
          "Deployment",
        ],
        careerOutcomes: [
          "Full-Stack Developer",
          "JavaScript Engineer",
          "MERN/MEAN Stack Developer",
          "Web Application Developer",
        ],
        estimatedDuration: "5-6 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 12,
        skillsGained: [
          "Full-Stack Architecture",
          "Database Integration",
          "Authentication & Security",
          "API Development",
        ],
      },
      {
        id: "interview-prep-js",
        type: "interview-prep-js",
        title: "Interview Preparation",
        description:
          "Master JavaScript algorithms, data structures, and problem-solving for technical interviews at top companies.",
        focusAreas: [
          "Data Structures",
          "Algorithms",
          "Problem Solving",
          "System Design Basics",
          "Coding Patterns",
        ],
        careerOutcomes: [
          "Software Engineer",
          "Frontend Engineer",
          "JavaScript Developer",
          "Technical Lead",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 11,
        skillsGained: [
          "Algorithm Design",
          "Code Optimization",
          "System Thinking",
          "Interview Strategies",
        ],
      },
    ],
    Python: [
      {
        id: "web-development-python",
        type: "web-development-python",
        title: "Web Development with Python",
        description:
          "Build robust web applications using Python frameworks like Django and Flask. Perfect for backend development.",
        focusAreas: [
          "Python Fundamentals",
          "Django/Flask",
          "REST APIs",
          "Database Management",
          "Deployment",
        ],
        careerOutcomes: [
          "Backend Developer",
          "Python Developer",
          "Full-Stack Developer",
          "Web Application Engineer",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 10,
        skillsGained: [
          "Python Web Frameworks",
          "API Development",
          "Database Design",
          "Authentication",
        ],
      },
      {
        id: "data-science",
        type: "data-science",
        title: "Data Science & Analytics",
        description:
          "Master data analysis, visualization, and machine learning with Python. Work with real-world datasets.",
        focusAreas: [
          "Data Analysis",
          "NumPy & Pandas",
          "Data Visualization",
          "Machine Learning Basics",
          "Statistical Analysis",
        ],
        careerOutcomes: [
          "Data Analyst",
          "Data Scientist",
          "ML Engineer",
          "Business Intelligence Analyst",
        ],
        estimatedDuration: "5-6 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 12,
        skillsGained: [
          "Data Manipulation",
          "Statistical Analysis",
          "ML Algorithms",
          "Data Visualization",
        ],
      },
      {
        id: "automation-scripting",
        type: "automation-scripting",
        title: "Automation & Scripting",
        description:
          "Learn to automate tasks, build CLI tools, and create scripts to boost productivity and efficiency.",
        focusAreas: [
          "Python Scripting",
          "File Operations",
          "API Automation",
          "Web Scraping",
          "Task Scheduling",
        ],
        careerOutcomes: [
          "Automation Engineer",
          "DevOps Engineer",
          "QA Automation Engineer",
          "Systems Administrator",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Beginner to Intermediate",
        moduleCount: 8,
        skillsGained: [
          "Script Development",
          "Process Automation",
          "Web Scraping",
          "CLI Tools",
        ],
      },
    ],
    React: [
      {
        id: "react-fundamentals",
        type: "react-fundamentals",
        title: "React Fundamentals",
        description:
          "Master React from basics to advanced concepts. Build modern, interactive user interfaces with hooks and best practices.",
        focusAreas: [
          "React Components",
          "Hooks & State",
          "React Router",
          "API Integration",
          "Performance Optimization",
        ],
        careerOutcomes: [
          "React Developer",
          "Frontend Developer",
          "UI Engineer",
          "JavaScript Developer",
        ],
        estimatedDuration: "3-4 months",
        difficulty: "Intermediate",
        moduleCount: 9,
        skillsGained: [
          "React Ecosystem",
          "Component Design",
          "State Management",
          "Modern React Patterns",
        ],
      },
      {
        id: "react-advanced",
        type: "react-advanced",
        title: "Advanced React & Ecosystem",
        description:
          "Deep dive into advanced React patterns, state management, testing, and building production-ready applications.",
        focusAreas: [
          "Advanced Patterns",
          "Redux/Zustand",
          "Testing (Jest/RTL)",
          "TypeScript with React",
          "Performance & Optimization",
        ],
        careerOutcomes: [
          "Senior React Developer",
          "Frontend Architect",
          "Technical Lead",
          "Full-Stack Developer",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Advanced",
        moduleCount: 11,
        skillsGained: [
          "State Management",
          "Testing Strategies",
          "TypeScript Integration",
          "Architecture Design",
        ],
      },
      {
        id: "react-native",
        type: "react-native",
        title: "React Native Mobile Development",
        description:
          "Build cross-platform mobile applications using React Native. Create iOS and Android apps with one codebase.",
        focusAreas: [
          "React Native Basics",
          "Mobile UI/UX",
          "Native Modules",
          "App Deployment",
          "Performance",
        ],
        careerOutcomes: [
          "Mobile Developer",
          "React Native Developer",
          "Cross-Platform Developer",
          "App Developer",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 10,
        skillsGained: [
          "Mobile Development",
          "Native APIs",
          "App Store Deployment",
          "Mobile Optimization",
        ],
      },
    ],
    "Node.js": [
      {
        id: "backend-nodejs",
        type: "backend-nodejs",
        title: "Backend Development",
        description:
          "Build scalable server-side applications with Node.js. Master APIs, databases, and backend architecture.",
        focusAreas: [
          "Node.js Fundamentals",
          "Express.js",
          "REST APIs",
          "Database Integration",
          "Authentication",
        ],
        careerOutcomes: [
          "Backend Developer",
          "Node.js Developer",
          "API Developer",
          "Server-Side Engineer",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate",
        moduleCount: 10,
        skillsGained: [
          "API Development",
          "Database Design",
          "Security Best Practices",
          "Server Architecture",
        ],
      },
      {
        id: "microservices",
        type: "microservices",
        title: "Microservices Architecture",
        description:
          "Design and build scalable microservices with Node.js. Learn distributed systems and cloud deployment.",
        focusAreas: [
          "Microservices Design",
          "Message Queues",
          "Docker & Kubernetes",
          "Cloud Services",
          "Service Communication",
        ],
        careerOutcomes: [
          "Microservices Architect",
          "Backend Engineer",
          "DevOps Engineer",
          "Cloud Engineer",
        ],
        estimatedDuration: "5-6 months",
        difficulty: "Advanced",
        moduleCount: 12,
        skillsGained: [
          "Distributed Systems",
          "Containerization",
          "Cloud Deployment",
          "Service Orchestration",
        ],
      },
      {
        id: "realtime-apps",
        type: "realtime-apps",
        title: "Real-time Applications",
        description:
          "Build real-time, event-driven applications using WebSockets and Node.js. Perfect for chat, gaming, and live apps.",
        focusAreas: [
          "WebSockets",
          "Socket.io",
          "Event-Driven Architecture",
          "Real-time Databases",
          "Scaling",
        ],
        careerOutcomes: [
          "Real-time Developer",
          "Full-Stack Developer",
          "Backend Engineer",
          "Application Architect",
        ],
        estimatedDuration: "4-5 months",
        difficulty: "Intermediate to Advanced",
        moduleCount: 9,
        skillsGained: [
          "Real-time Communication",
          "Event Handling",
          "Scalability",
          "Performance Optimization",
        ],
      },
    ],
  };

  // Get goals for selected technology
  const technologyName = selectedSubject?.name || "JavaScript";
  const goals =
    goalsByTechnology[technologyName] || goalsByTechnology.JavaScript;

  // Load saved data on component mount
  useEffect(() => {
    // Read technology from the correct localStorage key
    const savedTechnology = localStorage.getItem(
      "Nayi Disha_selected_technology"
    );
    const savedGoal = localStorage.getItem("Nayi Disha_selected_goal");

    if (savedTechnology) {
      try {
        setSelectedSubject(JSON.parse(savedTechnology));
      } catch (e) {
        console.error("Error parsing saved technology:", e);
      }
    }

    if (savedGoal) {
      try {
        const goalData = JSON.parse(savedGoal);
        setSelectedGoal(goalData?.id);
      } catch (e) {
        console.error("Error parsing saved goal:", e);
      }
    }
  }, []);

  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId);

    // Save to localStorage
    const goalData = goals?.find((g) => g?.id === goalId);
    localStorage.setItem("Nayi Disha_selected_goal", JSON.stringify(goalData));

    // Save onboarding progress
    const onboardingData = JSON.parse(
      localStorage.getItem("Nayi Disha_onboarding") || "{}"
    );
    onboardingData.goal = goalData;
    onboardingData.currentStep = 3;
    onboardingData.completedSteps = ["subject", "goal"];
    localStorage.setItem(
      "Nayi Disha_onboarding",
      JSON.stringify(onboardingData)
    );
  };

  const handleContinue = async () => {
    if (!selectedGoal) return;

    setIsLoading(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    navigate("/skill-level-selection");
  };

  const handleBack = () => {
    navigate("/subject-selection");
  };

  const handleCompareGoals = () => {
    setShowComparison(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed  bg-[linear-gradient(180deg,rgba(74,26,125,1)_20%,rgba(0,0,0,1)_100%)]"></div>
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          {/* Step Indicator */}
          <OnboardingStepIndicator
            currentStep={2}
            totalSteps={4}
            onBack={handleBack}
            className="mb-12"
          />

          {/* Header */}
          <GoalSelectionHeader
            selectedSubject={selectedSubject?.name}
            onCompareGoals={handleCompareGoals}
            className="mb-12"
          />

          {/* Goal Cards */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {goals?.map((goal) => (
                <GoalCard
                  key={goal?.id}
                  goal={goal}
                  isSelected={selectedGoal === goal?.id}
                  onSelect={() => handleGoalSelect(goal?.id)}
                  className="animate-fade-in"
                />
              ))}
            </div>
          </div>

          {/* Selected Goal Summary */}
          {selectedGoal && (
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
              <div className="glass-card border border-primary/30 rounded-lg p-6 bg-primary/5">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">✓</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {goals?.find((g) => g?.id === selectedGoal)?.title}{" "}
                      Selected
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your personalized roadmap will include{" "}
                      {goals?.find((g) => g?.id === selectedGoal)?.moduleCount}{" "}
                      modules designed to achieve your career goals in{" "}
                      {
                        goals?.find((g) => g?.id === selectedGoal)
                          ?.estimatedDuration
                      }
                      .
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {goals
                        ?.find((g) => g?.id === selectedGoal)
                        ?.skillsGained?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md border border-primary/30"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between max-w-md mx-auto">
            <Button
              variant="outline"
              onClick={handleBack}
              iconName="ArrowLeft"
              iconPosition="left"
              className="hover:bg-white/5"
            >
              Back
            </Button>

            <Button
              variant="default"
              onClick={handleContinue}
              disabled={!selectedGoal}
              loading={isLoading}
              iconName="ArrowRight"
              iconPosition="right"
              className="floating-action"
            >
              Continue
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Don't worry - you can change your goal anytime from your dashboard
            </p>
          </div>
        </div>
      </div>
      {/* Comparison Modal */}
      <GoalComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        goals={goals}
      />
    </div>
  );
};

export default GoalSelection;
