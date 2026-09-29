-- ==============================================================================
-- ActionPulse Database Schema (Task 5: Pipeline to Database Persistence)
-- Compatible with PostgreSQL & SQLite / LibSQL
-- ==============================================================================

-- 1. Core Companies Table (Task 1 & Task 7)
CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY,
    domain TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    summary TEXT,
    industry TEXT,
    business_model TEXT,
    target_market TEXT,
    tech_stack_json TEXT,                     -- JSON Array of { name, confidence }
    employee_count_range TEXT,               -- Task 7: Bounded Range (e.g. ~35-50)
    confidence_level TEXT,                   -- Task 7: High, Medium, Low
    conflict_explanation TEXT,               -- Task 7: Provenance audit note
    evidence_json TEXT,                      -- Task 7: Audited source citations
    source_type TEXT DEFAULT 'live',         -- 'seed' vs 'live'
    status TEXT DEFAULT 'active',            -- 'active', 'acted_on', 'snoozed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Snapshots Table for Time-Series Delta (Task 6)
CREATE TABLE IF NOT EXISTS snapshots (
    id TEXT PRIMARY KEY,
    company_id TEXT REFERENCES companies(id) ON DELETE CASCADE,
    snapshot_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    raw_content_hash TEXT,
    employee_count TEXT,
    pricing_tiers_json TEXT,
    open_roles_count INTEGER DEFAULT 0
);

-- 3. Detected Buying Signals & Intent Triggers (Task 6)
CREATE TABLE IF NOT EXISTS signals (
    id TEXT PRIMARY KEY,
    company_id TEXT REFERENCES companies(id) ON DELETE CASCADE,
    signal_type TEXT NOT NULL,                -- 'HIRING', 'PRODUCT_LAUNCH', 'PRICING_CHANGE', etc.
    headline TEXT NOT NULL,
    is_meaningful BOOLEAN NOT NULL,          -- True = High Intent; False = Filtered Noise
    actionable_insight TEXT,
    detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Deterministic Opportunity Scores (Task 2 & Task 9)
CREATE TABLE IF NOT EXISTS opportunity_scores (
    id TEXT PRIMARY KEY,
    company_id TEXT REFERENCES companies(id) ON DELETE CASCADE,
    fit_score INTEGER NOT NULL,               -- Max 40
    timing_score INTEGER NOT NULL,            -- Max 35
    reachability_score INTEGER NOT NULL,      -- Max 25
    total_score INTEGER NOT NULL,             -- Max 100
    is_top_5_eligible BOOLEAN DEFAULT FALSE,  -- Task 9 Queue Rule
    why_now_reasoning TEXT,
    scoring_facts_json TEXT,
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Target Buying Personas & Buying Committee (Task 3)
CREATE TABLE IF NOT EXISTS target_personas (
    id TEXT PRIMARY KEY,
    company_id TEXT REFERENCES companies(id) ON DELETE CASCADE,
    recommended_role TEXT NOT NULL,
    persona_rationale TEXT NOT NULL,
    identified_person_name TEXT,
    identified_person_title TEXT,
    identified_person_source TEXT
);

-- 6. Contextual Anti-Spam Outreach Drafts (Task 4)
CREATE TABLE IF NOT EXISTS outreach_drafts (
    id TEXT PRIMARY KEY,
    company_id TEXT REFERENCES companies(id) ON DELETE CASCADE,
    trigger_hook_used TEXT,
    subject_line TEXT,
    email_body TEXT,
    suggested_channel TEXT DEFAULT 'Email'
);
