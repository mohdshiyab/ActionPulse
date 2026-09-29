# ActionPulse — AI-Native Account Intelligence & Daily Action Copilot

ActionPulse is an autonomous B2B revenue intelligence platform built for founders, revenue leaders, and product engineers. Rather than overwhelming users with a 100-row spreadsheet of noisy web scrapes, ActionPulse continuously monitors accounts, detects meaningful business deltas, resolves source conflicts, deterministically scores opportunity intent, and serves an executive **"Today's 5 Actions"** queue with contextual outreach ready to ship.

---

## 🧭 How This System Maps to the Candidate Tasks

| Candidate Task | How ActionPulse Solves It | Key Code Location |
| :--- | :--- | :--- |
| **1. Company Intelligence** | Synthesizes a 30-second briefing: core value proposition, business model, ICP market, and evidence-verified tech stack. | `src/components/CompanyDossierModal.tsx`, `src/types/index.ts` |
| **2. Opportunity Scoring** | Deterministic, application-level rubric across 3 dimensions: Fit (40 pts), Timing (35 pts), Reachability (25 pts) — no LLM hallucination of mathematical scores. | `src/lib/scoring.ts` (`computeOpportunityScore`) |
| **3. Find the Right Person** | Identifies the optimal buying persona (e.g., Head of Infrastructure) with rationale, and displays verified public names only when substantiated. | `src/components/CompanyDossierModal.tsx`, `src/components/OutreachStudioModal.tsx` |
| **4. Personalised Outreach** | Generates anti-spam cold outreach anchored in verified public triggers (e.g., dedicated IP pool launches), offering both Direct and Technical tone presets. | `src/components/OutreachStudioModal.tsx` |
| **5. Automation Architecture** | End-to-end pipeline: `Input (URL) → Research & Scrape → AI Extraction → Reliability Audit → Deterministic Scoring → Database Ingestion`. | `src/app/api/analyze/route.ts`, `src/components/AddCompanyModal.tsx` |
| **6. Trigger Detection** | Time-series delta engine comparing T1 vs T2 snapshots. Distinguishes meaningful commercial signals (pricing tier shifts, hiring surges) from noise (copyright bumps, CSS tweaks). | `src/lib/delta.ts` (`detectSnapshotDeltas`) |
| **7. Data Reliability & Conflicts** | Triangulates conflicting sources (e.g., About page vs LinkedIn directory), refuses false precision, reports realistic ranges (e.g. `~35–50`), and cites direct audit evidence. | `src/lib/reliability.ts`, `src/components/CompanyDossierModal.tsx` |
| **8. Open-Ended Challenge** | Built an executive action dashboard prioritizing accounts needing immediate attention rather than an overwhelming raw database. | `src/components/Top5Queue.tsx` |
| **9. Requirement Change (Top 5 Focus)** | Implemented the Daily Top 5 Focus queue: filters for `meaningfulSignal = true` and `totalScore >= 70`, ranking by total intent velocity. | `src/lib/scoring.ts` (`getDailyTop5Queue`) |

---

## 🏗️ System Architecture

```
                       USER INPUT (URL)
                              │
                              ▼
                     ┌──────────────────┐
                     │  Research Layer  │  (Public Crawl / Extraction)
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │  LLM Extraction  │  (Facts & Semantics Only)
                     └────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
           ┌─────────────────┐ ┌─────────────────┐
           │ Evidence Audit  │ │ Delta Detection │ (T1 vs T2 Snapshots)
           │ & Reliability   │ │ (Signal vs Noise)│
           └────────┬────────┘ └────────┬────────┘
                    └─────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │  Deterministic   │  (Fit: 40, Timing: 35, Reach: 25)
                     │  Scoring Engine  │
                     └────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
           ┌─────────────────┐ ┌─────────────────┐
           │ Target Persona  │ │ Anti-Spam Hook  │
           │ Recommendation  │ │ Outreach Studio │
           └────────┬────────┘ └────────┬────────┘
                    └─────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ Database Record  │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │  TOP 5 TODAY     │  (Executive Action Center)
                     └──────────────────┘
```

---

## 💡 Key Product & Engineering Decisions

1. **Deterministic Application-Layer Scoring vs. LLM Magic Numbers**:
   * *Problem*: If an LLM directly outputs a score like `87/100`, it is non-deterministic, unexplainable, and drifts over time.
   * *Solution*: The LLM extracts factual booleans (e.g., `hasB2BMonetization`, `hasRecentTrigger`, `hasRelevantHiring`). Our application logic computes the exact mathematical points according to frozen business rules.
2. **Anti-Spam Outreach with Real Signal Anchors**:
   * Outreach emails are not generic "Hi [Name], loved your profile" spam. They cite real, verifiable triggers (e.g., *"Noticed you just launched enterprise dedicated IP pools..."*) and propose low-friction value.
3. **Honest Latency UI**:
   * Live company ingestion displays a transparent 5-stage progressive checklist (`Website scanned → Facts extracted → Signals detected → Scored → Saved`), keeping the user informed of background processing.
4. **Transparent Provenance (Seed vs. Live)**:
   * To provide an instant "Aha!" moment on first launch, the app comes pre-seeded with 8 realistic company profiles (with 5 Daily Actions), while clearly tagging live user analyses with a `[Live Ingested]` badge.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```
