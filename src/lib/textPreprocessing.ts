// Advanced text preprocessing utilities for witness statement analysis
export interface LinguisticFeatures {
  wordCount: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  readabilityScore: number;
  fillerWords: string[];
  fillerWordCount: number;
  hesitationMarkers: string[];
  hesitationCount: number;
  emotionalWords: string[];
  emotionalWordCount: number;
  complexityScore: number;
  repetitionCount: number;
  contradictionIndicators: string[];
}

// Common filler words and hesitation markers
const FILLER_WORDS = [
  'um', 'uh', 'er', 'ah', 'like', 'you know', 'i mean', 'basically', 
  'actually', 'literally', 'sort of', 'kind of', 'well', 'so'
];

const HESITATION_MARKERS = [
  'um', 'uh', 'er', 'ah', 'hmm', 'well', '...', 'pause', 'silence'
];

const EMOTIONAL_WORDS = [
  // Positive emotions
  'happy', 'joy', 'excited', 'pleased', 'confident', 'sure', 'certain',
  'glad', 'relieved', 'calm', 'peaceful', 'comfortable',
  // Negative emotions
  'angry', 'mad', 'furious', 'upset', 'sad', 'depressed', 'worried',
  'anxious', 'nervous', 'scared', 'afraid', 'fearful', 'terrified',
  'confused', 'uncertain', 'doubtful', 'suspicious', 'concerned'
];

const CONTRADICTION_INDICATORS = [
  'but', 'however', 'although', 'though', 'actually', 'wait', 'no',
  'i mean', 'what i meant was', 'let me correct', 'sorry', 'i misspoke'
];

export function preprocessText(text: string): LinguisticFeatures {
  if (!text || text.trim().length === 0) {
    return {
      wordCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      avgSyllablesPerWord: 0,
      readabilityScore: 0,
      fillerWords: [],
      fillerWordCount: 0,
      hesitationMarkers: [],
      hesitationCount: 0,
      emotionalWords: [],
      emotionalWordCount: 0,
      complexityScore: 0,
      repetitionCount: 0,
      contradictionIndicators: []
    };
  }

  const cleanText = text.toLowerCase().trim();
  const words = cleanText.split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Basic metrics
  const wordCount = words.length;
  const sentenceCount = Math.max(sentences.length, 1);
  const avgWordsPerSentence = wordCount / sentenceCount;

  // Syllable counting (simplified)
  const avgSyllablesPerWord = words.reduce((acc, word) => {
    return acc + countSyllables(word);
  }, 0) / wordCount;

  // Readability score (simplified Flesch formula)
  const readabilityScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

  // Find filler words
  const fillerWords = words.filter(word => 
    FILLER_WORDS.some(filler => word.includes(filler))
  );

  // Find hesitation markers
  const hesitationMarkers = words.filter(word =>
    HESITATION_MARKERS.some(marker => word.includes(marker))
  );

  // Find emotional words
  const emotionalWords = words.filter(word =>
    EMOTIONAL_WORDS.some(emotional => word.includes(emotional))
  );

  // Find contradiction indicators
  const contradictionIndicators = words.filter(word =>
    CONTRADICTION_INDICATORS.some(indicator => word.includes(indicator))
  );

  // Calculate complexity score
  const complexityScore = calculateComplexityScore(
    avgWordsPerSentence,
    avgSyllablesPerWord,
    fillerWords.length,
    hesitationMarkers.length
  );

  // Count repetitions (simplified)
  const repetitionCount = countRepetitions(words);

  return {
    wordCount,
    sentenceCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 100) / 100,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
    readabilityScore: Math.round(readabilityScore * 100) / 100,
    fillerWords,
    fillerWordCount: fillerWords.length,
    hesitationMarkers,
    hesitationCount: hesitationMarkers.length,
    emotionalWords,
    emotionalWordCount: emotionalWords.length,
    complexityScore: Math.round(complexityScore * 100) / 100,
    repetitionCount,
    contradictionIndicators
  };
}

function countSyllables(word: string): number {
  // Simplified syllable counting
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  // Count vowel groups
  const vowelGroups = word.match(/[aeiouy]+/g);
  let syllables = vowelGroups ? vowelGroups.length : 1;
  
  // Adjust for silent e
  if (word.endsWith('e')) syllables--;
  
  return Math.max(syllables, 1);
}

function calculateComplexityScore(
  avgWordsPerSentence: number,
  avgSyllablesPerWord: number,
  fillerCount: number,
  hesitationCount: number
): number {
  // Normalize factors
  const sentenceComplexity = Math.min(avgWordsPerSentence / 20, 1);
  const wordComplexity = Math.min(avgSyllablesPerWord / 3, 1);
  const fillerPenalty = Math.min(fillerCount / 10, 0.5);
  const hesitationPenalty = Math.min(hesitationCount / 5, 0.5);
  
  // Calculate complexity (0-100 scale)
  const complexity = (sentenceComplexity + wordComplexity) * 50 - (fillerPenalty + hesitationPenalty) * 25;
  
  return Math.max(0, Math.min(100, complexity));
}

function countRepetitions(words: string[]): number {
  const wordCounts: { [key: string]: number } = {};
  let repetitions = 0;
  
  words.forEach(word => {
    if (word.length > 3) { // Only count meaningful words
      wordCounts[word] = (wordCounts[word] || 0) + 1;
      if (wordCounts[word] > 1) {
        repetitions++;
      }
    }
  });
  
  return repetitions;
}

