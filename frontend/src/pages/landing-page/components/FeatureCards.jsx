import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: "Brain",
      title: "AI-Generated Roadmaps",
      description:
        "Personalized learning paths created by advanced AI algorithms tailored to your goals and skill level.",
    },
    {
      id: 2,
      icon: "Target",
      title: "Adaptive Quiz System",
      description:
        "Intelligent quizzes that adjust difficulty in real-time based on your performance.",
    },
    {
      id: 3,
      icon: "TrendingUp",
      title: "Progress Analytics",
      description:
        "Comprehensive tracking and visualization of your learning journey with detailed insights.",
    },
    {
      id: 4,
      icon: "Lightbulb",
      title: "Smart Recommendations",
      description:
        "AI-powered suggestions for resources and next steps based on your learning patterns.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-gradient-to-b from-[#000] to-[#09090b]">
      <div className="max-w-6xl mx-auto ">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">Nayi Disha</span>?
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Experience personalized education with AI technology designed to
            accelerate your learning.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features?.map((feature) => (
            <motion.div
              key={feature?.id}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-card border rounded-lg p-6 h-full hover:border-primary/50 transition-colors">
                {/* Icon */}
                <div className="mb-4 ">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon
                      name={feature?.icon}
                      size={24}
                      className="text-primary "
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature?.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
