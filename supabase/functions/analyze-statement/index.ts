import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { statementId } = await req.json();
    
    if (!statementId) {
      throw new Error('Statement ID is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the statement from database
    const { data: statement, error: statementError } = await supabase
      .from('witness_statements')
      .select('*')
      .eq('id', statementId)
      .single();

    if (statementError || !statement) {
      throw new Error('Statement not found');
    }

    const startTime = Date.now();

    // Analyze with OpenAI
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert forensic psychologist analyzing witness statements for credibility. 

Analyze the following statement using two methodologies:

1. CBCA (Criteria-Based Content Analysis) - Score 0-100:
   - Logical structure
   - Unstructured production
   - Quantity of details
   - Contextual embeddings
   - Interactions
   - Reproduction of conversation
   - Unexpected complications
   - Unusual details
   - Superfluous details
   - Accurately reported details misunderstood
   - Related external associations
   - Accounts of subjective mental state
   - Attribution of perpetrator's mental state

2. Reality Monitoring (RM) - Score 0-100:
   - Clarity/vividness
   - Spatial information
   - Temporal information
   - Affective information
   - Reconstructability of events
   - Realism/plausibility

Return ONLY a JSON object with this exact structure:
{
  "cbca_score": number,
  "rm_score": number,
  "overall_credibility": number,
  "cbca_details": {
    "strengths": ["list of strengths"],
    "concerns": ["list of concerns"],
    "notable_criteria": ["specific criteria met"]
  },
  "rm_details": {
    "clarity_score": number,
    "detail_richness": number,
    "emotional_coherence": number
  },
  "detected_inconsistencies": [
    {
      "type": "string",
      "description": "string",
      "severity": "low|medium|high"
    }
  ],
  "emotional_indicators": {
    "stress_markers": ["list"],
    "deception_indicators": ["list"],
    "authenticity_markers": ["list"]
  }
}`
          },
          {
            role: 'user',
            content: `Please analyze this witness statement:\n\n"${statement.statement_text}"`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI API error: ${await openAIResponse.text()}`);
    }

    const aiResult = await openAIResponse.json();
    const analysisContent = aiResult.choices[0].message.content;
    
    // Parse the JSON response
    let analysisData;
    try {
      analysisData = JSON.parse(analysisContent);
    } catch (e) {
      console.error('Failed to parse AI response:', analysisContent);
      throw new Error('Invalid AI response format');
    }

    const processingTime = Date.now() - startTime;

    // Save analysis results to database
    const { data: analysisResult, error: analysisError } = await supabase
      .from('analysis_results')
      .insert({
        statement_id: statementId,
        cbca_score: analysisData.cbca_score,
        rm_score: analysisData.rm_score,
        overall_credibility: analysisData.overall_credibility,
        cbca_details: analysisData.cbca_details,
        rm_details: analysisData.rm_details,
        detected_inconsistencies: analysisData.detected_inconsistencies,
        emotional_indicators: analysisData.emotional_indicators,
        processing_time_ms: processingTime,
      })
      .select()
      .single();

    if (analysisError) {
      console.error('Database error:', analysisError);
      throw new Error('Failed to save analysis results');
    }

    console.log('Analysis completed successfully:', analysisResult.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysisId: analysisResult.id,
        results: analysisData 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in analyze-statement function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});