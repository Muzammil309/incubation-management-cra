-- =====================================================
-- SEED DATA FOR INCUBATION MANAGEMENT PLATFORM
-- =====================================================
-- This file contains realistic sample data for demonstration
-- =====================================================

-- Clean existing data (for development only)
TRUNCATE TABLE
    organizations, users, cohorts, startups, startup_members,
    kpi_definitions, startup_kpis, goals,
    applications, documents, cap_table_entries,
    mentors, mentor_sessions, mentor_matchmaking_scores,
    events, event_rsvps,
    courses, course_modules, lessons, course_enrollments, lesson_progress, certificates,
    investors, investment_rounds, investments, investor_portal_access,
    forum_categories, forum_threads, forum_replies,
    announcements, announcement_reads, newsletters,
    audit_logs, gdpr_consents, data_export_requests, custom_reports,
    alumni, perks, perk_redemptions, ai_insights
CASCADE;

-- =====================================================
-- ORGANIZATIONS
-- =====================================================

INSERT INTO organizations (id, name, slug, logo_url, website, description) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'TechVenture Incubator', 'techventure', 'https://example.com/logos/techventure.png', 'https://techventure.com', 'Leading technology startup incubator focused on AI, SaaS, and FinTech ventures');

-- =====================================================
-- USERS
-- =====================================================

-- Admin Users
INSERT INTO users (id, organization_id, email, full_name, role, phone, bio, linkedin_url, expertise_tags) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'admin@techventure.com', 'Sarah Johnson', 'admin', '+1-555-0101', 'Program Director with 10+ years in startup ecosystem', 'https://linkedin.com/in/sarahjohnson', ARRAY['program_management', 'fundraising', 'mentorship']),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'staff@techventure.com', 'Michael Chen', 'staff', '+1-555-0102', 'Operations Manager', 'https://linkedin.com/in/michaelchen', ARRAY['operations', 'events', 'community']);

