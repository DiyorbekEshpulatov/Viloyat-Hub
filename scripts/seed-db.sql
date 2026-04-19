-- Viloyat-Hub Database Seed Data

-- ============================================================================
-- Sample Users
-- ============================================================================
INSERT INTO users (email, password_hash, first_name, last_name, business_name, role, region, is_verified, is_active)
VALUES
  ('admin@viloyathub.uz', '$2b$10$YIvxJw9v9Jx9x9J9x9J9x', 'Admin', 'User', NULL, 'admin', 'Tashkent', TRUE, TRUE),
  ('mentor1@example.com', '$2b$10$YIvxJw9v9Jx9x9J9x9J9x', 'Aziz', 'Karimov', NULL, 'mentor', 'Tashkent', TRUE, TRUE),
  ('mentor2@example.com', '$2b$10$YIvxJw9v9Jx9x9J9x9J9x', 'Dilshoda', 'Yusupova', NULL, 'mentor', 'Samarkand', TRUE, TRUE),
  ('entrepreneur1@example.com', '$2b$10$YIvxJw9v9Jx9x9J9x9J9x', 'Javohir', 'Rahimov', 'Tech Startup LLC', 'entrepreneur', 'Tashkent', TRUE, TRUE),
  ('entrepreneur2@example.com', '$2b$10$YIvxJw9v9Jx9x9J9x9J9x', 'Nozima', 'Abdullayeva', 'Organic Farm Co', 'entrepreneur', 'Samarkand', TRUE, TRUE),
  ('entrepreneur3@example.com', '$2b$10$YIvxJw9v9Jx9x9J9x9J9x', 'Rustam', 'Alibekov', 'Trading Company', 'entrepreneur', 'Bukhara', TRUE, TRUE);

-- ============================================================================
-- Sample Grants
-- ============================================================================
INSERT INTO grants (title, description, amount, category, region, eligibility_criteria, deadline, status, provider)
VALUES
  ('Technology Innovation Fund', 'Grant for innovative technology startups with potential for regional impact', 50000000, 'technology', 'Tashkent', 'Registered business, Less than 3 years old', '2026-12-31', 'active', 'Ministry of Digital Economy'),
  ('Agricultural Development Grant', 'Support for modern agricultural enterprises and organic farming', 30000000, 'agriculture', 'Samarkand', 'Agricultural business, Must employ 5+ people', '2026-06-30', 'active', 'Ministry of Agriculture'),
  ('SME Growth Program', 'Funding for expanding small and medium enterprises', 25000000, 'general', NULL, 'Operating business, Annual revenue < 500M UZS', '2026-08-15', 'active', 'Chamber of Commerce'),
  ('Tourism Development Grant', 'Support for tourism-related businesses and hospitality services', 20000000, 'tourism', 'Bukhara', 'Tourism business, Registered in tourism register', '2026-07-01', 'active', 'Tourism Board'),
  ('Women Entrepreneurs Fund', 'Special grant program for women-led businesses', 15000000, 'general', NULL, 'Female founder, Any business type', '2026-10-31', 'active', 'Women Entrepreneurship Center');

-- ============================================================================
-- Sample Mentors
-- ============================================================================
INSERT INTO mentors (user_id, expertise, hourly_rate, rating, years_of_experience)
VALUES
  (2, '["Business Strategy", "Marketing", "Sales"]', 50000, 4.8, 15),
  (3, '["Finance", "Accounting", "Risk Management"]', 45000, 4.6, 12);

-- ============================================================================
-- Sample Marketplace Items
-- ============================================================================
INSERT INTO marketplace_items (seller_id, title, description, category, price, region, status)
VALUES
  (4, 'Premium Uzbek Cotton Fabric', 'High-quality organic cotton fabric suitable for textile production', 'raw-materials', 85000, 'Tashkent', 'active'),
  (5, 'Fresh Organic Vegetables', 'Farm-fresh vegetables from Samarkand region, certified organic', 'products', 15000, 'Samarkand', 'active'),
  (6, 'Business Consulting Services', 'Professional consulting for business setup and management', 'services', 500000, 'Bukhara', 'active');

-- ============================================================================
-- Sample Regional Map Points
-- ============================================================================
INSERT INTO regional_points (name, description, region, point_type, latitude, longitude, address, email, website_url)
VALUES
  ('Tashkent Innovation Hub', 'Central entrepreneurship hub with coworking and training facilities', 'Tashkent', 'facility', 41.2995, 69.2401, 'Tashkent, Uzbekistan', 'info@innovation-hub.uz', 'https://innovation-hub.uz'),
  ('Samarkand Business Center', 'Regional business support center for Central Asia', 'Samarkand', 'facility', 39.6548, 66.9597, 'Samarkand, Uzbekistan', 'info@samarkand-business.uz', 'https://samarkand-business.uz'),
  ('Bukhara Tourism Authority', 'Tourism development and support office', 'Bukhara', 'facility', 39.7747, 64.4161, 'Bukhara, Uzbekistan', 'info@bukhara-tourism.uz', 'https://bukhara-tourism.uz');

-- ============================================================================
-- Sample Chat Messages (AI Mentor)
-- ============================================================================
INSERT INTO chat_messages (user_id, message_text, sender_type, response_text)
VALUES
  (4, 'How do I apply for a business grant?', 'user', 'To apply for a grant, you can: 1) Browse available grants in our Grant Navigator, 2) Review eligibility requirements, 3) Prepare required documents, 4) Submit your application through our platform.'),
  (4, 'What is the best market strategy for a tech startup?', 'user', 'For a tech startup, consider: 1) Identify your target audience, 2) Develop a unique value proposition, 3) Use digital marketing channels, 4) Build partnerships with established companies, 5) Focus on product-market fit.'),
  (5, 'How can I connect with mentors?', 'user', 'You can connect with mentors by: 1) Browsing the mentorship directory, 2) Reading mentor profiles and expertise, 3) Scheduling sessions at your convenience, 4) Getting guidance on your business growth.');

-- ============================================================================
-- Sample Notifications
-- ============================================================================
INSERT INTO notifications (user_id, title, message, notification_type, is_read)
VALUES
  (4, 'New Grant Opportunity', 'A new technology grant matching your profile is now available', 'grant_update', FALSE),
  (5, 'Mentor Availability', 'Your scheduled mentorship session starts in 1 hour', 'mentor_reminder', FALSE),
  (6, 'Marketplace Interest', 'Someone viewed your consulting services listing', 'marketplace_message', FALSE);

-- ============================================================================
-- Sample Saved Items
-- ============================================================================
INSERT INTO saved_items (user_id, item_type, item_id)
VALUES
  (4, 'grant', 1),
  (4, 'mentor', 1),
  (5, 'grant', 2),
  (6, 'mentor', 2);

COMMIT;
