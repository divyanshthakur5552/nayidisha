import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useAuth } from "../../contexts/AuthContext";
import { userService } from "../../services/userService";

export default function ProfileModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // --- Profile states ---
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);

  // --- Skill Data (calculated from progress) ---
  const [skills, setSkills] = useState([]);

  // --- Load user data from database ---
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Load user profile and progress
        const userProgress = await userService.getProgress(user.uid);
        
        // Set user name and email
        setName(user.displayName || user.email.split('@')[0]);
        setUsername(`@${user.email.split('@')[0]}`);
        
        if (user.photoURL) {
          setCroppedImage(user.photoURL);
        }
        
        if (userProgress) {
          setProgress(userProgress);
          
          // Calculate skills from completed modules and scores
          const calculatedSkills = calculateSkillsFromProgress(userProgress);
          setSkills(calculatedSkills);
        } else {
          // No progress yet - show empty state
          setSkills([]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to basic user info
        setName(user.displayName || user.email.split('@')[0]);
        setUsername(`@${user.email.split('@')[0]}`);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  // Calculate skills based on completed modules and scores
  const calculateSkillsFromProgress = (userProgress) => {
    if (!userProgress || !userProgress.quiz_scores) {
      return [];
    }

    const scores = userProgress.quiz_scores || {};
    const completedModules = userProgress.completed_modules || [];
    const roadmap = userProgress.roadmap;
    
    if (!roadmap || !roadmap.modules) {
      return [];
    }

    // Group modules by topic/skill and calculate average scores
    const skillMap = {};
    
    roadmap.modules.forEach(module => {
      const moduleId = module.id;
      const score = scores[moduleId] || 0;
      const topic = module.topic || module.title;
      
      if (!skillMap[topic]) {
        skillMap[topic] = { total: 0, count: 0 };
      }
      
      if (completedModules.includes(moduleId)) {
        skillMap[topic].total += score;
        skillMap[topic].count += 1;
      }
    });

    // Convert to skills array
    return Object.entries(skillMap)
      .filter(([_, data]) => data.count > 0)
      .map(([name, data]) => ({
        name,
        value: Math.round(data.total / data.count)
      }))
      .slice(0, 6); // Top 6 skills
  };

  // --- Default avatar fallback ---
  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result);
        setShowCropper(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

  const handleCropSave = async () => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImg);
      setShowCropper(false);
      setImage(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-black/70 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
            >
              ✕
            </button>

            {/* Profile Picture */}
            <div className="relative mb-6 mx-auto">
              <img
                src={croppedImage || defaultAvatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-800"
              />
              <label
                htmlFor="upload"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 cursor-pointer hover:bg-indigo-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
            </div>

            {/* Editable Name and Username */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-2xl font-bold text-gray-100 bg-transparent text-center mb-1 outline-none border-b border-gray-700 focus:border-indigo-500 transition"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-gray-400 text-sm bg-transparent text-center outline-none border-b border-gray-700 focus:border-indigo-500 transition mb-3"
            />
            {/* Overall Progress */}
            {progress && (
              <div className="bg-indigo-600/10 border border-indigo-600/20 px-4 py-2 rounded-full text-sm font-semibold mb-8 inline-block">
                <span className="text-indigo-400">Overall Progress: </span>
                <span className="text-white">{Math.round(progress.overall_progress || 0)}%</span>
                <span className="text-gray-400 ml-2">• {progress.completed_modules?.length || 0} modules completed</span>
              </div>
            )}

            {/* Skills */}
            <h2 className="text-xl font-semibold text-gray-100 mb-6">
              {skills.length > 0 ? 'Skills' : (loading ? 'Loading...' : 'No Skills Yet')}
            </h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : skills.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 mb-2">
                      <CircularProgressbar
                        value={skill.value}
                        text={`${skill.value}%`}
                        styles={buildStyles({
                          textSize: "24px",
                          pathColor: "#6366f1",
                          textColor: "#e5e7eb",
                          trailColor: "#1f2937",
                        })}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{skill.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm mb-4">
                  Complete some modules to see your skills here!
                </p>
                <button
                  onClick={() => navigate('/ai-generated-roadmap')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                >
                  Start Learning
                </button>
              </div>
            )}
          </motion.div>

          {/* Crop Modal */}
          {showCropper && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Crop Image
                </h3>
                <div className="relative h-64 bg-gray-100 rounded-lg mb-4">
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-600 mb-2 block">
                    Zoom
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowCropper(false);
                      setImage(null);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCropSave}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
