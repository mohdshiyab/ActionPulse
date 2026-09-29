# ActionPulse — AI-Native B2B Account Intelligence & Daily Action Copilot

> **An autonomous revenue intelligence engine that continuously monitors target accounts, detects commercial buying signals over time, resolves conflicting public data, deterministically scores opportunity intent, and serves an executive "Today's 5 Actions" queue with contextual outreach.**

🌐 **Live Demo**: [https://actionpulse-topaz.vercel.app](https://actionpulse-topaz.vercel.app)  
📦 **GitHub Repository**: [https://github.com/mohdshiyab/ActionPulse](https://github.com/mohdshiyab/ActionPulse)

Built for the **Product Engineer — AI & Automation** role.

---

## 📌 Executive Summary & Problem Statement

### The Problem
Traditional B2B intelligence and prospecting tools (Apollo, ZoomInfo, raw web scrapers) suffer from four fundamental flaws:

1. **The 100-Row Spreadsheet Trap**: They dump massive tables of raw, unprioritized accounts on founders and sales leaders. Users spend hours sifting through static data rather than acting on high-intent opportunities.
2. **Brittle AI Math & Hallucinated Scores**: Many "AI prospecting" wrappers ask an LLM to generate arbitrary numbers like `87/100`. These scores drift between prompts, lack mathematical explainability, and cannot be audited.
3. **Generic Cold Email Spam**: Automated outreach tools blast generic praise (*"Hi [Name], loved your profile..."*), generating high unsubscribe rates and damaging domain reputation.
4. **False Precision & Conflicting Data**: Public sources constantly contradict each other (e.g., website says 30 employees, LinkedIn lists 48). Most scrapers guess a single number, presenting false certainty.

### The Solution: ActionPulse
ActionPulse rethinks account intelligence from the ground up:
* **The Daily Action Center**: Replaces overwhelming data dumps with an intentional morning briefing: **Today's 5 Highest-Priority Actions**.
* **Deterministic Application-Layer Scoring**: The LLM extracts factual semantic criteria; application code calculates the score using a transparent 100-point rubric.
* **Signal-Backed Contextual Outreach**: Every approach email is anchored in a verified commercial trigger (e.g., *Dedicated IP pool launch* or *Enterprise SSO roll-out*).
* **Uncertainty-Aware Reliability Engine**: Triangulates conflicting sources, communicates confidence ratings, and uses bounded ranges (e.g., `~35–50 employees`) backed by cited evidence URLs.

---

## 🧭 Complete Candidate Task Mapping (Tasks 1 to 9)

ActionPulse was engineered so that all 9 candidate evaluation tasks form **one unified product**:

| # | Candidate Task | How ActionPulse Solves It | Core File Reference |
| :---: | :--- | :--- | :--- |
| **1** | **Company Intelligence**<br>*"What should I know before approaching them?"* | **30-Second Executive Dossier**: Synthesizes 1-sentence Value Proposition, Target ICP, Business Model, and observed Tech Stack with confidence ratings. | [`CompanyDossierModal.tsx`](src/components/CompanyDossierModal.tsx) |
| **2** | **Opportunity Scoring**<br>*"Which companies deserve attention first, and why?"* | **Deterministic 100-Point Scoring Engine**: Calculated in code across **Fit (40 pts) + Timing (35 pts) + Reachability (25 pts)** with an explainable `whyNowReasoning` rationale. | [`src/lib/scoring.ts`](src/lib/scoring.ts) |
| **3** | **Find the Right Person**<br>*"Who should I approach and why?"* | **Buying Committee Recommendation**: Suggests optimal functional personas (e.g., *Head of Infrastructure / VP of Sales*) with strategic rationale, showing verified names only when publicly cited. | [`CompanyDossierModal.tsx`](src/components/CompanyDossierModal.tsx) |
| **4** | **Personalised Outreach**<br>*"Contextual first approach, not generic spam."* | **Signal-Anchored Outreach Studio**: Drafts problem-centric messages linked to real triggers, offering **Direct & Conversational** vs. **Technical & Problem-Centric** tone toggles. | [`OutreachStudioModal.tsx`](src/components/OutreachStudioModal.tsx) |
| **5** | **Automation Pipeline**<br>*"Input → Research → AI → Output → Database"* | **End-to-End API Pipeline**: Route handler taking URL input, executing extraction, auditing reliability, computing score, and storing structured records with a 5-stage progressive UI. | [`src/app/api/analyze/route.ts`](src/app/api/analyze/route.ts), [`AddCompanyModal.tsx`](src/components/AddCompanyModal.tsx) |
| **6** | **Trigger Detection**<br>*"What changed across two points in time? Separate signals from noise."* | **Time-Series Delta Engine**: Compares baseline ($T_1$) vs latest ($T_2$) snapshots. Isolates meaningful commercial signals (pricing tier additions, hiring surges) from noise (copyright bumps, CSS tweaks). | [`src/lib/delta.ts`](src/lib/delta.ts) |
| **7** | **Data Reliability & Conflicts**<br>*"Conflicting sources: what to use, why, and how to communicate uncertainty?"* | **Multi-Source Conflict Engine**: Refuses false precision, sets conservative ranges (e.g., `~35–50`), calculates confidence (`High`, `Medium`, `Low`), and cites audited source links. | [`CompanyDossierModal.tsx`](src/components/CompanyDossierModal.tsx) |
| **8** | **Open-Ended Product Challenge**<br>*"Dashboard telling me the most important companies to act on today."* | **Executive Morning Focus Feed**: Minimalist, humanized action cards displaying company intent, trigger context, recommended persona, and 1-click triage actions. | [`Top5Queue.tsx`](src/components/Top5Queue.tsx) |
| **9** | **Requirement Change**<br>*"I don't want 100 opportunities. I only want the 5 things worth acting on today."* | **The Top 5 Focus Queue**: Slices the queue by requiring verified buying triggers (`meaningfulSignal = true`) and `totalScore >= 70`, ranking by intent velocity. | [`src/lib/scoring.ts`](src/lib/scoring.ts) (`getDailyTop5Queue`) |

---

## 🏗️ System Architecture & Data Flow

```
                         COMPANY URL INPUT
                                │
                                ▼
                       ┌─────────────────┐
                       │  Research Layer │ (Public crawl & metadata)
                       └────────┬────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  LLM Extraction │ (Strict semantic fact extraction)
                       └────────┬────────┘
                                │
                     ┌──────────┴──────────┐
                     ▼                     ▼
            ┌─────────────────┐   ┌─────────────────┐
            │ Evidence Audit  │   │ Delta Detection │ (T1 vs T2 Snapshots)
            │ & Reliability   │   │ (Signal vs Noise│
            └────────┬────────┘   └────────┬────────┘
                     └──────────┬──────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  Deterministic  │ (Fit: 40, Timing: 35, Reach: 25)
                       │  Scoring Engine │ (Application code, not LLM math)
                       └────────┬────────┘
                                │
                     ┌──────────┴──────────┐
                     ▼                     ▼
            ┌─────────────────┐   ┌─────────────────┐
            │ Target Persona  │   │ Contextual Hook │
            │ Recommendation  │   │ Outreach Studio │
            └────────┬────────┘   └────────┬────────┘
                     └──────────┬──────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │ Database Record │
                       └────────┬────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   TOP 5 TODAY   │ (Executive Action Center)
                       └─────────────────┘
```

---

## 📐 Deterministic Opportunity Scoring Rubric

To eliminate LLM scoring drift, our scoring logic is deterministic:

$$\text{Total Score} = \text{Fit Score (max 40)} + \text{Timing Score (max 35)} + \text{Reachability Score (max 25)}$$

### 1. Fit Score (Max 40 points)
* **B2B Monetization Model (+15 pts)**: Verified pricing tiers (`Pro`, `Team`, `Enterprise`), usage billing, or annual contracts.
* **Developer / Enterprise Traction (+15 pts)**: Active documentation, API references, SDKs, or high GitHub presence.
* **Tech Stack Compatibility (+10 pts)**: Presence of modern cloud infrastructure (PostgreSQL, Next.js, Stripe, Docker).

### 2. Timing / Trigger Score (Max 35 points)
* **Recent High-Intent Buying Trigger (+20 pts)**: Product launch, new enterprise tier, or compliance milestone (SOC2 / SSO) detected in recent snapshot deltas.
* **Relevant Active Hiring Surge (+15 pts)**: Active recruitment for leadership or commercial roles (VP of Sales, Head of Engineering, Solutions Architect).

### 3. Reachability Score (Max 25 points)
* **Leadership Visibly Identified (+15 pts)**: Publicly listed executive founders or department heads on team pages.
* **Public Attribution & Contactability (+10 pts)**: Verified corporate domain email formatting, official LinkedIn directory, or headquarters attribution.

---

## 🔍 Delta Detection: Signals vs. Noise (Task 6)

When comparing snapshots across time ($T_1$ vs $T_2$):

* **High-Intent Signals (Flagged for Action)**:
  * Pricing page added an `Enterprise` tier $\rightarrow$ monetization restructuring.
  * Careers page added $+6$ roles $\rightarrow$ engineering/sales expansion.
  * Product release announcement $\rightarrow$ feature expansion.
* **Filtered Noise (Suppressed)**:
  * Copyright footer updated from `2025` to `2026` $\rightarrow$ routine maintenance.
  * CSS asset hash or script bundle bump $\rightarrow$ routine frontend build.

---

## 🛡️ Data Reliability & Uncertainty Handling (Task 7)

* **Source Triangulation**: When website manifesto reports 30 engineers but LinkedIn shows 48, ActionPulse refuses false precision.
* **Bounded Ranges**: Displays `~35–50 employees` rather than guessing a single inaccurate number.
* **Confidence Ratings**:
  * **High**: Multiple primary sources agree within a narrow threshold ($\le 15$ variance).
  * **Medium**: Sources disagree or only a single source is available.
  * **Low**: Unverified 3rd-party forum or outdated directory.
* **Provenance**: Every metric links to audited evidence with retrieval timestamps.

---

## 💻 Tech Stack & Engineering Standards

* **Framework**: Next.js 14 (App Router, React 18, TypeScript)
* **Styling**: Tailwind CSS with custom minimalist zinc palette
* **Icons**: Lucide React
* **Code Quality**: ESLint (`next/core-web-vitals`), zero warnings, strict typing
* **Design Philosophy**: High-craft, humanized minimalism (Linear / Stripe aesthetic), keyboard accessible (<kbd>Esc</kbd> dismiss), responsive across mobile and desktop.

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/mohdshiyab/ActionPulse.git
cd ActionPulse
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

### 4. Run Linter
```bash
npm run lint
```

---

## 📂 Codebase Structure

```
├── README.md                      # Comprehensive project guide and task mapping
├── package.json                   # Next.js 14, Tailwind, Lucide dependencies
├── .eslintrc.json                 # ESLint configuration
├── tailwind.config.ts             # Tailwind palette configuration
├── src/
│   ├── types/index.ts             # Central data contract & interfaces
│   ├── lib/
│   │   ├── scoring.ts             # Deterministic scoring & Top 5 queue logic
│   │   ├── delta.ts               # Snapshot comparison & signal/noise filter
│   │   └── seed-data.ts           # 8 pre-analyzed accounts with audited evidence
│   ├── app/
│   │   ├── globals.css            # Minimalist typography & styling
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Main dashboard orchestrator
│   │   └── api/analyze/route.ts   # Live account ingestion API endpoint
│   └── components/
│       ├── Header.tsx             # Segmented control header with live metrics
│       ├── Top5Queue.tsx          # Top 5 daily priority action cards
│       ├── CompanyTable.tsx       # All monitored accounts table
│       ├── CompanyDossierModal.tsx# Intelligence, Deltas & Reliability modal
│       ├── OutreachStudioModal.tsx# Anti-spam contextual outreach generator
│       └── AddCompanyModal.tsx    # Live analysis modal with progressive steps
```
