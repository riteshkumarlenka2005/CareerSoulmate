
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CareerNode {
  id: string;
  label: string;
  subLabel?: string;
  overview: string;
  skills: string[];
  salaryRange: string;
  children?: CareerNode[];
}

const INITIAL_DATA: CareerNode[] = [
  {
    id: 'root',
    label: 'BEGIN YOUR JOURNEY',
    subLabel: 'ALL CAREER PATHS',
    overview: 'The nexus of all professional destinies. Start here to explore the multi-dimensional landscape of modern careers, from traditional sciences to emerging digital frontiers.',
    skills: ['Self-Discovery', 'Goal Setting', 'Strategic Planning'],
    salaryRange: 'Variable',
    children: [
      {
        id: 'hospitality_tourism',
        label: 'HOSPITALITY & TOURISM',
        overview: 'Mastering the art of service, travel experiences, and global leisure management.',
        skills: ['Guest Relations', 'Operations', 'Cultural Intelligence'],
        salaryRange: '$30k - $150k',
        children: [
          { id: 'hotel_management', label: 'HOTEL MANAGEMENT', overview: 'Overseeing operations of lodging establishments and luxury resorts.', skills: ['Revenue Management', 'Facility Ops'], salaryRange: '$45k - $120k' },
          { id: 'chef', label: 'CHEF', overview: 'Culinary experts specializing in food preparation and kitchen leadership.', skills: ['Gastronomy', 'Leadership'], salaryRange: '$35k - $150k+' },
          { id: 'baker', label: 'BAKER', overview: 'Specialists in the art of bread, pastry, and confectionery.', skills: ['Precision', 'Food Science'], salaryRange: '$30k - $70k' },
          { id: 'travel_consultant', label: 'TRAVEL CONSULTANT', overview: 'Strategic travel planners for corporate and leisure clients.', skills: ['Logistics', 'Itinerary Design'], salaryRange: '$40k - $85k' },
          { id: 'tour_guide', label: 'TOUR GUIDE', overview: 'Experts providing educational and entertaining narratives for tourists.', skills: ['Storytelling', 'Navigation'], salaryRange: '$30k - $65k' },
          { id: 'event_manager', label: 'EVENT MANAGER', overview: 'Architects of large-scale corporate and social gatherings.', skills: ['Budgeting', 'Project Management'], salaryRange: '$45k - $110k' },
          { id: 'cabin_crew', label: 'CABIN CREW', overview: 'Ensuring safety and service excellence in commercial aviation.', skills: ['Emergency Handling', 'Service'], salaryRange: '$35k - $90k' },
          { id: 'cruise_staff', label: 'CRUISE STAFF', overview: 'Managing hospitality and entertainment on luxury maritime vessels.', skills: ['Maritime Safety', 'Hospitality'], salaryRange: '$30k - $80k' }
        ]
      },
      {
        id: 'social_human_services',
        label: 'SOCIAL, NGO & HUMAN SERVICES',
        overview: 'Advancing social justice, community welfare, and organizational advocacy.',
        skills: ['Advocacy', 'Empathy', 'Public Policy'],
        salaryRange: '$35k - $130k',
        children: [
          { id: 'social_worker_ngo', label: 'SOCIAL WORKER', overview: 'Helping individuals and families navigate social and personal challenges.', skills: ['Counseling', 'Case Management'], salaryRange: '$40k - $75k' },
          { id: 'ngo_manager', label: 'NGO MANAGER', overview: 'Leading non-profit organizations to achieve humanitarian goals.', skills: ['Fundraising', 'Strategic Leadership'], salaryRange: '$50k - $110k' },
          { id: 'community_organizer', label: 'COMMUNITY ORGANIZER', overview: 'Mobilizing citizens to solve local issues and advocate for change.', skills: ['Networking', 'Activism'], salaryRange: '$35k - $70k' },
          { id: 'policy_analyst', label: 'POLICY ANALYST', overview: 'Evaluating government and organizational policies for social impact.', skills: ['Data Analysis', 'Writing'], salaryRange: '$60k - $130k' },
          { id: 'human_rights_advocate', label: 'HUMAN RIGHTS ADVOCATE', overview: 'Defending the legal and social rights of vulnerable populations.', skills: ['Legal Research', 'Lobbying'], salaryRange: '$45k - $95k' }
        ]
      },
      {
        id: 'finance_economics',
        label: 'FINANCE & ECONOMICS',
        overview: 'Managing wealth, analyzing markets, and architecting economic systems.',
        skills: ['Analysis', 'Mathematics', 'Market Literacy'],
        salaryRange: '$55k - $500k+',
        children: [
          { id: 'chartered_accountant', label: 'CHARTERED ACCOUNTANT', overview: 'Specialized experts in auditing, taxation, and financial compliance.', skills: ['Tax Law', 'Auditing'], salaryRange: '$65k - $180k' },
          { id: 'financial_analyst', label: 'FINANCIAL ANALYST', overview: 'Evaluating investment opportunities and business performance.', skills: ['Financial Modeling', 'Excel'], salaryRange: '$70k - $150k' },
          { id: 'investment_banker', label: 'INVESTMENT BANKER', overview: 'Advising corporations on capital raising and mergers & acquisitions.', skills: ['Valuation', 'Negotiation'], salaryRange: '$120k - $500k+' },
          { id: 'actuary', label: 'ACTUARY', overview: 'Managing risk through advanced statistical and mathematical models.', skills: ['Probability', 'Risk Theory'], salaryRange: '$85k - $210k' },
          { id: 'economist', label: 'ECONOMIST', overview: 'Researching the production and distribution of resources and wealth.', skills: ['Econometrics', 'Research'], salaryRange: '$80k - $190k' },
          { id: 'risk_analyst', label: 'RISK ANALYST', overview: 'Identifying and mitigating potential financial losses for organizations.', skills: ['Predictive Modeling', 'Compliance'], salaryRange: '$70k - $140k' },
          { id: 'stock_trader', label: 'STOCK TRADER', overview: 'Executing trades in financial markets for institutional or personal gain.', skills: ['Technical Analysis', 'Discipline'], salaryRange: '$50k - $1M+' }
        ]
      },
      {
        id: 'transportation_logistics',
        label: 'TRANSPORTATION & LOGISTICS',
        overview: 'Managing the movement of goods and people across global supply chains.',
        skills: ['Logistics', 'Operations', 'Supply Chain Management'],
        salaryRange: '$35k - $250k',
        children: [
          { id: 'pilot', label: 'PILOT', overview: 'Operating aircraft for commercial, private, or military aviation.', skills: ['Navigation', 'Technical Ops'], salaryRange: '$80k - $250k' },
          { id: 'commercial_driver', label: 'COMMERCIAL DRIVER', overview: 'Operating heavy vehicles for goods and passenger transit.', skills: ['Safety', 'Maintenance'], salaryRange: '$35k - $75k' },
          { id: 'ship_captain', label: 'SHIP CAPTAIN', overview: 'Commanding maritime vessels for global trade and transit.', skills: ['Marine Navigation', 'Command'], salaryRange: '$70k - $180k' },
          { id: 'logistics_manager', label: 'LOGISTICS MANAGER', overview: 'Coordinating the efficient flow of goods from origin to consumption.', skills: ['Operations', 'ERP Systems'], salaryRange: '$60k - $130k' },
          { id: 'supply_chain_analyst', label: 'SUPPLY CHAIN ANALYST', overview: 'Optimizing supply chains through data-driven performance metrics.', skills: ['Data Analysis', 'Optimization'], salaryRange: '$55k - $110k' },
          { id: 'warehouse_manager', label: 'WAREHOUSE MANAGER', overview: 'Overseeing storage operations and inventory accuracy.', skills: ['Inventory Control', 'Safety'], salaryRange: '$45k - $95k' }
        ]
      },
      {
        id: 'environment_sustainability',
        label: 'ENVIRONMENT & SUSTAINABILITY',
        overview: 'Protecting natural ecosystems and architecting a sustainable global future.',
        skills: ['Ecology', 'Engineering', 'Conservation'],
        salaryRange: '$45k - $180k',
        children: [
          { id: 'environmental_scientist', label: 'ENVIRONMENTAL SCIENTIST', overview: 'Researching environmental health and developing protection strategies.', skills: ['Bio-Chemistry', 'Field Research'], salaryRange: '$55k - $110k' },
          { id: 'climate_researcher', label: 'CLIMATE RESEARCHER', overview: 'Studying long-term atmospheric trends and climate impact.', skills: ['Data Modeling', 'Geophysics'], salaryRange: '$60k - $130k' },
          { id: 'renewable_energy_engineer', label: 'RENEWABLE ENERGY ENGINEER', overview: 'Designing systems for solar, wind, and sustainable power.', skills: ['Electrical Eng', 'Thermodynamics'], salaryRange: '$75k - $155k' },
          { id: 'sustainability_consultant', label: 'SUSTAINABILITY CONSULTANT', overview: 'Advising corporations on ESG and ecological impact reduction.', skills: ['ESG Reporting', 'Strategy'], salaryRange: '$70k - $145k' },
          { id: 'waste_management_specialist', label: 'WASTE MANAGEMENT SPECIALIST', overview: 'Designing systems for recycling and efficient refuse disposal.', skills: ['Process Engineering', 'Compliance'], salaryRange: '$45k - $90k' }
        ]
      },
      {
        id: 'vocational_careers',
        label: 'SKILL-BASED & VOCATIONAL CAREERS',
        overview: 'Essential specialized trades and technical skills that power the physical infrastructure and industrial core of society.',
        skills: ['Technical Proficiency', 'Safety Standards', 'Problem Solving'],
        salaryRange: '$25k - $95k',
        children: [
          { id: 'electrician', label: 'ELECTRICIAN', overview: 'Installation and maintenance of electrical systems for residential and industrial power.', skills: ['Circuitry', 'Safety Protocols', 'Wiring'], salaryRange: '$40k - $85k' },
          { id: 'plumber', label: 'PLUMBER', overview: 'Specialists in water systems, drainage, and industrial fluid management.', skills: ['Pipefitting', 'Blueprint Reading'], salaryRange: '$35k - $80k' },
          { id: 'carpenter', label: 'CARPENTER', overview: 'Structural and finish woodworking for construction and bespoke furniture design.', skills: ['Woodworking', 'Layout', 'Math'], salaryRange: '$30k - $75k' },
          { id: 'welder', label: 'WELDER', overview: 'Joining metals through advanced heat and fusion techniques for aerospace to construction.', skills: ['TIG/MIG Welding', 'Metallurgy'], salaryRange: '$40k - $90k' },
          { id: 'mechanic', label: 'MECHANIC', overview: 'Diagnostics and repair of mechanical systems, ranging from automotive to heavy machinery.', skills: ['Diagnostics', 'Engine Repair'], salaryRange: '$35k - $85k' },
          { id: 'technician', label: 'TECHNICIAN', overview: 'Technical specialists supporting complex system maintenance and hardware operations.', skills: ['Hardware', 'Maintenance'], salaryRange: '$40k - $80k' },
          { id: 'hvac_expert', label: 'AC/REFRIGERATION EXPERT', overview: 'Thermodynamics and climate control maintenance for high-efficiency systems.', skills: ['HVAC Systems', 'Coolant Handling'], salaryRange: '$45k - $95k' },
          { id: 'cnc_operator', label: 'CNC OPERATOR', overview: 'Precision manufacturing through Computer Numerical Control machinery.', skills: ['G-Code', 'CAD/CAM', 'Precision Tools'], salaryRange: '$40k - $85k' }
        ]
      },
      {
        id: 'education_teaching',
        label: 'EDUCATION & TEACHING',
        overview: 'Shaping the minds of tomorrow through pedagogic excellence, digital knowledge dissemination, and institutional leadership.',
        skills: ['Pedagogy', 'Communication', 'Mentorship'],
        salaryRange: '$30k - $200k',
        children: [
          { id: 'school_teacher', label: 'SCHOOL TEACHER', overview: 'Foundational educators shaping primary and secondary academic journeys.', skills: ['Classroom Mgmt', 'Child Psychology'], salaryRange: '$35k - $80k' },
          { id: 'college_professor', label: 'COLLEGE PROFESSOR', overview: 'Research-intensive roles in higher education and university leadership.', skills: ['Doctoral Research', 'Grant Writing'], salaryRange: '$85k - $190k' },
          { id: 'lecturer', label: 'LECTURER', overview: 'Academic specialists focused on high-quality subject matter instruction.', skills: ['Expertise', 'Public Speaking'], salaryRange: '$55k - $115k' },
          { id: 'research_scholar', label: 'RESEARCH SCHOLAR', overview: 'Advanced academics dedicated to pushing the boundaries of scientific and social knowledge.', skills: ['Methodology', 'Publication'], salaryRange: '$40k - $100k' },
          { id: 'education_consultant', label: 'EDUCATION CONSULTANT', overview: 'Strategic advisors helping institutions and individuals navigate academic complexity.', skills: ['Strategy', 'Accreditation'], salaryRange: '$75k - $155k' },
          { id: 'online_educator', label: 'ONLINE EDUCATOR', overview: 'Digital-first teachers leveraging global platforms for decentralized learning.', skills: ['Engagement', 'Video Tools'], salaryRange: '$40k - $300k+' },
          { id: 'academic_content_creator', label: 'ACADEMIC CONTENT CREATOR', overview: 'Designers of the instructional materials and digital resources of the future.', skills: ['Instructional Design', 'LMS Admin'], salaryRange: '$45k - $110k' }
        ]
      },
      {
        id: 'education_academics',
        label: 'EDUCATION & ACADEMICS',
        overview: 'The pursuit of knowledge through structured learning, research, and intellectual exploration across diverse disciplines.',
        skills: ['Research', 'Pedagogy', 'Curriculum Design'],
        salaryRange: '$40k - $120k',
        children: [
          {
            id: 'arts_humanities',
            label: 'ARTS & HUMANITIES',
            overview: 'Studying the human condition, historical contexts, and creative expression to shape culture and society.',
            skills: ['Critical Thinking', 'Analysis', 'Communication'],
            salaryRange: '$45k - $150k',
            children: [
              { id: 'history', label: 'HISTORY', overview: 'Analyzing the past to understand the present and project the future.', skills: ['Archiving', 'Historiography'], salaryRange: '$50k - $85k' },
              { id: 'geography', label: 'GEOGRAPHY', overview: 'The study of places and the relationships between people and environments.', skills: ['GIS', 'Spatial Analysis'], salaryRange: '$55k - $90k' },
              { id: 'political_science', label: 'POLITICAL SCIENCE', overview: 'The theory and practice of politics and government systems.', skills: ['Policy Analysis', 'Diplomacy'], salaryRange: '$60k - $110k' },
              { id: 'sociology', label: 'SOCIOLOGY', overview: 'The study of social life, social change, and human behavior.', skills: ['Data Collection', 'Societal Analysis'], salaryRange: '$55k - $95k' },
              { id: 'psychology', label: 'PSYCHOLOGY', overview: 'The scientific study of the human mind and its complex functions.', skills: ['Clinical Practice', 'Counseling'], salaryRange: '$70k - $150k' },
              { id: 'philosophy', label: 'PHILOSOPHY', overview: 'Exploration of fundamental questions about existence, knowledge, and ethics.', skills: ['Logic', 'Ethics'], salaryRange: '$50k - $100k' },
              { id: 'economics', label: 'ECONOMICS', overview: 'Analyzing the production, distribution, and consumption of goods.', skills: ['Econometrics', 'Financial Modeling'], salaryRange: '$80k - $180k' },
              { id: 'journalism', label: 'JOURNALISM', overview: 'The activity of gathering, assessing, and presenting news.', skills: ['Reporting', 'Media Ethics'], salaryRange: '$45k - $120k' },
              { id: 'public_administration', label: 'PUBLIC ADMINISTRATION', overview: 'Implementation of government policy and management of public programs.', skills: ['Governance', 'Public Policy'], salaryRange: '$65k - $130k' },
              { id: 'anthropology', label: 'ANTHROPOLOGY', overview: 'The scientific study of humans, human behavior, and societies in the past and present.', skills: ['Ethnography', 'Cultural Analysis'], salaryRange: '$50k - $95k' },
              { id: 'archaeology', label: 'ARCHAEOLOGY', overview: 'The study of human history and prehistory through the excavation of sites and the analysis of artifacts.', skills: ['Excavation', 'Stratigraphy', 'Artifact Analysis'], salaryRange: '$45k - $90k' },
              { id: 'literature', label: 'LITERATURE', overview: 'In-depth study of written works (English, Regional, and Foreign) to understand culture, philosophy, and creative expression.', skills: ['Critical Analysis', 'Creative Writing', 'Linguistics'], salaryRange: '$40k - $100k' },
              { id: 'linguistics', label: 'LINGUISTICS', overview: 'The scientific study of language and its structure, including the study of morphology, syntax, and phonetics.', skills: ['Phonetics', 'Syntax', 'Computational Linguistics'], salaryRange: '$55k - $125k' },
              { id: 'mass_communication', label: 'MASS COMMUNICATION', overview: 'The process of imparting and exchanging information through mass media to large segments of the population.', skills: ['Media Production', 'Public Relations', 'Digital Content'], salaryRange: '$45k - $115k' },
              { id: 'international_relations', label: 'INTERNATIONAL RELATIONS', overview: 'The study of the interconnectedness of politics, economics, and law on a global scale.', skills: ['Diplomacy', 'Global Strategy', 'Foreign Policy'], salaryRange: '$60k - $155k' },
              { id: 'social_work_humanities', label: 'SOCIAL WORK', overview: 'A practice-based profession and an academic discipline that promotes social change and development.', skills: ['Crisis Intervention', 'Case Management', 'Advocacy'], salaryRange: '$40k - $85k' }
            ]
          },
          {
            id: 'science',
            label: 'SCIENCE',
            overview: 'Systematic study of the structure and behavior of the physical and natural world through observation.',
            skills: ['Scientific Method', 'Lab Research', 'Data Modeling'],
            salaryRange: '$60k - $200k',
            children: [
              {
                id: 'physics',
                label: 'PHYSICS',
                overview: 'The fundamental study of matter, its motion, energy, and force.',
                skills: ['Mathematics', 'Theoretical Modeling'],
                salaryRange: '$70k - $160k',
                children: [
                  { id: 'astrophysics', label: 'ASTROPHYSICS', overview: 'Studying the physical properties of celestial bodies.', skills: ['Cosmology', 'Spectroscopy'], salaryRange: '$90k - $180k' },
                  { id: 'nuclear_physics', label: 'NUCLEAR PHYSICS', overview: 'Studying atomic nuclei and their constituents.', skills: ['Particle Physics', 'Radiation Sec'], salaryRange: '$95k - $190k' },
                  { id: 'quantum_physics', label: 'QUANTUM PHYSICS', overview: 'Matter and energy at the most fundamental, subatomic level.', skills: ['Quantum Mechanics', 'Cryptography'], salaryRange: '$100k - $210k' }
                ]
              },
              {
                id: 'chemistry',
                label: 'CHEMISTRY',
                overview: 'The study of the properties and behavior of chemical substances.',
                skills: ['Organic Synthesis', 'Analytical Chemistry'],
                salaryRange: '$65k - $150k',
                children: [
                  { id: 'organic_chemistry', label: 'ORGANIC CHEMISTRY', overview: 'The study of carbon-based compounds and reactions.', skills: ['Synthesis', 'Spectroscopy'], salaryRange: '$75k - $140k' },
                  { id: 'inorganic_chemistry', label: 'INORGANIC CHEMISTRY', overview: 'The study of non-organic compounds and minerals.', skills: ['Catalysis', 'Metallurgy'], salaryRange: '$70k - $130k' },
                  { id: 'physical_chemistry', label: 'PHYSICAL CHEMISTRY', overview: 'The application of physics to chemical systems.', skills: ['Thermodynamics', 'Kinetics'], salaryRange: '$80k - $155k' }
                ]
              },
              {
                id: 'biology',
                label: 'BIOLOGY',
                overview: 'The study of living organisms, their vital processes, and ecosystems.',
                skills: ['Microscopy', 'Genomics'],
                salaryRange: '$60k - $180k',
                children: [
                  { id: 'biotechnology', label: 'BIOTECHNOLOGY', overview: 'Using living systems to develop advanced products.', skills: ['Genetic Engineering', 'Fermentation'], salaryRange: '$85k - $160k' },
                  { id: 'genetics', label: 'GENETICS', overview: 'The study of heredity and the variation of inherited traits.', skills: ['Gene Sequencing', 'CRISPR'], salaryRange: '$90k - $175k' },
                  { id: 'microbiology', label: 'MICROBIOLOGY', overview: 'The study of microscopic organisms like bacteria and viruses.', skills: ['Pathology', 'Immunology'], salaryRange: '$70k - $145k' }
                ]
              }
            ]
          },
          {
            id: 'commerce_business',
            label: 'COMMERCE & BUSINESS STUDIES',
            overview: 'The exchange of goods and services and the management of economic and organizational activities.',
            skills: ['Financial Literacy', 'Strategic Management', 'Marketing'],
            salaryRange: '$55k - $250k',
            children: [
              { id: 'accounting', label: 'ACCOUNTING', overview: 'Recording and reporting complex financial transactions.', skills: ['Auditing', 'Taxation'], salaryRange: '$65k - $140k' },
              { id: 'finance', label: 'FINANCE', overview: 'Management of large amounts of money and investments.', skills: ['Investment Analysis', 'Corporate Finance'], salaryRange: '$85k - $250k' },
              { id: 'banking', label: 'BANKING', overview: 'The business of financial intermediation and capital protection.', skills: ['Risk Management', 'Asset Management'], salaryRange: '$70k - $200k' },
              { id: 'marketing', label: 'MARKETING', overview: 'Promoting and selling products through consumer insights.', skills: ['Brand Strategy', 'Consumer Behavior'], salaryRange: '$60k - $160k' },
              { id: 'human_resource', label: 'HUMAN RESOURCE MANAGEMENT', overview: 'Managing an organization\'s most valuable asset: its people.', skills: ['Talent Acquisition', 'Employee Relations'], salaryRange: '$65k - $150k' },
              { id: 'entrepreneurship', label: 'ENTREPRENEURSHIP', overview: 'The activity of setting up and scaling a business.', skills: ['Venture Capital', 'Business Dev'], salaryRange: '$50k - $1M+' }
            ]
          }
        ]
      },
      {
        id: 'engineering_technology',
        label: 'ENGINEERING & TECHNOLOGY',
        overview: 'Applying scientific and mathematical principles to design, build, and maintain structures and systems.',
        skills: ['Problem Solving', 'Technical Design', 'Systems Thinking'],
        salaryRange: '$80k - $300k',
        children: [
          {
            id: 'core_engineering',
            label: 'CORE ENGINEERING',
            overview: 'Traditional engineering disciplines that form the physical backbone of global industry.',
            skills: ['Mathematics', 'CAD', 'Thermodynamics'],
            salaryRange: '$75k - $180k',
            children: [
              { id: 'mechanical_engineering', label: 'MECHANICAL ENGINEERING', overview: 'Design and manufacturing of physical machines and tools.', skills: ['SolidWorks', 'Dynamics'], salaryRange: '$80k - $150k' },
              { id: 'civil_engineering', label: 'CIVIL ENGINEERING', overview: 'Design and construction of critical infrastructure.', skills: ['Structural Design', 'Surveying'], salaryRange: '$75k - $145k' },
              { id: 'electrical_engineering', label: 'ELECTRICAL ENGINEERING', overview: 'The study of electricity and its wide-scale applications.', skills: ['Power Systems', 'Circuit Design'], salaryRange: '$85k - $160k' },
              { id: 'electronics_engineering', label: 'ELECTRONICS ENGINEERING', overview: 'Designing electronic circuits, chips, and micro-systems.', skills: ['Embedded Systems', 'VLSI'], salaryRange: '$90k - $170k' },
              { id: 'chemical_engineering', label: 'CHEMICAL ENGINEERING', overview: 'Applying chemistry to industrial-scale production.', skills: ['Process Control', 'Thermodynamics'], salaryRange: '$85k - $155k' }
            ]
          },
          {
            id: 'computer_technology',
            label: 'COMPUTER & DIGITAL TECHNOLOGY',
            overview: 'Digital innovation, software architecture, and the evolution of the virtual world.',
            skills: ['Programming', 'Algorithms', 'Architecture'],
            salaryRange: '$90k - $300k',
            children: [
              { id: 'computer_science', label: 'COMPUTER SCIENCE ENGINEERING', overview: 'The theoretical and practical foundation of modern computing.', skills: ['C++', 'Data Structures'], salaryRange: '$100k - $200k' },
              { id: 'software_engineering', label: 'SOFTWARE ENGINEERING', overview: 'The systematic development and maintenance of software.', skills: ['Agile', 'DevOps'], salaryRange: '$95k - $180k' },
              { id: 'web_development', label: 'WEB DEVELOPMENT', overview: 'Building functional and beautiful applications for the web.', skills: ['React', 'Node.js'], salaryRange: '$80k - $160k' },
              { id: 'mobile_development', label: 'MOBILE APP DEVELOPMENT', overview: 'Creating high-performance applications for mobile devices.', skills: ['Swift', 'Kotlin'], salaryRange: '$85k - $170k' },
              { id: 'data_science', label: 'DATA SCIENCE', overview: 'Extracting knowledge and actionable insights from data.', skills: ['Statistics', 'Python'], salaryRange: '$110k - $220k' },
              { id: 'artificial_intelligence', label: 'ARTIFICIAL INTELLIGENCE', overview: 'Creating systems that simulate human intelligence.', skills: ['Neural Networks', 'LLMs'], salaryRange: '$130k - $300k' },
              { id: 'machine_learning', label: 'MACHINE LEARNING', overview: 'Developing algorithms that improve through data experience.', skills: ['Scikit-learn', 'PyTorch'], salaryRange: '$125k - $250k' },
              { id: 'cyber_security', label: 'CYBER SECURITY', overview: 'Protecting networks and systems from digital attacks.', skills: ['Pen-Testing', 'Encryption'], salaryRange: '$115k - $210k' },
              { id: 'cloud_computing', label: 'CLOUD COMPUTING', overview: 'On-demand delivery of IT resources over the internet.', skills: ['AWS', 'Kubernetes'], salaryRange: '$110k - $190k' }
            ]
          }
        ]
      },
      {
        id: 'medical_healthcare',
        label: 'MEDICAL & HEALTHCARE',
        overview: 'Maintaining or improving health via the prevention, diagnosis, and treatment of disease.',
        skills: ['Diagnostics', 'Empathy', 'Biological Sciences'],
        salaryRange: '$60k - $500k',
        children: [
          {
            id: 'clinical_careers',
            label: 'CLINICAL CAREERS',
            overview: 'Direct medical intervention, surgery, and advanced patient treatment.',
            skills: ['Surgery', 'Medicine', 'Ethics'],
            salaryRange: '$150k - $500k',
            children: [
              { id: 'doctor', label: 'DOCTOR', overview: 'Practitioner of medicine who diagnoses and treats human illness.', skills: ['Anatomy', 'Pathology'], salaryRange: '$200k - $500k' },
              { id: 'dentist', label: 'DENTIST', overview: 'Specialist practitioner in dental and oral health.', skills: ['Oral Surgery', 'Orthodontics'], salaryRange: '$150k - $350k' },
              { id: 'veterinary_doctor', label: 'VETERINARY DOCTOR', overview: 'Specialist in the treatment and health of animals.', skills: ['Animal Biology', 'Comparative Medicine'], salaryRange: '$90k - $180k' }
            ]
          },
          {
            id: 'allied_health',
            label: 'ALLIED HEALTH SCIENCES',
            overview: 'Health care professions distinct from medicine, dentistry, and nursing.',
            skills: ['Patient Care', 'Therapy', 'Pharmacology'],
            salaryRange: '$55k - $140k',
            children: [
              { id: 'nursing', label: 'NURSING', overview: 'The profession of caring for the sick and recovering.', skills: ['Critical Care', 'Pharmacology'], salaryRange: '$70k - $130k' },
              { id: 'pharmacy', label: 'PHARMACY', overview: 'The preparation and dispensing of medicinal drugs.', skills: ['Biochemistry', 'Compounding'], salaryRange: '$100k - $150k' },
              { id: 'physiotherapy', label: 'PHYSIOTHERAPY', overview: 'Treatment of injury and mobility by physical methods.', skills: ['Kinesiology', 'Rehabilitation'], salaryRange: '$65k - $120k' },
              { id: 'medical_lab_tech', label: 'MEDICAL LABORATORY TECHNOLOGY', overview: 'Performing clinical laboratory testing and analysis.', skills: ['Hematology', 'Microbiology'], salaryRange: '$55k - $95k' }
            ]
          }
        ]
      },
      {
        id: 'creative_design',
        label: 'CREATIVE & DESIGN',
        overview: 'Synthesizing aesthetics and functionality to create impactful visual and tactile experiences.',
        skills: ['Aesthetic Judgment', 'Design Thinking', 'Visual Arts'],
        salaryRange: '$50k - $200k',
        children: [
          {
            id: 'visual_arts',
            label: 'VISUAL ARTS',
            overview: 'Fine arts and illustrative crafts that communicate through form and color.',
            skills: ['Composition', 'Technique', 'Creativity'],
            salaryRange: '$45k - $120k',
            children: [
              { id: 'drawing_artist', label: 'DRAWING ARTIST', overview: 'Creation of detailed images using various analog and digital tools.', skills: ['Sketching', 'Drafting'], salaryRange: '$40k - $90k' },
              { id: 'painter', label: 'PAINTER', overview: 'The practice of applying media to a surface for artistic expression.', skills: ['Color Theory', 'Medium Mastery'], salaryRange: '$45k - $110k' },
              { id: 'illustrator', label: 'ILLUSTRATOR', overview: 'Creating visual representations for publications and media.', skills: ['Digital Painting', 'Narrative Art'], salaryRange: '$55k - $130k' },
              { id: 'concept_artist', label: 'CONCEPT ARTIST', overview: 'Visualizing ideas for use in high-end film or games.', skills: ['World Building', 'Rendering'], salaryRange: '$65k - $150k' }
            ]
          },
          {
            id: 'design_fields',
            label: 'DESIGN',
            overview: 'Applied arts focusing on solving complex problems through visual solutions.',
            skills: ['Prototyping', 'User Research', 'Layout'],
            salaryRange: '$60k - $200k',
            children: [
              { id: 'graphic_design', label: 'GRAPHIC DESIGN', overview: 'Communicating messages through visual content and layout.', skills: ['Typography', 'Adobe Suite'], salaryRange: '$50k - $110k' },
              { id: 'ui_ux_design', label: 'UI/UX DESIGN', overview: 'Enhancing user satisfaction through seamless interaction.', skills: ['Figma', 'Wireframing'], salaryRange: '$85k - $180k' },
              { id: 'fashion_design', label: 'FASHION DESIGN', overview: 'Designing clothing, footwear, and lifestyle accessories.', skills: ['Textile Design', 'Pattern Making'], salaryRange: '$60k - $160k' },
              { id: 'interior_design', label: 'INTERIOR DESIGN', overview: 'Enhancing the interior and functionality of buildings.', skills: ['Spatial Planning', 'AutoCAD'], salaryRange: '$55k - $140k' }
            ]
          }
        ]
      },
      {
        id: 'performing_entertainment',
        label: 'PERFORMING & ENTERTAINMENT ARTS',
        overview: 'Creative activity performed in front of an audience, across stage and screen.',
        skills: ['Stage Presence', 'Technique', 'Auditioning'],
        salaryRange: '$30k - $5M+',
        children: [
          { id: 'actor', label: 'ACTOR', overview: 'Representing a character in a performance or production.', skills: ['Method Acting', 'Improvisation'], salaryRange: '$40k - $2M+' },
          { id: 'singer', label: 'SINGER', overview: 'Performing music using the voice as a primary instrument.', skills: ['Vocal Range', 'Music Theory'], salaryRange: '$35k - $1M+' },
          { id: 'musician', label: 'MUSICIAN', overview: 'Playing an instrument or composing musical pieces.', skills: ['Instrumental Mastery', 'Composition'], salaryRange: '$40k - $500k' },
          { id: 'dancer', label: 'DANCER', overview: 'Expressing ideas through rhythmic and aesthetic body movement.', skills: ['Choreography', 'Flexibility'], salaryRange: '$30k - $200k' },
          { id: 'comedian', label: 'COMEDIAN', overview: 'Seeking to entertain people through humor and performance.', skills: ['Timing', 'Writing'], salaryRange: '$40k - $1M+' }
        ]
      },
      {
        id: 'sports_athletics',
        label: 'SPORTS & ATHLETICS',
        overview: 'Professional competitive physical activities and high-level strategic mental sports.',
        skills: ['Discipline', 'Tactical Intelligence', 'Physiology'],
        salaryRange: '$30k - $50M+',
        children: [
          { id: 'cricket', label: 'CRICKET', overview: 'Professional bat-and-ball sport played globally.', skills: ['Batting', 'Bowling'], salaryRange: '$50k - $10M+' },
          { id: 'football', label: 'FOOTBALL', overview: 'Professional association football (soccer).', skills: ['Endurance', 'Ball Control'], salaryRange: '$40k - $50M+' },
          { id: 'badminton', label: 'BADMINTON', overview: 'Professional racquet sport played on a court.', skills: ['Agility', 'Reflexes'], salaryRange: '$35k - $500k' },
          { id: 'athletics', label: 'ATHLETICS', overview: 'Competitive running, jumping, and throwing disciplines.', skills: ['Strength', 'Speed'], salaryRange: '$30k - $1M+' },
          { id: 'chess', label: 'CHESS', overview: 'Professional high-stakes strategic board sport.', skills: ['Calculation', 'Strategy'], salaryRange: '$40k - $1M+' },
          { id: 'esports', label: 'ESPORTS', overview: 'Competitive professional video gaming at an elite level.', skills: ['APM', 'Team Coordination'], salaryRange: '$40k - $2M+' }
        ]
      },
      {
        id: 'agriculture_rural',
        label: 'AGRICULTURE & RURAL CAREERS',
        overview: 'The science, art, and business of cultivating plants and livestock for global supply.',
        skills: ['Ecology', 'Logistics', 'Soil Science'],
        salaryRange: '$30k - $200k',
        children: [
          { id: 'farmer', label: 'FARMER', overview: 'Managing large-scale crop and livestock production.', skills: ['Crop Management', 'Machinery'], salaryRange: '$30k - $100k' },
          { id: 'organic_farming', label: 'ORGANIC FARMING', overview: 'Farming without synthetic chemicals for health-conscious markets.', skills: ['Permaculture', 'Bio-dynamics'], salaryRange: '$45k - $130k' },
          { id: 'agri_business', label: 'AGRI-BUSINESS', overview: 'The management and marketing of agricultural products.', skills: ['Supply Chain', 'Economics'], salaryRange: '$60k - $180k' },
          { id: 'fisheries', label: 'FISHERIES', overview: 'The industry of catching, rearing, and selling fish.', skills: ['Aquaculture', 'Marine Biology'], salaryRange: '$40k - $120k' }
        ]
      },
      {
        id: 'business_entrepreneurship',
        label: 'BUSINESS & ENTREPRENEURSHIP',
        overview: 'Creating, managing, and scaling new or existing business ventures.',
        skills: ['Innovation', 'Risk Management', 'Leadership'],
        salaryRange: '$0 - $Billions',
        children: [
          { id: 'startup_founder', label: 'STARTUP FOUNDER', overview: 'Building a scalable innovative company from the ground up.', skills: ['Pitching', 'Growth Hacking'], salaryRange: 'Variable' },
          { id: 'business_owner', label: 'BUSINESS OWNER', overview: 'Managing a traditional and profitable business entity.', skills: ['Operations', 'Finance'], salaryRange: '$60k - $500k' },
          { id: 'shopkeeper', label: 'SHOPKEEPER', overview: 'Managing and operating a local retail establishment.', skills: ['Inventory', 'Sales'], salaryRange: '$30k - $150k' },
          { id: 'ecommerce_seller', label: 'E-COMMERCE SELLER', overview: 'Selling products through global digital marketplaces.', skills: ['SEO', 'Digital Marketing'], salaryRange: '$40k - $1M+' }
        ]
      },
      {
        id: 'government_law',
        label: 'GOVERNMENT, LAW & PUBLIC SERVICES',
        overview: 'Maintaining social order, justice, and administering essential public services.',
        skills: ['Governance', 'Legal Analysis', 'Integrity'],
        salaryRange: '$60k - $1M+',
        children: [
          { id: 'civil_services', label: 'CIVIL SERVICES (IAS, IPS, IFS)', overview: 'High-level administration and public policy leadership.', skills: ['Administration', 'Policy'], salaryRange: '$80k - $250k' },
          { id: 'defense_services', label: 'DEFENSE SERVICES', overview: 'Professional military and national security services.', skills: ['Tactics', 'Leadership'], salaryRange: '$60k - $200k' },
          { id: 'lawyer', label: 'LAWYER', overview: 'Practitioner who advises clients on complex legal matters.', skills: ['Litigation', 'Negotiation'], salaryRange: '$80k - $500k' },
          { id: 'judge', label: 'JUDGE', overview: 'Public officer appointed to decide legal cases in a court of law.', skills: ['Jurisprudence', 'Decision Making'], salaryRange: '$120k - $400k' }
        ]
      },
      {
        id: 'media_digital',
        label: 'MEDIA & DIGITAL CAREERS',
        overview: 'Content creation, marketing, and distribution in the hyper-connected digital age.',
        skills: ['Content Strategy', 'Networking', 'Digital Tools'],
        salaryRange: '$40k - $10M+',
        children: [
          { id: 'youtuber', label: 'YOUTUBER', overview: 'Creating video content for global social platforms.', skills: ['Editing', 'Storytelling'], salaryRange: 'Variable' },
          { id: 'content_creator', label: 'CONTENT CREATOR', overview: 'Producing high-impact digital assets across various media.', skills: ['Graphic Design', 'Copywriting'], salaryRange: '$45k - $500k' },
          { id: 'digital_marketer', label: 'DIGITAL MARKETER', overview: 'Marketing products and services using digital technologies.', skills: ['SEM', 'Social Ads'], salaryRange: '$55k - $200k' },
          { id: 'social_media_manager', label: 'SOCIAL MEDIA MANAGER', overview: 'Managing brand presence and communities on social networks.', skills: ['Community Mgmt', 'Analytics'], salaryRange: '$50k - $140k' }
        ]
      },
      {
        id: 'science_research_space',
        label: 'SCIENCE, RESEARCH & SPACE',
        overview: 'Advancing the frontiers of human knowledge and multi-planetary exploration.',
        skills: ['Advanced Mathematics', 'Engineering', 'Observation'],
        salaryRange: '$80k - $250k',
        children: [
          { id: 'scientist', label: 'SCIENTIST', overview: 'Expert practitioner who conducts rigorous scientific research.', skills: ['Investigation', 'Experimentation'], salaryRange: '$90k - $200k' },
          { id: 'researcher', label: 'RESEARCHER', overview: 'Individual carrying out academic or scientific study in depth.', skills: ['Literature Review', 'Publishing'], salaryRange: '$80k - $180k' },
          { id: 'space_scientist', label: 'SPACE SCIENTIST', overview: 'Studying outer space, astrophysics, and planetary systems.', skills: ['Astrophysics', 'Remote Sensing'], salaryRange: '$100k - $220k' },
          { id: 'rocket_engineer', label: 'ROCKET ENGINEER', overview: 'Designing and building space launch and orbital vehicles.', skills: ['Aerodynamics', 'Propulsion'], salaryRange: '$110k - $250k' }
        ]
      }
    ]
  }
];

