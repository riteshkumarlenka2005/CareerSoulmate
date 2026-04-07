import CareerSkill from '../models/CareerSkill.js';
import UserProfile from '../models/UserProfile.js';
import SkillGapReport from '../models/SkillGapReport.js';
import Career from '../models/Career.js';
import { NotFoundError } from '../utils/ApiError.js';

class SkillGapService {
  /**
   * Analyze skill gap between user and target career
   */
  static async analyze(userId, careerId) {
    const [profile, career, careerSkills] = await Promise.all([
      UserProfile.findOne({ user: userId }),
      Career.findById(careerId),
      CareerSkill.find({ career: careerId }).populate('skill', 'name category description difficulty_level'),
    ]);

    if (!career) throw new NotFoundError('Career not found');
    if (!profile) throw new NotFoundError('Profile not found. Please complete your profile first.');

    const userSkills = new Set((profile.known_skills || []).map(s => s.toLowerCase()));
    const userRatings = profile.known_skills_ratings instanceof Map
      ? Object.fromEntries(profile.known_skills_ratings)
      : profile.known_skills_ratings || {};

    const matched_skills = [];
    const missing_skills = [];
    let matchedCount = 0;

    const levelValues = { beginner: 1, intermediate: 2, advanced: 3 };

    for (const cs of careerSkills) {
      if (!cs.skill) continue;
      const skillName = cs.skill.name;
      const skillNameLower = skillName.toLowerCase();
      const requiredLevel = cs.minimum_required_level || 'beginner';
      const requiredLevelVal = levelValues[requiredLevel] || 1;

      // Check if user has this skill
      if (userSkills.has(skillNameLower)) {
        const userRating = userRatings[skillNameLower] || userRatings[skillName] || 3;
        // Map 1-10 rating to beginner/intermediate/advanced
        const userLevelVal = userRating >= 7 ? 3 : userRating >= 4 ? 2 : 1;
        const userLevel = userRating >= 7 ? 'advanced' : userRating >= 4 ? 'intermediate' : 'beginner';

        let status = 'matched';
        if (userLevelVal < requiredLevelVal) {
          status = userLevelVal === requiredLevelVal - 1 ? 'partial' : 'weak';
        }

        matched_skills.push({
          skill: cs.skill._id,
          skill_name: skillName,
          user_level: userLevel,
          required_level: requiredLevel,
          status,
        });

        if (status === 'matched') matchedCount++;
        else matchedCount += 0.5;
      } else {
        missing_skills.push({
          skill: cs.skill._id,
          skill_name: skillName,
          required_level: requiredLevel,
          importance: cs.importance_level,
          priority: cs.importance_level === 'essential' ? 1 : cs.importance_level === 'important' ? 2 : 3,
        });
      }
    }

    // Sort missing skills by priority
    missing_skills.sort((a, b) => a.priority - b.priority);

    // Calculate gap score (0 = no gap, 100 = maximum gap)
    const totalSkills = careerSkills.length || 1;
    const gapScore = Math.round(100 - (matchedCount / totalSkills) * 100);

    // Determine overall readiness
    let overall_readiness = 'significant_gap';
    if (gapScore <= 15) overall_readiness = 'ready';
    else if (gapScore <= 35) overall_readiness = 'almost_ready';
    else if (gapScore <= 60) overall_readiness = 'needs_work';

    // Generate recommended actions
    const recommended_actions = missing_skills.slice(0, 5).map((ms, i) => ({
      action: `Learn ${ms.skill_name} (${ms.required_level} level)`,
      priority: i + 1,
      estimated_time: ms.required_level === 'beginner' ? '2-4 weeks'
        : ms.required_level === 'intermediate' ? '1-3 months'
        : '3-6 months',
    }));

    // Save report
    const report = await SkillGapReport.create({
      user: userId,
      career: careerId,
      matched_skills,
      missing_skills,
      gap_score: gapScore,
      recommended_actions,
      overall_readiness,
    });

    return {
      report,
      career: { title: career.title, slug: career.slug, category: career.category },
    };
  }

  /**
   * Get user's skill gap history
   */
  static async getHistory(userId) {
    return SkillGapReport.find({ user: userId })
      .populate('career', 'title slug category')
      .sort({ createdAt: -1 })
      .limit(20);
  }
}

export default SkillGapService;
