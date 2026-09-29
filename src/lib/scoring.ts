import { ScoringCriteriaFacts, ScoreResult, SignalItem } from '../types';

/**
 * Deterministic Opportunity Scoring Engine (Task 2 & Task 9)
 * 
 * Rules:
 * 1. Application code (NOT the LLM) controls mathematical point calculation.
 * 2. Dimensions:
 *    - Fit Score (max 40): B2B monetization (15), developer/enterprise traction (15), tech compatibility (10)
 *    - Timing Score (max 35): High-intent trigger (20), relevant active hiring (15)
 *    - Reachability (max 25): Leadership visible (15), public contact attribution (10)
 * 3. Total Score = Fit + Timing + Reachability (0 - 100)
 * 4. Top 5 Eligibility: Total Score >= 70 AND at least one verified meaningful signal.
 */
export function computeOpportunityScore(
  facts: ScoringCriteriaFacts,
  signals: SignalItem[]
): ScoreResult {
  // Fit Score (Max 40)
  const b2bMonetization = facts.hasB2BMonetization ? 15 : 0;
  const developerTraction = facts.hasDeveloperTraction ? 15 : 0;
  const enterpriseTechFit = facts.hasEnterpriseTechFit ? 10 : 0;
  const fitScore = b2bMonetization + developerTraction + enterpriseTechFit;

  // Timing Score (Max 35)
  const recentTrigger = facts.hasRecentTrigger ? 20 : 0;
  const relevantHiring = facts.hasRelevantHiring ? 15 : 0;
  const timingScore = recentTrigger + relevantHiring;

  // Reachability Score (Max 25)
  const leadershipVisible = facts.hasLeadershipVisible ? 15 : 0;
  const publicAttribution = facts.hasPublicAttribution ? 10 : 0;
  const reachabilityScore = leadershipVisible + publicAttribution;

  const totalScore = fitScore + timingScore + reachabilityScore;

  // Top 5 eligibility check
  const hasMeaningful = signals.some((s) => s.isMeaningfulSignal);
  const isTop5Eligible = hasMeaningful && totalScore >= 70;

  // Synthesize human-readable explainable rationale
  const reasons: string[] = [];
  if (facts.hasRecentTrigger) {
    const topSig = signals.find((s) => s.isMeaningfulSignal);
    if (topSig) reasons.push(topSig.headline);
  }
  if (facts.hasRelevantHiring) {
    reasons.push('Key leadership/engineering hiring surge');
  }
  if (fitScore >= 30) {
    reasons.push('High ICP B2B technical fit');
  }

  const whyNowReasoning = reasons.length > 0 
    ? reasons.join(' • ') 
    : 'Standard baseline match, awaiting high-intent trigger';

  return {
    fitScore,
    timingScore,
    reachabilityScore,
    totalScore,
    breakdown: {
      b2bMonetization,
      developerTraction,
      enterpriseTechFit,
      recentTrigger,
      relevantHiring,
      leadershipVisible,
      publicAttribution,
    },
    isTop5Eligible,
    whyNowReasoning,
  };
}

/**
 * Predictable Top 5 Action Queue Slicing (Task 9)
 * Sorts by totalScore descending and takes at most 5 items.
 */
export function getDailyTop5Queue<T extends { scoreResult: ScoreResult }>(companies: T[]): T[] {
  return companies
    .filter((c) => c.scoreResult.isTop5Eligible)
    .sort((a, b) => b.scoreResult.totalScore - a.scoreResult.totalScore)
    .slice(0, 5);
}
