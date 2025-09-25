# Test Cases and Scenarios

## Testing Strategy Overview

### Testing Pyramid
- **Unit Tests (70%)**: Individual component and function testing
- **Integration Tests (20%)**: API and service integration testing  
- **End-to-End Tests (10%)**: Complete user journey testing

### Testing Types
- **Functional Testing**: Feature behavior validation
- **Security Testing**: Authentication, authorization, data protection
- **Performance Testing**: Load, stress, and scalability testing
- **Accessibility Testing**: WCAG 2.1 AA compliance
- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: iOS Safari, Android Chrome

## Authentication & Authorization Test Cases

### TC-AUTH-001: User Registration
**Priority**: Critical
**User Story**: As a new user, I want to register for an account so I can access the platform

#### Test Scenarios:
```gherkin
Scenario: Successful user registration
  Given I am on the registration page
  When I enter valid email "user@example.com"
  And I enter valid password "SecurePass123!"
  And I enter matching password confirmation
  And I accept terms and conditions
  And I click "Register"
  Then I should see "Registration successful" message
  And I should receive a verification email
  And I should be redirected to email verification page

Scenario: Registration with existing email
  Given I am on the registration page
  When I enter email "existing@example.com" that already exists
  And I enter valid password details
  And I click "Register"
  Then I should see "Email already registered" error
  And I should remain on registration page

Scenario: Registration with weak password
  Given I am on the registration page
  When I enter valid email
  And I enter weak password "123"
  And I click "Register"
  Then I should see password strength requirements
  And registration should not proceed
```

#### Acceptance Criteria:
- ✅ Email validation (format, uniqueness)
- ✅ Password strength requirements (8+ chars, uppercase, lowercase, number, special char)
- ✅ Terms acceptance required
- ✅ Email verification sent within 30 seconds
- ✅ Account created but inactive until verified
- ✅ Proper error messages for all validation failures

### TC-AUTH-002: Multi-Factor Authentication
**Priority**: Critical
**User Story**: As a user, I want to enable MFA so my account is secure

#### Test Scenarios:
```gherkin
Scenario: Enable TOTP MFA
  Given I am logged in as a user
  And I am on the security settings page
  When I click "Enable MFA"
  And I scan the QR code with authenticator app
  And I enter the 6-digit code from my app
  And I click "Verify and Enable"
  Then MFA should be enabled for my account
  And I should see backup codes
  And I should be required to use MFA on next login

Scenario: Login with MFA enabled
  Given I have MFA enabled on my account
  When I enter correct email and password
  And I click "Login"
  Then I should see MFA code input field
  When I enter valid 6-digit code
  Then I should be logged in successfully

Scenario: Login with invalid MFA code
  Given I have MFA enabled on my account
  When I enter correct email and password
  And I enter invalid MFA code "000000"
  Then I should see "Invalid code" error
  And I should remain on MFA verification page
  And I should have 2 more attempts before lockout
```

#### Acceptance Criteria:
- ✅ QR code generation for TOTP setup
- ✅ Backup codes generated and displayed once
- ✅ MFA required for subsequent logins
- ✅ Account lockout after 3 failed MFA attempts
- ✅ Backup code can be used when TOTP unavailable

## User Management Test Cases

### TC-USER-001: User Profile Management
**Priority**: High
**User Story**: As a user, I want to update my profile information

#### Test Scenarios:
```gherkin
Scenario: Update profile information
  Given I am logged in as a user
  When I navigate to profile settings
  And I update my first name to "John"
  And I update my last name to "Doe"
  And I upload a new profile picture
  And I click "Save Changes"
  Then my profile should be updated
  And I should see "Profile updated successfully" message
  And the changes should be reflected immediately

Scenario: Upload invalid profile picture
  Given I am on profile settings page
  When I try to upload a 10MB image file
  Then I should see "File too large" error
  And the upload should be rejected
  
  When I try to upload a .txt file
  Then I should see "Invalid file type" error
  And only image files should be accepted
```

#### Acceptance Criteria:
- ✅ Profile picture upload (max 2MB, JPG/PNG only)
- ✅ Real-time validation for all fields
- ✅ Changes saved immediately
- ✅ Audit log entry created for profile changes
- ✅ Profile picture automatically resized to 200x200px

### TC-USER-002: Role Assignment
**Priority**: Critical
**User Story**: As an admin, I want to assign roles to users

#### Test Scenarios:
```gherkin
Scenario: Assign mentor role to user
  Given I am logged in as an admin
  And I am on the user management page
  When I select user "john@example.com"
  And I click "Assign Role"
  And I select "Mentor" role
  And I click "Confirm Assignment"
  Then the user should have mentor role
  And they should receive role assignment notification
  And they should see mentor features on next login

Scenario: Remove admin role from user
  Given I am logged in as an admin
  And user "jane@example.com" has admin role
  When I select the user
  And I click "Remove Role"
  And I select "Admin" role to remove
  And I confirm the action
  Then the user should lose admin privileges
  And they should receive role change notification
```

