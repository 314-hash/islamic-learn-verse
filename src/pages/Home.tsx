import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GSAPWrapper from "@/components/Animations/GSAPWrapper";
import ParticleBackground from "@/components/Animations/ParticleBackground";
import { BookOpen, Users, Award, Globe, ArrowRight, Star, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Premium Courses",
    description: "Access high-quality Islamic educational content with interactive learning materials",
  },
  {
    icon: Users,
    title: "Community Forums",
    description: "Connect with fellow learners in a safe, moderated environment",
  },
  {
    icon: Award,
    title: "NFT Certificates",
    description: "Earn blockchain-verified certificates upon course completion",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Learn from anywhere with our decentralized platform",
  },
];

const stats = [
  { number: "10,000+", label: "Active Learners" },
  { number: "500+", label: "Courses Available" },
  { number: "50+", label: "Expert Instructors" },
  { number: "25+", label: "Countries Reached" },
];

const testimonials = [
  {
    name: "Amina Hassan",
    role: "Student",
    content: "VLCP transformed my understanding of Islamic finance. The courses are comprehensive and the community is incredibly supportive.",
    rating: 5,
  },
  {
    name: "Omar Abdullah",
    role: "Instructor",
    content: "Teaching on VLCP has been rewarding. The platform's blockchain integration ensures course authenticity and fair compensation.",
    rating: 5,
  },
  {
    name: "Fatima Ali",
    role: "Professional",
    content: "The NFT certificates have been recognized by my employer. VLCP is setting new standards in Islamic education.",
    rating: 5,
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const timelapseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero time-lapse background animation
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(timelapseRef.current, {
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      duration: 8,
      ease: "power2.inOut",
    })
    .to(timelapseRef.current, {
      background: "linear-gradient(135deg, #ff6b6b 0%, #ffa726 50%, #d4af37 100%)",
      duration: 8,
      ease: "power2.inOut",
    })
    .to(timelapseRef.current, {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #1a1a2e 100%)",
      duration: 8,
      ease: "power2.inOut",
    })
    .to(timelapseRef.current, {
      background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
      duration: 8,
      ease: "power2.inOut",
    });

    // Hero text animation
    gsap.fromTo(
      ".hero-title",
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1 }
    );

    gsap.fromTo(
      ".hero-buttons",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1.5 }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={timelapseRef}
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Learn with
              <span className="block bg-gradient-to-r from-vlcp-gold to-vlcp-blue bg-clip-text text-transparent">
                Excellence
              </span>
            </h1>
            
            <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience next-generation virtual learning with blockchain-verified certificates, 
              interactive courses, and a global community committed to educational excellence.
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/courses">
                <Button variant="hero" size="xl" className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="elegant" size="xl">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 vlcp-circle bg-vlcp-gold/10 animate-float" />
          <div className="absolute top-40 right-20 w-16 h-16 vlcp-circle bg-vlcp-blue/10 animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-40 left-20 w-24 h-24 vlcp-circle bg-vlcp-gold/10 animate-float" style={{ animationDelay: "4s" }} />
          <div className="absolute bottom-20 right-10 w-18 h-18 vlcp-circle bg-vlcp-blue/10 animate-float" style={{ animationDelay: "1s" }} />
        </div>
      </section>

      {/* Stats Section */}
      <GSAPWrapper animation="stagger" className="py-20 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-vlcp-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </GSAPWrapper>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPWrapper animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose VLCP?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines traditional Islamic values with cutting-edge blockchain technology 
              to create an unparalleled learning experience.
            </p>
          </GSAPWrapper>

          <GSAPWrapper animation="stagger" staggerDelay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="card-gradient border-islamic-gold/20 hover:shadow-gold transition-all duration-300 hover:scale-105">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gold-gradient rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-8 h-8 text-islamic-navy" />
                      </div>
                      <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-muted-foreground">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPWrapper animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What Our Community Says
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from learners and instructors who are part of our growing Islamic educational community.
            </p>
          </GSAPWrapper>

          <GSAPWrapper animation="stagger" staggerDelay={0.3}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="card-gradient border-islamic-teal/20 hover:shadow-teal transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-islamic-gold text-islamic-gold" />
                      ))}
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </GSAPWrapper>
        </div>
      </section>

      {/* CTA Section */}
      <GSAPWrapper animation="fadeInUp" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card-gradient border border-islamic-gold/30 rounded-2xl p-12 shadow-elegant">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of learners on their journey to knowledge. 
              Connect your wallet to unlock premium features and start earning NFT certificates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button variant="hero" size="xl" className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Start Learning Now</span>
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="professional" size="xl" className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Join Community</span>
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-4 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-islamic-teal" />
                <span>Secure & Verified</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-islamic-gold" />
                <span>NFT Certificates</span>
              </div>
            </div>
          </div>
        </div>
      </GSAPWrapper>
    </div>
  );
}