-- Founder Users
INSERT INTO users (id, organization_id, email, full_name, role, phone, bio, linkedin_url, expertise_tags) VALUES
('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 'john@aianalytics.com', 'John Smith', 'founder', '+1-555-0201', 'CEO & Co-founder of AI Analytics', 'https://linkedin.com/in/johnsmith', ARRAY['ai', 'machine_learning', 'data_science']),
('660e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 'jane@aianalytics.com', 'Jane Doe', 'founder', '+1-555-0202', 'CTO & Co-founder of AI Analytics', 'https://linkedin.com/in/janedoe', ARRAY['engineering', 'ai', 'product']),
('660e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', 'alex@finflow.com', 'Alex Rodriguez', 'founder', '+1-555-0203', 'Founder & CEO of FinFlow', 'https://linkedin.com/in/alexrodriguez', ARRAY['fintech', 'payments', 'blockchain']),
('660e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440000', 'emily@healthtech.com', 'Emily Watson', 'founder', '+1-555-0204', 'Founder of HealthTech Solutions', 'https://linkedin.com/in/emilywatson', ARRAY['healthtech', 'telemedicine', 'ai']),
('660e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440000', 'david@ecomart.com', 'David Lee', 'founder', '+1-555-0205', 'Co-founder of EcoMart', 'https://linkedin.com/in/davidlee', ARRAY['ecommerce', 'sustainability', 'logistics']);

-- Mentor Users
INSERT INTO users (id, organization_id, email, full_name, role, phone, bio, linkedin_url, expertise_tags) VALUES
('660e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440000', 'mentor1@example.com', 'Dr. Lisa Anderson', 'mentor', '+1-555-0301', 'Former VP of Engineering at Google, AI/ML expert', 'https://linkedin.com/in/lisaanderson', ARRAY['ai', 'machine_learning', 'engineering', 'scaling']),
('660e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440000', 'mentor2@example.com', 'Robert Martinez', 'mentor', '+1-555-0302', 'Serial entrepreneur, 3 successful exits', 'https://linkedin.com/in/robertmartinez', ARRAY['fundraising', 'sales', 'growth', 'exits']),
('660e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440000', 'mentor3@example.com', 'Jennifer Kim', 'mentor', '+1-555-0303', 'Former CFO at FinTech unicorn', 'https://linkedin.com/in/jenniferkim', ARRAY['finance', 'fundraising', 'fintech', 'operations']);

-- Investor Users
INSERT INTO users (id, organization_id, email, full_name, role, phone, bio, linkedin_url, expertise_tags) VALUES
('660e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000', 'investor1@vc.com', 'Thomas Wilson', 'investor', '+1-555-0401', 'Partner at Venture Capital Firm', 'https://linkedin.com/in/thomaswilson', ARRAY['venture_capital', 'saas', 'ai']),
('660e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000', 'investor2@angel.com', 'Patricia Brown', 'investor', '+1-555-0402', 'Angel investor, 50+ investments', 'https://linkedin.com/in/patriciabrown', ARRAY['angel_investing', 'healthtech', 'ecommerce']);

-- =====================================================
-- COHORTS
-- =====================================================

INSERT INTO cohorts (id, organization_id, name, description, start_date, end_date, status, capacity, program_type, vertical) VALUES
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Cohort 2024 Q1', 'First cohort of 2024 focusing on AI and SaaS startups', '2024-01-15', '2024-06-15', 'completed', 15, 'Accelerator', 'AI/SaaS'),
('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Cohort 2024 Q3', 'Third cohort of 2024 with diverse verticals', '2024-07-01', '2024-12-31', 'active', 20, 'Accelerator', 'Mixed'),
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Cohort 2025 Q1', 'Upcoming cohort for early 2025', '2025-01-15', '2025-06-30', 'planning', 15, 'Accelerator', 'FinTech/HealthTech');

-- =====================================================
-- STARTUPS
-- =====================================================

INSERT INTO startups (id, organization_id, cohort_id, name, slug, logo_url, website, description, vertical, stage, business_model, founded_date, status, mrr, arr, burn_rate, runway_months, total_funding, valuation, team_size) VALUES
-- Active startups in current cohort
('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440002', 'AI Analytics Pro', 'ai-analytics-pro', 'https://example.com/logos/aianalytics.png', 'https://aianalytics.com', 'AI-powered business analytics platform for SMBs', 'AI/SaaS', 'early_traction', 'B2B SaaS', '2023-06-01', 'active', 45000.00, 540000.00, 75000.00, 18, 1500000.00, 8000000.00, 12),
('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440002', 'FinFlow', 'finflow', 'https://example.com/logos/finflow.png', 'https://finflow.com', 'Modern payment infrastructure for emerging markets', 'FinTech', 'growth', 'B2B SaaS', '2023-03-15', 'active', 120000.00, 1440000.00, 150000.00, 24, 5000000.00, 25000000.00, 28),
('880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440002', 'HealthTech Solutions', 'healthtech-solutions', 'https://example.com/logos/healthtech.png', 'https://healthtech.com', 'Telemedicine platform with AI diagnostics', 'HealthTech', 'early_traction', 'B2C/B2B', '2023-08-01', 'active', 35000.00, 420000.00, 60000.00, 15, 1200000.00, 6000000.00, 15),
('880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440002', 'EcoMart', 'ecomart', 'https://example.com/logos/ecomart.png', 'https://ecomart.com', 'Sustainable e-commerce marketplace', 'E-commerce', 'mvp', 'Marketplace', '2024-01-10', 'active', 15000.00, 180000.00, 45000.00, 12, 800000.00, 4000000.00, 8),

-- Graduated startups from previous cohort
('880e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', '770e8400-e29b-41d4-a716-446655440001', 'DataViz Pro', 'dataviz-pro', 'https://example.com/logos/dataviz.png', 'https://dataviz.com', 'Data visualization platform for enterprises', 'AI/SaaS', 'scale', 'B2B SaaS', '2022-09-01', 'graduated', 250000.00, 3000000.00, 200000.00, 36, 15000000.00, 75000000.00, 45);

-- =====================================================
-- STARTUP TEAM MEMBERS
-- =====================================================

INSERT INTO startup_members (startup_id, user_id, role, is_founder, equity_percentage, joined_at) VALUES
-- AI Analytics Pro team
('880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440010', 'CEO & Co-founder', true, 40.00, '2023-06-01'),
('880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440011', 'CTO & Co-founder', true, 40.00, '2023-06-01'),

-- FinFlow team
('880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440012', 'Founder & CEO', true, 60.00, '2023-03-15'),

-- HealthTech Solutions team
('880e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440013', 'Founder & CEO', true, 55.00, '2023-08-01'),

-- EcoMart team
('880e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440014', 'Co-founder & CEO', true, 50.00, '2024-01-10');

-- =====================================================
-- KPI DEFINITIONS
-- =====================================================

INSERT INTO kpi_definitions (id, organization_id, name, description, unit, category, target_type) VALUES
('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Monthly Recurring Revenue (MRR)', 'Monthly recurring revenue from subscriptions', 'USD', 'financial', 'increase'),
('990e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Annual Recurring Revenue (ARR)', 'Annual recurring revenue', 'USD', 'financial', 'increase'),
('990e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Burn Rate', 'Monthly cash burn rate', 'USD', 'financial', 'decrease'),
('990e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 'Runway', 'Months of runway remaining', 'months', 'financial', 'increase'),
('990e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', 'Customer Acquisition Cost (CAC)', 'Cost to acquire a new customer', 'USD', 'customer', 'decrease'),
('990e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', 'Customer Lifetime Value (LTV)', 'Lifetime value of a customer', 'USD', 'customer', 'increase'),
('990e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440000', 'Monthly Active Users (MAU)', 'Number of monthly active users', 'users', 'growth', 'increase'),
('990e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440000', 'Churn Rate', 'Monthly customer churn rate', 'percentage', 'customer', 'decrease'),
('990e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440000', 'Net Promoter Score (NPS)', 'Customer satisfaction score', 'score', 'customer', 'increase'),
('990e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 'Growth Rate', 'Month-over-month growth rate', 'percentage', 'growth', 'increase');

-- =====================================================
-- STARTUP KPIs (Sample data for last 6 months)
-- =====================================================

-- AI Analytics Pro KPIs
INSERT INTO startup_kpis (startup_id, kpi_definition_id, value, target_value, reporting_period, period_type) VALUES
-- MRR progression
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 25000.00, 50000.00, '2024-04-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 30000.00, 50000.00, '2024-05-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 35000.00, 50000.00, '2024-06-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 38000.00, 50000.00, '2024-07-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 42000.00, 50000.00, '2024-08-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 45000.00, 50000.00, '2024-09-01', 'monthly'),

-- CAC
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440005', 1200.00, 800.00, '2024-09-01', 'monthly'),

-- LTV
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440006', 8500.00, 10000.00, '2024-09-01', 'monthly'),

-- MAU
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440007', 2500.00, 5000.00, '2024-09-01', 'monthly'),

-- Churn Rate
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440008', 3.5, 2.0, '2024-09-01', 'monthly'),

-- NPS
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440009', 65.00, 70.00, '2024-09-01', 'monthly'),

-- Growth Rate
('880e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440010', 15.5, 20.0, '2024-09-01', 'monthly');

-- FinFlow KPIs (higher performing)
INSERT INTO startup_kpis (startup_id, kpi_definition_id, value, target_value, reporting_period, period_type) VALUES
('880e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', 120000.00, 150000.00, '2024-09-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440005', 800.00, 600.00, '2024-09-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440006', 12000.00, 15000.00, '2024-09-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440007', 8500.00, 10000.00, '2024-09-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440008', 2.1, 2.0, '2024-09-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440009', 72.00, 70.00, '2024-09-01', 'monthly'),
('880e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440010', 22.5, 20.0, '2024-09-01', 'monthly');

-- =====================================================
-- GOALS
-- =====================================================

INSERT INTO goals (id, startup_id, title, description, target_value, current_value, unit, period_start, period_end, status, created_by) VALUES
('aa0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 'Reach $50K MRR', 'Achieve $50,000 in monthly recurring revenue', 50000.00, 45000.00, 'USD', '2024-07-01', '2024-12-31', 'in_progress', '660e8400-e29b-41d4-a716-446655440010'),
('aa0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001', 'Reduce CAC to $800', 'Lower customer acquisition cost to $800', 800.00, 1200.00, 'USD', '2024-07-01', '2024-12-31', 'in_progress', '660e8400-e29b-41d4-a716-446655440010'),
('aa0e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440001', 'Achieve 5,000 MAU', 'Reach 5,000 monthly active users', 5000.00, 2500.00, 'users', '2024-07-01', '2024-12-31', 'in_progress', '660e8400-e29b-41d4-a716-446655440010'),
('aa0e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440002', 'Close Series A', 'Raise $10M Series A funding', 10000000.00, 5000000.00, 'USD', '2024-07-01', '2024-12-31', 'in_progress', '660e8400-e29b-41d4-a716-446655440012'),
('aa0e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440002', 'Expand to 3 new markets', 'Launch in 3 additional countries', 3.00, 1.00, 'markets', '2024-07-01', '2024-12-31', 'in_progress', '660e8400-e29b-41d4-a716-446655440012');

-- =====================================================
-- APPLICATIONS
-- =====================================================

INSERT INTO applications (id, cohort_id, applicant_email, applicant_name, company_name, stage, application_data, score, reviewer_notes, reviewed_by, reviewed_at) VALUES
('bb0e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440003', 'founder@newstartup1.com', 'Alice Cooper', 'AI Vision Tech', 'shortlisted', '{"pitch": "AI-powered computer vision for retail", "team_size": 3, "funding_sought": 500000}', 85, 'Strong technical team, interesting use case', '660e8400-e29b-41d4-a716-446655440001', '2024-09-15 10:30:00'),
('bb0e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440003', 'founder@newstartup2.com', 'Bob Williams', 'FinTech Innovate', 'interview', '{"pitch": "Blockchain-based remittance platform", "team_size": 4, "funding_sought": 750000}', 78, 'Good market opportunity, needs stronger go-to-market', '660e8400-e29b-41d4-a716-446655440001', '2024-09-16 14:20:00'),
('bb0e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440003', 'founder@newstartup3.com', 'Carol Davis', 'HealthAI', 'accepted', '{"pitch": "AI diagnostics for primary care", "team_size": 5, "funding_sought": 1000000}', 92, 'Excellent team, strong traction, accepted!', '660e8400-e29b-41d4-a716-446655440001', '2024-09-18 16:45:00'),
('bb0e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440003', 'founder@newstartup4.com', 'Daniel Garcia', 'EduTech Pro', 'applied', '{"pitch": "Personalized learning platform", "team_size": 2, "funding_sought": 400000}', NULL, NULL, NULL, NULL),
('bb0e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440003', 'founder@newstartup5.com', 'Eva Martinez', 'GreenEnergy Solutions', 'rejected', '{"pitch": "Solar panel marketplace", "team_size": 2, "funding_sought": 300000}', 45, 'Not a good fit for our program focus', '660e8400-e29b-41d4-a716-446655440001', '2024-09-12 09:15:00');



-- =====================================================
-- DOCUMENTS
-- =====================================================

INSERT INTO documents (id, startup_id, uploaded_by, title, description, document_type, file_url, file_size, file_type, is_confidential, access_level, version) VALUES
('cc0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440010', 'AI Analytics Pitch Deck Q3 2024', 'Latest pitch deck for investors', 'pitch_deck', 'https://storage.example.com/docs/aianalytics-pitch-q3-2024.pdf', 5242880, 'application/pdf', true, 'investors', 3),
('cc0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440010', 'NDA Template', 'Standard NDA for partnerships', 'nda', 'https://storage.example.com/docs/aianalytics-nda.pdf', 1048576, 'application/pdf', true, 'admin', 1),
('cc0e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440011', 'Financial Projections 2024-2026', 'Three-year financial model', 'financial', 'https://storage.example.com/docs/aianalytics-financials.xlsx', 2097152, 'application/vnd.ms-excel', true, 'investors', 2),
('cc0e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440012', 'FinFlow Pitch Deck', 'Series A pitch deck', 'pitch_deck', 'https://storage.example.com/docs/finflow-pitch.pdf', 7340032, 'application/pdf', true, 'investors', 1),
('cc0e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440012', 'ESOP Plan', 'Employee stock option plan', 'esop', 'https://storage.example.com/docs/finflow-esop.pdf', 1572864, 'application/pdf', true, 'team', 1);

-- =====================================================
-- CAP TABLE
-- =====================================================

INSERT INTO cap_table_entries (startup_id, stakeholder_name, stakeholder_type, shares, share_class, percentage, investment_amount, investment_date) VALUES
-- AI Analytics Pro cap table
('880e8400-e29b-41d4-a716-446655440001', 'John Smith', 'founder', 4000000, 'Common', 40.00, NULL, '2023-06-01'),
('880e8400-e29b-41d4-a716-446655440001', 'Jane Doe', 'founder', 4000000, 'Common', 40.00, NULL, '2023-06-01'),
('880e8400-e29b-41d4-a716-446655440001', 'Seed Investors Pool', 'investor', 1500000, 'Preferred', 15.00, 1500000.00, '2023-09-01'),
('880e8400-e29b-41d4-a716-446655440001', 'Employee Option Pool', 'employee', 500000, 'Options', 5.00, NULL, '2023-06-01'),

-- FinFlow cap table
('880e8400-e29b-41d4-a716-446655440002', 'Alex Rodriguez', 'founder', 6000000, 'Common', 60.00, NULL, '2023-03-15'),
('880e8400-e29b-41d4-a716-446655440002', 'Series A Investors', 'investor', 3000000, 'Preferred', 30.00, 5000000.00, '2024-02-01'),
('880e8400-e29b-41d4-a716-446655440002', 'Employee Option Pool', 'employee', 1000000, 'Options', 10.00, NULL, '2023-03-15');

-- =====================================================
-- MENTORS
-- =====================================================

INSERT INTO mentors (id, organization_id, user_id, title, company, expertise_areas, industries, availability_hours, hourly_rate, is_available, rating, total_sessions) VALUES
('dd0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440020', 'Former VP of Engineering', 'Google', ARRAY['ai', 'machine_learning', 'engineering', 'scaling', 'hiring'], ARRAY['SaaS', 'AI', 'Enterprise'], 10, 500.00, true, 4.8, 45),
('dd0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440021', 'Serial Entrepreneur', 'Multiple Exits', ARRAY['fundraising', 'sales', 'growth', 'exits', 'strategy'], ARRAY['SaaS', 'E-commerce', 'FinTech'], 15, 400.00, true, 4.9, 67),
('dd0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440022', 'Former CFO', 'FinTech Unicorn', ARRAY['finance', 'fundraising', 'fintech', 'operations', 'compliance'], ARRAY['FinTech', 'Banking', 'Payments'], 8, 450.00, true, 4.7, 32);

-- =====================================================
-- MENTOR SESSIONS
-- =====================================================

INSERT INTO mentor_sessions (id, mentor_id, startup_id, scheduled_at, duration_minutes, status, meeting_link, agenda, notes, feedback_rating, feedback_text, goals, action_items, created_by) VALUES
-- Completed sessions
('ee0e8400-e29b-41d4-a716-446655440001', 'dd0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '2024-08-15 14:00:00', 60, 'completed', 'https://zoom.us/j/123456789', 'Discuss ML model optimization and scaling strategy', 'Reviewed current architecture. Recommended moving to microservices. Discussed hiring strategy for ML engineers.', 5, 'Extremely helpful! Dr. Anderson provided actionable insights on our ML pipeline.', ARRAY['Optimize ML pipeline', 'Plan hiring for Q4'], ARRAY['Implement batch processing', 'Create job descriptions for 2 ML engineers', 'Research Kubernetes for deployment'], '660e8400-e29b-41d4-a716-446655440010'),
('ee0e8400-e29b-41d4-a716-446655440002', 'dd0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', '2024-08-20 10:00:00', 60, 'completed', 'https://zoom.us/j/987654321', 'Series A fundraising strategy', 'Discussed pitch deck, investor targeting, and valuation expectations. Reviewed financial model.', 5, 'Robert''s experience with fundraising was invaluable. Got great intros to VCs.', ARRAY['Prepare for Series A', 'Refine pitch'], ARRAY['Update pitch deck with new metrics', 'Reach out to 5 VCs Robert recommended', 'Prepare data room'], '660e8400-e29b-41d4-a716-446655440012'),
('ee0e8400-e29b-41d4-a716-446655440003', 'dd0e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440002', '2024-09-05 15:00:00', 60, 'completed', 'https://zoom.us/j/456789123', 'Financial planning and unit economics', 'Deep dive into unit economics, CAC/LTV ratio, and burn rate optimization.', 4, 'Very detailed session on financial metrics. Need to implement tracking systems.', ARRAY['Improve unit economics', 'Reduce burn rate'], ARRAY['Set up financial dashboard', 'Analyze CAC by channel', 'Review vendor contracts'], '660e8400-e29b-41d4-a716-446655440012'),

-- Upcoming sessions
('ee0e8400-e29b-41d4-a716-446655440004', 'dd0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440003', '2024-10-15 11:00:00', 60, 'scheduled', 'https://zoom.us/j/111222333', 'AI model development for diagnostics', NULL, NULL, NULL, ARRAY['Build AI diagnostic model', 'Ensure regulatory compliance'], NULL, '660e8400-e29b-41d4-a716-446655440013'),
('ee0e8400-e29b-41d4-a716-446655440005', 'dd0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001', '2024-10-20 14:00:00', 60, 'scheduled', 'https://zoom.us/j/444555666', 'Growth strategy and customer acquisition', NULL, NULL, NULL, ARRAY['Scale customer acquisition', 'Improve conversion rates'], NULL, '660e8400-e29b-41d4-a716-446655440010');

-- =====================================================
-- MENTOR MATCHMAKING SCORES
-- =====================================================

INSERT INTO mentor_matchmaking_scores (mentor_id, startup_id, match_score, matching_factors) VALUES
('dd0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 95.00, '{"expertise_match": 0.95, "industry_match": 1.0, "stage_match": 0.9, "availability": 1.0}'),
('dd0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440003', 88.00, '{"expertise_match": 0.85, "industry_match": 0.9, "stage_match": 0.9, "availability": 1.0}'),
('dd0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 92.00, '{"expertise_match": 0.9, "industry_match": 0.95, "stage_match": 0.95, "availability": 1.0}'),
('dd0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440004', 78.00, '{"expertise_match": 0.75, "industry_match": 0.8, "stage_match": 0.8, "availability": 1.0}'),
('dd0e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440002', 94.00, '{"expertise_match": 0.95, "industry_match": 1.0, "stage_match": 0.9, "availability": 1.0}');

-- =====================================================
-- EVENTS
-- =====================================================

INSERT INTO events (id, organization_id, title, description, event_type, start_time, end_time, location, meeting_link, capacity, is_mandatory, target_audience, created_by) VALUES
-- Past events
('ff0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Fundraising 101 Workshop', 'Learn the fundamentals of startup fundraising', 'training', '2024-08-10 14:00:00', '2024-08-10 16:00:00', 'TechVenture HQ - Room A', 'https://zoom.us/j/workshop1', 30, false, 'founders', '660e8400-e29b-41d4-a716-446655440001'),
('ff0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Office Hours with Sarah', 'Open office hours for any questions', 'office_hours', '2024-09-05 10:00:00', '2024-09-05 12:00:00', 'TechVenture HQ - Room B', NULL, 10, false, 'founders', '660e8400-e29b-41d4-a716-446655440001'),

-- Upcoming events
('ff0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Demo Day 2024 Q3', 'Cohort Q3 2024 Demo Day for investors', 'demo_day', '2024-12-15 13:00:00', '2024-12-15 18:00:00', 'Grand Ballroom, Downtown Convention Center', 'https://zoom.us/j/demoday2024', 200, true, 'all', '660e8400-e29b-41d4-a716-446655440001'),
('ff0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 'Product Management Workshop', 'Building products users love', 'workshop', '2024-10-25 14:00:00', '2024-10-25 17:00:00', 'TechVenture HQ - Main Hall', 'https://zoom.us/j/pmworkshop', 40, false, 'founders', '660e8400-e29b-41d4-a716-446655440002'),
('ff0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', 'Networking Mixer', 'Connect with fellow founders and mentors', 'networking', '2024-11-08 18:00:00', '2024-11-08 21:00:00', 'TechVenture HQ - Rooftop', NULL, 60, false, 'all', '660e8400-e29b-41d4-a716-446655440002'),
('ff0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440000', 'Legal Essentials for Startups', 'Understanding startup legal requirements', 'training', '2024-10-30 10:00:00', '2024-10-30 12:00:00', 'TechVenture HQ - Room A', 'https://zoom.us/j/legalworkshop', 35, false, 'founders', '660e8400-e29b-41d4-a716-446655440001');

-- =====================================================
-- EVENT RSVPs
-- =====================================================

INSERT INTO event_rsvps (event_id, user_id, status, attended) VALUES
-- Past event attendance
('ff0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440010', 'going', true),
('ff0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440012', 'going', true),
('ff0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440013', 'going', false),
('ff0e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440010', 'going', true),

-- Upcoming event RSVPs
('ff0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440010', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440011', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440012', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440013', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440014', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440020', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440021', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440030', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440010', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440012', 'maybe', NULL),
('ff0e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440010', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440011', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440012', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440020', 'going', NULL),
('ff0e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440021', 'going', NULL);

-- =====================================================
-- INVESTORS
-- =====================================================

INSERT INTO investors (id, organization_id, user_id, name, firm_name, investor_type, email, phone, website, linkedin_url, investment_stage, preferred_verticals, min_check_size, max_check_size, geographic_focus, total_investments, total_invested, is_active) VALUES
('220e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440030', 'Thomas Wilson', 'Accel Ventures', 'vc', 'thomas@accelventures.com', '+1-555-0401', 'https://accelventures.com', 'https://linkedin.com/in/thomaswilson', ARRAY['seed', 'series_a', 'series_b'], ARRAY['SaaS', 'AI', 'FinTech'], 500000.00, 10000000.00, ARRAY['North America', 'Europe'], 45, 125000000.00, true),
('220e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440031', 'Patricia Brown', 'Angel Syndicate', 'angel', 'patricia@angelsyndicate.com', '+1-555-0402', 'https://angelsyndicate.com', 'https://linkedin.com/in/patriciabrown', ARRAY['pre_seed', 'seed'], ARRAY['HealthTech', 'E-commerce', 'EdTech'], 25000.00, 250000.00, ARRAY['North America'], 52, 8500000.00, true);

-- =====================================================
-- INVESTMENT ROUNDS
-- =====================================================

INSERT INTO investment_rounds (id, startup_id, round_name, round_type, target_amount, raised_amount, valuation, status, close_date) VALUES
('230e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 'Seed Round', 'seed', 1500000.00, 1500000.00, 8000000.00, 'closed', '2023-09-15'),
('230e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440002', 'Series A', 'series_a', 10000000.00, 5000000.00, 25000000.00, 'fundraising', NULL),
('230e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440003', 'Seed Round', 'seed', 1500000.00, 1200000.00, 6000000.00, 'closed', '2023-10-20');

-- =====================================================
-- INVESTMENTS
-- =====================================================

INSERT INTO investments (id, organization_id, startup_id, investor_id, round_id, amount, investment_date, investment_type, valuation, equity_percentage, pipeline_stage, notes) VALUES
('240e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440001', '220e8400-e29b-41d4-a716-446655440001', '230e8400-e29b-41d4-a716-446655440001', 1000000.00, '2023-09-15', 'equity', 8000000.00, 12.50, 'closed', 'Lead investor in seed round'),
('240e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440001', '220e8400-e29b-41d4-a716-446655440002', '230e8400-e29b-41d4-a716-446655440001', 500000.00, '2023-09-15', 'equity', 8000000.00, 6.25, 'closed', 'Angel participation in seed round'),
('240e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440002', '220e8400-e29b-41d4-a716-446655440001', '230e8400-e29b-41d4-a716-446655440002', 5000000.00, '2024-02-01', 'equity', 25000000.00, 20.00, 'closed', 'Series A lead investor'),
('240e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', '880e8400-e29b-41d4-a716-446655440003', '220e8400-e29b-41d4-a716-446655440002', '230e8400-e29b-41d4-a716-446655440003', 200000.00, '2023-10-20', 'safe', 6000000.00, NULL, 'closed', 'SAFE note with $6M cap');

-- =====================================================
-- PERKS
-- =====================================================

INSERT INTO perks (id, organization_id, provider_name, title, description, category, value_amount, value_description, redemption_url, is_active) VALUES
('250e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'AWS', 'AWS Activate Credits', '$100,000 in AWS cloud credits', 'Cloud Services', 100000.00, '$100,000 in credits', 'https://aws.amazon.com/activate', true),
('250e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'HubSpot', 'HubSpot for Startups', '90% off HubSpot for 1 year', 'Marketing', 5000.00, '90% discount for 1 year', 'https://hubspot.com/startups', true),
('250e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Stripe', 'Stripe Atlas', 'Free company incorporation + $5K credits', 'Legal & Finance', 5500.00, 'Free incorporation + $5K credits', 'https://stripe.com/atlas', true),
('250e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440000', 'Notion', 'Notion for Startups', 'Free Notion Plus for 1 year', 'Productivity', 960.00, 'Free Plus plan for 1 year', 'https://notion.so/startups', true),
('250e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440000', 'GitHub', 'GitHub Enterprise', 'Free GitHub Enterprise for 1 year', 'Development', 2100.00, 'Free Enterprise for 1 year', 'https://github.com/enterprise', true);

-- =====================================================
-- PERK REDEMPTIONS
-- =====================================================

INSERT INTO perk_redemptions (perk_id, startup_id, redeemed_by, notes) VALUES
('250e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440010', 'Redeemed AWS credits for infrastructure'),
('250e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440010', 'Using HubSpot for marketing automation'),
('250e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440012', 'AWS credits for production environment'),
('250e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440014', 'Used Stripe Atlas for incorporation'),
('250e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440012', 'GitHub Enterprise for team collaboration');

-- =====================================================
-- AI INSIGHTS
-- =====================================================

INSERT INTO ai_insights (id, organization_id, insight_type, entity_type, entity_id, title, description, confidence_score, data, is_acknowledged) VALUES
('260e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'kpi_anomaly', 'startup', '880e8400-e29b-41d4-a716-446655440001', 'Churn Rate Spike Detected', 'AI Analytics Pro experienced a 40% increase in churn rate last month. This may indicate product issues or increased competition.', 85.00, '{"previous_value": 2.5, "current_value": 3.5, "change_percentage": 40, "recommendation": "Conduct customer interviews to identify pain points"}', false),
('260e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'mentor_match', 'startup', '880e8400-e29b-41d4-a716-446655440003', 'High-Value Mentor Match Found', 'Dr. Lisa Anderson is a 95% match for HealthTech Solutions based on AI/ML expertise and healthcare industry experience.', 95.00, '{"mentor_id": "dd0e8400-e29b-41d4-a716-446655440001", "match_factors": {"expertise": 0.95, "industry": 0.9, "availability": 1.0}}', false),
('260e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'trend_analysis', 'cohort', '770e8400-e29b-41d4-a716-446655440002', 'Cohort Performance Above Average', 'Cohort 2024 Q3 is performing 25% better than historical averages across key metrics (MRR growth, fundraising success).', 78.00, '{"avg_mrr_growth": 18.5, "historical_avg": 14.8, "fundraising_success_rate": 75}', false);

-- =====================================================
-- ANNOUNCEMENTS
-- =====================================================

INSERT INTO announcements (id, organization_id, created_by, title, content, priority, target_audience, is_published, published_at) VALUES
('270e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'Demo Day 2024 Q3 - Save the Date!', 'Mark your calendars! Our Demo Day is scheduled for December 15th, 2024. All startups will have 5 minutes to pitch to our investor network.', 'high', 'all', true, '2024-09-01 09:00:00'),
('270e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440001', 'New Mentor Onboarded: Dr. Lisa Anderson', 'We''re excited to welcome Dr. Lisa Anderson, former VP of Engineering at Google, to our mentor network!', 'medium', 'founders', true, '2024-08-15 10:00:00'),
('270e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440002', 'Office Closure - Public Holiday', 'Our offices will be closed on October 31st for the public holiday. All scheduled events will be rescheduled.', 'low', 'all', true, '2024-10-20 14:00:00');

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- Seed data successfully loaded!
-- This includes:
-- - 1 Organization (TechVenture Incubator)
-- - 12 Users (2 admin/staff, 5 founders, 3 mentors, 2 investors)
-- - 3 Cohorts (1 completed, 1 active, 1 planning)
-- - 5 Startups (4 active, 1 graduated)
-- - 10 KPI Definitions
-- - Sample KPI data for 2 startups
-- - 5 Goals
-- - 5 Applications (various stages)
-- - 5 Documents
-- - Cap table entries for 2 startups
-- - 3 Mentors with sessions and matchmaking scores
-- - 6 Events (2 past, 4 upcoming)
-- - Event RSVPs
-- - 2 Investors with investment data
-- - 3 Investment rounds
-- - 4 Investments
-- - 5 Perks with redemptions
-- - 3 AI Insights
-- - 3 Announcements
