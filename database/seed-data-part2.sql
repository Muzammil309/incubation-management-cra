-- =====================================================
-- SEED DATA PART 2 - MENTOR SESSIONS, EVENTS, INVESTORS, PERKS, AI INSIGHTS
-- =====================================================
-- Run this AFTER seed-data-corrected.sql
-- =====================================================

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

