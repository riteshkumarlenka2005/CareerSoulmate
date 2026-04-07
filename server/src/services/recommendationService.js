import Career from '../models/Career.js';
import CareerSkill from '../models/CareerSkill.js';
import Skill from '../models/Skill.js';
import UserProfile from '../models/UserProfile.js';
import UserAssessmentAttempt from '../models/UserAssessmentAttempt.js';
import Recommendation from '../models/Recommendation.js';
import Notification from '../models/Notification.js';
import crypto from 'crypto';

/**
 * Weighted recommendation scoring algorithm:
 *   finalScore = interestMatch*0.35 + skillMatch*0.25 + educationMatch*0.15 + preferenceMatch*0.15 + stageFit*0.10
 */
class RecommendationService {
  static WEIGHTS = {
    interest: 0.35,
    skill: 0.25,
    education: 0.15,
    preference: 0.15,
    stage: 0.10,
  };

  /**
   * Generate recommendations for a user
   */
  static async generate(userId) {
    // 1. Gather user data
    const [profile, attempts, careers, allCareerSkills] = await Promise.all([
      UserProfile.findOne({ user: userId }),
      UserAssessmentAttempt.find({ user: userId, status: 'completed' }).sort({ createdAt: -1 }),
      Career.find({ published: true }),
      CareerSkill.find({}).populate('skill', 'name category'),
    ]);

    if (!profile) return [];
    if (careers.length === 0) return [];

    // Build aggregated assessment scores
    const categoryScores = {};
    for (const attempt of attempts) {
      if (attempt.category_scores) {
        const scores = attempt.category_scores instanceof Map
          ? Object.fromEntries(attempt.category_scores)
          : attempt.category_scores;
        for (const [cat, score] of Object.entries(scores)) {
          // Keep the highest score per category across attempts
          if (!categoryScores[cat] || score > categoryScores[cat]) {
            categoryScores[cat] = score;
          }
        }
      }
    }

    // Map career skills by career id
    const careerSkillMap = {};
    for (const cs of allCareerSkills) {
      if (!careerSkillMap[cs.career.toString()]) careerSkillMap[cs.career.toString()] = [];
      careerSkillMap[cs.career.toString()].push(cs);
    }

    // User skills (normalized to lowercase for matching)
    const userSkills = new Set((profile.known_skills || []).map(s => s.toLowerCase()));
    const userSkillRatings = profile.known_skills_ratings instanceof Map
      ? Object.fromEntries(profile.known_skills_ratings)
      : profile.known_skills_ratings || {};

    // 2. Score each career
    const batchId = crypto.randomUUID();
    const scoredCareers = [];

    for (const career of careers) {
      const cid = career._id.toString();
      const interestScore = this._calculateInterestMatch(categoryScores, career);
      const skillScore = this._calculateSkillMatch(userSkills, userSkillRatings, careerSkillMap[cid] || []);
      const educationScore = this._calculateEducationMatch(profile, career);
      const preferenceScore = this._calculatePreferenceMatch(profile, career);
      const stageScore = this._calculateStageFit(profile, career);

      const finalScore = Math.round(
        interestScore * this.WEIGHTS.interest +
        skillScore * this.WEIGHTS.skill +
        educationScore * this.WEIGHTS.education +
        preferenceScore * this.WEIGHTS.preference +
        stageScore * this.WEIGHTS.stage
      );

      const reasonPoints = this._generateReasonPoints(career, interestScore, skillScore, educationScore);

      scoredCareers.push({
        career: career._id,
        match_score: Math.min(finalScore, 100),
        score_breakdown: {
          interest_match: interestScore,
          skill_match: skillScore,
          education_match: educationScore,
          preference_match: preferenceScore,
          stage_fit: stageScore,
        },
        reason_text: `${career.title} is a ${finalScore}% match based on your profile and assessment results.`,
        reason_points: reasonPoints,
        source_model: 'rule_based_v1',
        batch_id: batchId,
      });
    }

    // 3. Sort and take top 15
    scoredCareers.sort((a, b) => b.match_score - a.match_score);
    const topCareers = scoredCareers.slice(0, 15);

    // 4. Save to database
    const recommendations = [];
    for (let i = 0; i < topCareers.length; i++) {
      const rec = await Recommendation.create({
        user: userId,
        ...topCareers[i],
        rank: i + 1,
      });
      recommendations.push(rec);
    }

    // 5. Create notification
    if (recommendations.length > 0) {
      await Notification.create({
        user: userId,
        type: 'recommendation',
        title: 'New Recommendations Ready!',
        message: `We generated ${recommendations.length} career recommendations based on your profile. Your top match is ${(await Career.findById(recommendations[0].career))?.title || 'a great career'}!`,
        action_url: '/recommendations',
      });
    }

    return recommendations;
  }

  /**
   * Interest match: compare user's assessment category scores against career's suitable_interests
   */
  static _calculateInterestMatch(categoryScores, career) {
    if (!career.suitable_interests || career.suitable_interests.length === 0) return 50;
    if (Object.keys(categoryScores).length === 0) return 30;

    let totalMatch = 0;
    let count = 0;
    for (const interest of career.suitable_interests) {
      const key = interest.toLowerCase();
      // Check if user has a score in this category
      for (const [cat, score] of Object.entries(categoryScores)) {
        if (cat.toLowerCase().includes(key) || key.includes(cat.toLowerCase())) {
          totalMatch += score;
          count++;
        }
      }
    }

    return count > 0 ? Math.round(totalMatch / count) : 30;
  }