#### Acceptance Criteria:
- ✅ Only admins can assign/remove roles
- ✅ Role changes take effect immediately
- ✅ Email notification sent to affected user
- ✅ Audit log entry created for role changes
- ✅ Cannot remove last admin role from organization

## Startup Management Test Cases

### TC-STARTUP-001: Startup Profile Creation
**Priority**: High
**User Story**: As a founder, I want to create my startup profile

#### Test Scenarios:
```gherkin
Scenario: Create complete startup profile
  Given I am logged in as a founder
  When I navigate to "Create Startup Profile"
  And I enter startup name "TechCorp"
  And I enter description "AI-powered analytics platform"
  And I select industry "Technology"
  And I enter website "https://techcorp.com"
  And I upload company logo
  And I add team members
  And I click "Create Profile"
  Then startup profile should be created
  And I should be redirected to startup dashboard
  And profile should be visible to mentors and investors

Scenario: Create profile with duplicate name
  Given startup "TechCorp" already exists in my organization
  When I try to create another startup with name "TechCorp"
  Then I should see "Startup name already exists" error
  And profile creation should not proceed
```

#### Acceptance Criteria:
- ✅ All required fields validated
- ✅ Logo upload with automatic resizing
- ✅ Team member invitation system
- ✅ Unique startup names within organization
- ✅ Profile visible to appropriate roles based on permissions

### TC-STARTUP-002: KPI Data Entry
**Priority**: Critical
**User Story**: As a founder, I want to submit monthly KPI data

#### Test Scenarios:
```gherkin
Scenario: Submit monthly KPIs
  Given I am logged in as a founder
  And I have a startup profile
  When I navigate to KPI submission
  And I enter MRR value "15000"
  And I enter user count "1250"
  And I enter burn rate "8000"
  And I select reporting period "March 2024"
  And I click "Submit KPIs"
  Then KPI data should be saved
  And I should see "KPIs submitted successfully" message
  And data should appear in startup dashboard

Scenario: Submit KPIs with anomalous data
  Given my previous MRR was $15,000
  When I submit new MRR of $150,000 (10x increase)
  Then I should see "Unusual data detected" warning
  And I should be prompted to confirm or explain
  And data should be flagged for review
```

#### Acceptance Criteria:
- ✅ Data validation for each KPI type
- ✅ Anomaly detection for unusual changes
- ✅ Historical data comparison
- ✅ Mandatory fields cannot be skipped
- ✅ Data automatically charts after submission

## Mentor Matching Test Cases

### TC-MENTOR-001: Mentor Discovery
**Priority**: High
**User Story**: As a startup founder, I want to find relevant mentors

#### Test Scenarios:
```gherkin
Scenario: Search mentors by expertise
  Given I am logged in as a founder
  When I navigate to mentor marketplace
  And I filter by expertise "Marketing"
  And I filter by industry "SaaS"
  Then I should see mentors matching criteria
  And results should be sorted by rating
  And I should see mentor availability status

Scenario: Book session with mentor
  Given I found a suitable mentor
  When I click "Book Session"
  And I select available time slot
  And I enter session topic "Growth Strategy"
  And I click "Confirm Booking"
  Then session should be scheduled
  And both parties should receive calendar invites
  And mentor should receive booking notification
```

#### Acceptance Criteria:
- ✅ Filter by multiple criteria simultaneously
- ✅ Real-time availability checking
- ✅ Calendar integration for scheduling
- ✅ Automatic conflict detection
- ✅ Email notifications to both parties

### TC-MENTOR-002: Session Management
**Priority**: High
**User Story**: As a mentor, I want to manage my sessions

#### Test Scenarios:
```gherkin
Scenario: Complete session and add notes
  Given I have a scheduled session with a startup
  When the session time arrives
  And I join the video call
  And the session is completed
  And I add session notes "Discussed go-to-market strategy"
  And I add action items for the startup
  And I rate the session quality
  Then notes should be saved
  And startup should receive action items
  And session should be marked complete

Scenario: Cancel session with notice
  Given I have a session scheduled for tomorrow
  When I need to cancel due to emergency
  And I click "Cancel Session"
  And I provide cancellation reason
  And I suggest alternative times
  Then session should be cancelled
  And startup should be notified immediately
  And alternative times should be offered
```

#### Acceptance Criteria:
- ✅ Session notes saved and shared
- ✅ Action items tracked and followed up
- ✅ Cancellation with 24+ hours notice allowed
- ✅ Automatic rescheduling suggestions
- ✅ Session rating affects mentor score

## Investment Pipeline Test Cases

