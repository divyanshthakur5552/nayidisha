import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import OnboardingStepIndicator from "../../components/ui/OnboardingStepIndicator";
import SkillLevelCard from "./components/SkillLevelCard";
import SkillLevelDescription from "./components/SkillLevelDescription";
import RoadmapGenerationModal from "./components/RoadmapGenerationModal";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const SkillLevelSelection = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userSelections, setUserSelections] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Load previous selections from localStorage or location state
  useEffect(() => {
    const locationState = location?.state || {};

    // Read from the correct localStorage keys used by previous pages
    const savedTechnology = localStorage.getItem(
      "Nayi Disha_selected_technology"
    );
    const savedGoal = localStorage.getItem("Nayi Disha_selected_goal");
    const savedSelections = JSON.parse(
      localStorage.getItem("Nayi Disha_selections") || "{}"
    );

    let subject = "JavaScript"; // default fallback
    let goal = "Full Stack Development"; // default fallback

    // Parse saved technology (subject)
    if (savedTechnology) {
      try {
        const tech = JSON.parse(savedTechnology);
        subject = tech?.name || tech;
      } catch (e) {
        console.error("Error parsing saved technology:", e);
      }
    }

    // Parse saved goal
    if (savedGoal) {
      try {
        const goalData = JSON.parse(savedGoal);
        goal = goalData?.title || goalData;
      } catch (e) {
        console.error("Error parsing saved goal:", e);
      }
    }

    const selections = {
      subject: locationState?.subject || subject,
      goal: locationState?.goal || goal,
      skillLevel: savedSelections?.skillLevel || null,
    };

    setUserSelections(selections);
    if (selections?.skillLevel) {
      setSelectedLevel(selections?.skillLevel);
    }
  }, [location?.state]);

  const skillLevels = ["basic", "intermediate", "advanced"];

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);

    // Save selection to localStorage
    const updatedSelections = {
      ...userSelections,
      skillLevel: level,
    };
    setUserSelections(updatedSelections);
    localStorage.setItem(
      "Nayi Disha_selections",
      JSON.stringify(updatedSelections)
    );
  };

  const handleGenerateRoadmap = () => {
    if (!selectedLevel) return;

    setIsLoading(true);
    setShowModal(true);
  };

  const handleRoadmapComplete = (roadmapData) => {
    setShowModal(false);
    setIsLoading(false);

    // Save roadmap to localStorage as backup
    if (roadmapData) {
      localStorage.setItem("generatedRoadmap", JSON.stringify(roadmapData));
    }

    // Navigate to roadmap with all selections and data
    navigate("/ai-generated-roadmap", {
      state: {
        ...userSelections,
        skillLevel: selectedLevel,
        roadmapData,
        isNewRoadmap: true,
      },
    });
  };

  const handleBack = () => {
    navigate("/goal-selection", {
      state: {
        subject: userSelections?.subject,
        preserveSelection: true,
      },
    });
  };

  return (
    <>
      <Helmet>
        <title>Choose Your Skill Level - Nayi Disha</title>
        <meta
          name="description"
          content="Select your current skill level to personalize your learning experience with AI-powered adaptive content."
        />
      </Helmet>
      <div className="min-h-screen bg-[#000]">
        <Header />

        <main className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            {/* Step Indicator */}
            <OnboardingStepIndicator
              currentStep={4}
              totalSteps={4}
              canGoBack={true}
              onBack={handleBack}
              className="mb-12"
            />

            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#171717] flex items-center justify-center neon-glow">
                <Icon name="BarChart3" size={40} className="text-white" />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                What's Your <span className="text-primary">Current </span>
                Level?
              </h1>

              <p className="text-xl text-muted-foreground max-w-4xl tracking-tighter mx-auto mb-6">
                Help us understand your current expertise so we can create the
                perfect learning path.
                <br />
                Our AI will adjust question difficulty, module complexity, and
                pacing based on your selection.
              </p>

              {/* Current Selections Summary */}
              <div className="inline-flex items-center space-x-4 glass-surface border border-purple-500/10 rounded-full px-6 py-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Code2" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Subject:
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {userSelections?.subject}
                  </span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} className="text-secondary" />
                  <span className="text-sm text-muted-foreground">Goal:</span>
                  <span className="text-sm font-medium text-secondary">
                    {userSelections?.goal}
                  </span>
                </div>
              </div>
            </div>

            {/* Skill Level Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {skillLevels?.map((level) => (
                <SkillLevelCard
                  key={level}
                  level={level}
                  technology={userSelections?.subject}
                  isSelected={selectedLevel === level}
                  onSelect={() => handleLevelSelect(level)}
                  className="h-full"
                />
              ))}
            </div>

            {/* Adaptive System Description */}
            <SkillLevelDescription className="mb-12" />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleBack}
                iconName="ArrowLeft"
                iconPosition="left"
                className="hover:bg-white/5"
              >
                Back to Goals
              </Button>

              <Button
                variant="default"
                size="lg"
                onClick={handleGenerateRoadmap}
                disabled={!selectedLevel || isLoading}
                loading={isLoading}
                iconName="Sparkles"
                iconPosition="right"
                className="floating-action min-w-[200px]"
              >
                {isLoading ? "Generating..." : "Generate My Roadmap"}
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Don't worry if you're not sure about your level. Our adaptive
                system will adjust based on your performance, and you can always
                change your skill level later in your dashboard settings.
              </p>
            </div>
          </div>
        </main>

        {/* Roadmap Generation Modal */}
        <RoadmapGenerationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          userSelections={{ ...userSelections, skillLevel: selectedLevel }}
          onComplete={handleRoadmapComplete}
        />
      </div>
    </>
  );
};

export default SkillLevelSelection;
