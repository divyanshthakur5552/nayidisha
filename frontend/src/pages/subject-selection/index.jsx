import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import OnboardingStepIndicator from "../../components/ui/OnboardingStepIndicator";
import TechnologyGrid from "./components/TechnologyGrid";
import SelectionSummary from "./components/SelectionSummary";

const SubjectSelection = () => {
  const [selectedTechnology, setSelectedTechnology] = useState(null);
  const navigate = useNavigate();

  // Mock technology data
  const technologies = [
    {
      id: 1,
      name: "Python",
      description:
        "Versatile programming language perfect for beginners and professionals alike. Build web applications, data science projects, and automation tools.",
      useCases: [
        "Web Development",
        "Data Science",
        "Machine Learning",
        "Automation",
        "API Development",
      ],
      learningOutcomes: [
        "Master Python syntax and core concepts",
        "Build web applications with Django/Flask",
        "Work with data using pandas and NumPy",
        "Create automation scripts and tools",
      ],
      estimatedModules: 10,
      estimatedHours: 25,
      difficulty: "Beginner Friendly",
    },
    {
      id: 2,
      name: "JavaScript",
      description:
        "The language of the web. Create interactive websites, mobile apps, and server-side applications with the most popular programming language.",
      useCases: [
        "Frontend Development",
        "Backend Development",
        "Mobile Apps",
        "Desktop Apps",
        "Game Development",
      ],
      learningOutcomes: [
        "Master modern JavaScript ES6+ features",
        "Build interactive web applications",
        "Understand asynchronous programming",
        "Work with APIs and databases",
        "Work with APIs and databases",
      ],
      estimatedModules: 12,
      estimatedHours: 30,
      difficulty: "Essential Skill",
    },
    {
      id: 3,
      name: "React",
      description:
        "Build modern, fast, and scalable user interfaces. The most popular frontend library used by companies like Facebook, Netflix, and Airbnb.",
      useCases: [
        "Single Page Applications",
        "Mobile Apps",
        "Desktop Apps",
        "Progressive Web Apps",
        "Component Libraries",
      ],
      learningOutcomes: [
        "Master React components and hooks",
        "Build responsive user interfaces",
        "Manage application state effectively",
        "Deploy production-ready applications",
        "Deploy production-ready applications",
      ],
      estimatedModules: 8,
      estimatedHours: 20,
      difficulty: "Intermediate",
    },
    {
      id: 4,
      name: "Node.js",
      description:
        "Server-side JavaScript runtime for building scalable network applications. Create APIs, microservices, and full-stack applications.",
      useCases: [
        "REST APIs",
        "Microservices",
        "Real-time Applications",
        "CLI Tools",
        "Backend Services",
      ],
      learningOutcomes: [
        "Build RESTful APIs and microservices",
        "Work with databases and authentication",
        "Handle real-time communications",
        "Deploy scalable backend systems",
      ],
      estimatedModules: 9,
      estimatedHours: 22,
      difficulty: "Backend Focus",
    },
  ];

  // Load saved selection from localStorage
  useEffect(() => {
    const savedSelection = localStorage.getItem(
      "Nayi Disha_selected_technology"
    );
    if (savedSelection) {
      try {
        const parsed = JSON.parse(savedSelection);
        const technology = technologies?.find((t) => t?.id === parsed?.id);
        if (technology) {
          setSelectedTechnology(technology);
        }
      } catch (error) {
        console.error("Error loading saved technology selection:", error);
      }
    }
  }, []);

  // Save selection to localStorage
  const handleTechnologySelect = (technology) => {
    setSelectedTechnology(technology);
    localStorage.setItem(
      "Nayi Disha_selected_technology",
      JSON.stringify(technology)
    );
  };

  // Reset selection
  const handleReset = () => {
    setSelectedTechnology(null);
    localStorage.removeItem("Nayi Disha_selected_technology");
  };

  // Continue to next step
  const handleContinue = () => {
    if (selectedTechnology) {
      navigate("/goal-selection");
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate("/landing-page");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_bottom,_#000000_0%,_rgba(74,26,125,0.5)_0.1%,_#000000_70%)] ">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Step Indicator */}
          <OnboardingStepIndicator
            currentStep={2}
            totalSteps={4}
            onBack={handleBack}
            className="mb-12"
          />

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Technology Selection Grid */}
            <TechnologyGrid
              technologies={technologies}
              selectedTechnology={selectedTechnology}
              onTechnologySelect={handleTechnologySelect}
              className="mb-12"
            />

            {/* Selection Summary */}
            {selectedTechnology && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="max-w-md mx-auto"
              >
                <SelectionSummary
                  selectedTechnology={selectedTechnology}
                  onContinue={handleContinue}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Background Gradient */}
          <div className="fixed inset-0 -z-10 gradient-bg opacity-30"></div>
        </div>
      </main>
    </div>
  );
};

export default SubjectSelection;
