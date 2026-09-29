export type SignalType = 'HIRING' | 'PRODUCT_LAUNCH' | 'PRICING_CHANGE' | 'PARTNERSHIP' | 'GENERAL_UPDATE';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';

export interface TechStackItem {
  name: string;
  confidence: ConfidenceLevel;
}

export interface EvidenceItem {
  claim: string;
  sourceUrl: string;
  sourceTitle: string;
  retrievedAt: string; // ISO 8601 string
}

export interface SignalItem {
  id: string;
  type: SignalType;
  headline: string;
  isMeaningfulSignal: boolean;
  actionableInsight: string;
  detectedAt: string; // ISO 8601 string
}

export interface ScoringCriteriaFacts {
  hasB2BMonetization: boolean;   // 15 pts
  hasDeveloperTraction: boolean; // 15 pts
  hasEnterpriseTechFit: boolean; // 10 pts
  hasRecentTrigger: boolean;     // 20 pts
  hasRelevantHiring: boolean;    // 15 pts
  hasLeadershipVisible: boolean; // 15 pts
  hasPublicAttribution: boolean; // 10 pts
}

export interface ScoreResult {
  fitScore: number;          // max 40
  timingScore: number;       // max 35
  reachabilityScore: number; // max 25
  totalScore: number;        // max 100
  breakdown: {
    b2bMonetization: number;
    developerTraction: number;
    enterpriseTechFit: number;
    recentTrigger: number;
    relevantHiring: number;
    leadershipVisible: number;
    publicAttribution: number;
  };
  isTop5Eligible: boolean;
  whyNowReasoning: string;
}

export interface TargetPersona {
  recommendedRole: string;
  personaRationale: string;
  identifiedPerson?: {
    name: string;
    title: string;
    source: string;
  };
}

export interface OutreachDraft {
  triggerHookUsed: string;
  subjectLine: string;
  emailBody: string;
  suggestedChannel: 'Email' | 'LinkedIn';
}

export interface SnapshotData {
  id: string;
  snapshotDate: string; // ISO 8601
  rawContentHash: string;
  keyChangesSummary?: string;
  employeeCount?: string;
  pricingTiersDetected?: string[];
  openRolesCount?: number;
}

export interface CompanyRecord {
  id: string;
  domain: string;
  name: string;
  summary: string;
  industry: string;
  businessModel: string;
  targetMarket: string;
  techStack: TechStackItem[];
  
  // Data Reliability & Uncertainty (Task 7)
  reliability: {
    employeeCountRange: string;
    confidenceLevel: ConfidenceLevel;
    conflictExplanation?: string;
    evidence: EvidenceItem[];
  };

  // Signals (Task 6)
  signals: SignalItem[];

  // Deterministic Scoring (Task 2 & 9)
  scoringFacts: ScoringCriteriaFacts;
  scoreResult: ScoreResult;

  // Personas (Task 3)
  persona: TargetPersona;

  // Outreach (Task 4)
  outreach: OutreachDraft;

  // Snapshots for Time-Series Delta (Task 6)
  snapshots: SnapshotData[];

  // Provenance & System Metadata (Task 5)
  sourceType: 'seed' | 'live';
  createdAt: string; // ISO 8601
  status: 'active' | 'acted_on' | 'snoozed';
}
