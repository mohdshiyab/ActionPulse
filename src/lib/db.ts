import { createClient, Client } from '@libsql/client';
import { CompanyRecord } from '../types';
import { seedCompanies } from './seed-data';

let dbClient: Client | null = null;
let initialized = false;

function getDb(): Client {
  if (!dbClient) {
    let url = process.env.DATABASE_URL;
    if (!url) {
      if (process.env.VERCEL) {
        url = 'file:/tmp/actionpulse.db';
      } else {
        url = 'file:actionpulse.db';
      }
    }
    try {
      dbClient = createClient({ url });
    } catch (e) {
      console.warn('Falling back to in-memory SQL database:', e);
      dbClient = createClient({ url: ':memory:' });
    }
  }
  return dbClient;
}

export async function initDatabase(): Promise<void> {
  if (initialized) return;

  try {
    const db = getDb();

    // Create relational tables (Task 5 requirement)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS companies (
        id TEXT PRIMARY KEY,
        domain TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        summary TEXT,
        industry TEXT,
        business_model TEXT,
        target_market TEXT,
        tech_stack_json TEXT,
        employee_count_range TEXT,
        confidence_level TEXT,
        conflict_explanation TEXT,
        evidence_json TEXT,
        signals_json TEXT,
        scoring_facts_json TEXT,
        score_result_json TEXT,
        persona_json TEXT,
        outreach_json TEXT,
        snapshots_json TEXT,
        source_type TEXT DEFAULT 'live',
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check count and seed if empty
    const countRes = await db.execute('SELECT COUNT(*) as count FROM companies');
    const count = Number(countRes.rows[0].count);

    if (count === 0) {
      for (const c of seedCompanies) {
        await insertCompanyIntoDatabase(c);
      }
    }

    initialized = true;
  } catch (err) {
    console.error('Failed to initialize SQL database, using memory fallback:', err);
    // Fallback client
    dbClient = createClient({ url: ':memory:' });
    initialized = true;
  }
}

export async function insertCompanyIntoDatabase(company: CompanyRecord): Promise<void> {
  try {
    const db = getDb();
    await db.execute({
      sql: `
        INSERT OR REPLACE INTO companies (
          id, domain, name, summary, industry, business_model, target_market,
          tech_stack_json, employee_count_range, confidence_level, conflict_explanation,
          evidence_json, signals_json, scoring_facts_json, score_result_json,
          persona_json, outreach_json, snapshots_json, source_type, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
      args: [
        company.id,
        company.domain,
        company.name,
        company.summary,
        company.industry,
        company.businessModel,
        company.targetMarket,
        JSON.stringify(company.techStack),
        company.reliability.employeeCountRange,
        company.reliability.confidenceLevel,
        company.reliability.conflictExplanation || '',
        JSON.stringify(company.reliability.evidence),
        JSON.stringify(company.signals),
        JSON.stringify(company.scoringFacts),
        JSON.stringify(company.scoreResult),
        JSON.stringify(company.persona),
        JSON.stringify(company.outreach),
        JSON.stringify(company.snapshots),
        company.sourceType,
        company.status,
        company.createdAt,
      ],
    });
  } catch (err) {
    console.error('Error inserting company into database:', err);
  }
}

export async function getCompaniesFromDatabase(): Promise<CompanyRecord[]> {
  try {
    await initDatabase();
    const db = getDb();
    const res = await db.execute('SELECT * FROM companies ORDER BY created_at DESC');

    if (res.rows.length === 0) {
      return seedCompanies;
    }

    return res.rows.map((row) => ({
      id: String(row.id),
      domain: String(row.domain),
      name: String(row.name),
      summary: String(row.summary || ''),
      industry: String(row.industry || ''),
      businessModel: String(row.business_model || ''),
      targetMarket: String(row.target_market || ''),
      techStack: JSON.parse(String(row.tech_stack_json || '[]')),
      reliability: {
        employeeCountRange: String(row.employee_count_range || ''),
        confidenceLevel: (row.confidence_level as 'High' | 'Medium' | 'Low') || 'Medium',
        conflictExplanation: row.conflict_explanation ? String(row.conflict_explanation) : undefined,
        evidence: JSON.parse(String(row.evidence_json || '[]')),
      },
      signals: JSON.parse(String(row.signals_json || '[]')),
      scoringFacts: JSON.parse(String(row.scoring_facts_json || '{}')),
      scoreResult: JSON.parse(String(row.score_result_json || '{}')),
      persona: JSON.parse(String(row.persona_json || '{}')),
      outreach: JSON.parse(String(row.outreach_json || '{}')),
      snapshots: JSON.parse(String(row.snapshots_json || '[]')),
      sourceType: (row.source_type as 'seed' | 'live') || 'live',
      status: (row.status as 'active' | 'acted_on' | 'snoozed') || 'active',
      createdAt: String(row.created_at || new Date().toISOString()),
    }));
  } catch (err) {
    console.error('Database query fallback to seed:', err);
    return seedCompanies;
  }
}

export async function updateCompanyStatusInDatabase(
  companyId: string,
  status: 'active' | 'acted_on' | 'snoozed'
): Promise<void> {
  try {
    await initDatabase();
    const db = getDb();
    await db.execute({
      sql: 'UPDATE companies SET status = ? WHERE id = ?',
      args: [status, companyId],
    });
  } catch (err) {
    console.error('Error updating company status:', err);
  }
}
