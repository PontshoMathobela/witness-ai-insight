import { preprocessText, extractPsychologicalFeatures, type LinguisticFeatures, type PsychologicalFeatures } from './textPreprocessing';

// Combined analysis results
export interface EnhancedAnalysisFeatures {
  linguistic: LinguisticFeatures;
  psychological: PsychologicalFeatures;
  credibilityMetrics: CredibilityMetrics;
  riskFactors: RiskFactors;
  recommendations: string[];
}

export interface CredibilityMetrics {
  overallScore: number;
  consistencyScore: number;
  detailScore: number;
  emotionalAuthenticityScore: number;
  linguisticCoherenceScore: number;
  confidenceLevel: 'High' | 'Medium' | 'Low';
}

export interface RiskFactors {
  deceptionIndicators: string[];
  stressLevel: 'High' | 'Medium' | 'Low';
  inconsistencyFlags: string[];
  credibilityFlags: string[];
}

// Enhanced feature extraction that combines all analysis methods
export function extractEnhancedFeatures(
  text: string, 
  duration: number
): EnhancedAnalysisFeatures {
  // Step 1: Basic linguistic preprocessing
  const linguistic = preprocessText(text);
  
  // Step 2: Psychological feature extraction
  const psychological = extractPsychologicalFeatures(text, linguistic);
  
  // Step 3: Calculate credibility metrics
  const credibilityMetrics = calculateCredibilityMetrics(linguistic, psychological, duration);
  
  // Step 4: Identify risk factors
  const riskFactors = identifyRiskFactors(linguistic, psychological, text);
  
  // Step 5: Generate recommendations
  const recommendations = generateRecommendations(credibilityMetrics, riskFactors, linguistic);
  
  return {
    linguistic,
    psychological,
    credibilityMetrics,
    riskFactors,
    recommendations
  };
}

function calculateCredibilityMetrics(
  linguistic: LinguisticFeatures, 
  psychological: PsychologicalFeatures,
  duration: number
): CredibilityMetrics {
  // Consistency Score (based on repetitions and contradictions)
  const consistencyScore = Math.max(0, 100 - 
    (linguistic.repetitionCount / linguistic.wordCount * 100) * 2 -
    (linguistic.contradictionIndicators.length / linguistic.wordCount * 100) * 5
  );
  
  // Detail Score (based on word count, complexity, and time references)
  const expectedWords = Math.max(50, duration * 2); // ~2 words per second baseline
  const lengthRatio = Math.min(linguistic.wordCount / expectedWords, 2);
  const detailScore = (lengthRatio * 30) + (psychological.detailLevel * 0.7);
  
  // Emotional Authenticity (based on emotional stability and appropriate emotional content)
  const emotionalAuthenticityScore = 
    psychological.emotionalStability * 0.6 + 
    Math.min(linguistic.emotionalWordCount / linguistic.wordCount * 200, 40);
  
  // Linguistic Coherence (based on preprocessing results)
  const linguisticCoherenceScore = psychological.coherenceScore;
  
  // Overall Score (weighted average)
  const overallScore = 
    (consistencyScore * 0.25) +
    (detailScore * 0.20) +
    (emotionalAuthenticityScore * 0.25) +
    (linguisticCoherenceScore * 0.20) +
    ((100 - psychological.deceptionRisk) * 0.10);
  
  // Confidence Level
  let confidenceLevel: 'High' | 'Medium' | 'Low' = 'Medium';
  if (overallScore >= 75 && psychological.certaintyLevel >= 60) {
    confidenceLevel = 'High';
  } else if (overallScore <= 50 || psychological.deceptionRisk >= 70) {
    confidenceLevel = 'Low';
  }
  
  return {
    overallScore: Math.round(overallScore),
    consistencyScore: Math.round(consistencyScore),
    detailScore: Math.round(Math.min(100, detailScore)),
    emotionalAuthenticityScore: Math.round(Math.min(100, emotionalAuthenticityScore)),
    linguisticCoherenceScore: Math.round(linguisticCoherenceScore),
    confidenceLevel
  };
}

