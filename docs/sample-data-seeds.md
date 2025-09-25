# Sample Data and Database Seeds

## Overview

This document provides comprehensive sample data for the Incubation Management Platform, designed for demonstration, testing, and development purposes. The data includes realistic scenarios across all user types and business workflows.

## Database Seeding Strategy

### Seeding Order (Due to Foreign Key Dependencies)
1. Organizations
2. Users
3. Programs & Cohorts
4. KPI Definitions
5. Startups & Team Members
6. Mentors
7. Investors
8. Applications
9. Sessions & Events
10. Investments & Documents

### Data Generation Approach
- **Realistic Data**: Names, companies, and scenarios based on real startup ecosystem
- **Diverse Representation**: Global locations, various industries, different stages
- **Consistent Relationships**: Logical connections between entities
- **Scalable Volume**: Configurable data size for different environments

## Sample Organizations

```sql
-- Demo Organizations
INSERT INTO organizations (id, name, slug, domain, description, settings) VALUES
('org_techstars_demo', 'TechStars Demo', 'techstars-demo', 'demo.techstars.com', 
 'Demo incubator for showcasing platform capabilities', 
 '{"theme": "blue", "features": ["mentoring", "investment", "events"]}'),

('org_y_combinator', 'Y Combinator Demo', 'yc-demo', 'demo.ycombinator.com',
 'Startup accelerator focused on early-stage companies',
 '{"theme": "orange", "features": ["all"]}'),

('org_500_startups', '500 Startups Demo', '500-demo', 'demo.500.co',
 'Global venture capital seed fund and startup accelerator',
 '{"theme": "green", "features": ["investment", "global"]}');
```

## Sample Users

```sql
-- Admin Users
INSERT INTO users (id, organization_id, email, first_name, last_name, role, is_active) VALUES
('usr_admin_001', 'org_techstars_demo', 'admin@techstars-demo.com', 'Sarah', 'Johnson', 'admin', true),
('usr_admin_002', 'org_y_combinator', 'admin@yc-demo.com', 'Michael', 'Chen', 'admin', true),

-- Program Managers
('usr_pm_001', 'org_techstars_demo', 'pm1@techstars-demo.com', 'Emily', 'Rodriguez', 'program_manager', true),
('usr_pm_002', 'org_techstars_demo', 'pm2@techstars-demo.com', 'David', 'Kim', 'program_manager', true),

-- Mentors
('usr_mentor_001', 'org_techstars_demo', 'mentor1@techstars-demo.com', 'Jennifer', 'Williams', 'mentor', true),
('usr_mentor_002', 'org_techstars_demo', 'mentor2@techstars-demo.com', 'Robert', 'Davis', 'mentor', true),
('usr_mentor_003', 'org_techstars_demo', 'mentor3@techstars-demo.com', 'Lisa', 'Thompson', 'mentor', true),

-- Investors
('usr_investor_001', 'org_techstars_demo', 'investor1@techstars-demo.com', 'James', 'Wilson', 'investor', true),
('usr_investor_002', 'org_techstars_demo', 'investor2@techstars-demo.com', 'Maria', 'Garcia', 'investor', true),

-- Startup Founders
('usr_founder_001', 'org_techstars_demo', 'founder1@techstars-demo.com', 'Alex', 'Turner', 'founder', true),
('usr_founder_002', 'org_techstars_demo', 'founder2@techstars-demo.com', 'Priya', 'Patel', 'founder', true),
('usr_founder_003', 'org_techstars_demo', 'founder3@techstars-demo.com', 'Carlos', 'Mendoza', 'founder', true),
('usr_founder_004', 'org_techstars_demo', 'founder4@techstars-demo.com', 'Zoe', 'Anderson', 'founder', true);
```

## Sample Programs & Cohorts

```sql
-- Programs
INSERT INTO programs (id, organization_id, name, description, duration_weeks) VALUES
('prog_001', 'org_techstars_demo', 'TechStars Accelerator 2024', 
 'Intensive 13-week program for early-stage tech startups', 13),
('prog_002', 'org_techstars_demo', 'FinTech Accelerator', 
 'Specialized program for financial technology startups', 16),
('prog_003', 'org_y_combinator', 'YC Winter 2024', 
 'Winter batch of Y Combinator accelerator program', 12);

-- Cohorts
INSERT INTO cohorts (id, organization_id, program_id, name, start_date, end_date, status, max_startups) VALUES
('cohort_001', 'org_techstars_demo', 'prog_001', 'Spring 2024 Cohort', 
 '2024-03-01', '2024-06-01', 'active', 20),
('cohort_002', 'org_techstars_demo', 'prog_002', 'FinTech Cohort Q2', 
 '2024-04-01', '2024-07-15', 'planning', 15),
('cohort_003', 'org_y_combinator', 'prog_003', 'Winter 2024 Batch', 
 '2024-01-15', '2024-04-15', 'completed', 25);
```

