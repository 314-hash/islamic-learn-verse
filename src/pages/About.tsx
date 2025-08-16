import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GSAPWrapper from "@/components/Animations/GSAPWrapper";
import { 
  BookOpen, 
  Users, 
  Globe, 
  Shield, 
  Award, 
  Zap, 
  Heart,
  Star,
  Target,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Heart,
    title: "Islamic Values",
    description: "Every aspect of our platform is designed to align with Islamic principles and promote ethical learning."
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Blockchain technology ensures transparency, security, and authenticity of all educational credentials."
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Connect learners and scholars worldwide in a unified Islamic educational ecosystem."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Combining traditional Islamic scholarship with cutting-edge technology for enhanced learning."
  }
];

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from renowned Islamic scholars and experts with verified credentials and deep knowledge."
  },
  {
    icon: Award,
    title: "NFT Certificates",
    description: "Earn blockchain-verified certificates that are recognized globally and impossible to forge."
  },
  {
    icon: Globe,
    title: "Decentralized Platform",
    description: "Built on blockchain technology for transparency, security, and global accessibility."
  },
  {
    icon: Zap,
    title: "Interactive Learning",
    description: "Engage with multimedia content, live sessions, and collaborative study groups."
  }
];

const team = [
  {
    name: "Dr. Ahmad Hassan",
    role: "Chief Academic Officer",
    specialty: "Islamic Finance & Economics",
    image: "👨‍🏫",
    description: "PhD in Islamic Economics from Al-Azhar University with 15+ years of teaching experience."
  },
  {
    name: "Ustaza Fatima Al-Zahra",
    role: "Head of Curriculum",
    specialty: "Quranic Studies & Arabic",
    image: "👩‍🏫",
    description: "Master's in Quranic Studies and fluent in 5 languages, specializing in Arabic pedagogy."
  },
  {
    name: "Sheikh Omar Al-Mansouri",
    role: "Senior Islamic Scholar",
    specialty: "Hadith Sciences & Fiqh",
    image: "👨‍💼",
    description: "Graduate of Islamic University of Medina with expertise in Hadith authentication."
  },
  {
    name: "Dr. Aisha Rahman",
    role: "Technology Director",
    specialty: "Blockchain & EdTech",
    image: "👩‍💻",
    description: "Former blockchain engineer with passion for educational technology and Islamic values."
  }
];

const stats = [
  { number: "50,000+", label: "Active Learners" },
  { number: "500+", label: "Expert Instructors" },
  { number: "1,000+", label: "Courses Available" },
  { number: "75+", label: "Countries Reached" }
];

export default function About() {
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating animation for mission text
    gsap.to(missionRef.current, {
      y: -10,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <GSAPWrapper animation="fadeInLeft">
              <div className="space-y-8">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Revolutionizing
                  <span className="block bg-gradient-to-r from-islamic-gold to-islamic-teal bg-clip-text text-transparent">
                    Islamic Education
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  VLCP combines traditional Islamic scholarship with cutting-edge blockchain technology 
                  to create the world's most trusted Islamic educational platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/courses">
                    <Button variant="hero" size="xl" className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>Explore Courses</span>
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/community">
                    <Button variant="elegant" size="xl">
                      Join Community
                    </Button>
                  </Link>
                </div>
              </div>
            </GSAPWrapper>
            
            <GSAPWrapper animation="fadeInRight">
              <div ref={missionRef} className="relative">
                <div className="card-gradient border border-islamic-gold/30 rounded-2xl p-8 shadow-elegant">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "To make authentic Islamic education accessible to every Muslim worldwide, 
                    while preserving the integrity and authenticity of Islamic knowledge through 
                    blockchain technology."
                  </p>
                  <div className="mt-6 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center star-pattern">
                      <Target className="w-6 h-6 text-islamic-navy" />
                    </div>
                    <div>
                      <div className="font-semibold text-islamic-gold">Global Impact</div>
                      <div className="text-sm text-muted-foreground">Serving 75+ countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </GSAPWrapper>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-20 right-10 w-32 h-32 star-pattern bg-islamic-gold/5 animate-float" />
        <div className="absolute bottom-20 left-10 w-24 h-24 star-pattern bg-islamic-teal/5 animate-float" style={{ animationDelay: "2s" }} />
      </section>

      {/* Stats Section */}
      <GSAPWrapper animation="stagger" className="py-16 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-islamic-gold">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </GSAPWrapper>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPWrapper animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything we do is guided by Islamic principles and our commitment to 
              authentic, ethical education for the global Muslim community.
            </p>
          </GSAPWrapper>

          <GSAPWrapper animation="stagger" staggerDelay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="card-gradient border-islamic-gold/20 hover:shadow-gold transition-all duration-300 hover:scale-105 text-center">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto bg-teal-gradient rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-foreground" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </GSAPWrapper>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPWrapper animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Platform Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the innovative features that make VLCP the leading Islamic educational platform.
            </p>
          </GSAPWrapper>

          <GSAPWrapper animation="stagger" staggerDelay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="card-gradient border-islamic-teal/20 hover:shadow-teal transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gold-gradient rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-islamic-navy" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </GSAPWrapper>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPWrapper animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of Islamic scholars, educators, and technology experts are united in 
              our mission to transform Islamic education.
            </p>
          </GSAPWrapper>

          <GSAPWrapper animation="stagger" staggerDelay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="card-gradient border-islamic-gold/20 hover:shadow-gold transition-all duration-300 hover:scale-105 text-center">
                  <CardHeader>
                    <div className="text-6xl mb-4">{member.image}</div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <div className="text-islamic-teal font-medium">{member.role}</div>
                    <div className="text-sm text-muted-foreground">{member.specialty}</div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-sm">
                      {member.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </GSAPWrapper>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GSAPWrapper animation="fadeInUp">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Our Vision for the Future
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We envision a world where every Muslim has access to authentic, high-quality Islamic education, 
                regardless of their location, language, or economic circumstances. Through blockchain technology, 
                we're building an ecosystem of trust, verification, and global recognition for Islamic learning.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-lg font-semibold text-islamic-gold mb-2">Global Reach</h3>
                  <p className="text-sm text-muted-foreground">
                    Expanding to serve Muslim communities in every corner of the world
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🔗</div>
                  <h3 className="text-lg font-semibold text-islamic-teal mb-2">Blockchain Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Leading the adoption of blockchain technology in Islamic education
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-lg font-semibold text-islamic-gold mb-2">Authentic Knowledge</h3>
                  <p className="text-sm text-muted-foreground">
                    Preserving and sharing traditional Islamic scholarship with modern tools
                  </p>
                </div>
              </div>
              <div className="pt-8">
                <Link to="/courses">
                  <Button variant="hero" size="xl" className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </GSAPWrapper>
        </div>
      </section>
    </div>
  );
}