function identifyRiskFactors(
  linguistic: LinguisticFeatures,
  psychological: PsychologicalFeatures,
  text: string
): RiskFactors {
  const deceptionIndicators: string[] = [];
  const inconsistencyFlags: string[] = [];
  const credibilityFlags: string[] = [];
  
  // Deception indicators
  if (psychological.deceptionRisk > 60) {
    deceptionIndicators.push('High deception risk detected');
  }
  if (linguistic.hesitationCount / linguistic.wordCount > 0.05) {
    deceptionIndicators.push('Excessive hesitation markers');
  }
  if (linguistic.contradictionIndicators.length > 0) {
    deceptionIndicators.push('Contradiction indicators present');
  }
  if (psychological.certaintyLevel > 90) {
    deceptionIndicators.push('Unusually high certainty (potential overcompensation)');
  }
  
  // Inconsistency flags
  if (linguistic.repetitionCount / linguistic.wordCount > 0.1) {
    inconsistencyFlags.push('High repetition rate');
  }
  if (psychological.coherenceScore < 60) {
    inconsistencyFlags.push('Low coherence score');
  }
  if (linguistic.complexityScore < 25) {
    inconsistencyFlags.push('Unusually simple language (potentially rehearsed)');
  }
  
  // Credibility flags
  if (psychological.emotionalStability < 40) {
    credibilityFlags.push('High emotional instability');
  }
  if (linguistic.fillerWordCount / linguistic.wordCount > 0.08) {
    credibilityFlags.push('Excessive filler words');
  }
  if (psychological.stressIndicators > 70) {
    credibilityFlags.push('High stress indicators');
  }
  if (psychological.timeReferenceCount === 0 && linguistic.wordCount > 50) {
    credibilityFlags.push('Lack of temporal details');
  }
  
  // Stress level assessment
  let stressLevel: 'High' | 'Medium' | 'Low' = 'Low';
  if (psychological.stressIndicators > 70) {
    stressLevel = 'High';
  } else if (psychological.stressIndicators > 40) {
    stressLevel = 'Medium';
  }
  
  return {
    deceptionIndicators,
    stressLevel,
    inconsistencyFlags,
    credibilityFlags
  };
}

function generateRecommendations(
  credibility: CredibilityMetrics,
  risks: RiskFactors,
  linguistic: LinguisticFeatures
): string[] {
  const recommendations: string[] = [];
  
  // Overall credibility recommendations
  if (credibility.overallScore < 50) {
    recommendations.push('Consider additional verification of statement details');
    recommendations.push('Cross-reference with other evidence or witness statements');
  } else if (credibility.overallScore > 80) {
    recommendations.push('Statement shows high credibility indicators');
  }
  
  // Specific issue recommendations
  if (risks.stressLevel === 'High') {
    recommendations.push('High stress detected - consider interviewing conditions');
    recommendations.push('Allow time for witness to compose themselves');
  }
  
  if (risks.deceptionIndicators.length > 2) {
    recommendations.push('Multiple deception indicators - requires careful investigation');
    recommendations.push('Consider follow-up questions on specific details');
  }
  
  if (credibility.detailScore < 40) {
    recommendations.push('Statement lacks sufficient detail - ask for elaboration');
    recommendations.push('Request specific examples and timeline information');
  }
  
  if (credibility.consistencyScore < 50) {
    recommendations.push('Consistency issues detected - clarify contradictions');
    recommendations.push('Focus on timeline and sequence of events');
  }
  
  if (linguistic.fillerWordCount > linguistic.wordCount * 0.1) {
    recommendations.push('High nervous speech patterns - ensure comfortable environment');
  }
  
  if (credibility.confidenceLevel === 'Low') {
    recommendations.push('Low confidence assessment - corroborate with additional evidence');
  }
  
  // If no major issues
  if (recommendations.length === 0) {
    recommendations.push('Statement appears credible with no major red flags');
    recommendations.push('Standard verification procedures recommended');
  }
  
  return recommendations;
}

// Real-time analysis for live feedback
export function performRealTimeAnalysis(
  text: string,
  duration: number
): {
  status: 'good' | 'warning' | 'concerning';
  alerts: string[];
  metrics: {
    coherence: number;
    detail: number;
    stress: number;
  };
} {
  if (!text || text.trim().length === 0) {
    return {
      status: 'good',
      alerts: [],
      metrics: { coherence: 100, detail: 0, stress: 0 }
    };
  }
  
  const features = extractEnhancedFeatures(text, duration);
  const alerts: string[] = [];
  
  // Check for immediate concerns
  if (features.psychological.deceptionRisk > 70) {
    alerts.push('Potential deception indicators detected');
  }
  
  if (features.psychological.stressIndicators > 80) {
    alerts.push('High stress levels detected');
  }
  
  if (features.linguistic.contradictionIndicators.length > 0) {
    alerts.push('Contradictory statements identified');
  }
  
  if (features.credibilityMetrics.consistencyScore < 40) {
    alerts.push('Consistency issues emerging');
  }
  
  // Determine overall status
  let status: 'good' | 'warning' | 'concerning' = 'good';
  
  if (alerts.length > 0) {
    status = alerts.length > 2 ? 'concerning' : 'warning';
  }
  
  return {
    status,
    alerts,
    metrics: {
      coherence: features.psychological.coherenceScore,
      detail: features.credibilityMetrics.detailScore,
      stress: features.psychological.stressIndicators
    }
  };
}