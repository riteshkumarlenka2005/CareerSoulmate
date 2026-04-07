import Assessment from '../models/Assessment.js';
import AssessmentQuestion from '../models/AssessmentQuestion.js';
import UserAssessmentAttempt from '../models/UserAssessmentAttempt.js';
import UserAssessmentAnswer from '../models/UserAssessmentAnswer.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { NotFoundError, ValidationError } from '../utils/ApiError.js';

class AssessmentService {
  /**
   * Get all active assessments with question counts
   */
  static async listAssessments() {
    const assessments = await Assessment.find({ is_active: true }).sort({ type: 1 });
    return assessments;
  }

  /**
   * Get assessment with its questions
   */
  static async getAssessmentWithQuestions(assessmentId) {
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) throw new NotFoundError('Assessment not found');

    const questions = await AssessmentQuestion.find({
      assessment: assessmentId,
      is_active: true,
    }).sort({ order_no: 1 });

    return { assessment, questions };
  }

  /**
   * Start a new assessment attempt
   */
  static async startAttempt(userId, assessmentId) {
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) throw new NotFoundError('Assessment not found');
    if (!assessment.is_active) throw new ValidationError('This assessment is currently inactive');

    // Check for existing in-progress attempt
    const existing = await UserAssessmentAttempt.findOne({
      user: userId,
      assessment: assessmentId,
      status: 'in_progress',
    });

    if (existing) {
      // Return existing attempt instead of creating a new one
      const answers = await UserAssessmentAnswer.find({ attempt: existing._id });
      return { attempt: existing, answers, resumed: true };
    }

    const attempt = await UserAssessmentAttempt.create({
      user: userId,
      assessment: assessmentId,
      assessment_version: assessment.version,
      status: 'in_progress',
      started_at: new Date(),
    });

    return { attempt, answers: [], resumed: false };
  }

  /**
   * Submit answers and calculate scores
   */
  static async submitAttempt(userId, attemptId, answers) {
    const attempt = await UserAssessmentAttempt.findOne({
      _id: attemptId,
      user: userId,
    });

    if (!attempt) throw new NotFoundError('Attempt not found');
    if (attempt.status === 'completed') throw new ValidationError('This attempt has already been submitted');

    // Fetch all questions for scoring
    const questionIds = answers.map(a => a.questionId);
    const questions = await AssessmentQuestion.find({ _id: { $in: questionIds } });
    const questionMap = new Map(questions.map(q => [q._id.toString(), q]));

    let totalScore = 0;
    let maxPossibleScore = 0;
    const categoryScores = {};
    const categoryMaxScores = {};
    const answerDocs = [];

    for (const ans of answers) {
      const question = questionMap.get(ans.questionId);
      if (!question) continue;

      let score = 0;
      const weight = question.weight || 1;

      // Calculate score based on question type
      if (question.question_type === 'scale') {
        // Scale questions: answer_value is a number 1-5 or 1-10
        score = (Number(ans.value) || 0) * weight;
        const maxOption = 5; // Assuming 5-point scale
        maxPossibleScore += maxOption * weight;
      } else {
        // Choice questions: find the matching option's score
        const selectedOption = question.options.find(o => o.value === ans.value);
        score = (selectedOption?.score || 0) * weight;
        const maxOptionScore = Math.max(...question.options.map(o => o.score || 0));
        maxPossibleScore += maxOptionScore * weight;
      }

      totalScore += score;

      // Aggregate category scores
      const cat = question.category;
      categoryScores[cat] = (categoryScores[cat] || 0) + score;
      categoryMaxScores[cat] = (categoryMaxScores[cat] || 0) + (question.question_type === 'scale' ? 5 * weight : Math.max(...question.options.map(o => o.score || 0)) * weight);

      answerDocs.push({
        attempt: attemptId,
        question: ans.questionId,
        answer_value: ans.value,
        score,
      });
    }

    // Save all answers
    await UserAssessmentAnswer.deleteMany({ attempt: attemptId }); // Clear any previous partial saves
    await UserAssessmentAnswer.insertMany(answerDocs);

    // Normalize category scores to percentages
    const normalizedCategoryScores = {};
    for (const [cat, score] of Object.entries(categoryScores)) {
      const max = categoryMaxScores[cat] || 1;
      normalizedCategoryScores[cat] = Math.round((score / max) * 100);
    }

    // Generate result summary
    const sortedCategories = Object.entries(normalizedCategoryScores)
      .sort(([, a], [, b]) => b - a);
    const topCategories = sortedCategories.slice(0, 3).map(([cat]) => cat);
    const resultSummary = `Your strongest areas are: ${topCategories.join(', ')}`;

    // Update attempt
    attempt.status = 'completed';
    attempt.submitted_at = new Date();
    attempt.total_score = totalScore;
    attempt.max_possible_score = maxPossibleScore;
    attempt.category_scores = normalizedCategoryScores;
    attempt.result_summary = resultSummary;
    attempt.result_json = {
      categoryScores: normalizedCategoryScores,
      topCategories,
      totalPercentage: maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0,
    };
    await attempt.save();

    // Update user's completedAssessments
    const assessment = await Assessment.findById(attempt.assessment);
    if (assessment) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { completedAssessments: assessment.type },
        $inc: { points: 25 },
      });

      // Create notification
      await Notification.create({
        user: userId,
        type: 'assessment',
        title: 'Assessment Completed!',
        message: `You completed the ${assessment.title}. ${resultSummary}`,
        action_url: `/assessment/results/${attemptId}`,
      });
    }

    return attempt;
  }

  /**
   * Get user's attempt history
   */
  static async getUserAttempts(userId) {
    const attempts = await UserAssessmentAttempt.find({ user: userId })
      .populate('assessment', 'title type description')
      .sort({ createdAt: -1 });
    return attempts;
  }

  /**
   * Get a single attempt with answers
   */
  static async getAttemptResult(userId, attemptId) {
    const attempt = await UserAssessmentAttempt.findOne({
      _id: attemptId,
      user: userId,
    }).populate('assessment', 'title type description');

    if (!attempt) throw new NotFoundError('Attempt not found');

    const answers = await UserAssessmentAnswer.find({ attempt: attemptId })
      .populate('question', 'question_text category options question_type');

    return { attempt, answers };
  }
}

export default AssessmentService;
