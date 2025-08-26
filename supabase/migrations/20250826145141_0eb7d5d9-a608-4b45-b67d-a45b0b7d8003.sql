-- Create tables to support smart contract functionality

-- Profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_address TEXT,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  reputation_points INTEGER DEFAULT 0,
  is_verified_scholar BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_course_id INTEGER,
  instructor_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  ipfs_hash TEXT,
  price_wei TEXT,
  price_display DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  blockchain_created BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Course enrollments
CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id),
  course_id UUID REFERENCES public.courses(id),
  transaction_hash TEXT,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Webinar NFTs
CREATE TABLE public.webinar_nfts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token_id INTEGER,
  owner_id UUID REFERENCES public.profiles(id),
  webinar_title TEXT NOT NULL,
  webinar_date TIMESTAMP WITH TIME ZONE,
  metadata_uri TEXT,
  transaction_hash TEXT,
  minted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Zakat donations
CREATE TABLE public.zakat_donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID REFERENCES public.profiles(id),
  amount_wei TEXT NOT NULL,
  amount_display DECIMAL(18,8),
  transaction_hash TEXT,
  donated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Scholar verifications
CREATE TABLE public.scholar_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scholar_id UUID REFERENCES public.profiles(id),
  verifier_address TEXT,
  metadata TEXT,
  verification_status TEXT DEFAULT 'pending',
  transaction_hash TEXT,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webinar_nfts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zakat_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholar_verifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for courses
CREATE POLICY "Anyone can view active courses" ON public.courses FOR SELECT USING (is_active = true);
CREATE POLICY "Instructors can manage their courses" ON public.courses FOR ALL USING (
  instructor_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- RLS Policies for enrollments
CREATE POLICY "Users can view their enrollments" ON public.course_enrollments FOR SELECT USING (
  student_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Users can enroll themselves" ON public.course_enrollments FOR INSERT WITH CHECK (
  student_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- RLS Policies for webinar NFTs
CREATE POLICY "Users can view their NFTs" ON public.webinar_nfts FOR SELECT USING (
  owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "System can insert NFTs" ON public.webinar_nfts FOR INSERT WITH CHECK (true);

-- RLS Policies for donations
CREATE POLICY "Users can view their donations" ON public.zakat_donations FOR SELECT USING (
  donor_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Users can record their donations" ON public.zakat_donations FOR INSERT WITH CHECK (
  donor_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);

-- RLS Policies for scholar verifications
CREATE POLICY "Users can view their verifications" ON public.scholar_verifications FOR SELECT USING (
  scholar_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "System can manage verifications" ON public.scholar_verifications FOR ALL USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();