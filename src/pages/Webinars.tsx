import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GSAPWrapper from "@/components/Animations/GSAPWrapper";
import { Calendar, Clock, Users, Video, Globe, Bell, Star, ExternalLink } from "lucide-react";

const webinars = [
  {
    id: 1,
    title: "Islamic Finance in the Digital Age",
    speaker: "Dr. Ahmad Hassan",
    speakerTitle: "Professor of Islamic Economics",
    description: "Explore how blockchain and cryptocurrency align with Islamic financial principles and discover halal investment opportunities in the digital economy.",
    date: "2024-01-15",
    time: "19:00",
    timezone: "UTC",
    duration: 90,
    attendees: 250,
    maxAttendees: 500,
    isLive: false,
    isUpcoming: true,
    isPremium: false,
    tags: ["Finance", "Blockchain", "Investment"],
    registrationRequired: true,
    rating: 4.8,
    language: "English",
    image: "🏦"
  },
  {
    id: 2,
    title: "Understanding Hadith Classification",
    speaker: "Sheikh Omar Al-Zahra",
    speakerTitle: "Hadith Scholar",
    description: "Learn the methodology of hadith authentication and classification used by classical and contemporary scholars.",
    date: "2024-01-18",
    time: "20:00",
    timezone: "UTC",
    duration: 120,
    attendees: 180,
    maxAttendees: 300,
    isLive: false,
    isUpcoming: true,
    isPremium: true,
    tags: ["Hadith", "Islamic Studies", "Methodology"],
    registrationRequired: true,
    rating: 4.9,
    language: "Arabic",
    image: "📚"
  },
  {
    id: 3,
    title: "Quranic Recitation Workshop",
    speaker: "Qari Abdullah Ibn Masud",
    speakerTitle: "Master Qari",
    description: "Interactive workshop on proper Quranic recitation with Tajweed rules and practical exercises.",
    date: "2024-01-20",
    time: "18:00",
    timezone: "UTC",
    duration: 150,
    attendees: 420,
    maxAttendees: 1000,
    isLive: true,
    isUpcoming: false,
    isPremium: false,
    tags: ["Quran", "Tajweed", "Recitation"],
    registrationRequired: false,
    rating: 5.0,
    language: "Arabic",
    image: "🎵"
  },
  {
    id: 4,
    title: "Women in Islamic History",
    speaker: "Dr. Fatima Al-Zahra",
    speakerTitle: "Islamic Historian",
    description: "Celebrating the contributions of influential women in Islamic civilization and their lasting impact.",
    date: "2024-01-22",
    time: "17:00",
    timezone: "UTC",
    duration: 75,
    attendees: 0,
    maxAttendees: 400,
    isLive: false,
    isUpcoming: true,
    isPremium: false,
    tags: ["History", "Women", "Biography"],
    registrationRequired: true,
    rating: 0,
    language: "English",
    image: "👩‍🎓"
  },
  {
    id: 5,
    title: "Modern Fiqh Applications",
    speaker: "Sheikh Muhammad Al-Mansouri",
    speakerTitle: "Contemporary Fiqh Expert",
    description: "Applying classical Islamic jurisprudence to contemporary issues including technology, medicine, and social media.",
    date: "2024-01-12",
    time: "19:30",
    timezone: "UTC",
    duration: 100,
    attendees: 350,
    maxAttendees: 350,
    isLive: false,
    isUpcoming: false,
    isPremium: true,
    tags: ["Fiqh", "Contemporary Issues", "Jurisprudence"],
    registrationRequired: true,
    rating: 4.7,
    language: "English",
    image: "⚖️"
  }
];

