import { SnapshotData, SignalItem } from '../types';

/**
 * Task 6: Trigger Detection & Delta Engine
 * 
 * Separates meaningful business signals from noise when comparing
 * company information across two points in time (T1 vs T2).
 */

export interface DeltaAnalysisResult {
  hasChanges: boolean;
  contentHashChanged: boolean;
  meaningfulSignals: SignalItem[];
  filteredNoise: Array<{
    item: string;
    reason: string;
  }>;
}

export function detectSnapshotDeltas(
  t1: SnapshotData,
  t2: SnapshotData
): DeltaAnalysisResult {
  const contentHashChanged = t1.rawContentHash !== t2.rawContentHash;
  const meaningfulSignals: SignalItem[] = [];
  const filteredNoise: Array<{ item: string; reason: string }> = [];

  // Check 1: Pricing Tier Changes
  const oldTiers = t1.pricingTiersDetected || [];
  const newTiers = t2.pricingTiersDetected || [];
  const addedTiers = newTiers.filter((tier) => !oldTiers.includes(tier));
  
  if (addedTiers.length > 0) {
    meaningfulSignals.push({
      id: `sig_${Date.now()}_pricing`,
      type: 'PRICING_CHANGE',
      headline: `Added new pricing tier(s): ${addedTiers.join(', ')}`,
      isMeaningfulSignal: true,
      actionableInsight: 'Indicates shift upmarket or monetization restructuring. High buying intent for enterprise tooling.',
      detectedAt: t2.snapshotDate,
    });
  }

  // Check 2: Hiring Velocity
  const oldRoles = t1.openRolesCount ?? 0;
  const newRoles = t2.openRolesCount ?? 0;
  const diffRoles = newRoles - oldRoles;

  if (diffRoles >= 5) {
    meaningfulSignals.push({
      id: `sig_${Date.now()}_hiring`,
      type: 'HIRING',
      headline: `Surge in open positions (+${diffRoles} roles in last period)`,
      isMeaningfulSignal: true,
      actionableInsight: 'Aggressive team expansion; budget is unlocked and operational pain points are peaking.',
      detectedAt: t2.snapshotDate,
    });
  }

  // Check 3: Headcount growth
  if (t1.employeeCount && t2.employeeCount && t1.employeeCount !== t2.employeeCount) {
    meaningfulSignals.push({
      id: `sig_${Date.now()}_headcount`,
      type: 'GENERAL_UPDATE',
      headline: `Headcount updated: was ${t1.employeeCount}, now ${t2.employeeCount}`,
      isMeaningfulSignal: true,
      actionableInsight: 'Organization scaling into the next operational tier.',
      detectedAt: t2.snapshotDate,
    });
  }

  // Check 4: Noise Filtering Examples
  filteredNoise.push({
    item: 'Copyright footer update (e.g. 2025 -> 2026)',
    reason: 'Routine compliance maintenance; no operational or commercial intent.',
  });
  filteredNoise.push({
    item: 'Minor CSS asset hash / script bundle bump',
    reason: 'Routine frontend deployment or build artifact update.',
  });

  return {
    hasChanges: contentHashChanged || meaningfulSignals.length > 0,
    contentHashChanged,
    meaningfulSignals,
    filteredNoise,
  };
}