  /**
   * Skill match: compare user's known skills vs career's required skills
   */
  static _calculateSkillMatch(userSkills, userSkillRatings, careerSkills) {
    if (careerSkills.length === 0) return 50;
    if (userSkills.size === 0) return 10;

    let matched = 0;
    let total = careerSkills.length;

    for (const cs of careerSkills) {
      const skillName = cs.skill?.name?.toLowerCase() || '';
      if (userSkills.has(skillName)) {
        const rating = userSkillRatings[skillName] || userSkillRatings[cs.skill?.name] || 5;
        const levelScore = cs.minimum_required_level === 'beginner' ? 3
          : cs.minimum_required_level === 'intermediate' ? 5 : 7;
        matched += rating >= levelScore ? 1 : 0.5;
      }
    }

    return Math.round((matched / total) * 100);
  }

  /**
   * Education match: does user's education level meet requirements
   */
  static _calculateEducationMatch(profile, career) {
    if (career.required_education === 'any' || career.required_education === 'none') return 100;

    const levels = { 'class10': 1, 'class12': 2, 'undergraduate': 3, 'postgraduate': 4, 'working': 4 };
    const userLevel = levels[profile.education_level] || 0;
    const requiredLevel = levels[career.required_education] || 0;

    if (userLevel >= requiredLevel) return 100;
    if (userLevel === requiredLevel - 1) return 70;
    return 30;
  }

  /**
   * Preference match: work style, industry, career type
   */
  static _calculatePreferenceMatch(profile, career) {
    let score = 50; // base

    // Work style match
    if (profile.work_preference && career.work_style_tags?.length > 0) {
      const prefMap = {
        'remote': ['remote', 'work_from_home'],
        'office': ['desk_work', 'office'],
        'hybrid': ['hybrid', 'flexible'],
        'field': ['field_work', 'outdoor'],
        'freelance': ['freelance', 'independent'],
      };
      const userTags = prefMap[profile.work_preference] || [];
      const overlap = career.work_style_tags.some(t => userTags.includes(t));
      if (overlap) score += 25;
    }

    // Remote preference
    if (profile.work_preference === 'remote' && career.remote_friendly) score += 15;

    // Industry match
    if (profile.preferred_industries?.length > 0) {
      const careerCat = career.category?.toLowerCase() || '';
      const match = profile.preferred_industries.some(i => careerCat.includes(i.toLowerCase()));
      if (match) score += 10;
    }

    return Math.min(score, 100);
  }

  /**
   * Stage fit: match occupation status to career suitability
   */
  static _calculateStageFit(profile, career) {
    if (!career.suitable_for || career.suitable_for.length === 0) return 50;
    if (!profile.occupation_status) return 40;

    const statusMatch = career.suitable_for.some(s =>
      s.toLowerCase().includes(profile.occupation_status.toLowerCase()) ||
      profile.occupation_status.toLowerCase().includes(s.toLowerCase())
    );

    if (statusMatch) return 100;
    if (career.beginner_friendly) return 70;
    return 30;
  }

  /**
   * Generate human-readable reason points
   */
  static _generateReasonPoints(career, interestScore, skillScore, educationScore) {
    const points = [];

    if (interestScore >= 70) points.push('Strong alignment with your interests and personality');
    else if (interestScore >= 40) points.push('Moderate alignment with your interests');

    if (skillScore >= 70) points.push('Your existing skills are highly relevant');
    else if (skillScore >= 30) points.push('Some of your skills transfer well to this role');
    else points.push('This role would help you develop new skills');

    if (educationScore >= 80) points.push('Your education level meets the requirements');

    if (career.growth_outlook === 'very_high' || career.growth_outlook === 'high') {
      points.push(`${career.growth_outlook === 'very_high' ? 'Exceptional' : 'Strong'} career growth potential`);
    }

    if (career.beginner_friendly) points.push('Beginner-friendly entry path available');
    if (career.remote_friendly) points.push('Offers remote work opportunities');

    return points;
  }

  /**
   * Get latest batch of recommendations
   */
  static async getLatest(userId) {
    const latest = await Recommendation.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .select('batch_id');

    if (!latest) return [];

    return Recommendation.find({ user: userId, batch_id: latest.batch_id })
      .populate('career', 'title slug category short_description salary_range growth_outlook difficulty_level remote_friendly beginner_friendly')
      .sort({ rank: 1 });
  }

  /**
   * Get recommendation history (grouped by batch)
   */
  static async getHistory(userId) {
    const recs = await Recommendation.find({ user: userId })
      .populate('career', 'title slug category short_description')
      .sort({ createdAt: -1 })
      .limit(100);

    // Group by batch_id
    const batches = {};
    for (const rec of recs) {
      if (!batches[rec.batch_id]) {
        batches[rec.batch_id] = {
          batch_id: rec.batch_id,
          generated_at: rec.createdAt,
          recommendations: [],
        };
      }
      batches[rec.batch_id].recommendations.push(rec);
    }

    return Object.values(batches);
  }
}

export default RecommendationService;
