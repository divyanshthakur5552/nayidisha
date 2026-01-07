import { supabase } from '../config/supabase';

export const userService = {
  /**
   * Sync Firebase user to Supabase users table
   */
  async syncUser(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({
          uid: userData.uid,
          email: userData.email,
          display_name: userData.displayName,
          photo_url: userData.photoURL,
          provider: userData.provider,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'uid'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error syncing user:', error);
      throw error;
    }
  },

  /**
   * Get user profile by Firebase UID
   */
  async getUserProfile(uid) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', uid)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  /**
   * Save user's learning progress
   */
  async saveProgress(uid, progressData) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_uid: uid,
          goal: progressData.goal,
          skill_level: progressData.skillLevel,
          selected_subjects: progressData.selectedSubjects,
          roadmap: progressData.roadmap,
          current_module: progressData.currentModule,
          completed_modules: progressData.completedModules,
          quiz_scores: progressData.quizScores,
          overall_progress: progressData.overallProgress,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_uid'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  },

  /**
   * Save roadmap when generated (one-time, prevents regeneration)
   */
  async saveRoadmap(uid, roadmapData, selections) {
    try {
      // Initialize quiz_scores with all modules set to 0
      const initialScores = {};
      if (roadmapData.modules && Array.isArray(roadmapData.modules)) {
        roadmapData.modules.forEach(module => {
          initialScores[module.id] = 0;
        });
      }

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_uid: uid,
          goal: selections.goal,
          skill_level: selections.skillLevel,
          selected_subjects: selections.selectedSubjects || [selections.subject],
          roadmap: roadmapData,
          completed_modules: [],
          quiz_scores: initialScores,
          overall_progress: 0,
          roadmap_generated_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_uid'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving roadmap:', error);
      throw error;
    }
  },

  /**
   * Get user's learning progress
   */
  async getProgress(uid) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_uid', uid)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore "not found" error
        throw error;
      }
      return data || null;
    } catch (error) {
      console.error('Error getting progress:', error);
      throw error;
    }
  },

  /**
   * Update specific module progress (called when module quiz is fully completed)
   */
  async updateModuleProgress(uid, moduleId, moduleData) {
    try {
      // First get current progress
      const currentProgress = await this.getProgress(uid);
      
      if (!currentProgress) {
        throw new Error('User progress not found. Roadmap must be generated first.');
      }

      const completedModules = currentProgress?.completed_modules || [];
      if (!completedModules.includes(moduleId)) {
        completedModules.push(moduleId);
      }

      const quizScores = currentProgress?.quiz_scores || {};
      if (moduleData.quizScore !== undefined) {
        quizScores[moduleId] = moduleData.quizScore;
      }

      // Calculate overall progress
      const totalModules = currentProgress.roadmap?.totalModules || currentProgress.roadmap?.modules?.length || 1;
      const overallProgress = (completedModules.length / totalModules) * 100;

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_uid: uid,
          current_module: moduleData.currentModule || moduleId,
          completed_modules: completedModules,
          quiz_scores: quizScores,
          overall_progress: overallProgress,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_uid'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating module progress:', error);
      throw error;
    }
  },

  /**
   * Delete user data
   */
  async deleteUserData(uid) {
    try {
      // Delete progress first (foreign key constraint)
      await supabase
        .from('user_progress')
        .delete()
        .eq('user_uid', uid);

      // Delete user
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('uid', uid);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting user data:', error);
      throw error;
    }
  }
};