export default function Webinars() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [countdown, setCountdown] = useState<{ [key: number]: string }>({});

  const filters = ["All", "Upcoming", "Live", "Premium", "Free"];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newCountdown: { [key: number]: string } = {};

      webinars.forEach(webinar => {
        if (webinar.isUpcoming) {
          const webinarDate = new Date(`${webinar.date}T${webinar.time}:00Z`);
          const timeDiff = webinarDate.getTime() - now.getTime();

          if (timeDiff > 0) {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            newCountdown[webinar.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          } else {
            newCountdown[webinar.id] = "Starting soon...";
          }
        }
      });

      setCountdown(newCountdown);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredWebinars = webinars.filter(webinar => {
    switch (selectedFilter) {
      case "Upcoming": return webinar.isUpcoming;
      case "Live": return webinar.isLive;
      case "Premium": return webinar.isPremium;
      case "Free": return !webinar.isPremium;
      default: return true;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (webinar: any) => {
    if (webinar.isLive) {
      return (
        <Badge className="bg-destructive/20 text-destructive border-destructive/30 animate-pulse">
          🔴 Live Now
        </Badge>
      );
    }
    if (webinar.isUpcoming) {
      return (
        <Badge className="bg-vlcp-blue/20 text-vlcp-blue border-vlcp-blue/30">
          📅 Upcoming
        </Badge>
      );
    }
    return (
      <Badge className="bg-muted text-muted-foreground">
        📺 Recorded
      </Badge>
    );
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-16 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPWrapper animation="fadeInUp" className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Islamic Webinars
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join live interactive sessions with renowned Islamic scholars and experts. 
              Participate in Q&A sessions and earn certificates of attendance.
            </p>
          </GSAPWrapper>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card/30 sticky top-20 z-40 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "hero" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="flex items-center space-x-2"
              >
                {filter === "Live" && <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />}
                <span>{filter}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Webinars Section */}
      {filteredWebinars.some(w => w.isLive) && (
        <section className="py-8 bg-destructive/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center space-x-2">
              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
              <span>Live Now</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWebinars.filter(w => w.isLive).map((webinar) => (
                <Card key={webinar.id} className="border-destructive/30 bg-destructive/5 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{webinar.image}</div>
                      {getStatusBadge(webinar)}
                    </div>
                    <CardTitle className="text-xl font-semibold">{webinar.title}</CardTitle>
                    <div className="text-sm text-vlcp-blue font-medium">{webinar.speaker}</div>
                    <CardDescription className="line-clamp-2">{webinar.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{webinar.attendees} watching</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{webinar.duration} min</span>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm" className="w-full animate-pulse">
                        <Video className="w-4 h-4 mr-2" />
                        Join Live Stream
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Webinars Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPWrapper animation="stagger" staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWebinars.filter(w => !w.isLive).map((webinar) => (
                <Card
                  key={webinar.id}
                  className="card-gradient border-vlcp-gold/20 hover:shadow-gold transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{webinar.image}</div>
                      <div className="flex flex-col gap-2">
                        {getStatusBadge(webinar)}
                        {webinar.isPremium && (
                          <Badge className="bg-vlcp-gold/20 text-vlcp-gold border-vlcp-gold/30">
                            Premium
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-semibold line-clamp-2">
                      {webinar.title}
                    </CardTitle>
                    
                    <div className="space-y-1">
                      <div className="text-sm text-vlcp-blue font-medium">{webinar.speaker}</div>
                      <div className="text-xs text-muted-foreground">{webinar.speakerTitle}</div>
                    </div>
                    
                    <CardDescription className="line-clamp-3">
                      {webinar.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Date and Time */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{formatDate(webinar.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{webinar.time} {webinar.timezone} • {webinar.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span>{webinar.language}</span>
                      </div>
                    </div>

                    {/* Countdown for upcoming webinars */}
                    {webinar.isUpcoming && countdown[webinar.id] && (
                      <div className="bg-vlcp-blue/10 border border-vlcp-blue/20 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Starts in:</div>
                        <div className="text-lg font-mono font-semibold text-vlcp-blue">
                          {countdown[webinar.id]}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {webinar.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats and Action */}
                    <div className="space-y-3 pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{webinar.attendees}/{webinar.maxAttendees}</span>
                        </div>
                        {webinar.rating > 0 && (
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-vlcp-gold fill-current" />
                            <span>{webinar.rating}</span>
                          </div>
                        )}
                      </div>

                      <Button
                        variant={webinar.isUpcoming ? "hero" : "outline"}
                        size="sm"
                        className="w-full flex items-center space-x-2"
                        disabled={webinar.attendees >= webinar.maxAttendees && webinar.isUpcoming}
                      >
                        {webinar.isUpcoming ? (
                          <>
                            <Bell className="w-4 h-4" />
                            <span>
                              {webinar.attendees >= webinar.maxAttendees ? "Full" : "Register"}
                            </span>
                          </>
                        ) : (
                          <>
                            <Video className="w-4 h-4" />
                            <span>Watch Recording</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </GSAPWrapper>

          {filteredWebinars.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📹</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">No webinars found</h3>
              <p className="text-muted-foreground">
                Check back later for upcoming webinars or explore our course library.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-card/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GSAPWrapper animation="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Want to host a webinar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Share your knowledge with our global Islamic learning community. 
              Apply to become a speaker and reach thousands of eager learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Apply as Speaker
              </Button>
              <Button variant="elegant" size="lg" className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Speaker Guidelines</span>
              </Button>
            </div>
          </GSAPWrapper>
        </div>
      </section>
    </div>
  );
}