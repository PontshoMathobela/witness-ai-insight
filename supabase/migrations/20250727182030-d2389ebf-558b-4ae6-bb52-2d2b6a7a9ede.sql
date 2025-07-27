-- Create witness statements table
CREATE TABLE public.witness_statements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  case_id TEXT NOT NULL,
  witness_name TEXT,
  statement_text TEXT NOT NULL,
  audio_file_path TEXT,
  transcription_confidence DECIMAL(5,4),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analysis results table
CREATE TABLE public.analysis_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  statement_id UUID REFERENCES public.witness_statements(id) ON DELETE CASCADE NOT NULL,
  cbca_score DECIMAL(5,4) NOT NULL,
  rm_score DECIMAL(5,4) NOT NULL,
  overall_credibility DECIMAL(5,4) NOT NULL,
  cbca_details JSONB NOT NULL,
  rm_details JSONB NOT NULL,
  detected_inconsistencies JSONB,
  emotional_indicators JSONB,
  processing_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sessions table for tracking analysis sessions
CREATE TABLE public.analysis_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.witness_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for witness_statements
CREATE POLICY "Users can view their own statements" 
ON public.witness_statements 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create statements" 
ON public.witness_statements 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own statements" 
ON public.witness_statements 
FOR UPDATE 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete their own statements" 
ON public.witness_statements 
FOR DELETE 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create policies for analysis_results (through statement ownership)
CREATE POLICY "Users can view analysis of their statements" 
ON public.analysis_results 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.witness_statements ws 
    WHERE ws.id = analysis_results.statement_id 
    AND (ws.user_id = auth.uid() OR ws.user_id IS NULL)
  )
);

CREATE POLICY "System can create analysis results" 
ON public.analysis_results 
FOR INSERT 
WITH CHECK (true);

-- Create policies for analysis_sessions
CREATE POLICY "Users can view their own sessions" 
ON public.analysis_sessions 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create sessions" 
ON public.analysis_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own sessions" 
ON public.analysis_sessions 
FOR UPDATE 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('witness-audio', 'witness-audio', false);

-- Create storage policies for audio files
CREATE POLICY "Users can upload their own audio files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'witness-audio' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own audio files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'witness-audio' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own audio files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'witness-audio' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own audio files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'witness-audio' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_witness_statements_updated_at
  BEFORE UPDATE ON public.witness_statements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_analysis_sessions_updated_at
  BEFORE UPDATE ON public.analysis_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();