## Sample KPI Definitions

```sql
INSERT INTO kpi_definitions (id, organization_id, name, description, data_type, unit, category) VALUES
-- Financial KPIs
('kpi_mrr', 'org_techstars_demo', 'Monthly Recurring Revenue', 'Monthly recurring revenue in USD', 'currency', 'USD', 'financial'),
('kpi_arr', 'org_techstars_demo', 'Annual Recurring Revenue', 'Annual recurring revenue in USD', 'currency', 'USD', 'financial'),
('kpi_burn_rate', 'org_techstars_demo', 'Monthly Burn Rate', 'Monthly cash burn in USD', 'currency', 'USD', 'financial'),
('kpi_runway', 'org_techstars_demo', 'Cash Runway', 'Months of cash remaining', 'number', 'months', 'financial'),
('kpi_gross_margin', 'org_techstars_demo', 'Gross Margin', 'Gross profit margin percentage', 'percentage', '%', 'financial'),

-- Product KPIs
('kpi_active_users', 'org_techstars_demo', 'Monthly Active Users', 'Number of monthly active users', 'number', 'users', 'product'),
('kpi_user_growth', 'org_techstars_demo', 'User Growth Rate', 'Monthly user growth percentage', 'percentage', '%', 'product'),
('kpi_churn_rate', 'org_techstars_demo', 'Churn Rate', 'Monthly customer churn percentage', 'percentage', '%', 'product'),
('kpi_nps', 'org_techstars_demo', 'Net Promoter Score', 'Customer satisfaction score', 'number', 'score', 'product'),

-- Business KPIs
('kpi_cac', 'org_techstars_demo', 'Customer Acquisition Cost', 'Cost to acquire one customer', 'currency', 'USD', 'business'),
('kpi_ltv', 'org_techstars_demo', 'Customer Lifetime Value', 'Average customer lifetime value', 'currency', 'USD', 'business'),
('kpi_employees', 'org_techstars_demo', 'Employee Count', 'Total number of employees', 'number', 'people', 'business');
```

## Sample Startups

```sql
INSERT INTO startups (id, organization_id, cohort_id, name, description, industry, stage, founded_date, headquarters_location, employee_count, status) VALUES
-- Active Startups
('startup_001', 'org_techstars_demo', 'cohort_001', 'DataFlow AI', 
 'AI-powered data analytics platform for enterprise customers', 
 'Artificial Intelligence', 'Series A', '2022-06-15', 'San Francisco, CA', 25, 'active'),

('startup_002', 'org_techstars_demo', 'cohort_001', 'GreenTech Solutions', 
 'Sustainable energy management system for commercial buildings', 
 'CleanTech', 'Seed', '2023-01-10', 'Austin, TX', 12, 'active'),

('startup_003', 'org_techstars_demo', 'cohort_001', 'HealthTrack Pro', 
 'Digital health platform connecting patients with healthcare providers', 
 'HealthTech', 'Pre-Seed', '2023-03-20', 'Boston, MA', 8, 'active'),

('startup_004', 'org_techstars_demo', 'cohort_001', 'EduLearn Platform', 
 'Personalized learning platform using adaptive AI technology', 
 'EdTech', 'Seed', '2022-09-05', 'New York, NY', 15, 'active'),

('startup_005', 'org_techstars_demo', 'cohort_001', 'FinSecure', 
 'Blockchain-based financial security and fraud prevention', 
 'FinTech', 'Series A', '2022-03-12', 'Miami, FL', 30, 'active'),

-- Graduated Startups
('startup_006', 'org_techstars_demo', 'cohort_003', 'CloudOps Pro', 
 'DevOps automation platform for cloud infrastructure', 
 'DevOps', 'Series B', '2021-08-20', 'Seattle, WA', 45, 'graduated'),

('startup_007', 'org_techstars_demo', 'cohort_003', 'RetailBot', 
 'AI chatbot for e-commerce customer service automation', 
 'E-commerce', 'Series A', '2021-11-30', 'Los Angeles, CA', 22, 'graduated');
```

