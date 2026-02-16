
-- Updated Database Schema for Mental Pharma CLUB 2.0

-- Providers (Unified Table for Specialists, Gyms and Pharmacies)
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL, -- PSYCHIATRIST, PSYCHOLOGIST, GYM, PHARMACY
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  document_number TEXT UNIQUE NOT NULL, -- CRM, CRP, CNPJ
  document_url TEXT, -- Link to uploaded professional ID/Contract
  status TEXT DEFAULT 'PENDING', -- PENDING, UNDER_REVIEW, ACTIVE, REJECTED
  bio TEXT,
  specialties TEXT[], -- Array of strings
  address_json JSONB,
  rating DECIMAL(3,2) DEFAULT 5.0,
  stripe_account_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments / Bookings
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id),
  customer_id UUID NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'BOOKED', -- BOOKED, COMPLETED, CANCELED
  amount DECIMAL(10,2) NOT NULL,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gym Plans
CREATE TABLE IF NOT EXISTS gym_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gym_id UUID REFERENCES providers(id),
  name TEXT NOT NULL, -- Mensal, Trimestral
  original_price DECIMAL(10,2) NOT NULL,
  club_price DECIMAL(10,2) NOT NULL, -- Up to 70% off
  description TEXT,
  active BOOLEAN DEFAULT TRUE
);

-- Digital Prescriptions
CREATE TABLE IF NOT EXISTS digital_prescriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  doctor_id UUID REFERENCES providers(id),
  customer_id UUID NOT NULL,
  content_json JSONB NOT NULL,
  signature_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
