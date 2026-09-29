import { CompanyRecord } from '../types';
import { computeOpportunityScore } from './scoring';

const rawSeedCompanies: Array<Omit<CompanyRecord, 'scoreResult'>> = [
  {
    id: 'comp_resend',
    domain: 'resend.com',
    name: 'Resend',
    summary: 'Developer-first email API for transactional and marketing communication with exceptional DX and delivery speed.',
    industry: 'Developer Tools / Email Infrastructure',
    businessModel: 'B2B SaaS (Usage-based & Subscriptions)',
    targetMarket: 'Full-stack software engineers, Next.js builders, and high-growth SaaS startups.',
    sourceType: 'seed',
    createdAt: '2026-09-28T09:00:00Z',
    status: 'active',
    techStack: [
      { name: 'Next.js', confidence: 'High' },
      { name: 'React Email', confidence: 'High' },
      { name: 'PostgreSQL', confidence: 'Medium' },
      { name: 'Stripe', confidence: 'High' },
    ],
    reliability: {
      employeeCountRange: '~35–50',
      confidenceLevel: 'Medium',
      conflictExplanation: 'Company public manifesto states 30 core engineers; recent LinkedIn data reports 48 associates. Reflected as conservative range.',
      evidence: [
        {
          claim: 'Core team size reported as 30+ full-time contributors',
          sourceUrl: 'https://resend.com/about',
          sourceTitle: 'Resend About & Manifesto',
          retrievedAt: '2026-09-28T09:00:00Z',
        },
        {
          claim: 'Public professional network headcount is ~48',
          sourceUrl: 'https://linkedin.com/company/resend',
          sourceTitle: 'LinkedIn Company Directory',
          retrievedAt: '2026-09-27T14:30:00Z',
        },
      ],
    },
    signals: [
      {
        id: 'sig_resend_1',
        type: 'PRODUCT_LAUNCH',
        headline: 'Launched dedicated Enterprise SLA & Dedicated IP pools',
        isMeaningfulSignal: true,
        actionableInsight: 'Actively shifting upmarket to capture large enterprise accounts who demand strict compliance and SLA guarantees.',
        detectedAt: '2026-09-28T08:15:00Z',
      },
      {
        id: 'sig_resend_2',
        type: 'HIRING',
        headline: 'Opened Head of Enterprise Solutions role',
        isMeaningfulSignal: true,
        actionableInsight: 'First dedicated hire for outbound sales and compliance engineering.',
        detectedAt: '2026-09-27T11:00:00Z',
      },
      {
        id: 'sig_resend_noise',
        type: 'GENERAL_UPDATE',
        headline: 'Updated documentation typography and code block themes',
        isMeaningfulSignal: false,
        actionableInsight: 'Cosmetic frontend adjustment; zero commercial impact.',
        detectedAt: '2026-09-26T16:00:00Z',
      },
    ],
    scoringFacts: {
      hasB2BMonetization: true,   // 15
      hasDeveloperTraction: true, // 15
      hasEnterpriseTechFit: true, // 10
      hasRecentTrigger: true,     // 20
      hasRelevantHiring: true,    // 15
      hasLeadershipVisible: true, // 15
      hasPublicAttribution: true, // 10
    },
    persona: {
      recommendedRole: 'VP of Product / Head of Infrastructure',
      personaRationale: 'Owns email deliverability SLAs, platform reliability, and developer onboarding experience.',
      identifiedPerson: {
        name: 'Zeno Rocha',
        title: 'CEO & Co-Founder',
        source: 'Company Leadership Page',
      },
    },
    outreach: {
      triggerHookUsed: 'Enterprise SLA & Dedicated IP Pool roll-out',
      subjectLine: 'Enterprise deliverability SLAs on Resend',
      emailBody: 'Hey Zeno — saw the recent roll-out of dedicated IP pools and Enterprise SLAs. Usually when API providers scale upmarket to Fortune 500s, automated compliance auditing and IP warmup reporting become manual bottlenecks for the core team. We built a lightweight webhook verification service that handles automated warmup metrics without eating engineering sprint capacity. Worth a 2-min demo if this is currently top of mind?',
      suggestedChannel: 'Email',
    },
    snapshots: [
      {
        id: 'snap_resend_t1',
        snapshotDate: '2026-08-01T00:00:00Z',
        rawContentHash: 'a7b8c9d0',
        employeeCount: '~25',
        pricingTiersDetected: ['Hobby', 'Pro'],
        openRolesCount: 2,
      },
      {
        id: 'snap_resend_t2',
        snapshotDate: '2026-09-28T09:00:00Z',
        rawContentHash: 'e1f2g3h4',
        employeeCount: '~35-50',
        pricingTiersDetected: ['Hobby', 'Pro', 'Enterprise SLA'],
        openRolesCount: 7,
      },
    ],
  },
  {
    id: 'comp_posthog',
    domain: 'posthog.com',
    name: 'PostHog',
    summary: 'The all-in-one developer platform for product analytics, session replay, feature flags, and A/B testing.',
    industry: 'Product Analytics / Developer Platforms',
    businessModel: 'Open Core / Usage-based Cloud',
    targetMarket: 'Product-led growth SaaS companies, CTOs, and technical growth teams.',
    sourceType: 'seed',
    createdAt: '2026-09-27T10:00:00Z',
    status: 'active',
    techStack: [
      { name: 'Python / Django', confidence: 'High' },
      { name: 'ClickHouse', confidence: 'High' },
      { name: 'React', confidence: 'High' },
      { name: 'Kafka', confidence: 'Medium' },
    ],
    reliability: {
      employeeCountRange: '~110–135',
      confidenceLevel: 'High',
      evidence: [
        {
          claim: 'Transparent team page lists 118 full-time team members globally',
          sourceUrl: 'https://posthog.com/handbook/company/team',
          sourceTitle: 'Public Company Handbook & Team Directory',
          retrievedAt: '2026-09-27T10:00:00Z',
        },
      ],
    },
    signals: [
      {
        id: 'sig_posthog_1',
        type: 'HIRING',
        headline: 'Hiring 4 US-based Enterprise Sales Directors & Solution Architects',
        isMeaningfulSignal: true,
        actionableInsight: 'Transitioning from purely inbound, self-serve PLG into structured enterprise outbound motions.',
        detectedAt: '2026-09-27T07:30:00Z',
      },
      {
        id: 'sig_posthog_2',
        type: 'PRODUCT_LAUNCH',
        headline: 'Released AI-native Data Warehouse sync & Cohort prediction engine',
        isMeaningfulSignal: true,
        actionableInsight: 'Expanding TAM into modern data stack workflows.',
        detectedAt: '2026-09-25T14:00:00Z',
      },
    ],
    scoringFacts: {
      hasB2BMonetization: true,   // 15
      hasDeveloperTraction: true, // 15
      hasEnterpriseTechFit: true, // 10
      hasRecentTrigger: true,     // 20
      hasRelevantHiring: true,    // 15
      hasLeadershipVisible: true, // 15
      hasPublicAttribution: false,// 0
    },
    persona: {
      recommendedRole: 'Head of Sales Engineering / VP of Revenue',
      personaRationale: 'Directly tasked with building the new outbound enterprise infrastructure.',
      identifiedPerson: {
        name: 'James Hawkins',
        title: 'CEO & Co-Founder',
        source: 'Public Handbook',
      },
    },
    outreach: {
      triggerHookUsed: 'Expansion into outbound Enterprise sales team',
      subjectLine: 'Outbound enablement for PostHog enterprise sales team',
      emailBody: 'James — noticed the 4 new US enterprise sales roles open on your handbook board. Moving from 100% self-serve to outbound usually introduces friction in surfacing high-intent accounts before they hit usage paywalls. We automated an internal signal-to-outbound trigger that surfaces active repo contributors who match enterprise ICPs. Happy to send over a 60-second summary if helpful.',
      suggestedChannel: 'Email',
    },
    snapshots: [
      {
        id: 'snap_ph_t1',
        snapshotDate: '2026-07-15T00:00:00Z',
        rawContentHash: 'ph_hash_1',
        employeeCount: '~90',
        pricingTiersDetected: ['Free', 'Teams'],
        openRolesCount: 3,
      },
      {
        id: 'snap_ph_t2',
        snapshotDate: '2026-09-27T10:00:00Z',
        rawContentHash: 'ph_hash_2',
        employeeCount: '~118',
        pricingTiersDetected: ['Free', 'Teams', 'Custom Enterprise'],
        openRolesCount: 11,
      },
    ],
  },
  {
    id: 'comp_linear',
    domain: 'linear.app',
    name: 'Linear',
    summary: 'The standard project management and issue tracking tool designed for high-performance software engineering teams.',
    industry: 'Productivity / Project Management',
    businessModel: 'B2B SaaS (Seat-based Tiered Plans)',
    targetMarket: 'Modern software engineering, design, and product management organizations.',
    sourceType: 'seed',
    createdAt: '2026-09-26T12:00:00Z',
    status: 'active',
    techStack: [
      { name: 'TypeScript', confidence: 'High' },
      { name: 'React', confidence: 'High' },
      { name: 'GraphQL', confidence: 'High' },
      { name: 'Electron', confidence: 'Medium' },
    ],
    reliability: {
      employeeCountRange: '~70–95',
      confidenceLevel: 'High',
      evidence: [
        {
          claim: 'Team size verified via careers overview and company profile',
          sourceUrl: 'https://linear.app/about',
          sourceTitle: 'Linear About & Values',
          retrievedAt: '2026-09-26T12:00:00Z',
        },
      ],
    },
    signals: [
      {
        id: 'sig_linear_1',
        type: 'PRODUCT_LAUNCH',
        headline: 'Launched Linear Asks & Customer Request Automation workflows',
        isMeaningfulSignal: true,
        actionableInsight: 'Expanding product boundary into support and cross-functional bug triaging.',
        detectedAt: '2026-09-26T09:45:00Z',
      },
      {
        id: 'sig_linear_2',
        type: 'HIRING',
        headline: 'Recruiting Senior Customer Solutions Engineers in EMEA',
        isMeaningfulSignal: true,
        actionableInsight: 'Scaling European mid-market support and onboarding.',
        detectedAt: '2026-09-24T15:20:00Z',
      },
    ],
    scoringFacts: {
      hasB2BMonetization: true,   // 15
      hasDeveloperTraction: true, // 15
      hasEnterpriseTechFit: true, // 10
      hasRecentTrigger: true,     // 20
      hasRelevantHiring: true,    // 15
      hasLeadershipVisible: true, // 15
      hasPublicAttribution: true, // 10
    },
    persona: {
      recommendedRole: 'Head of Customer Solutions / Director of Product Ops',
      personaRationale: 'Manages enterprise customer onboarding and support ticket-to-issue workflows.',
      identifiedPerson: {
        name: 'Karri Saarinen',
        title: 'Co-Founder & CEO',
        source: 'Linear Team Site',
      },
    },
    outreach: {
      triggerHookUsed: 'Linear Asks customer request automation launch',
      subjectLine: 'Feedback ingestion pipeline for Linear Asks',
      emailBody: 'Hey Karri — love the launch of Linear Asks. Consolidating external Slack requests into prioritized engineering backlog items solves huge friction. One recurring challenge we observed is duplicate triage when enterprise clients post conflicting requirements in private shared channels. We built a fast deduplication workflow that matches incoming requests to existing issues before filing. Would love to share our findings if relevant.',
      suggestedChannel: 'Email',
    },
    snapshots: [
      {
        id: 'snap_linear_t1',
        snapshotDate: '2026-08-10T00:00:00Z',
        rawContentHash: 'lin_old',
        employeeCount: '~60',
        pricingTiersDetected: ['Standard', 'Plus'],
        openRolesCount: 4,
      },
      {
        id: 'snap_linear_t2',
        snapshotDate: '2026-09-26T12:00:00Z',
        rawContentHash: 'lin_new',
        employeeCount: '~75',
        pricingTiersDetected: ['Standard', 'Plus', 'Enterprise'],
        openRolesCount: 8,
      },
    ],
  },
  {
    id: 'comp_supabase',
    domain: 'supabase.com',
    name: 'Supabase',
    summary: 'The open-source Firebase alternative providing Postgres databases, Auth, Edge Functions, and Vector embeddings.',
    industry: 'Database / Cloud Infrastructure',
    businessModel: 'B2B SaaS & Usage Cloud Tier',
    targetMarket: 'Software architects, indie hackers, and enterprise backend engineering teams.',
    sourceType: 'seed',
    createdAt: '2026-09-25T14:00:00Z',
    status: 'active',
    techStack: [
      { name: 'PostgreSQL', confidence: 'High' },
      { name: 'Elixir', confidence: 'High' },
      { name: 'Go', confidence: 'High' },
      { name: 'TypeScript', confidence: 'High' },
    ],
    reliability: {
      employeeCountRange: '~140–170',
      confidenceLevel: 'High',
      evidence: [
        {
          claim: 'Public distributed team count exceeds 150 engineers',
          sourceUrl: 'https://supabase.com/company',
          sourceTitle: 'Supabase Careers & Team',
          retrievedAt: '2026-09-25T14:00:00Z',
        },
      ],
    },
    signals: [
      {
        id: 'sig_supabase_1',
        type: 'PRODUCT_LAUNCH',
        headline: 'Launched Branching & SOC2 Type II automated audit logs',
        isMeaningfulSignal: true,
        actionableInsight: 'Targeting enterprise IT security teams who previously blocked Postgres cloud migration.',
        detectedAt: '2026-09-25T11:00:00Z',
      },
      {
        id: 'sig_supabase_2',
        type: 'HIRING',
        headline: 'Hiring Head of Enterprise Compliance & Solutions Architects',
        isMeaningfulSignal: true,
        actionableInsight: 'Security and enterprise enablement are the current quarterly OKR focus.',
        detectedAt: '2026-09-23T18:00:00Z',
      },
    ],
    scoringFacts: {
      hasB2BMonetization: true,   // 15
      hasDeveloperTraction: true, // 15
      hasEnterpriseTechFit: true, // 10
      hasRecentTrigger: true,     // 20
      hasRelevantHiring: true,    // 15
      hasLeadershipVisible: true, // 15
      hasPublicAttribution: true, // 10
    },
    persona: {
      recommendedRole: 'Head of Enterprise Engineering / Security Lead',
      personaRationale: 'Evaluates enterprise cloud compliance and SOC2 database audit trail integrations.',
      identifiedPerson: {
        name: 'Paul Copplestone',
        title: 'CEO & Co-Founder',
        source: 'Supabase Team',
      },
    },
    outreach: {
      triggerHookUsed: 'Database Branching and SOC2 audit log launch',
      subjectLine: 'SOC2 audit logging pipeline on Supabase Edge',
      emailBody: 'Paul — congratulations on the database branching launch. For enterprise DevOps teams migrating off AWS RDS, real-time audit log streaming to Datadog/Splunk is usually their final compliance checklist blocker. We created an open-spec connector for Supabase Edge that streams schema mutation events directly to enterprise SIEM platforms. Open to seeing the 2-minute architectural diagram?',
      suggestedChannel: 'Email',
    },
    snapshots: [
      {
        id: 'snap_supa_t1',
        snapshotDate: '2026-07-20T00:00:00Z',
        rawContentHash: 'supa_1',
        employeeCount: '~120',
        pricingTiersDetected: ['Free', 'Pro'],
        openRolesCount: 6,
      },
      {
        id: 'snap_supa_t2',
        snapshotDate: '2026-09-25T14:00:00Z',
        rawContentHash: 'supa_2',
        employeeCount: '~150',
        pricingTiersDetected: ['Free', 'Pro', 'Team', 'Enterprise'],
        openRolesCount: 15,
      },
    ],
  },
  {
    id: 'comp_cursor',
    domain: 'cursor.com',
    name: 'Cursor (Anysphere)',
    summary: 'AI-first code editor built on VS Code, enabling hyper-fast multi-file generation, terminal debugging, and code reasoning.',
    industry: 'Developer Tools / AI Coding',
    businessModel: 'B2B SaaS (Pro & Business Tiers)',
    targetMarket: 'Professional software developers, engineering leaders, and AI startups.',
    sourceType: 'seed',
    createdAt: '2026-09-24T16:00:00Z',
    status: 'active',
    techStack: [
      { name: 'TypeScript', confidence: 'High' },
      { name: 'C++', confidence: 'High' },
      { name: 'Electron', confidence: 'High' },
      { name: 'PyTorch', confidence: 'Medium' },
    ],
    reliability: {
      employeeCountRange: '~45–65',
      confidenceLevel: 'Medium',
      conflictExplanation: 'Private funding press quotes ~40 team members; recent technical hiring drives indicate ~60.',
      evidence: [
        {
          claim: 'Series A press announcements cited ~40 core personnel',
          sourceUrl: 'https://techcrunch.com/cursor-ai',
          sourceTitle: 'TechCrunch Funding Feature',
          retrievedAt: '2026-09-24T16:00:00Z',
        },
      ],
    },
    signals: [
      {
        id: 'sig_cursor_1',
        type: 'PRODUCT_LAUNCH',
        headline: 'Released Business Tier with Zero-Data Retention & Central Admin Dashboard',
        isMeaningfulSignal: true,
        actionableInsight: 'Resolves IP & privacy blockers for large regulated fintech/health tech software teams.',
        detectedAt: '2026-09-24T11:30:00Z',
      },
      {
        id: 'sig_cursor_2',
        type: 'HIRING',
        headline: 'Recruiting Enterprise Account Executives and Security Compliance Leads',
        isMeaningfulSignal: true,
        actionableInsight: 'Building the dedicated corporate procurement sales pipeline.',
        detectedAt: '2026-09-22T09:00:00Z',
      },
    ],
    scoringFacts: {
      hasB2BMonetization: true,   // 15
      hasDeveloperTraction: true, // 15
      hasEnterpriseTechFit: true, // 10
      hasRecentTrigger: true,     // 20
      hasRelevantHiring: true,    // 15
      hasLeadershipVisible: true, // 15
      hasPublicAttribution: true, // 10
    },
    persona: {
      recommendedRole: 'Head of Enterprise Sales / VP of Operations',
      personaRationale: 'Owns procurement negotiations with Fortune 500 security reviews.',
      identifiedPerson: {
        name: 'Michael Truell',
        title: 'CEO & Co-Founder',
        source: 'Cursor About Page',
      },
    },
    outreach: {
      triggerHookUsed: 'Launch of Cursor Business with zero-data retention',
      subjectLine: 'Enterprise procurement acceleration for Cursor Business',
      emailBody: 'Michael — huge respect on the Cursor Business launch. When developer tools add zero-retention tiers, security review questionnaires from corporate InfoSec teams usually become the biggest cycle drag on AEs. We put together a standardized Vendor Risk Assessment accelerator that pre-answers 90% of CAIQ and SIG questions for AI developer tools. Would you be open to seeing how other developer platforms shortened their review cycle with this?',
      suggestedChannel: 'Email',
    },
    snapshots: [
      {
        id: 'snap_cur_t1',
        snapshotDate: '2026-08-01T00:00:00Z',
        rawContentHash: 'cur_old',
        employeeCount: '~30',
        pricingTiersDetected: ['Free', 'Pro'],
        openRolesCount: 3,
      },
      {
        id: 'snap_cur_t2',
        snapshotDate: '2026-09-24T16:00:00Z',
        rawContentHash: 'cur_new',
        employeeCount: '~50',
        pricingTiersDetected: ['Free', 'Pro', 'Business'],
        openRolesCount: 12,
      },
    ],
  },
  // Additional 7 Monitored Accounts to test filtering and prioritization
  {
    id: 'comp_raycast',
    domain: 'raycast.com',
    name: 'Raycast',
    summary: 'Blazingly fast, extendable launcher that gives developers instant access to daily tools and scripts.',
    industry: 'Productivity / Desktop Software',
    businessModel: 'B2B SaaS & Pro subscriptions',
    targetMarket: 'Individual developers and fast-moving tech startups.',
    sourceType: 'seed',
    createdAt: '2026-09-20T10:00:00Z',
    status: 'active',
    techStack: [
      { name: 'Swift', confidence: 'High' },
      { name: 'React', confidence: 'High' },
      { name: 'Node.js', confidence: 'High' },
    ],
    reliability: {
      employeeCountRange: '~35–45',
      confidenceLevel: 'High',
      evidence: [
        {
          claim: 'Team size listed on Raycast manifesto',
          sourceUrl: 'https://raycast.com/about',
          sourceTitle: 'Raycast Team Page',
          retrievedAt: '2026-09-20T10:00:00Z',
        },
      ],
    },
    signals: [
      {
        id: 'sig_ray_1',
        type: 'GENERAL_UPDATE',
        headline: 'Released weekly extension store bugfixes and icons',
        isMeaningfulSignal: false,
        actionableInsight: 'Routine maintenance release.',
        detectedAt: '2026-09-20T10:00:00Z',
      },
    ],
    scoringFacts: {
      hasB2BMonetization: true,   // 15
      hasDeveloperTraction: true, // 15
      hasEnterpriseTechFit: false,// 0
      hasRecentTrigger: false,    // 0 (Filtered as noise)
      hasRelevantHiring: false,   // 0
      hasLeadershipVisible: true, // 15
      hasPublicAttribution: true, // 10
    },
    persona: {
      recommendedRole: 'Head of Developer Relations',
      personaRationale: 'Manages API developer ecosystem and third-party extensions.',
    },
    outreach: {
      triggerHookUsed: 'Extension store ecosystem growth',
      subjectLine: 'Developer onboarding workflows for Raycast extensions',
      emailBody: 'Thomas — noticed the rapid influx of community extensions. Happy to share how we helped developer platforms streamline API key authentication within local launcher environments.',
      suggestedChannel: 'Email',
    },
    snapshots: [],
  },
  {
    id: 'comp_retool',
    domain: 'retool.com',
    name: 'Retool',
    summary: 'Low-code platform to build internal dashboards, admin panels, and operational workflows.',
    industry: 'Low-code / Developer Tools',
    businessModel: 'B2B SaaS (Seat-based Enterprise)',
    targetMarket: 'Engineering and Operations teams at mid-market and enterprise companies.',
    sourceType: 'seed',
    createdAt: '2026-09-19T11:00:00Z',
    status: 'active',
    techStack: [
      { name: 'React', confidence: 'High' },
      { name: 'Node.js', confidence: 'High' },
      { name: 'PostgreSQL', confidence: 'High' },
    ],
    reliability: {
      employeeCountRange: '~450–600',
      confidenceLevel: 'Medium',
      conflictExplanation: 'LinkedIn lists ~550, Wikipedia cites ~400, recent hiring round reports 600.',
      evidence: [
        {
          claim: 'Public professional profiles count: ~550',
          sourceUrl: 'https://linkedin.com/company/retool',
          sourceTitle: 'Public Directory',
          retrievedAt: '2026-09-19T11:00:00Z',
        },
      ],
    },
    signals: [
      {
        id: 'sig_ret_1',
        type: 'GENERAL_UPDATE',
        headline: 'Added support for new Postgres 17 dialect in DB connector',
        isMeaningfulSignal: false,
        actionableInsight: 'Standard DB connector update.',
        detectedAt: '2026-09-18T10:00:00Z',
      },
    ],
    scoringFacts: {
      hasB2BMonetization: true,   // 15
      hasDeveloperTraction: true, // 15
      hasEnterpriseTechFit: true, // 10
      hasRecentTrigger: false,    // 0
      hasRelevantHiring: false,   // 0
      hasLeadershipVisible: true, // 15
      hasPublicAttribution: false,// 0
    },
    persona: {
      recommendedRole: 'Director of Product Management (Data Integrations)',
      personaRationale: 'Manages connector ecosystem and third-party database sync.',
    },
    outreach: {
      triggerHookUsed: 'Database connector expansion',
      subjectLine: 'Postgres query performance monitoring for Retool users',
      emailBody: 'Hey — saw the Postgres 17 connector update. We noticed several engineering teams hit query timeout issues when querying high-volume tables via Retool apps. We built an automatic query caching layer that resolves this.',
      suggestedChannel: 'Email',
    },
    snapshots: [],
  },
  {
    id: 'comp_v0',
    domain: 'v0.dev',
    name: 'v0 by Vercel',
    summary: 'Generative UI system that builds modern React components and full application layouts from natural language.',
    industry: 'Generative AI / Frontend Tooling',
    businessModel: 'Subscription & Credits (Vercel Ecosystem)',
    targetMarket: 'Frontend developers, designers, and software founders.',
    sourceType: 'seed',
    createdAt: '2026-09-18T09:00:00Z',
    status: 'active',
    techStack: [
      { name: 'Next.js', confidence: 'High' },
      { name: 'Tailwind CSS', confidence: 'High' },
      { name: 'shadcn/ui', confidence: 'High' },
    ],
    reliability: {
      employeeCountRange: '~20–30 (Dedicated Team inside Vercel)',
      confidenceLevel: 'High',
      evidence: [
        {
          claim: 'Product team operates as dedicated autonomous unit within Vercel Inc.',
          sourceUrl: 'https://v0.dev/about',
          sourceTitle: 'Vercel Product Organization',
          retrievedAt: '2026-09-18T09:00:00Z',
        },
      ],
    },
    signals: [
      {
        id: 'sig_v0_1',
        type: 'GENERAL_UPDATE',
        headline: 'Added Lucide icon suggestions to code block generator',
        isMeaningfulSignal: false,
        actionableInsight: 'Minor UI generator improvement.',
        detectedAt: '2026-09-18T08:00:00Z',
      },
    ],
    scoringFacts: {
      hasB2BMonetization: true,   // 15
      hasDeveloperTraction: true, // 15
      hasEnterpriseTechFit: true, // 10
      hasRecentTrigger: false,    // 0
      hasRelevantHiring: false,   // 0
      hasLeadershipVisible: true, // 15
      hasPublicAttribution: false,// 0
    },
    persona: {
      recommendedRole: 'Head of Product, AI Workflows',
      personaRationale: 'Leads generative UI models and user prompting benchmarks.',
    },
    outreach: {
      triggerHookUsed: 'Component generator updates',
      subjectLine: 'Design system schema sync for v0 components',
      emailBody: 'Hey — love the progress on v0. A lot of enterprise teams want to restrict v0 generations to their private Figma tokens and internal design systems. We built an automated token parser that forces generated code into compliance with existing team libraries.',
      suggestedChannel: 'Email',
    },
    snapshots: [],
  },
];

// Enrich with deterministic scoring engine results
export const seedCompanies: CompanyRecord[] = rawSeedCompanies.map((c) => {
  const scoreResult = computeOpportunityScore(c.scoringFacts, c.signals);
  return {
    ...c,
    scoreResult,
  };
});
