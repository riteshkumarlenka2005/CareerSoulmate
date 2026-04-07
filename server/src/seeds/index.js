import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Assessment from '../models/Assessment.js';
import AssessmentQuestion from '../models/AssessmentQuestion.js';
import Career from '../models/Career.js';
import Skill from '../models/Skill.js';
import CareerSkill from '../models/CareerSkill.js';
import Roadmap from '../models/Roadmap.js';
import RoadmapStep from '../models/RoadmapStep.js';
import FAQ from '../models/FAQ.js';
import SystemSetting from '../models/SystemSetting.js';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';

const ADMIN_EMAIL = 'lenkariteshkumar2005@gmail.com';

async function seed() {
  await connectDB();
  console.log('🌱 Starting seed...\n');

  // ──── 1. Admin account ────────────────────────────────
  let admin = await User.findOne({ email: ADMIN_EMAIL });
  if (!admin) {
    admin = await User.create({
      fullName: 'Ritesh Kumar Lenka',
      email: ADMIN_EMAIL,
      role: 'admin',
      account_status: 'active',
      email_verified: true,
      googleId: 'auto_seeded',
    });
    console.log('✅ Admin account created');
  } else {
    await User.updateOne({ email: ADMIN_EMAIL }, { $set: { role: 'admin' } });
    console.log('✅ Admin account verified (role set to admin)');
  }

  // ──── 2. Assessments ──────────────────────────────────
  const assessmentData = [
    { title: 'Interest Assessment', type: 'interest', description: 'Discover your Holland code — are you Realistic, Investigative, Artistic, Social, Enterprising, or Conventional?', estimated_time_minutes: 15 },
    { title: 'Aptitude Assessment', type: 'aptitude', description: 'Measure your cognitive abilities across logical, numerical, verbal, spatial, and analytical dimensions.', estimated_time_minutes: 20 },
    { title: 'Personality Assessment', type: 'personality', description: 'Understand your work personality — introvert vs extrovert, thinker vs feeler, planner vs improviser.', estimated_time_minutes: 10 },
    { title: 'Skills Confidence Assessment', type: 'skills', description: 'Rate your confidence level across communication, problem-solving, digital skills, and more.', estimated_time_minutes: 10 },
    { title: 'Work Preference Assessment', type: 'preference', description: 'Tell us about your ideal work environment, schedule, and career goals.', estimated_time_minutes: 8 },
  ];

  for (const ad of assessmentData) {
    const existing = await Assessment.findOne({ type: ad.type });
    if (!existing) {
      await Assessment.create({ ...ad, is_active: true, version: 1 });
    }
  }
  console.log('✅ Assessments seeded');

  // ──── 3. Assessment Questions ─────────────────────────
  const assessments = await Assessment.find();
  const aMap = {};
  for (const a of assessments) aMap[a.type] = a._id;

  const existingQCount = await AssessmentQuestion.countDocuments();
  if (existingQCount === 0) {
    const questions = [];

    // Interest questions (Holland RIASEC)
    const interestQs = [
      { q: 'I enjoy building or fixing things with my hands.', cat: 'realistic' },
      { q: 'I prefer working outdoors or with physical tools.', cat: 'realistic' },
      { q: 'I like repairing machines or working with equipment.', cat: 'realistic' },
      { q: 'I enjoy solving complex puzzles and brain-teasers.', cat: 'investigative' },
      { q: 'I like researching topics deeply before forming opinions.', cat: 'investigative' },
      { q: 'I am curious about how things work scientifically.', cat: 'investigative' },
      { q: 'I enjoy creating art, music, or writing.', cat: 'artistic' },
      { q: 'I prefer expressing ideas through creative mediums.', cat: 'artistic' },
      { q: 'I like designing things and thinking about aesthetics.', cat: 'artistic' },
      { q: 'I enjoy helping others solve their personal problems.', cat: 'social' },
      { q: 'I like teaching, mentoring, or guiding people.', cat: 'social' },
      { q: 'I prefer working in teams over working alone.', cat: 'social' },
      { q: 'I enjoy leading projects and motivating others.', cat: 'enterprising' },
      { q: 'I like negotiating and persuading people.', cat: 'enterprising' },
      { q: 'I am interested in business and entrepreneurship.', cat: 'enterprising' },
      { q: 'I enjoy organizing data and following procedures.', cat: 'conventional' },
      { q: 'I like working with numbers and spreadsheets.', cat: 'conventional' },
      { q: 'I prefer structured, routine work with clear guidelines.', cat: 'conventional' },
    ];
    for (let i = 0; i < interestQs.length; i++) {
      questions.push({
        assessment: aMap['interest'],
        question_text: interestQs[i].q,
        question_type: 'scale',
        category: interestQs[i].cat,
        options: [
          { label: 'Strongly Disagree', value: '1', score: 1 },
          { label: 'Disagree', value: '2', score: 2 },
          { label: 'Neutral', value: '3', score: 3 },
          { label: 'Agree', value: '4', score: 4 },
          { label: 'Strongly Agree', value: '5', score: 5 },
        ],
        weight: 1, order_no: i + 1, is_active: true,
      });
    }

    // Aptitude questions
    const aptitudeQs = [
      { q: 'If 3x + 7 = 22, what is the value of x?', cat: 'numerical', opts: [{ l: '3', v: '3', s: 0 }, { l: '5', v: '5', s: 5 }, { l: '7', v: '7', s: 0 }, { l: '4', v: '4', s: 0 }] },
      { q: 'What percentage of 250 is 45?', cat: 'numerical', opts: [{ l: '15%', v: '15', s: 0 }, { l: '18%', v: '18', s: 5 }, { l: '20%', v: '20', s: 0 }, { l: '22%', v: '22', s: 0 }] },
      { q: 'A train travels 120 km in 2 hours. What is its speed?', cat: 'numerical', opts: [{ l: '50 km/h', v: '50', s: 0 }, { l: '55 km/h', v: '55', s: 0 }, { l: '60 km/h', v: '60', s: 5 }, { l: '65 km/h', v: '65', s: 0 }] },
      { q: 'All roses are flowers. Some flowers are red. Therefore:', cat: 'logical', opts: [{ l: 'All roses are red', v: 'a', s: 0 }, { l: 'Some roses may be red', v: 'b', s: 5 }, { l: 'No roses are red', v: 'c', s: 0 }, { l: 'All red things are roses', v: 'd', s: 0 }] },
      { q: 'Complete the pattern: 2, 6, 18, 54, __', cat: 'logical', opts: [{ l: '108', v: '108', s: 0 }, { l: '162', v: '162', s: 5 }, { l: '148', v: '148', s: 0 }, { l: '180', v: '180', s: 0 }] },
      { q: 'If A > B and B > C, which statement must be true?', cat: 'logical', opts: [{ l: 'C > A', v: 'a', s: 0 }, { l: 'A > C', v: 'b', s: 5 }, { l: 'B = C', v: 'c', s: 0 }, { l: 'Cannot determine', v: 'd', s: 0 }] },
      { q: 'Choose the word most similar in meaning to "Benevolent":', cat: 'verbal', opts: [{ l: 'Hostile', v: 'a', s: 0 }, { l: 'Kind', v: 'b', s: 5 }, { l: 'Neutral', v: 'c', s: 0 }, { l: 'Aggressive', v: 'd', s: 0 }] },
      { q: 'Complete: The scientist ___ the hypothesis before publishing results.', cat: 'verbal', opts: [{ l: 'ignored', v: 'a', s: 0 }, { l: 'validated', v: 'b', s: 5 }, { l: 'contradicted', v: 'c', s: 0 }, { l: 'forgot', v: 'd', s: 0 }] },
      { q: 'What is the best synonym for "Ubiquitous"?', cat: 'verbal', opts: [{ l: 'Rare', v: 'a', s: 0 }, { l: 'Everywhere', v: 'b', s: 5 }, { l: 'Unknown', v: 'c', s: 0 }, { l: 'Dangerous', v: 'd', s: 0 }] },
      { q: 'If a cube is unfolded, how many faces does it have?', cat: 'spatial', opts: [{ l: '4', v: '4', s: 0 }, { l: '6', v: '6', s: 5 }, { l: '8', v: '8', s: 0 }, { l: '12', v: '12', s: 0 }] },
      { q: 'A dataset shows increasing sales each quarter. The growth rate slows in Q4. What is the most likely trend?', cat: 'analytical', opts: [{ l: 'Market saturation', v: 'a', s: 5 }, { l: 'Data error', v: 'b', s: 0 }, { l: 'Random noise', v: 'c', s: 0 }, { l: 'Seasonal decline', v: 'd', s: 3 }] },
      { q: 'A company reduces prices by 20% and sees a 30% increase in orders. Revenue:', cat: 'analytical', opts: [{ l: 'Decreased', v: 'a', s: 0 }, { l: 'Stayed same', v: 'b', s: 0 }, { l: 'Increased by ~4%', v: 'c', s: 5 }, { l: 'Increased by 10%', v: 'd', s: 2 }] },
    ];
    for (let i = 0; i < aptitudeQs.length; i++) {
      questions.push({
        assessment: aMap['aptitude'],
        question_text: aptitudeQs[i].q,
        question_type: 'single_choice',
        category: aptitudeQs[i].cat,
        options: aptitudeQs[i].opts.map(o => ({ label: o.l, value: o.v, score: o.s })),
        weight: 1, order_no: i + 1, is_active: true,
      });
    }

    // Personality questions
    const personalityQs = [
      { q: 'I recharge my energy by spending time alone.', cat: 'introversion_extroversion' },
      { q: 'I enjoy being the center of attention in social settings.', cat: 'introversion_extroversion' },
      { q: 'I prefer making decisions based on logic rather than feelings.', cat: 'thinking_feeling' },
      { q: 'I consider how my decisions impact others emotionally.', cat: 'thinking_feeling' },
      { q: 'I prefer having a detailed plan before starting any project.', cat: 'judging_perceiving' },
      { q: 'I enjoy spontaneity and keeping options open.', cat: 'judging_perceiving' },
      { q: 'I focus on practical, concrete details over abstract ideas.', cat: 'sensing_intuition' },
      { q: 'I enjoy thinking about future possibilities and what could be.', cat: 'sensing_intuition' },
      { q: 'I work best under pressure with tight deadlines.', cat: 'work_style' },
      { q: 'I prefer a calm, steady work pace with predictable tasks.', cat: 'work_style' },
    ];
    for (let i = 0; i < personalityQs.length; i++) {
      questions.push({
        assessment: aMap['personality'],
        question_text: personalityQs[i].q,
        question_type: 'scale',
        category: personalityQs[i].cat,
        options: [
          { label: 'Strongly Disagree', value: '1', score: 1 },
          { label: 'Disagree', value: '2', score: 2 },
          { label: 'Neutral', value: '3', score: 3 },
          { label: 'Agree', value: '4', score: 4 },
          { label: 'Strongly Agree', value: '5', score: 5 },
        ],
        weight: 1, order_no: i + 1, is_active: true,
      });
    }

    // Skills confidence questions
    const skillsQs = [
      'Communication', 'Problem-Solving', 'Leadership', 'Teamwork',
      'Creativity', 'Analytical Thinking', 'Digital/Tech Skills',
      'Time Management', 'Adaptability', 'Critical Thinking',
    ];
    for (let i = 0; i < skillsQs.length; i++) {
      questions.push({
        assessment: aMap['skills'],
        question_text: `How confident are you in your ${skillsQs[i]} abilities?`,
        question_type: 'scale',
        category: skillsQs[i].toLowerCase().replace(/[\s\/]+/g, '_'),
        options: [
          { label: 'Not Confident', value: '1', score: 1 },
          { label: 'Slightly', value: '2', score: 2 },
          { label: 'Moderate', value: '3', score: 3 },
          { label: 'Confident', value: '4', score: 4 },
          { label: 'Very Confident', value: '5', score: 5 },
        ],
        weight: 1, order_no: i + 1, is_active: true,
      });
    }

    // Preference questions
    const preferenceQs = [
      { q: 'What type of work environment do you prefer?', cat: 'environment', opts: [{ l: 'Office/Corporate', v: 'office', s: 3 }, { l: 'Remote/Work from Home', v: 'remote', s: 3 }, { l: 'Hybrid', v: 'hybrid', s: 3 }, { l: 'Outdoor/Field', v: 'field', s: 3 }] },
      { q: 'Do you prefer technical or non-technical work?', cat: 'technical_preference', opts: [{ l: 'Highly Technical', v: 'technical', s: 3 }, { l: 'Mostly Non-Technical', v: 'non_technical', s: 3 }, { l: 'A Mix of Both', v: 'mixed', s: 3 }] },
      { q: 'Do you prefer working independently or in a team?', cat: 'work_style', opts: [{ l: 'Independent', v: 'independent', s: 3 }, { l: 'Team', v: 'team', s: 3 }, { l: 'Both Equally', v: 'both', s: 3 }] },
      { q: 'What is your career goal?', cat: 'career_goal', opts: [{ l: 'Get a Job', v: 'job', s: 3 }, { l: 'Start a Business', v: 'business', s: 3 }, { l: 'Freelance', v: 'freelance', s: 3 }, { l: 'Government/PSU', v: 'government', s: 3 }, { l: 'Not Sure', v: 'unsure', s: 3 }] },
      { q: 'How important is salary vs job satisfaction?', cat: 'priority', opts: [{ l: 'Salary is most important', v: 'salary', s: 3 }, { l: 'Satisfaction is most important', v: 'satisfaction', s: 3 }, { l: 'Both equally', v: 'both', s: 3 }] },
      { q: 'How much are you willing to invest in learning?', cat: 'learning_investment', opts: [{ l: 'Short courses (< 3 months)', v: 'short', s: 3 }, { l: 'Medium (3-12 months)', v: 'medium', s: 3 }, { l: 'Full degree (1-4 years)', v: 'degree', s: 3 }] },
    ];
    for (let i = 0; i < preferenceQs.length; i++) {
      questions.push({
        assessment: aMap['preference'],
        question_text: preferenceQs[i].q,
        question_type: 'single_choice',
        category: preferenceQs[i].cat,
        options: preferenceQs[i].opts.map(o => ({ label: o.l, value: o.v, score: o.s })),
        weight: 1, order_no: i + 1, is_active: true,
      });
    }

    await AssessmentQuestion.insertMany(questions);
    // Update question counts
    for (const a of assessments) {
      const count = await AssessmentQuestion.countDocuments({ assessment: a._id, is_active: true });
      await Assessment.updateOne({ _id: a._id }, { total_questions: count });
    }
    console.log(`✅ ${questions.length} assessment questions seeded`);
  } else {
    console.log(`✅ Questions already exist (${existingQCount}), skipping`);
  }

  // ──── 4. Skills ───────────────────────────────────────
  const skillsData = [
    // Technical
    { name: 'JavaScript', category: 'technical', description: 'Core web programming language' },
    { name: 'Python', category: 'technical', description: 'General-purpose programming language' },
    { name: 'Java', category: 'technical', description: 'Enterprise programming language' },
    { name: 'React', category: 'technical', description: 'Frontend JavaScript framework' },
    { name: 'Node.js', category: 'technical', description: 'Server-side JavaScript runtime' },
    { name: 'SQL', category: 'technical', description: 'Database query language' },
    { name: 'HTML/CSS', category: 'technical', description: 'Web markup and styling' },
    { name: 'Git', category: 'technical', description: 'Version control system' },
    { name: 'Cloud Computing', category: 'technical', description: 'AWS, Azure, GCP platforms' },
    { name: 'Machine Learning', category: 'technical', description: 'AI and ML algorithms' },
    { name: 'Data Analysis', category: 'technical', description: 'Data processing and visualization' },
    { name: 'Cybersecurity', category: 'technical', description: 'Security principles and tools' },
    { name: 'Mobile Development', category: 'technical', description: 'Android/iOS app development' },
    { name: 'DevOps', category: 'technical', description: 'CI/CD, Docker, Kubernetes' },
    { name: 'API Design', category: 'technical', description: 'RESTful and GraphQL APIs' },
    // Soft skills
    { name: 'Communication', category: 'soft_skill', description: 'Written and verbal communication' },
    { name: 'Leadership', category: 'soft_skill', description: 'Team leadership and management' },
    { name: 'Problem Solving', category: 'soft_skill', description: 'Analytical and creative problem solving' },
    { name: 'Teamwork', category: 'soft_skill', description: 'Collaboration and team dynamics' },
    { name: 'Critical Thinking', category: 'soft_skill', description: 'Evaluation and reasoning skills' },
    { name: 'Creativity', category: 'soft_skill', description: 'Creative thinking and innovation' },
    { name: 'Time Management', category: 'soft_skill', description: 'Productivity and prioritization' },
    { name: 'Adaptability', category: 'soft_skill', description: 'Flexibility in changing conditions' },
    { name: 'Emotional Intelligence', category: 'soft_skill', description: 'Understanding and managing emotions' },
    { name: 'Public Speaking', category: 'soft_skill', description: 'Presenting to audiences' },
    // Tools
    { name: 'Figma', category: 'tool', description: 'UI/UX design tool' },
    { name: 'Excel', category: 'tool', description: 'Spreadsheet and data analysis' },
    { name: 'Photoshop', category: 'tool', description: 'Image editing and design' },
    { name: 'Tableau', category: 'tool', description: 'Data visualization platform' },
    { name: 'AutoCAD', category: 'tool', description: 'Computer-aided design software' },
    // Domain
    { name: 'Digital Marketing', category: 'domain', description: 'SEO, SEM, social media marketing' },
    { name: 'Financial Analysis', category: 'domain', description: 'Financial modeling and valuation' },
    { name: 'Project Management', category: 'domain', description: 'Agile, Scrum, PMP methodologies' },
    { name: 'Content Writing', category: 'domain', description: 'Blog, copywriting, technical writing' },
    { name: 'UX Research', category: 'domain', description: 'User research and usability testing' },
  ];

  const existingSkillCount = await Skill.countDocuments();
  if (existingSkillCount === 0) {
    await Skill.insertMany(skillsData);
    console.log(`✅ ${skillsData.length} skills seeded`);
  } else {
    console.log(`✅ Skills already exist (${existingSkillCount}), skipping`);
  }

  // ──── 5. Careers ──────────────────────────────────────
  const careerData = [
    { title: 'Frontend Developer', category: 'Technology', short_description: 'Build user interfaces and experiences for web applications.', full_description: 'Frontend developers create the visual and interactive elements of websites using HTML, CSS, and JavaScript frameworks like React, Vue, or Angular.', suitable_for: ['college_student', 'graduate', 'job_seeker'], suitable_interests: ['investigative', 'artistic'], required_education: 'class12', salary_range: { min: 300000, max: 2500000, currency: 'INR' }, growth_outlook: 'high', difficulty_level: 'intermediate', remote_friendly: true, beginner_friendly: true, work_style_tags: ['remote', 'desk_work', 'independent'], typical_tasks: ['Building responsive web pages', 'Implementing UI designs', 'Writing clean JavaScript code', 'Collaborating with designers'], recommended_tools: ['VS Code', 'Figma', 'Chrome DevTools'], entry_path: 'Learn HTML/CSS → JavaScript → React/Vue → Build portfolio', growth_path: 'Junior → Mid-Level → Senior → Lead → Architect', future_opportunities: 'Full-stack development, technical leadership, or freelancing' },
    { title: 'Data Scientist', category: 'Technology', short_description: 'Extract insights from data using statistics and machine learning.', full_description: 'Data scientists analyze complex datasets to find patterns, build predictive models, and communicate insights that drive business decisions.', suitable_for: ['graduate', 'working_professional'], suitable_interests: ['investigative', 'conventional'], required_education: 'undergraduate', salary_range: { min: 500000, max: 4000000, currency: 'INR' }, growth_outlook: 'very_high', difficulty_level: 'advanced', remote_friendly: true, beginner_friendly: false, work_style_tags: ['desk_work', 'independent', 'remote'], typical_tasks: ['Building ML models', 'Data cleaning and preprocessing', 'Statistical analysis', 'Creating visualizations'], recommended_tools: ['Python', 'Jupyter', 'TensorFlow', 'Tableau'], entry_path: 'Statistics/Math foundation → Python → ML basics → Kaggle competitions', growth_path: 'Analyst → Data Scientist → Senior DS → Lead → Chief Data Officer', future_opportunities: 'AI research, ML engineering, or data consulting' },
    { title: 'UI/UX Designer', category: 'Creative', short_description: 'Design intuitive and beautiful digital experiences.', full_description: 'UI/UX designers research user needs, create wireframes and prototypes, and design visual interfaces that are both beautiful and functional.', suitable_for: ['college_student', 'graduate', 'job_seeker'], suitable_interests: ['artistic', 'social'], required_education: 'class12', salary_range: { min: 300000, max: 2000000, currency: 'INR' }, growth_outlook: 'high', difficulty_level: 'intermediate', remote_friendly: true, beginner_friendly: true, work_style_tags: ['remote', 'desk_work', 'hybrid'], typical_tasks: ['User research', 'Wireframing', 'Prototyping', 'Visual design', 'Usability testing'], recommended_tools: ['Figma', 'Adobe XD', 'Sketch', 'InVision'], entry_path: 'Design fundamentals → Figma → UX principles → Portfolio projects', growth_path: 'Junior Designer → Mid → Senior → Design Lead → VP Design', future_opportunities: 'Product design, design consulting, or starting a design studio' },
    { title: 'Digital Marketing Specialist', category: 'Business', short_description: 'Drive growth through online marketing channels.', full_description: 'Digital marketers plan and execute campaigns across SEO, social media, email, and paid advertising to grow brand awareness and revenue.', suitable_for: ['college_student', 'graduate', 'job_seeker', 'working_professional'], suitable_interests: ['enterprising', 'social', 'conventional'], required_education: 'class12', salary_range: { min: 250000, max: 1500000, currency: 'INR' }, growth_outlook: 'high', difficulty_level: 'beginner', remote_friendly: true, beginner_friendly: true, work_style_tags: ['remote', 'hybrid', 'flexible'], typical_tasks: ['SEO optimization', 'Social media management', 'Content strategy', 'Analytics tracking'], recommended_tools: ['Google Analytics', 'Semrush', 'Canva', 'Mailchimp'], entry_path: 'Marketing fundamentals → Google certifications → Practical campaigns', growth_path: 'Executive → Specialist → Manager → Head of Marketing → CMO', future_opportunities: 'Performance marketing, brand strategy, or digital agency' },
    { title: 'Backend Developer', category: 'Technology', short_description: 'Build server-side logic, APIs, and databases.', full_description: 'Backend developers create the server, database, and application logic that power web and mobile applications.', suitable_for: ['college_student', 'graduate'], suitable_interests: ['investigative', 'realistic'], required_education: 'undergraduate', salary_range: { min: 400000, max: 3000000, currency: 'INR' }, growth_outlook: 'high', difficulty_level: 'intermediate', remote_friendly: true, beginner_friendly: false, work_style_tags: ['remote', 'desk_work', 'independent'], typical_tasks: ['API development', 'Database design', 'Server management', 'Authentication systems'], recommended_tools: ['Node.js', 'Python', 'PostgreSQL', 'Docker'], entry_path: 'Programming basics → Server-side language → Databases → APIs → Deploy', growth_path: 'Junior → Mid → Senior → Lead → Principal Engineer', future_opportunities: 'Full-stack, cloud architecture, or CTO track' },
    { title: 'Business Analyst', category: 'Business', short_description: 'Bridge the gap between business needs and technology solutions.', full_description: 'Business analysts gather requirements, analyze processes, and recommend solutions that help organizations achieve their goals more efficiently.', suitable_for: ['graduate', 'working_professional'], suitable_interests: ['enterprising', 'conventional', 'investigative'], required_education: 'undergraduate', salary_range: { min: 400000, max: 2000000, currency: 'INR' }, growth_outlook: 'high', difficulty_level: 'intermediate', remote_friendly: true, beginner_friendly: false, work_style_tags: ['hybrid', 'desk_work', 'team'], typical_tasks: ['Requirements gathering', 'Process mapping', 'Stakeholder meetings', 'Documentation'], recommended_tools: ['Excel', 'JIRA', 'Visio', 'SQL'], entry_path: 'Business fundamentals → Domain expertise → Tools → Certifications', growth_path: 'Analyst → Senior BA → Lead → Product Manager → Director', future_opportunities: 'Product management, consulting, or operations leadership' },
    { title: 'Graphic Designer', category: 'Creative', short_description: 'Create visual content for brands and media.', full_description: 'Graphic designers create logos, marketing materials, social media content, and other visual assets using design software and creative thinking.', suitable_for: ['school_student', 'college_student', 'graduate', 'job_seeker'], suitable_interests: ['artistic'], required_education: 'class12', salary_range: { min: 200000, max: 1200000, currency: 'INR' }, growth_outlook: 'medium', difficulty_level: 'beginner', remote_friendly: true, beginner_friendly: true, work_style_tags: ['remote', 'freelance', 'independent'], typical_tasks: ['Logo design', 'Social media graphics', 'Branding', 'Print design'], recommended_tools: ['Photoshop', 'Illustrator', 'Canva', 'Figma'], entry_path: 'Design basics → Adobe suite → Build portfolio → Freelance', growth_path: 'Junior → Mid Designer → Senior → Art Director → Creative Director', future_opportunities: 'UI/UX design, motion graphics, or creative agency' },
    { title: 'Cybersecurity Analyst', category: 'Technology', short_description: 'Protect organizations from digital threats.', full_description: 'Cybersecurity analysts monitor systems, identify vulnerabilities, respond to security incidents, and implement protective measures.', suitable_for: ['graduate', 'working_professional'], suitable_interests: ['investigative', 'realistic'], required_education: 'undergraduate', salary_range: { min: 500000, max: 2500000, currency: 'INR' }, growth_outlook: 'very_high', difficulty_level: 'advanced', remote_friendly: true, beginner_friendly: false, work_style_tags: ['remote', 'desk_work', 'independent'], typical_tasks: ['Vulnerability assessment', 'Incident response', 'Security monitoring', 'Penetration testing'], recommended_tools: ['Wireshark', 'Metasploit', 'Nmap', 'Splunk'], entry_path: 'Networking → Linux → Security fundamentals → Certifications (CEH, CompTIA)', growth_path: 'Analyst → Senior → Security Engineer → CISO', future_opportunities: 'Ethical hacking, security consulting, or GRC' },
    { title: 'Content Writer', category: 'Creative', short_description: 'Create engaging written content for various platforms.', full_description: 'Content writers produce blogs, articles, website copy, social media content, and marketing materials that engage and inform audiences.', suitable_for: ['school_student', 'college_student', 'graduate', 'job_seeker'], suitable_interests: ['artistic', 'social'], required_education: 'class12', salary_range: { min: 200000, max: 1000000, currency: 'INR' }, growth_outlook: 'medium', difficulty_level: 'beginner', remote_friendly: true, beginner_friendly: true, work_style_tags: ['remote', 'freelance', 'independent'], typical_tasks: ['Blog writing', 'SEO content', 'Copywriting', 'Content strategy'], recommended_tools: ['Google Docs', 'Grammarly', 'WordPress', 'Semrush'], entry_path: 'Write daily → Build blog/portfolio → Freelance → Specialize', growth_path: 'Junior Writer → Content Specialist → Editor → Content Manager → Head of Content', future_opportunities: 'Content strategy, copyrighting, or journalism' },
    { title: 'Product Manager', category: 'Business', short_description: 'Define product vision and guide development teams.', full_description: 'Product managers define what to build, prioritize features, work with engineering and design teams, and measure product success.', suitable_for: ['working_professional', 'graduate'], suitable_interests: ['enterprising', 'investigative', 'social'], required_education: 'undergraduate', salary_range: { min: 800000, max: 4000000, currency: 'INR' }, growth_outlook: 'very_high', difficulty_level: 'advanced', remote_friendly: true, beginner_friendly: false, work_style_tags: ['hybrid', 'team', 'flexible'], typical_tasks: ['Product roadmap planning', 'User research', 'Feature prioritization', 'Stakeholder management'], recommended_tools: ['JIRA', 'Figma', 'Amplitude', 'Notion'], entry_path: 'Domain expertise → MBA/APM programs → Entry PM role → Build products', growth_path: 'APM → PM → Senior PM → Group PM → VP Product → CPO', future_opportunities: 'Startup founder, venture capital, or executive leadership' },
    { title: 'Cloud Engineer', category: 'Technology', short_description: 'Design and manage cloud infrastructure and services.', full_description: 'Cloud engineers architect, deploy, and maintain cloud-based infrastructure on AWS, Azure, or GCP for scalable applications.', suitable_for: ['graduate', 'working_professional'], suitable_interests: ['investigative', 'realistic'], required_education: 'undergraduate', salary_range: { min: 600000, max: 3500000, currency: 'INR' }, growth_outlook: 'very_high', difficulty_level: 'advanced', remote_friendly: true, beginner_friendly: false, work_style_tags: ['remote', 'desk_work', 'independent'], typical_tasks: ['Infrastructure provisioning', 'CI/CD pipelines', 'Container orchestration', 'Monitoring'], recommended_tools: ['AWS', 'Docker', 'Kubernetes', 'Terraform'], entry_path: 'Linux → Networking → Cloud provider course → Certification (AWS SAA)', growth_path: 'Junior → Cloud Engineer → Senior → Solutions Architect → Director', future_opportunities: 'DevOps, SRE, or cloud consulting' },
    { title: 'Teacher / Educator', category: 'Education', short_description: 'Educate and inspire students across disciplines.', full_description: 'Teachers design curricula, deliver lessons, assess student performance, and create supportive learning environments.', suitable_for: ['graduate', 'working_professional'], suitable_interests: ['social', 'investigative'], required_education: 'undergraduate', salary_range: { min: 250000, max: 1200000, currency: 'INR' }, growth_outlook: 'medium', difficulty_level: 'intermediate', remote_friendly: false, beginner_friendly: true, work_style_tags: ['office', 'team', 'hybrid'], typical_tasks: ['Lesson planning', 'Student assessment', 'Mentoring', 'Curriculum development'], recommended_tools: ['Google Classroom', 'Zoom', 'PowerPoint', 'LMS'], entry_path: 'Subject expertise → B.Ed/teaching cert → Practice teaching → Full role', growth_path: 'Teacher → Senior Teacher → Coordinator → Vice Principal → Principal', future_opportunities: 'EdTech, education management, or corporate training' },
    { title: 'Chartered Accountant', category: 'Finance', short_description: 'Manage finances, audits, and taxation for organizations.', full_description: 'Chartered accountants handle financial reporting, auditing, taxation, and advisory services for businesses and individuals.', suitable_for: ['college_student', 'graduate'], suitable_interests: ['conventional', 'enterprising'], required_education: 'class12', salary_range: { min: 400000, max: 3000000, currency: 'INR' }, growth_outlook: 'high', difficulty_level: 'advanced', remote_friendly: false, beginner_friendly: false, work_style_tags: ['office', 'desk_work', 'independent'], typical_tasks: ['Financial auditing', 'Tax planning', 'Compliance', 'Advisory'], recommended_tools: ['Tally', 'Excel', 'SAP', 'QuickBooks'], entry_path: 'CA Foundation → CA Intermediate → CA Articleship → CA Final', growth_path: 'Article → Junior CA → Manager → Partner → CFO', future_opportunities: 'CFO roles, consulting, or running an audit firm' },
    { title: 'Civil Engineer', category: 'Engineering', short_description: 'Design and build infrastructure projects.', full_description: 'Civil engineers plan, design, and oversee construction of buildings, roads, bridges, dams, and other infrastructure.', suitable_for: ['college_student', 'graduate'], suitable_interests: ['realistic', 'investigative'], required_education: 'undergraduate', salary_range: { min: 300000, max: 2000000, currency: 'INR' }, growth_outlook: 'medium', difficulty_level: 'advanced', remote_friendly: false, beginner_friendly: false, work_style_tags: ['field_work', 'office', 'team'], typical_tasks: ['Structural design', 'Site supervision', 'Quality checks', 'Project planning'], recommended_tools: ['AutoCAD', 'STAAD Pro', 'Revit', 'Excel'], entry_path: 'B.Tech Civil → Internship → Junior Engineer → Site experience', growth_path: 'Engineer → Senior Engineer → Project Manager → Director → VP', future_opportunities: 'Project management, construction firms, or government PSU' },
    { title: 'Mechanical Engineer', category: 'Engineering', short_description: 'Design and manufacture mechanical systems.', full_description: 'Mechanical engineers design, analyze, and manufacture mechanical devices and systems from automotive components to industrial machinery.', suitable_for: ['college_student', 'graduate'], suitable_interests: ['realistic', 'investigative'], required_education: 'undergraduate', salary_range: { min: 300000, max: 1800000, currency: 'INR' }, growth_outlook: 'medium', difficulty_level: 'advanced', remote_friendly: false, beginner_friendly: false, work_style_tags: ['field_work', 'office', 'team'], typical_tasks: ['Product design', 'Thermal analysis', 'Manufacturing process optimization', 'Quality control'], recommended_tools: ['SolidWorks', 'ANSYS', 'AutoCAD', 'MATLAB'], entry_path: 'B.Tech Mechanical → Core company internship → Entry role', growth_path: 'Engineer → Senior Engineer → Manager → Head of Engineering', future_opportunities: 'Automotive, aerospace, robotics, or manufacturing leadership' },
  ];

  const existingCareerCount = await Career.countDocuments();
  if (existingCareerCount === 0) {
    for (const c of careerData) {
      c.slug = slugify(c.title, { lower: true, strict: true });
      c.published = true;
    }
    await Career.insertMany(careerData);
    console.log(`✅ ${careerData.length} careers seeded`);
  } else {
    console.log(`✅ Careers already exist (${existingCareerCount}), skipping`);
  }

  // ──── 6. Career-Skill Mappings ────────────────────────
  const existingMappings = await CareerSkill.countDocuments();
  if (existingMappings === 0) {
    const skills = await Skill.find();
    const careers = await Career.find();
    const sMap = {};
    for (const s of skills) sMap[s.name] = s._id;
    const cMap = {};
    for (const c of careers) cMap[c.title] = c._id;

    const mappings = [
      { career: 'Frontend Developer', skills: [['JavaScript', 'essential', 'intermediate'], ['React', 'essential', 'intermediate'], ['HTML/CSS', 'essential', 'beginner'], ['Git', 'important', 'beginner']] },
      { career: 'Backend Developer', skills: [['JavaScript', 'essential', 'intermediate'], ['Node.js', 'essential', 'intermediate'], ['SQL', 'essential', 'intermediate'], ['Git', 'important', 'beginner'], ['API Design', 'essential', 'intermediate']] },
      { career: 'Data Scientist', skills: [['Python', 'essential', 'intermediate'], ['Machine Learning', 'essential', 'intermediate'], ['SQL', 'important', 'beginner'], ['Data Analysis', 'essential', 'intermediate']] },
      { career: 'UI/UX Designer', skills: [['Figma', 'essential', 'intermediate'], ['UX Research', 'essential', 'intermediate'], ['Creativity', 'important', 'beginner'], ['Communication', 'important', 'beginner']] },
      { career: 'Digital Marketing Specialist', skills: [['Digital Marketing', 'essential', 'intermediate'], ['Content Writing', 'important', 'beginner'], ['Communication', 'essential', 'beginner'], ['Excel', 'nice_to_have', 'beginner']] },
      { career: 'Cybersecurity Analyst', skills: [['Cybersecurity', 'essential', 'intermediate'], ['Python', 'important', 'beginner'], ['Cloud Computing', 'nice_to_have', 'beginner']] },
      { career: 'Cloud Engineer', skills: [['Cloud Computing', 'essential', 'intermediate'], ['DevOps', 'essential', 'intermediate'], ['Python', 'important', 'beginner']] },
      { career: 'Product Manager', skills: [['Communication', 'essential', 'intermediate'], ['Leadership', 'essential', 'intermediate'], ['Project Management', 'essential', 'intermediate'], ['Data Analysis', 'important', 'beginner']] },
    ];

    const docs = [];
    for (const m of mappings) {
      if (!cMap[m.career]) continue;
      for (const [skillName, imp, level] of m.skills) {
        if (!sMap[skillName]) continue;
        docs.push({ career: cMap[m.career], skill: sMap[skillName], importance_level: imp, minimum_required_level: level });
      }
    }
    if (docs.length > 0) await CareerSkill.insertMany(docs);
    console.log(`✅ ${docs.length} career-skill mappings seeded`);
  } else {
    console.log(`✅ Career-skill mappings already exist (${existingMappings}), skipping`);
  }

  // ──── 7. Roadmaps ─────────────────────────────────────
  const existingRoadmaps = await Roadmap.countDocuments();
  if (existingRoadmaps === 0) {
    const careers = await Career.find();
    const cMap = {};
    for (const c of careers) cMap[c.title] = c._id;

    const roadmapData = [
      {
        career: 'Frontend Developer', title: 'Frontend Developer Roadmap', description: 'A step-by-step path to becoming a professional frontend developer.', estimated_duration: '6-9 months',
        steps: [
          { title: 'Learn HTML & CSS', description: 'Master HTML5 semantics, CSS3, Flexbox, Grid, and responsive design.', duration_estimate: '4-6 weeks' },
          { title: 'JavaScript Fundamentals', description: 'Learn JavaScript basics, DOM manipulation, ES6+, async/await.', duration_estimate: '6-8 weeks' },
          { title: 'React.js Framework', description: 'Learn React components, hooks, state management, and routing.', duration_estimate: '6-8 weeks' },
          { title: 'Build Projects', description: 'Create 3-5 portfolio projects including a full web app.', duration_estimate: '4-6 weeks' },
          { title: 'Git & Deployment', description: 'Learn Git workflow, GitHub, and deploy projects to Netlify/Vercel.', duration_estimate: '1-2 weeks' },
          { title: 'Apply & Interview', description: 'Build resume, prepare for coding interviews, apply to companies.', duration_estimate: '4-8 weeks' },
        ],
      },
      {
        career: 'Data Scientist', title: 'Data Scientist Roadmap', description: 'From foundations to your first data science role.', estimated_duration: '9-12 months',
        steps: [
          { title: 'Math & Statistics', description: 'Linear algebra, probability, statistics fundamentals.', duration_estimate: '4-6 weeks' },
          { title: 'Python for Data Science', description: 'NumPy, Pandas, Matplotlib, data wrangling.', duration_estimate: '6-8 weeks' },
          { title: 'Machine Learning Foundations', description: 'Supervised & unsupervised learning, scikit-learn.', duration_estimate: '8-10 weeks' },
          { title: 'Deep Learning Basics', description: 'Neural networks, TensorFlow/PyTorch fundamentals.', duration_estimate: '4-6 weeks' },
          { title: 'Kaggle Competitions', description: 'Participate in 3+ Kaggle competitions for real-world experience.', duration_estimate: '4-8 weeks' },
          { title: 'Portfolio & Job Search', description: 'Publish projects on GitHub, write about them, and apply.', duration_estimate: '4-6 weeks' },
        ],
      },
    ];

    for (const rd of roadmapData) {
      if (!cMap[rd.career]) continue;
      const roadmap = await Roadmap.create({
        career: cMap[rd.career], title: rd.title, description: rd.description, estimated_duration: rd.estimated_duration, is_active: true,
      });
      const stepDocs = rd.steps.map((s, i) => ({
        roadmap: roadmap._id, step_no: i + 1, title: s.title, description: s.description, duration_estimate: s.duration_estimate,
      }));
      await RoadmapStep.insertMany(stepDocs);
    }
    console.log(`✅ ${roadmapData.length} roadmaps seeded`);
  } else {
    console.log(`✅ Roadmaps already exist (${existingRoadmaps}), skipping`);
  }

  // ──── 8. FAQs ─────────────────────────────────────────
  const existingFAQs = await FAQ.countDocuments();
  if (existingFAQs === 0) {
    const faqs = [
      { question: 'What is CareerSoulmate?', answer: 'CareerSoulmate is an AI-powered career guidance platform that helps students and professionals discover their ideal career path through assessments, recommendations, and skill gap analysis.', category: 'general', order: 1 },
      { question: 'How do I take an assessment?', answer: 'Navigate to the Assessments section from the main menu. Choose an assessment type (Interest, Aptitude, Personality, Skills, or Preference) and answer the questions honestly. Your results will be used to generate personalized career recommendations.', category: 'assessments', order: 1 },
      { question: 'How are career recommendations generated?', answer: 'Our recommendation engine uses a weighted scoring algorithm that considers your interests (35%), skills (25%), education (15%), work preferences (15%), and career stage (10%) to match you with the best-fitting careers from our database.', category: 'recommendations', order: 1 },
      { question: 'Can I retake assessments?', answer: 'Yes! You can retake any assessment as many times as you like. Your latest results will be used for recommendations, and your history is saved for reference.', category: 'assessments', order: 2 },
      { question: 'What is the Skill Gap Analysis?', answer: 'Skill Gap Analysis compares your current skills against the requirements of a target career. It shows which skills you already have, which need improvement, and which are missing — along with a recommended action plan.', category: 'features', order: 1 },
      { question: 'How do I download my career report?', answer: 'Go to the Report section (available from your dashboard) and click "Generate Report". A PDF will be generated with your profile summary, assessment results, top recommendations, and learning roadmap.', category: 'features', order: 2 },
      { question: 'Is my data secure?', answer: 'Yes. We use industry-standard security practices including encrypted passwords, JWT authentication, HTTPS, and secure database connections. Your personal data is never shared with third parties.', category: 'general', order: 2 },
      { question: 'Can I use CareerSoulmate for free?', answer: 'Yes, CareerSoulmate is completely free to use. All features including assessments, recommendations, skill gap analysis, and the AI chatbot are available at no cost.', category: 'general', order: 3 },
      { question: 'How do I use the AI Career Advisor?', answer: 'Click the chat icon on any page to open the AI Career Advisor. You can ask questions about careers, skills, salary expectations, or get personalized advice based on your profile.', category: 'features', order: 3 },
      { question: 'How do I save careers for later?', answer: 'Click the bookmark icon on any career card to save it. You can view all your saved items from the "Saved Items" section in your profile.', category: 'features', order: 4 },
    ];
    await FAQ.insertMany(faqs.map(f => ({ ...f, is_active: true })));
    console.log(`✅ ${faqs.length} FAQs seeded`);
  } else {
    console.log(`✅ FAQs already exist (${existingFAQs}), skipping`);
  }

  // ──── 9. System Settings ──────────────────────────────
  const existingSettings = await SystemSetting.countDocuments();
  if (existingSettings === 0) {
    const settings = [
      { key: 'platform_name', value: 'CareerSoulmate', category: 'general', description: 'Platform display name' },
      { key: 'recommendation_count', value: '15', category: 'recommendations', description: 'Number of recommendations to generate per batch' },
      { key: 'recommendation_weights', value: JSON.stringify({ interest: 0.35, skill: 0.25, education: 0.15, preference: 0.15, stage: 0.10 }), category: 'recommendations', description: 'Scoring weights for recommendation algorithm' },
      { key: 'maintenance_mode', value: 'false', category: 'system', description: 'Enable maintenance mode' },
      { key: 'chatbot_enabled', value: 'true', category: 'chatbot', description: 'Enable/disable chatbot' },
      { key: 'chatbot_model', value: 'gemini-2.0-flash', category: 'chatbot', description: 'AI model to use for chatbot' },
    ];
    await SystemSetting.insertMany(settings);
    console.log(`✅ ${settings.length} system settings seeded`);
  } else {
    console.log(`✅ Settings already exist, skipping`);
  }

  console.log('\n🎉 Seed complete!\n');
  process.exit(0);
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });
