import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const OnboardingStepIndicator = ({
  currentStep = 1,
  totalSteps = 4,
  steps = [],
  canGoBack = true,
  onBack = null,
  className = "",
}) => {
  const navigate = useNavigate();

  const defaultSteps = [
    {
      id: 1,
      title: "Welcome",
      description: "Get started with Nayi Disha",
      path: "/landing-page",
    },
    {
      id: 2,
      title: "Subject",
      description: "Choose your learning focus",
      path: "/subject-selection",
    },
    {
      id: 3,
      title: "Goals",
      description: "Define your objectives",
      path: "/goal-selection",
    },
    {
      id: 4,
      title: "Skill Level",
      description: "Assess your current level",
      path: "/skill-level-selection",
    },
  ];

  const stepData = steps?.length > 0 ? steps : defaultSteps;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (currentStep > 1) {
      const previousStep = stepData?.find(
        (step) => step?.id === currentStep - 1
      );
      if (previousStep) {
        navigate(previousStep?.path);
      }
    }
  };

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  const getStepIcon = (stepId, status) => {
    if (status === "completed") return "Check";
    if (status === "current") return "Circle";
    return "Circle";
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Back Button */}
      {canGoBack && currentStep > 1 && (
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            iconName="ArrowLeft"
            iconPosition="left"
            iconSize={16}
            className="hover:bg-white/5 text-muted-foreground hover:text-primary"
          >
            Back
          </Button>
        </div>
      )}
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4 max-w-2xl w-full">
          {stepData?.map((step, index) => {
            const status = getStepStatus(step?.id);
            const isLast = index === stepData?.length - 1;

            return (
              <div key={step?.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${
                        status === "completed"
                          ? "bg-success text-success-foreground neon-glow"
                          : status === "current"
                          ? "bg-primary text-primary-foreground neon-glow "
                          : "bg-muted text-muted-foreground"
                      }
                    `}
                  >
                    {status === "completed" ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <span className="text-sm font-semibold">{step?.id}</span>
                    )}
                  </div>

                  {/* Step Label - Hidden on mobile */}
                  <div className="hidden sm:block mt-2 text-center">
                    <div
                      className={`
                        text-sm font-medium transition-colors
                        ${
                          status === "current"
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                      `}
                    >
                      {step?.title}
                    </div>
                    <div className=" tracking-tighter text-muted-foreground mt-1">
                      <p className="text-xs w-auto whitespace-nowrap">
                        {step?.description}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div
                      className={`
                        h-0.5 transition-all duration-500
                        ${
                          status === "completed"
                            ? "bg-gradient-to-r from-success to-primary"
                            : "bg-muted"
                        }
                      `}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile Step Info */}
      <div className="sm:hidden text-center mb-6">
        <div className="glass-card border border-purple-500/20 rounded-lg p-4">
          <div className="text-lg font-semibold text-primary mb-1">
            {stepData?.find((step) => step?.id === currentStep)?.title}
          </div>
          <div className="text-sm text-muted-foreground">
            {stepData?.find((step) => step?.id === currentStep)?.description}
          </div>
          <div className="text-xs text-muted-foreground mt-2 font-mono">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-mono text-primary">
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStepIndicator;