## Sample Startup Team Members

```sql
INSERT INTO startup_members (id, startup_id, user_id, name, email, role, is_founder, equity_percentage) VALUES
-- DataFlow AI Team
('member_001', 'startup_001', 'usr_founder_001', 'Alex Turner', 'alex@dataflow-ai.com', 'CEO & Co-Founder', true, 35.0),
('member_002', 'startup_001', NULL, 'Sarah Kim', 'sarah@dataflow-ai.com', 'CTO & Co-Founder', true, 30.0),
('member_003', 'startup_001', NULL, 'Mike Johnson', 'mike@dataflow-ai.com', 'VP Engineering', false, 2.5),
('member_004', 'startup_001', NULL, 'Lisa Chen', 'lisa@dataflow-ai.com', 'Head of Sales', false, 1.5),

-- GreenTech Solutions Team
('member_005', 'startup_002', 'usr_founder_002', 'Priya Patel', 'priya@greentech-sol.com', 'CEO & Founder', true, 45.0),
('member_006', 'startup_002', NULL, 'David Rodriguez', 'david@greentech-sol.com', 'CTO', false, 8.0),
('member_007', 'startup_002', NULL, 'Emma Wilson', 'emma@greentech-sol.com', 'VP Marketing', false, 2.0),

-- HealthTrack Pro Team
('member_008', 'startup_003', 'usr_founder_003', 'Carlos Mendoza', 'carlos@healthtrack-pro.com', 'CEO & Co-Founder', true, 40.0),
('member_009', 'startup_003', NULL, 'Dr. Jennifer Adams', 'jennifer@healthtrack-pro.com', 'Chief Medical Officer', true, 25.0),
('member_010', 'startup_003', NULL, 'Tom Zhang', 'tom@healthtrack-pro.com', 'Lead Developer', false, 3.0);
```

## Sample Mentors

```sql
INSERT INTO mentors (id, user_id, organization_id, bio, expertise_areas, industries, years_experience, hourly_rate, rating, total_sessions, is_available) VALUES
('mentor_001', 'usr_mentor_001', 'org_techstars_demo', 
 'Former VP of Engineering at Google with 15+ years in tech leadership. Specialized in scaling engineering teams and product development.',
 ARRAY['Engineering Leadership', 'Product Development', 'Team Scaling', 'Technical Architecture'],
 ARRAY['Technology', 'SaaS', 'AI/ML'], 15, 300.00, 4.8, 127, true),

('mentor_002', 'usr_mentor_002', 'org_techstars_demo',
 'Serial entrepreneur and former CMO at Salesforce. Expert in go-to-market strategy, sales, and marketing for B2B SaaS companies.',
 ARRAY['Go-to-Market Strategy', 'Sales', 'Marketing', 'Fundraising'],
 ARRAY['SaaS', 'B2B', 'Enterprise'], 12, 250.00, 4.9, 89, true),

('mentor_003', 'usr_mentor_003', 'org_techstars_demo',
 'Healthcare industry veteran with experience at Johnson & Johnson and multiple health tech startups. Focus on regulatory compliance and market entry.',
 ARRAY['Healthcare Regulations', 'Market Entry', 'Business Development', 'Strategic Partnerships'],
 ARRAY['HealthTech', 'MedTech', 'Pharmaceuticals'], 18, 275.00, 4.7, 156, true);
```

## Sample KPI Data

