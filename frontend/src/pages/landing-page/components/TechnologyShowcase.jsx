import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const TechnologyShowcase = () => {
  const technologies = [
    {
      id: 1,
      name: "JavaScript",
      description:
        "Master modern JavaScript ES6+ features, async programming, and DOM manipulation",
      icon: "Code2",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/20",
      borderColor: "border-yellow-400/30",
      features: ["ES6+ Syntax", "Async/Await", "DOM APIs", "Event Handling"],
    },
    {
      id: 2,
      name: "React",
      description:
        "Build dynamic user interfaces with hooks, state management, and component architecture",
      icon: "Atom",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/20",
      borderColor: "border-cyan-400/30",
      features: [
        "Hooks & State",
        "Component Design",
        "Context API",
        "Performance",
      ],
    },
    {
      id: 3,
      name: "Node.js",
      description:
        "Develop scalable backend applications with Express, APIs, and database integration",
      icon: "Server",
      color: "text-green-400",
      bgColor: "bg-green-400/20",
      borderColor: "border-green-400/30",
      features: ["Express.js", "REST APIs", "Database ORM", "Authentication"],
    },
    {
      id: 4,
      name: "Python",
      description:
        "Learn web development with Django/Flask, data structures, and algorithm optimization",
      icon: "FileCode",
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
      borderColor: "border-blue-400/30",
      features: [
        "Django/Flask",
        "Data Structures",
        "Algorithms",
        "Web Scraping",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Master In-Demand <span className="text-primary">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from popular web development technologies and get
            personalized learning paths.
          </p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies?.map((tech, index) => (
            <motion.div
              key={tech?.id}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-card border rounded-lg p-6 h-full hover:border-primary/50 transition-colors">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon
                      name={tech?.icon}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {tech?.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tech?.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">4</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">
              Learning Modules
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-2">
              AI-Powered
            </div>
            <div className="text-sm text-muted-foreground">Personalization</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-2">
              Real-time
            </div>
            <div className="text-sm text-muted-foreground">Adaptation</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
