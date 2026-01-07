import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CallToActionSection = ({ onStartLearning }) => {
  const steps = [
    {
      id: 1,
      title: "Choose Your Path",
      description: "Select your preferred technology and learning goals",
      icon: "Target",
      duration: "30 seconds",
    },
    {
      id: 2,
      title: "AI Assessment",
      description: "Quick skill evaluation to personalize your journey",
      icon: "Brain",
      duration: "2 minutes",
    },
    {
      id: 3,
      title: "Start Learning",
      description: "Begin with your custom AI-generated roadmap",
      icon: "Rocket",
      duration: "Immediate",
    },
  ];

  const benefits = [
    "Personalized AI-generated learning roadmap",
    "Adaptive quizzes that match your skill level",
    "Real-time progress tracking and analytics",
    "Career readiness scoring and recommendations",
    "Self-paced learning with flexible scheduling",
    "Comprehensive module completion reports",
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            Ready to Transform Your <span className="text-primary">Coding Skills</span>?
          </h2>

          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with your AI-powered development journey.
          </p>

          {/* Primary CTA */}
          <Button
            variant="default"
            size="lg"
            onClick={onStartLearning}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={18}
          >
            Start Learning
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default CallToActionSection;