```sql
INSERT INTO startup_kpis (id, startup_id, kpi_definition_id, value, reporting_period, verified_at) VALUES
-- DataFlow AI KPIs (Series A stage)
('kpi_data_001', 'startup_001', 'kpi_mrr', 85000.00, '2024-03-01', '2024-03-05 10:30:00'),
('kpi_data_002', 'startup_001', 'kpi_active_users', 2500.00, '2024-03-01', '2024-03-05 10:30:00'),
('kpi_data_003', 'startup_001', 'kpi_burn_rate', 120000.00, '2024-03-01', '2024-03-05 10:30:00'),
('kpi_data_004', 'startup_001', 'kpi_employees', 25.00, '2024-03-01', '2024-03-05 10:30:00'),

-- Previous month for trend analysis
('kpi_data_005', 'startup_001', 'kpi_mrr', 78000.00, '2024-02-01', '2024-02-05 10:30:00'),
('kpi_data_006', 'startup_001', 'kpi_active_users', 2200.00, '2024-02-01', '2024-02-05 10:30:00'),

-- GreenTech Solutions KPIs (Seed stage)
('kpi_data_007', 'startup_002', 'kpi_mrr', 15000.00, '2024-03-01', '2024-03-05 14:20:00'),
('kpi_data_008', 'startup_002', 'kpi_active_users', 450.00, '2024-03-01', '2024-03-05 14:20:00'),
('kpi_data_009', 'startup_002', 'kpi_burn_rate', 35000.00, '2024-03-01', '2024-03-05 14:20:00'),
('kpi_data_010', 'startup_002', 'kpi_employees', 12.00, '2024-03-01', '2024-03-05 14:20:00'),

-- HealthTrack Pro KPIs (Pre-Seed stage)
('kpi_data_011', 'startup_003', 'kpi_mrr', 3500.00, '2024-03-01', '2024-03-05 16:45:00'),
('kpi_data_012', 'startup_003', 'kpi_active_users', 125.00, '2024-03-01', '2024-03-05 16:45:00'),
('kpi_data_013', 'startup_003', 'kpi_burn_rate', 18000.00, '2024-03-01', '2024-03-05 16:45:00'),
('kpi_data_014', 'startup_003', 'kpi_employees', 8.00, '2024-03-01', '2024-03-05 16:45:00');
```

## Sample Mentor Sessions

```sql
INSERT INTO mentor_sessions (id, mentor_id, startup_id, title, description, scheduled_at, duration_minutes, status, rating, feedback) VALUES
('session_001', 'mentor_001', 'startup_001', 'Technical Architecture Review',
 'Review current system architecture and discuss scaling strategies for 10x growth',
 '2024-03-15 14:00:00', 60, 'completed', 5, 'Excellent insights on microservices architecture. Very helpful for our scaling plans.'),

('session_002', 'mentor_002', 'startup_002', 'Go-to-Market Strategy',
 'Develop comprehensive GTM strategy for enterprise customers',
 '2024-03-18 10:00:00', 90, 'completed', 5, 'Great session! Clear roadmap for enterprise sales approach.'),

('session_003', 'mentor_003', 'startup_003', 'Healthcare Compliance Deep Dive',
 'Navigate HIPAA compliance and FDA regulations for health tech platform',
 '2024-03-20 15:30:00', 75, 'completed', 4, 'Very knowledgeable about healthcare regulations. Provided actionable next steps.'),

('session_004', 'mentor_001', 'startup_004', 'Engineering Team Building',
 'Strategies for hiring and managing remote engineering teams',
 '2024-03-25 11:00:00', 60, 'scheduled', NULL, NULL),

('session_005', 'mentor_002', 'startup_005', 'Fundraising Strategy',
 'Prepare for Series B fundraising round',
 '2024-03-28 13:00:00', 90, 'scheduled', NULL, NULL);
```

## Sample Events

```sql
INSERT INTO events (id, organization_id, title, description, event_type, start_datetime, end_datetime, max_attendees, status, created_by) VALUES
('event_001', 'org_techstars_demo', 'Demo Day Spring 2024',
 'Showcase presentations from Spring 2024 cohort startups to investors and community',
 'demo_day', '2024-06-15 14:00:00', '2024-06-15 18:00:00', 200, 'published', 'usr_pm_001'),

('event_002', 'org_techstars_demo', 'AI in Healthcare Workshop',
 'Interactive workshop on implementing AI solutions in healthcare applications',
 'workshop', '2024-04-10 10:00:00', '2024-04-10 16:00:00', 50, 'published', 'usr_pm_002'),

('event_003', 'org_techstars_demo', 'Investor Networking Mixer',
 'Casual networking event connecting startups with potential investors',
 'networking', '2024-04-25 18:00:00', '2024-04-25 21:00:00', 100, 'published', 'usr_pm_001'),

('event_004', 'org_techstars_demo', 'Product Management Masterclass',
 'Advanced product management strategies for startup founders',
 'seminar', '2024-05-08 13:00:00', '2024-05-08 17:00:00', 30, 'draft', 'usr_pm_002');
```

## Sample Investors

