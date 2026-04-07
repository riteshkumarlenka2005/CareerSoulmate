import PDFDocument from 'pdfkit';
import User from '../models/User.js';
import UserProfile from '../models/UserProfile.js';
import UserAssessmentAttempt from '../models/UserAssessmentAttempt.js';
import Recommendation from '../models/Recommendation.js';
import SkillGapReport from '../models/SkillGapReport.js';
import Career from '../models/Career.js';
import Roadmap from '../models/Roadmap.js';
import RoadmapStep from '../models/RoadmapStep.js';

class ReportService {
  static async generatePDF(userId) {
    const [user, profile, attempts, latestRec] = await Promise.all([
      User.findById(userId),
      UserProfile.findOne({ user: userId }),
      UserAssessmentAttempt.find({ user: userId, status: 'completed' })
        .populate('assessment', 'title type')
        .sort({ createdAt: -1 }),
      Recommendation.findOne({ user: userId }).sort({ createdAt: -1 }).select('batch_id'),
    ]);

    let recommendations = [];
    if (latestRec) {
      recommendations = await Recommendation.find({ user: userId, batch_id: latestRec.batch_id })
        .populate('career', 'title category short_description growth_outlook salary_range')
        .sort({ rank: 1 })
        .limit(10);
    }

    // Get skill gap for target career
    let skillGap = null;
    if (profile?.target_career) {
      skillGap = await SkillGapReport.findOne({ user: userId, career: profile.target_career })
        .populate('career', 'title')
        .sort({ createdAt: -1 });
    }

    // Get roadmap for top recommendation
    let roadmapData = null;
    if (recommendations.length > 0) {
      const roadmap = await Roadmap.findOne({ career: recommendations[0].career._id, is_active: true });
      if (roadmap) {
        const steps = await RoadmapStep.find({ roadmap: roadmap._id }).sort({ step_no: 1 });
        roadmapData = { roadmap, steps };
      }
    }

    // Build PDF
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const buffers = [];
    doc.on('data', chunk => buffers.push(chunk));

    // Header
    doc.fontSize(24).font('Helvetica-Bold').fillColor('#1e40af')
      .text('CareerSoulmate', { align: 'center' });
    doc.fontSize(10).font('Helvetica').fillColor('#6b7280')
      .text('AI-Powered Career Intelligence Report', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(8).fillColor('#9ca3af')
      .text(`Generated on ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`, { align: 'center' });
    doc.moveDown(1);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke('#e5e7eb');
    doc.moveDown(1);

    // Section 1: Profile Summary
    doc.fontSize(16).font('Helvetica-Bold').fillColor('#111827')
      .text('1. Profile Summary');
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica').fillColor('#374151');
    doc.text(`Name: ${user.fullName}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Education: ${profile?.education_level || 'Not specified'}`);
    doc.text(`Current Status: ${profile?.occupation_status || 'Not specified'}`);
    doc.text(`Skills: ${(profile?.known_skills || []).join(', ') || 'None listed'}`);
    doc.text(`Profile Completion: ${profile?.profile_completion || 0}%`);
    doc.moveDown(1);

    // Section 2: Assessment Results
    doc.fontSize(16).font('Helvetica-Bold').fillColor('#111827')
      .text('2. Assessment Results');
    doc.moveDown(0.5);

    if (attempts.length === 0) {
      doc.fontSize(10).font('Helvetica').fillColor('#6b7280')
        .text('No assessments completed yet.');
    } else {
      for (const attempt of attempts.slice(0, 5)) {
        doc.fontSize(11).font('Helvetica-Bold').fillColor('#374151')
          .text(`${attempt.assessment?.title || 'Assessment'} (${attempt.assessment?.type || ''})`);

        const scores = attempt.category_scores instanceof Map
          ? Object.fromEntries(attempt.category_scores)
          : attempt.category_scores || {};

        for (const [cat, score] of Object.entries(scores)) {
          doc.fontSize(9).font('Helvetica').fillColor('#6b7280')
            .text(`  • ${cat}: ${score}%`);
        }

        doc.fontSize(9).fillColor('#9ca3af')
          .text(`  Score: ${attempt.total_score}/${attempt.max_possible_score} | ${attempt.result_summary}`);
        doc.moveDown(0.3);
      }
    }
    doc.moveDown(1);

    // Section 3: Top Recommendations
    doc.fontSize(16).font('Helvetica-Bold').fillColor('#111827')
      .text('3. Top Career Recommendations');
    doc.moveDown(0.5);

    if (recommendations.length === 0) {
      doc.fontSize(10).font('Helvetica').fillColor('#6b7280')
        .text('No recommendations generated yet. Complete your profile and assessments first.');
    } else {
      for (let i = 0; i < Math.min(recommendations.length, 5); i++) {
        const rec = recommendations[i];
        const career = rec.career;
        doc.fontSize(11).font('Helvetica-Bold').fillColor('#1e40af')
          .text(`#${i + 1}. ${career.title} — ${rec.match_score}% Match`);
        doc.fontSize(9).font('Helvetica').fillColor('#374151')
          .text(`   Category: ${career.category} | Growth: ${career.growth_outlook}`);
        if (rec.reason_points?.length > 0) {
          for (const point of rec.reason_points) {
            doc.fontSize(9).fillColor('#6b7280').text(`   ✓ ${point}`);
          }
        }
        doc.moveDown(0.3);
      }
    }
    doc.moveDown(1);

    // Section 4: Skill Gap (if available)
    if (skillGap) {
      doc.fontSize(16).font('Helvetica-Bold').fillColor('#111827')
        .text(`4. Skill Gap Analysis — ${skillGap.career?.title || 'Target Career'}`);
      doc.moveDown(0.5);
      doc.fontSize(10).font('Helvetica').fillColor('#374151')
        .text(`Readiness: ${skillGap.overall_readiness} | Gap Score: ${skillGap.gap_score}%`);

      if (skillGap.missing_skills?.length > 0) {
        doc.moveDown(0.3);
        doc.fontSize(10).font('Helvetica-Bold').text('Key skills to develop:');
        for (const ms of skillGap.missing_skills.slice(0, 5)) {
          doc.fontSize(9).font('Helvetica').fillColor('#dc2626')
            .text(`  ✗ ${ms.skill_name} (${ms.required_level} level, ${ms.importance})`);
        }
      }
      doc.moveDown(1);
    }

    // Section 5: Roadmap (if available)
    if (roadmapData) {
      const sectionNum = skillGap ? 5 : 4;
      doc.fontSize(16).font('Helvetica-Bold').fillColor('#111827')
        .text(`${sectionNum}. Learning Roadmap — ${roadmapData.roadmap.title}`);
      doc.moveDown(0.5);

      for (const step of roadmapData.steps) {
        doc.fontSize(10).font('Helvetica-Bold').fillColor('#374151')
          .text(`Step ${step.step_no}: ${step.title}`);
        if (step.description) {
          doc.fontSize(9).font('Helvetica').fillColor('#6b7280')
            .text(`   ${step.description}`);
        }
        if (step.duration_estimate) {
          doc.fontSize(8).fillColor('#9ca3af').text(`   Duration: ${step.duration_estimate}`);
        }
        doc.moveDown(0.2);
      }
    }

    // Footer
    doc.moveDown(2);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke('#e5e7eb');
    doc.moveDown(0.5);
    doc.fontSize(8).font('Helvetica').fillColor('#9ca3af')
      .text('This report was generated by CareerSoulmate AI Career Intelligence Platform.', { align: 'center' });
    doc.text('For the most up-to-date recommendations, visit www.careersoulmate.com', { align: 'center' });

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
    });
  }
}

export default ReportService;
