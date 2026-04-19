-- Viloyat-Hub Database Schema
-- PostgreSQL Schema for Entrepreneurship Platform

-- ============================================================================
-- Users Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  business_name VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'entrepreneur', -- entrepreneur, mentor, admin
  profile_image_url VARCHAR(500),
  bio TEXT,
  region VARCHAR(100),
  phone_number VARCHAR(20),
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);

-- ============================================================================
-- Grants Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS grants (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'UZS',
  category VARCHAR(100) NOT NULL, -- agriculture, tech, tourism, manufacturing, etc.
  region VARCHAR(100), -- Specific region or 'nationwide'
  eligibility_criteria TEXT NOT NULL,
  requirements JSON,
  deadline DATE NOT NULL,
  application_deadline DATE,
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, closed, archived
  image_url VARCHAR(500),
  provider VARCHAR(255), -- Government, NGO, etc.
  website_url VARCHAR(500),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Grant Applications Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS grant_applications (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  grant_id BIGINT NOT NULL REFERENCES grants(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'submitted', -- submitted, reviewing, approved, rejected, withdrawn
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by BIGINT REFERENCES users(id),
  feedback TEXT,
  document_url VARCHAR(500),
  score DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, grant_id)
);

-- ============================================================================
-- Mentors Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS mentors (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expertise JSON NOT NULL, -- Array of expertise areas
  hourly_rate DECIMAL(10, 2),
  bio TEXT,
  availability_status VARCHAR(50) DEFAULT 'available', -- available, unavailable, on_break
  availability_hours JSON, -- Hours of availability
  rating DECIMAL(3, 2) DEFAULT 0,
  total_sessions INT DEFAULT 0,
  years_of_experience INT,
  certifications JSON,
  languages JSON DEFAULT '["Uzbek", "Russian", "English"]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Mentorship Sessions Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS mentorship_sessions (
  id BIGSERIAL PRIMARY KEY,
  mentor_id BIGINT NOT NULL REFERENCES mentors(id) ON DELETE CASCADE,
  entrepreneur_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INT DEFAULT 60,
  status VARCHAR(50) NOT NULL DEFAULT 'scheduled', -- scheduled, completed, cancelled, no_show
  meeting_link VARCHAR(500),
  notes TEXT,
  feedback_rating INT,
  feedback_comment TEXT,
  recording_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Marketplace Items Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS marketplace_items (
  id BIGSERIAL PRIMARY KEY,
  seller_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL, -- products, services, raw-materials, etc.
  sub_category VARCHAR(100),
  price DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'UZS',
  quantity INT,
  unit_of_measure VARCHAR(50), -- kg, pieces, units, etc.
  region VARCHAR(100) NOT NULL,
  city VARCHAR(100),
  images JSON, -- Array of image URLs
  is_featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, sold, inactive
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Marketplace Transactions Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS marketplace_transactions (
  id BIGSERIAL PRIMARY KEY,
  item_id BIGINT NOT NULL REFERENCES marketplace_items(id) ON DELETE CASCADE,
  buyer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seller_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quantity INT NOT NULL,
  total_price DECIMAL(15, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, completed, cancelled, disputed
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Regional Map Points Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS regional_points (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  region VARCHAR(100) NOT NULL,
  point_type VARCHAR(50) NOT NULL, -- grant, mentor, business, facility, training_center
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address VARCHAR(500),
  phone VARCHAR(20),
  email VARCHAR(255),
  website_url VARCHAR(500),
  image_url VARCHAR(500),
  related_id BIGINT, -- ID of related grant, mentor, etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Chat Messages Table (for AI Mentor)
-- ============================================================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  sender_type VARCHAR(50) NOT NULL, -- user, ai
  response_text TEXT,
  is_helpful BOOLEAN,
  context JSON, -- Additional context for the AI
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Notifications Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  notification_type VARCHAR(50), -- grant_update, mentor_reminder, marketplace_message, etc.
  is_read BOOLEAN DEFAULT FALSE,
  related_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Reviews and Ratings Table
-- ============================================================================
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  reviewer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reviewer_type VARCHAR(50) NOT NULL, -- mentor, seller, marketplace_buyer
  reviewed_id BIGINT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  related_type VARCHAR(50), -- mentor_session, marketplace_item, etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Saved Items Table (Wishlist/Bookmarks)
-- ============================================================================
CREATE TABLE IF NOT EXISTS saved_items (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_type VARCHAR(50) NOT NULL, -- grant, mentor, marketplace_item
  item_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, item_type, item_id)
);

-- ============================================================================
-- Indexes for Performance
-- ============================================================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_region ON users(region);
CREATE INDEX idx_grants_region ON grants(region);
CREATE INDEX idx_grants_category ON grants(category);
CREATE INDEX idx_grants_status ON grants(status);
CREATE INDEX idx_grants_deadline ON grants(deadline);
CREATE INDEX idx_grant_applications_user ON grant_applications(user_id);
CREATE INDEX idx_grant_applications_grant ON grant_applications(grant_id);
CREATE INDEX idx_grant_applications_status ON grant_applications(status);
CREATE INDEX idx_mentors_user ON mentors(user_id);
CREATE INDEX idx_mentorship_sessions_mentor ON mentorship_sessions(mentor_id);
CREATE INDEX idx_mentorship_sessions_entrepreneur ON mentorship_sessions(entrepreneur_id);
CREATE INDEX idx_mentorship_sessions_status ON mentorship_sessions(status);
CREATE INDEX idx_marketplace_items_seller ON marketplace_items(seller_id);
CREATE INDEX idx_marketplace_items_category ON marketplace_items(category);
CREATE INDEX idx_marketplace_items_region ON marketplace_items(region);
CREATE INDEX idx_marketplace_items_status ON marketplace_items(status);
CREATE INDEX idx_regional_points_region ON regional_points(region);
CREATE INDEX idx_regional_points_type ON regional_points(point_type);
CREATE INDEX idx_chat_messages_user ON chat_messages(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_saved_items_user ON saved_items(user_id);

-- ============================================================================
-- Enable Full Text Search (Optional)
-- ============================================================================
-- For marketplace search
CREATE INDEX idx_marketplace_items_search ON marketplace_items USING GIN(to_tsvector('english', title || ' ' || description));

-- For grants search
CREATE INDEX idx_grants_search ON grants USING GIN(to_tsvector('english', title || ' ' || description));