```sql
INSERT INTO investors (id, organization_id, user_id, name, company, investment_focus, check_size_min, check_size_max, stage_preferences, status) VALUES
('investor_001', 'org_techstars_demo', 'usr_investor_001', 'James Wilson', 'TechVentures Capital',
 ARRAY['AI/ML', 'SaaS', 'Enterprise Software'], 100000.00, 2000000.00,
 ARRAY['Seed', 'Series A'], 'active'),

('investor_002', 'org_techstars_demo', 'usr_investor_002', 'Maria Garcia', 'GreenFund Ventures',
 ARRAY['CleanTech', 'Sustainability', 'Energy'], 250000.00, 5000000.00,
 ARRAY['Series A', 'Series B'], 'active'),

('investor_003', 'org_techstars_demo', NULL, 'David Park', 'HealthTech Angels',
 ARRAY['HealthTech', 'MedTech', 'Digital Health'], 50000.00, 1000000.00,
 ARRAY['Pre-Seed', 'Seed'], 'active');
```

## Sample Investments

```sql
INSERT INTO investments (id, startup_id, investor_id, round_type, amount, valuation_pre, equity_percentage, investment_date, status) VALUES
('investment_001', 'startup_001', 'investor_001', 'Series A', 1500000.00, 8000000.00, 18.75, '2023-11-15', 'completed'),
('investment_002', 'startup_002', 'investor_002', 'Seed', 750000.00, 3000000.00, 25.00, '2024-01-20', 'completed'),
('investment_003', 'startup_005', 'investor_001', 'Series A', 2000000.00, 12000000.00, 16.67, '2023-08-10', 'completed'),
('investment_004', 'startup_003', 'investor_003', 'Pre-Seed', 250000.00, 1000000.00, 25.00, '2024-02-28', 'in_progress'),
('investment_005', 'startup_004', 'investor_001', 'Seed', 500000.00, 2500000.00, 20.00, '2024-03-01', 'proposed');
```

## Data Generation Scripts

### Python Script for Generating Additional Sample Data

```python
# generate_sample_data.py
import random
import uuid
from datetime import datetime, timedelta
from faker import Faker

fake = Faker()

def generate_startup_kpis(startup_id, months=12):
    """Generate realistic KPI progression over time"""
    kpis = []
    base_mrr = random.randint(5000, 50000)
    base_users = random.randint(100, 1000)
    
    for i in range(months):
        date = datetime.now() - timedelta(days=30*i)
        
        # Simulate growth with some volatility
        growth_factor = 1 + random.uniform(0.05, 0.25)  # 5-25% monthly growth
        mrr = int(base_mrr * (growth_factor ** i))
        users = int(base_users * (growth_factor ** i))
        
        kpis.append({
            'startup_id': startup_id,
            'mrr': mrr,
            'users': users,
            'reporting_period': date.strftime('%Y-%m-01')
        })
    
    return kpis

def generate_mentor_sessions(num_sessions=50):
    """Generate realistic mentor session data"""
    sessions = []
    session_types = [
        'Technical Architecture Review',
        'Go-to-Market Strategy',
        'Fundraising Preparation',
        'Team Building & Leadership',
        'Product Development',
        'Customer Discovery',
        'Financial Planning',
        'Legal & Compliance'
    ]
    
    for _ in range(num_sessions):
        session = {
            'id': str(uuid.uuid4()),
            'title': random.choice(session_types),
            'scheduled_at': fake.date_time_between(start_date='-30d', end_date='+30d'),
            'duration_minutes': random.choice([30, 45, 60, 90]),
            'status': random.choice(['completed', 'scheduled', 'cancelled']),
            'rating': random.randint(3, 5) if random.choice([True, False]) else None
        }
        sessions.append(session)
    
    return sessions

# Usage example
if __name__ == "__main__":
    # Generate KPI data for all startups
    startup_ids = ['startup_001', 'startup_002', 'startup_003', 'startup_004', 'startup_005']
    
    for startup_id in startup_ids:
        kpis = generate_startup_kpis(startup_id, 12)
        print(f"Generated {len(kpis)} KPI records for {startup_id}")
    
    # Generate mentor sessions
    sessions = generate_mentor_sessions(50)
    print(f"Generated {len(sessions)} mentor sessions")
```

This comprehensive sample data provides a realistic foundation for demonstrating all platform features and conducting thorough testing across different user scenarios and business workflows.