### TC-INVEST-001: Investment Opportunity Creation
**Priority**: High
**User Story**: As an investment manager, I want to create investment opportunities

#### Test Scenarios:
```gherkin
Scenario: Create new investment round
  Given I am logged in as an investment manager
  When I navigate to startup "TechCorp" profile
  And I click "Create Investment Opportunity"
  And I enter round type "Series A"
  And I enter target amount "$2,000,000"
  And I set valuation "$10,000,000"
  And I add required documents
  And I invite specific investors
  And I click "Create Opportunity"
  Then investment opportunity should be created
  And invited investors should receive notifications
  And opportunity should appear in deal pipeline

Scenario: Investor expresses interest
  Given an investment opportunity exists
  And I am logged in as an investor
  When I view the opportunity details
  And I click "Express Interest"
  And I enter preliminary terms
  And I submit my interest
  Then my interest should be recorded
  And investment manager should be notified
  And my status should show as "Interested"
```

#### Acceptance Criteria:
- ✅ Investment rounds properly categorized
- ✅ Document requirements enforced
- ✅ Investor permissions respected
- ✅ Interest tracking and notifications
- ✅ Deal pipeline status updates

## Security Test Cases

### TC-SEC-001: Data Access Control
**Priority**: Critical
**User Story**: As a system, I must enforce proper data access controls

#### Test Scenarios:
```gherkin
Scenario: Startup data isolation
  Given I am a founder of "Startup A"
  When I try to access data for "Startup B"
  Then I should receive "Access Denied" error
  And no data should be returned
  And attempt should be logged

Scenario: Role-based feature access
  Given I am logged in as a mentor
  When I try to access admin features
  Then I should see "Insufficient permissions" message
  And I should be redirected to appropriate page
  And access attempt should be audited
```

#### Acceptance Criteria:
- ✅ Multi-tenant data isolation enforced
- ✅ Role-based access control working
- ✅ All access attempts logged
- ✅ Graceful error handling for unauthorized access
- ✅ No data leakage between organizations

### TC-SEC-002: Data Encryption
**Priority**: Critical
**User Story**: As a user, my sensitive data must be encrypted

#### Test Scenarios:
```gherkin
Scenario: Sensitive data encryption at rest
  Given I submit financial data for my startup
  When the data is stored in the database
  Then sensitive fields should be encrypted
  And encryption keys should be properly managed
  And data should be unreadable without decryption

Scenario: Data transmission security
  Given I am submitting sensitive information
  When data is transmitted to the server
  Then connection should use TLS 1.3
  And data should be encrypted in transit
  And no sensitive data should appear in logs
```

#### Acceptance Criteria:
- ✅ All PII and financial data encrypted at rest
- ✅ TLS 1.3 enforced for all connections
- ✅ Encryption keys rotated regularly
- ✅ No sensitive data in application logs
- ✅ Secure key management practices

## Performance Test Cases

### TC-PERF-001: Page Load Performance
**Priority**: High
**User Story**: As a user, I want pages to load quickly

#### Test Scenarios:
```gherkin
Scenario: Dashboard load time
  Given I am logged in as any user type
  When I navigate to my dashboard
  Then the page should load within 2 seconds
  And all critical content should be visible
  And interactive elements should be functional

Scenario: Large dataset handling
  Given I have 1000+ startups in my organization
  When I load the startup list page
  Then the page should load within 3 seconds
  And pagination should work smoothly
  And search should return results within 1 second
```

#### Acceptance Criteria:
- ✅ Page load times under 2 seconds for 95% of requests
- ✅ API response times under 200ms for 95% of requests
- ✅ Graceful handling of large datasets
- ✅ Efficient pagination and search
- ✅ Progressive loading for heavy content

## Accessibility Test Cases

### TC-A11Y-001: Keyboard Navigation
**Priority**: High
**User Story**: As a user with disabilities, I want to navigate using only keyboard

#### Test Scenarios:
```gherkin
Scenario: Complete form submission using keyboard
  Given I am on the startup profile creation page
  When I navigate using only Tab and Enter keys
  Then I should be able to reach all form fields
  And I should be able to fill out the entire form
  And I should be able to submit successfully
  And focus indicators should be clearly visible

Scenario: Screen reader compatibility
  Given I am using a screen reader
  When I navigate the application
  Then all content should be properly announced
  And form labels should be associated correctly
  And navigation landmarks should be present
```

#### Acceptance Criteria:
- ✅ All interactive elements keyboard accessible
- ✅ Logical tab order throughout application
- ✅ Visible focus indicators on all elements
- ✅ ARIA labels and landmarks properly implemented
- ✅ Screen reader testing with NVDA/JAWS passes

This comprehensive test suite ensures the platform meets enterprise-grade quality standards across functionality, security, performance, and accessibility requirements.