// Advanced feature extraction for psychological analysis
export interface PsychologicalFeatures {
  coherenceScore: number;
  emotionalStability: number;
  certaintyLevel: number;
  stressIndicators: number;
  deceptionRisk: number;
  timeReferenceCount: number;
  detailLevel: number;
  selfReferenceCount: number;
}

export function extractPsychologicalFeatures(text: string, linguisticFeatures: LinguisticFeatures): PsychologicalFeatures {
  const cleanText = text.toLowerCase();
  const words = cleanText.split(/\s+/);
  
  // Time references
  const timeWords = ['yesterday', 'today', 'tomorrow', 'morning', 'afternoon', 'evening', 'night', 'before', 'after', 'when', 'then', 'during'];
  const timeReferenceCount = words.filter(word => 
    timeWords.some(timeWord => word.includes(timeWord))
  ).length;
  
  // Self references
  const selfWords = ['i', 'me', 'my', 'myself', 'mine'];
  const selfReferenceCount = words.filter(word => 
    selfWords.includes(word)
  ).length;
  
  // Certainty indicators
  const certaintyWords = ['definitely', 'certainly', 'absolutely', 'sure', 'positive', 'know', 'remember'];
  const uncertaintyWords = ['maybe', 'perhaps', 'might', 'could', 'possibly', 'think', 'believe', 'guess'];
  
  const certaintyCount = words.filter(word => 
    certaintyWords.some(cert => word.includes(cert))
  ).length;
  const uncertaintyCount = words.filter(word => 
    uncertaintyWords.some(uncert => word.includes(uncert))
  ).length;
  
  // Calculate psychological metrics
  const coherenceScore = calculateCoherenceScore(linguisticFeatures);
  const emotionalStability = calculateEmotionalStability(linguisticFeatures);
  const certaintyLevel = calculateCertaintyLevel(certaintyCount, uncertaintyCount, words.length);
  const stressIndicators = calculateStressIndicators(linguisticFeatures);
  const deceptionRisk = calculateDeceptionRisk(linguisticFeatures, certaintyLevel);
  const detailLevel = calculateDetailLevel(linguisticFeatures, timeReferenceCount);
  
  return {
    coherenceScore: Math.round(coherenceScore * 100) / 100,
    emotionalStability: Math.round(emotionalStability * 100) / 100,
    certaintyLevel: Math.round(certaintyLevel * 100) / 100,
    stressIndicators: Math.round(stressIndicators * 100) / 100,
    deceptionRisk: Math.round(deceptionRisk * 100) / 100,
    timeReferenceCount,
    detailLevel: Math.round(detailLevel * 100) / 100,
    selfReferenceCount
  };
}

function calculateCoherenceScore(features: LinguisticFeatures): number {
  // Higher coherence = fewer filler words, fewer hesitations, appropriate complexity
  const fillerPenalty = Math.min(features.fillerWordCount / features.wordCount * 100, 50);
  const hesitationPenalty = Math.min(features.hesitationCount / features.wordCount * 100, 30);
  const repetitionPenalty = Math.min(features.repetitionCount / features.wordCount * 100, 20);
  
  const coherence = 100 - fillerPenalty - hesitationPenalty - repetitionPenalty;
  return Math.max(0, coherence);
}

function calculateEmotionalStability(features: LinguisticFeatures): number {
  // Emotional stability based on emotional word frequency and hesitations
  const emotionalDensity = features.emotionalWordCount / features.wordCount;
  const hesitationDensity = features.hesitationCount / features.wordCount;
  
  const stability = 100 - (emotionalDensity * 200) - (hesitationDensity * 300);
  return Math.max(0, Math.min(100, stability));
}

function calculateCertaintyLevel(certaintyCount: number, uncertaintyCount: number, totalWords: number): number {
  const certaintyRatio = certaintyCount / totalWords;
  const uncertaintyRatio = uncertaintyCount / totalWords;
  
  const certainty = (certaintyRatio - uncertaintyRatio) * 100 + 50;
  return Math.max(0, Math.min(100, certainty));
}

function calculateStressIndicators(features: LinguisticFeatures): number {
  // Stress indicated by high filler words, hesitations, and repetitions
  const fillerStress = (features.fillerWordCount / features.wordCount) * 100;
  const hesitationStress = (features.hesitationCount / features.wordCount) * 100;
  const repetitionStress = (features.repetitionCount / features.wordCount) * 50;
  
  const stress = fillerStress + hesitationStress + repetitionStress;
  return Math.min(100, stress);
}

function calculateDeceptionRisk(features: LinguisticFeatures, certaintyLevel: number): number {
  // Deception risk based on multiple factors
  const hesitationRisk = (features.hesitationCount / features.wordCount) * 100;
  const contradictionRisk = (features.contradictionIndicators.length / features.wordCount) * 200;
  const certaintyRisk = certaintyLevel > 80 ? 20 : 0; // Overconfidence can be suspicious
  const complexityRisk = features.complexityScore < 30 ? 15 : 0; // Too simple might be rehearsed
  
  const risk = hesitationRisk + contradictionRisk + certaintyRisk + complexityRisk;
  return Math.min(100, risk);
}

function calculateDetailLevel(features: LinguisticFeatures, timeReferences: number): number {
  // Detail level based on word count, time references, and complexity
  const lengthScore = Math.min(features.wordCount / 100, 1) * 40;
  const timeScore = Math.min(timeReferences / 5, 1) * 30;
  const complexityScore = features.complexityScore * 0.3;
  
  return lengthScore + timeScore + complexityScore;
}