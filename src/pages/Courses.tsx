import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import GSAPWrapper from "@/components/Animations/GSAPWrapper";
import { BookOpen, Clock, Users, Star, Search, Filter, Play, Lock } from "lucide-react";

const categories = ["All", "Quran Studies", "Islamic Finance", "Arabic Language", "History", "Fiqh", "Hadith"];

const courses = [
  {
    id: 1,
    title: "Introduction to Islamic Finance",
    instructor: "Dr. Ahmad Hassan",
    description: "Learn the fundamental principles of Islamic banking and finance in the modern world.",
    duration: "8 weeks",
    students: 1250,
    rating: 4.9,
    level: "Beginner",
    category: "Islamic Finance",
    price: "0.05 ETH",
    isPremium: false,
    image: "🏦",
    lessons: 24,
    progress: 0
  },
  {
    id: 2,
    title: "Quranic Arabic Mastery",
    instructor: "Ustaz Omar Abdullah",
    description: "Master the Arabic language through comprehensive Quranic vocabulary and grammar.",
    duration: "12 weeks",
    students: 980,
    rating: 4.8,
    level: "Intermediate",
    category: "Arabic Language",
    price: "0.08 ETH",
    isPremium: true,
    image: "📚",
    lessons: 36,
    progress: 0
  },
  {
    id: 3,
    title: "Islamic History: Early Period",
    instructor: "Dr. Fatima Ali",
    description: "Explore the rich history of early Islamic civilization and its global impact.",
    duration: "6 weeks",
    students: 750,
    rating: 4.7,
    level: "Beginner",
    category: "History",
    price: "0.04 ETH",
    isPremium: false,
    image: "🏛️",
    lessons: 18,
    progress: 0
  },
  {
    id: 4,
    title: "Advanced Fiqh Studies",
    instructor: "Sheikh Muhammad Ibrahim",
    description: "Deep dive into Islamic jurisprudence with contemporary applications and case studies.",
    duration: "16 weeks",
    students: 420,
    rating: 5.0,
    level: "Advanced",
    category: "Fiqh",
    price: "0.12 ETH",
    isPremium: true,
    image: "⚖️",
    lessons: 48,
    progress: 0
  },
  {
    id: 5,
    title: "Hadith Sciences Fundamentals",
    instructor: "Dr. Aisha Rahman",
    description: "Understand the science of Hadith authentication and classification methods.",
    duration: "10 weeks",
    students: 650,
    rating: 4.8,
    level: "Intermediate",
    category: "Hadith",
    price: "0.06 ETH",
    isPremium: false,
    image: "📖",
    lessons: 30,
    progress: 0
  },
  {
    id: 6,
    title: "Tafsir al-Quran: Surah Al-Baqarah",
    instructor: "Sheikh Abdullah al-Mansouri",
    description: "Comprehensive commentary and interpretation of the longest chapter in the Quran.",
    duration: "20 weeks",
    students: 890,
    rating: 4.9,
    level: "Advanced",
    category: "Quran Studies",
    price: "0.15 ETH",
    isPremium: true,
    image: "🌟",
    lessons: 60,
    progress: 0
  }
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-islamic-teal/20 text-islamic-teal";
      case "Intermediate": return "bg-islamic-gold/20 text-islamic-gold";
      case "Advanced": return "bg-destructive/20 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-16 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPWrapper animation="fadeInUp" className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Islamic Courses
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover comprehensive Islamic education through our expertly crafted courses. 
              Learn from renowned scholars and earn blockchain-verified certificates.
            </p>
          </GSAPWrapper>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-card/30 sticky top-20 z-40 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "hero" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex gap-2">
              {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "islamic" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPWrapper animation="stagger" staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  className="card-gradient border-islamic-gold/20 hover:shadow-gold transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{course.image}</div>
                      <div className="flex items-center space-x-2">
                        {course.isPremium && (
                          <Badge className="bg-islamic-gold/20 text-islamic-gold border-islamic-gold/30">
                            <Lock className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-semibold line-clamp-2">
                      {course.title}
                    </CardTitle>
                    
                    <div className="text-sm text-islamic-teal font-medium">
                      {course.instructor}
                    </div>
                    
                    <CardDescription className="text-muted-foreground line-clamp-3">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-islamic-gold fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="text-lg font-semibold text-islamic-gold">
                        {course.price}
                      </div>
                      <Button
                        variant={course.isPremium ? "premium" : "hero"}
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>{course.isPremium ? "Unlock" : "Start"}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </GSAPWrapper>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find more courses.
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
              Can't find what you're looking for?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Request a course or become an instructor to share your knowledge with our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Request Course
              </Button>
              <Button variant="elegant" size="lg">
                Become Instructor
              </Button>
            </div>
          </GSAPWrapper>
        </div>
      </section>
    </div>
  );
}