const HORIZONTAL_GAP = 380;
const VERTICAL_UNIT = 110; 
const NODE_WIDTH = 260;

interface NodePosition {
  x: number;
  y: number;
}

interface CareerTreePageProps {
  onNavigate?: (page: string) => void;
}

const CareerTreePage: React.FC<CareerTreePageProps> = () => {
  const navigate = useNavigate();
  const onNavigate = (page: string) => navigate(page === 'explorer' ? '/career-explorer' : page === 'comparison' ? '/explore' : page === 'home' ? '/' : `/${page}`);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['root', 'vocational_careers', 'education_teaching', 'engineering_technology', 'medical_healthcare']));
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.5);
  const [offset, setOffset] = useState({ x: 100, y: window.innerHeight / 2 });
  const [isLocked, setIsLocked] = useState(true);
  const [isPanning, setIsPanning] = useState(false);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [nodeOverrides, setNodeOverrides] = useState<Record<string, NodePosition>>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const panStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const getSubtreeHeight = (node: CareerNode): number => {
    if (!expandedIds.has(node.id) || !node.children || node.children.length === 0) return 1;
    return node.children.reduce((acc, child) => acc + getSubtreeHeight(child), 0);
  };

  const defaultPositions = useMemo(() => {
    const pos: Record<string, any> = {};
    const layout = (node: CareerNode, depth: number, yOffset: number, parentId?: string) => {
      const height = getSubtreeHeight(node);
      const x = depth * HORIZONTAL_GAP;
      const y = yOffset + (height * VERTICAL_UNIT) / 2;
      pos[node.id] = { x, y, depth, parentId, ...node };
      if (expandedIds.has(node.id) && node.children) {
        let childY = yOffset;
        node.children.forEach(child => {
          layout(child, depth + 1, childY, node.id);
          childY += getSubtreeHeight(child) * VERTICAL_UNIT;
        });
      }
    };
    const totalHeight = getSubtreeHeight(INITIAL_DATA[0]);
    layout(INITIAL_DATA[0], 0, - (totalHeight * VERTICAL_UNIT) / 2);
    return pos;
  }, [expandedIds]);

  const positionedNodes = useMemo(() => {
    return Object.keys(defaultPositions).map(id => {
      const def = defaultPositions[id];
      const override = nodeOverrides[id];
      return {
        ...def,
        x: override ? override.x : def.x,
        y: override ? override.y : def.y,
      };
    });
  }, [defaultPositions, nodeOverrides]);

  const activePathIds = useMemo(() => {
    const targetId = hoveredNodeId || selectedNodeId;
    if (!targetId) return new Set<string>();
    const path = new Set<string>();
    let currentId: string | undefined = targetId;
    while (currentId) {
      path.add(currentId);
      const node = positionedNodes.find(n => n.id === currentId);
      currentId = node?.parentId;
    }
    return path;
  }, [hoveredNodeId, selectedNodeId, positionedNodes]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return positionedNodes.filter(n => 
      n.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, positionedNodes]);

  const toggleNode = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const downloadPath = (nodeId: string) => {
    const path = [];
    let curr: string | undefined = nodeId;
    while (curr) {
      const node = positionedNodes.find(n => n.id === curr);
      if (node) path.unshift(node.label);
      curr = node?.parentId;
    }
    const blob = new Blob([`CAREER ROADMAP\n\nGenerated for: ${path[path.length - 1]}\n\nPath From Root: ${path.join(' → ')}\n\nTimestamp: ${new Date().toLocaleString()}\n(C) Career Soulmate AI Intelligence`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Roadmap_${path[path.length - 1].replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const nodeEl = target.closest('.node-element');
    
    if (nodeEl && !isLocked) {
      const id = nodeEl.getAttribute('data-node-id');
      if (id) {
        setDraggingNodeId(id);
        return;
      }
    }

    setIsPanning(true);
    panStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNodeId) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - offset.x) / zoom;
      const y = (e.clientY - rect.top - offset.y) / zoom;
      setNodeOverrides(prev => ({ ...prev, [draggingNodeId]: { x, y } }));
    } else if (isPanning) {
      setOffset({
        x: e.clientX - panStart.current.x,
        y: e.clientY - panStart.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
  };

  const currentPinchDistance = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    const nodeEl = target.closest('.node-element');
    
    if (e.touches.length === 1) {
      if (nodeEl && !isLocked) {
        const id = nodeEl.getAttribute('data-node-id');
        if (id) {
          setDraggingNodeId(id);
          return;
        }
      }
      setIsPanning(true);
      panStart.current = { x: e.touches[0].clientX - offset.x, y: e.touches[0].clientY - offset.y };
    } else if (e.touches.length === 2) {
      setIsPanning(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      currentPinchDistance.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      if (draggingNodeId) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = (e.touches[0].clientX - rect.left - offset.x) / zoom;
        const y = (e.touches[0].clientY - rect.top - offset.y) / zoom;
        setNodeOverrides(prev => ({ ...prev, [draggingNodeId]: { x, y } }));
      } else if (isPanning) {
        setOffset({
          x: e.touches[0].clientX - panStart.current.x,
          y: e.touches[0].clientY - panStart.current.y,
        });
      }
    } else if (e.touches.length === 2 && currentPinchDistance.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (dist - currentPinchDistance.current) * 0.005;
      setZoom(prev => Math.min(Math.max(prev + delta, 0.1), 3));
      currentPinchDistance.current = dist;
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
    currentPinchDistance.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY * -0.001;
    setZoom(prev => Math.min(Math.max(prev + delta, 0.1), 3));
  };

  const resetView = () => {
    setZoom(0.5);
    setOffset({ x: 100, y: window.innerHeight / 2 });
    setNodeOverrides({});
  };

  const focusNode = (nodeId: string) => {
    const node = positionedNodes.find(n => n.id === nodeId);
    if (!node) return;
    setOffset({
      x: (window.innerWidth / 2) - (node.x * zoom),
      y: (window.innerHeight / 2) - (node.y * zoom)
    });
    setHoveredNodeId(nodeId);
    setSelectedNodeId(nodeId);
    setIsSearchOpen(false);
  };

  const selectedNodeData = positionedNodes.find(n => n.id === selectedNodeId);

  const getNodeTheme = (id: string, parentId?: string) => {
    const lowId = id.toLowerCase();
    
    if (id === 'root') return { color: 'white', border: 'border-white/40', accent: 'bg-white', glow: 'shadow-[0_0_20px_white]' };
    
    // Tech & Computer & Engineering
    if (lowId.includes('tech') || lowId.includes('computer') || lowId.includes('engineering') || lowId.includes('ai') || lowId.includes('machine') || lowId.includes('cyber') || lowId.includes('cloud') || lowId.includes('software')) {
      return { color: 'blue', border: 'border-blue-500/50', accent: 'bg-blue-500', glow: 'shadow-[0_0_20px_#3b82f6]' };
    }
    // Medical & Healthcare & Life Sciences
    if (lowId.includes('medical') || lowId.includes('health') || lowId.includes('doctor') || lowId.includes('dentist') || lowId.includes('nursing') || lowId.includes('pharmacy') || lowId.includes('clinical') || lowId.includes('bio')) {
      return { color: 'green', border: 'border-green-500/50', accent: 'bg-green-500', glow: 'shadow-[0_0_20px_#22c55e]' };
    }
    // Vocational & Skill-Based & Transportation Specialty
    if (lowId.includes('vocational') || lowId.includes('skill') || lowId.includes('electrician') || lowId.includes('plumber') || lowId.includes('carpenter') || lowId.includes('welder') || lowId.includes('mechanic') || lowId.includes('technician') || lowId.includes('hvac') || lowId.includes('cnc') || lowId.includes('transportation') || lowId.includes('logistics') || lowId.includes('pilot') || lowId.includes('driver')) {
      return { color: 'cyan', border: 'border-cyan-500/50', accent: 'bg-cyan-500', glow: 'shadow-[0_0_20px_#06b6d4]' };
    }
    // Teaching & Education Specialty
    if (lowId.includes('teaching') || lowId.includes('teacher') || lowId.includes('professor') || lowId.includes('lecturer') || lowId.includes('educator')) {
      return { color: 'teal', border: 'border-teal-500/50', accent: 'bg-teal-500', glow: 'shadow-[0_0_20px_#14b8a6]' };
    }
    // Creative & Design & Performing Arts & Hospitality
    if (lowId.includes('creative') || lowId.includes('design') || lowId.includes('art') || lowId.includes('visual') || lowId.includes('painter') || lowId.includes('fashion') || lowId.includes('illustrator') || lowId.includes('performing') || lowId.includes('entertainment') || lowId.includes('actor') || lowId.includes('singer') || lowId.includes('dancer') || lowId.includes('comedian') || lowId.includes('hospitality') || lowId.includes('tourism') || lowId.includes('chef') || lowId.includes('hotel')) {
      return { color: 'purple', border: 'border-purple-500/50', accent: 'bg-purple-500', glow: 'shadow-[0_0_20px_#a855f7]' };
    }
    // Business & Commerce & Entrepreneurship & Finance
    if (lowId.includes('business') || lowId.includes('commerce') || lowId.includes('entrepreneurship') || lowId.includes('startup') || lowId.includes('finance') || lowId.includes('accounting') || lowId.includes('banking') || lowId.includes('marketing') || lowId.includes('economist')) {
      return { color: 'amber', border: 'border-amber-500/50', accent: 'bg-amber-500', glow: 'shadow-[0_0_20px_#f59e0b]' };
    }
    // Science & Research & Space & Environment
    if (lowId.includes('science') || lowId.includes('research') || lowId.includes('physics') || lowId.includes('chemistry') || lowId.includes('biology') || lowId.includes('space') || lowId.includes('environment') || lowId.includes('sustainability') || lowId.includes('climate')) {
      return { color: 'indigo', border: 'border-indigo-500/50', accent: 'bg-indigo-500', glow: 'shadow-[0_0_20px_#6366f1]' };
    }
    // Arts & Humanities & Social Services & International Relations
    if (lowId.includes('arts_humanities') || lowId.includes('history') || lowId.includes('geography') || lowId.includes('psychology') || lowId.includes('sociology') || lowId.includes('philosophy') || lowId.includes('social') || lowId.includes('ngo') || lowId.includes('human_services') || lowId.includes('anthropology') || lowId.includes('archaeology') || lowId.includes('literature') || lowId.includes('linguistics') || lowId.includes('communication') || lowId.includes('relations')) {
      return { color: 'rose', border: 'border-rose-500/50', accent: 'bg-rose-500', glow: 'shadow-[0_0_20px_#f43f5e]' };
    }
    // Sports & Athletics
    if (lowId.includes('sports') || lowId.includes('athletics') || lowId.includes('cricket') || lowId.includes('football') || lowId.includes('esports')) {
      return { color: 'orange', border: 'border-orange-500/50', accent: 'bg-orange-500', glow: 'shadow-[0_0_20px_#f97316]' };
    }
    // Agriculture & Rural
    if (lowId.includes('agriculture') || lowId.includes('rural') || lowId.includes('farmer') || lowId.includes('farming')) {
      return { color: 'emerald', border: 'border-emerald-500/50', accent: 'bg-emerald-500', glow: 'shadow-[0_0_20px_#10b981]' };
    }
    // Gov & Law & Public Services
    if (lowId.includes('government') || lowId.includes('law') || lowId.includes('civil') || lowId.includes('defense') || lowId.includes('judge')) {
      return { color: 'slate', border: 'border-slate-500/50', accent: 'bg-slate-500', glow: 'shadow-[0_0_20px_#64748b]' };
    }
    // Media & Digital
    if (lowId.includes('media') || lowId.includes('digital') || lowId.includes('youtuber') || lowId.includes('content') || lowId.includes('social_media')) {
      return { color: 'sky', border: 'border-sky-500/50', accent: 'bg-sky-500', glow: 'shadow-[0_0_20px_#0ea5e9]' };
    }

    return { color: 'blue', border: 'border-blue-500/30', accent: 'bg-blue-500', glow: 'shadow-[0_0_15px_#3b82f6]' };
  };

  return (
    <div 
      className="relative w-full h-[calc(100vh-80px)] bg-[#000] text-white flex flex-col select-none overflow-hidden font-sans touch-none"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >


      {isSearchOpen && (
        <div 
          className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-xl z-[300] px-4 animate-in slide-in-from-top duration-300"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="bg-black/95 border border-white/10 p-3 rounded-2xl shadow-2xl backdrop-blur-xl">
            <div className="relative">
              <input 
                autoFocus
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search career node name..."
                className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-lg outline-none focus:border-blue-500 transition-all placeholder:text-gray-400"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {searchResults.length > 0 && (
              <div className="mt-2 max-h-72 overflow-y-auto custom-scrollbar">
                {searchResults.map(res => (
                  <div 
                    key={res.id}
                    className="w-full flex items-center justify-between p-4 hover:bg-blue-600/10 rounded-xl transition-all group/res border border-transparent hover:border-blue-500/20"
                  >
                    <button 
                      onClick={() => focusNode(res.id)}
                      className="flex-grow text-left"
                    >
                      <p className="text-sm font-black text-white group-hover/res:text-blue-400 uppercase tracking-widest">{res.label}</p>
                      <p className="text-xs text-gray-300 uppercase font-black">{res.subLabel || 'Career Path'}</p>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); downloadPath(res.id); }} 
                      title="Download Path from Root"
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedNodeData && (
        <div 
          className="fixed top-20 bottom-0 right-0 w-full md:w-[480px] bg-[#080808]/98 border-l border-white/10 z-[300] shadow-[-20px_0_60px_rgba(0,0,0,0.8)] animate-in slide-in-from-right duration-500 backdrop-blur-3xl overflow-hidden flex flex-col"
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="p-5 md:p-8 lg:p-10 pb-4 flex justify-between items-start">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-xs font-black text-blue-400 rounded uppercase tracking-widest">Neural Dossier</span>
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">{selectedNodeData.label}</h2>
            </div>
            <button 
              onClick={() => setSelectedNodeId(null)} 
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/10 shrink-0"
            >
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto custom-scrollbar p-5 md:p-8 lg:p-10 pt-0 space-y-12 pb-16 md:pb-24 lg:pb-32">
            <section className="space-y-4">
              <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em]">Strategic Overview</h4>
              <p className="text-gray-200 text-sm leading-relaxed font-medium">{selectedNodeData.overview}</p>
            </section>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <p className="text-sm font-black text-gray-300 uppercase mb-2">Projected Salary</p>
                <p className="text-white font-black uppercase text-xs">{selectedNodeData.salaryRange}</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <p className="text-sm font-black text-gray-300 uppercase mb-2">Demand Level</p>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-blue-500' : 'bg-white/10'}`} />)}
                </div>
              </div>
            </div>

            <section className="space-y-4">
              <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em]">Core Competencies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedNodeData.skills.map(s => (
                  <span key={s} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-gray-200 uppercase tracking-widest hover:text-white hover:border-blue-500 transition-all">{s}</span>
                ))}
              </div>
            </section>

            <button 
              onClick={() => downloadPath(selectedNodeData.id)}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl shadow-blue-600/40"
            >
              Generate Full Roadmap
            </button>
          </div>
        </div>
      )}

      <div 
        ref={containerRef}
        className="flex-grow relative canvas-container"
        style={{ background: '#000' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.12] grid-pattern" />

        <div 
          className="absolute inset-0 transition-transform duration-75 ease-out"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
        >
          <svg className="absolute inset-0 w-[20000px] h-[20000px] pointer-events-none overflow-visible">
            <defs>
              <filter id="simple-flow-glow"><feGaussianBlur stdDeviation="2" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
              <filter id="active-flow-glow"><feGaussianBlur stdDeviation="5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
            </defs>
            {positionedNodes.map(node => {
              if (!node.parentId) return null;
              const parent = positionedNodes.find(p => p.id === node.parentId);
              if (!parent) return null;
              
              const x1 = parent.x + NODE_WIDTH / 2;
              const y1 = parent.y;
              const x2 = node.x - NODE_WIDTH / 2;
              const y2 = node.y;
              const midX = x1 + (x2 - x1) / 2;

              const isConnectionActive = activePathIds.has(node.id) && activePathIds.has(node.parentId);

              return (
                <g key={`link-group-${node.id}`}>
                  <path
                    d={`M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`}
                    stroke={isConnectionActive ? "#3b82f6" : "#1d4ed8"}
                    strokeWidth="3"
                    fill="none"
                    className={`transition-all duration-500 ${isConnectionActive ? 'opacity-60' : 'opacity-40'}`}
                  />
                  
                  {isConnectionActive && (
                    <g>
                      <path
                        d={`M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`}
                        stroke="#fff"
                        strokeWidth="1.5"
                        fill="none"
                        className="opacity-90"
                        filter="url(#simple-flow-glow)"
                      />
                      <path
                        d={`M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`}
                        stroke="#fff"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="50 150"
                        className="animate-electric-flow"
                        filter="url(#active-flow-glow)"
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {positionedNodes.map(node => {
            const isNodeActive = activePathIds.has(node.id);
            const isDirectHover = hoveredNodeId === node.id;
            const isDragging = draggingNodeId === node.id;
            const isSelected = selectedNodeId === node.id;
            const hasChildren = node.children && node.children.length > 0;
            const theme = getNodeTheme(node.id, node.parentId);

            return (
              <div
                key={node.id}
                data-node-id={node.id}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`absolute node-element group transition-transform ${isDragging ? 'z-[100]' : isNodeActive ? 'z-50' : 'z-10'}`}
                style={{ 
                  left: node.x, 
                  top: node.y, 
                  width: NODE_WIDTH, 
                  transform: `translate(-50%, -50%) ${isDragging ? 'scale(1.1)' : ''}`,
                }}
              >
                <div className={`absolute -top-6 left-0 text-sm font-black uppercase tracking-[0.2em] transition-colors duration-500 ${isNodeActive ? 'text-white' : 'text-gray-300'}`}>
                  {node.parentId ? `BRANCH_LVL_0${node.depth}` : 'ROOT_ORIGIN'}
                </div>

                <div 
                  onClick={() => {
                    if (!draggingNodeId) {
                      toggleNode(node.id);
                      setSelectedNodeId(node.id);
                    }
                  }}
                  className={`relative flex items-center h-[65px] bg-slate-950 border-2 transition-all duration-300 backdrop-blur-md cursor-pointer
                    ${isNodeActive ? `border-${theme.color}-400 bg-${theme.color}-950/40 ${theme.glow}` : `${theme.border} hover:border-${theme.color}-400/80 hover:${theme.glow}`}
                    ${isSelected ? `ring-2 ring-white border-${theme.color}-300` : ''}
                  `}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-500 ${isNodeActive ? 'bg-white' : theme.accent}`} />
                  
                  <div className="flex-grow pl-5 pr-10 flex flex-col justify-center">
                    <h3 className={`text-sm font-black uppercase tracking-widest font-sans leading-none transition-colors duration-300 ${isNodeActive ? 'text-white' : 'text-slate-100 group-hover:text-white'}`}>
                      {node.label}
                    </h3>
                  </div>

                  {hasChildren && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className={`w-2 h-2 rounded-full animate-pulse transition-all duration-500 shadow-[0_0_8px_#22c55e] bg-green-500`} title="Explore Paths" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-50 flex flex-row md:flex-col gap-3 md:gap-4 bg-black/70 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-2 md:p-0 rounded-2xl md:rounded-none border border-white/10 md:border-0">
        {[
          { 
            icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>, 
            action: () => setIsSearchOpen(!isSearchOpen), 
            label: 'Search Career Nodes', 
            active: isSearchOpen 
          },
          { icon: '+', action: () => setZoom(z => Math.min(3, z + 0.2)), label: 'Zoom In' },
          { icon: '−', action: () => setZoom(z => Math.max(0.1, z - 0.2)), label: 'Zoom Out' },
          { icon: '⌂', action: resetView, label: 'Reset Visualization' },
          { 
            icon: isLocked ? '🔒' : '🔓', 
            action: () => setIsLocked(!isLocked), 
            label: isLocked ? 'Unlock Node Dragging' : 'Lock Node Dragging', 
            active: !isLocked 
          }
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            title={btn.label}
            className={`w-11 h-11 md:w-12 md:h-12 flex items-center justify-center font-black text-xl transition-all border shadow-2xl relative group rounded-xl md:rounded-none
              ${btn.active ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_#3b82f6]' : 'bg-black/80 border-white/10 text-blue-500 hover:text-white hover:bg-blue-600'}
            `}
          >
            {typeof btn.icon === 'string' ? <span className="relative z-10">{btn.icon}</span> : btn.icon}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      <style>{`
        .node-element { pointer-events: auto; }
        .grid-pattern {
          background-image: 
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px);
          background-size: 40px 40px;
        }
        @keyframes electricFlowMove {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        .animate-electric-flow {
          animation: electricFlowMove 1s linear infinite;
          opacity: 1;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.4); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.6); }
      `}</style>
    </div>
  );
};

export default CareerTreePage;
