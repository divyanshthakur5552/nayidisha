import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const GoalComparisonModal = ({
  isOpen,
  onClose,
  goals = [],
  className = "",
}) => {
  if (!isOpen) return null;

  const comparisonData = [
    {
      category: "Primary Focus",
      webDev: "Frontend & UI/UX",
      dataStructures: "Algorithms & Problem Solving",
      fullStack: "End-to-End Development",
    },
    {
      category: "Key Technologies",
      webDev: "HTML, CSS, JavaScript, React",
      dataStructures: "Python, Java, C++",
      fullStack: "Frontend + Backend + Database",
    },
    {
      category: "Career Path",
      webDev: "Frontend Developer, UI Engineer",
      dataStructures: "Software Engineer, Tech Lead",
      fullStack: "Full-Stack Developer, Architect",
    },
    {
      category: "Learning Duration",
      webDev: "3-4 months",
      dataStructures: "4-6 months",
      fullStack: "6-8 months",
    },
    {
      category: "Difficulty Level",
      webDev: "Beginner to Intermediate",
      dataStructures: "Intermediate to Advanced",
      fullStack: "Intermediate to Advanced",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="backdrop-blur-mxl bg[#0a0a0a]/500 border border-purple-500/20 rounded-lg w-full max-w-4xl max-h-[90vh] ">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Compare Learning Goals
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Understand the differences between each learning path
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="hover:bg-white/5"
          />
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    Comparison Factor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon name="Globe" size={16} className="text-blue-500" />
                      <span>Web Development</span>
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="Database"
                        size={16}
                        className="text-green-500"
                      />
                      <span>Data Structures & Algorithms</span>
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name="Layers"
                        size={16}
                        className="text-purple-500"
                      />
                      <span>Full-Stack Development</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData?.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-purple-500/10 hover:bg-white/2"
                  >
                    <td className="py-4 px-4 text-sm font-medium text-foreground">
                      {row?.category}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {row?.webDev}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {row?.dataStructures}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {row?.fullStack}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-purple-500/20 bg-white/2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Still unsure? You can always change your goal later in your
              dashboard.
            </p>
            <Button
              variant="default"
              onClick={onClose}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Got it
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalComparisonModal;
