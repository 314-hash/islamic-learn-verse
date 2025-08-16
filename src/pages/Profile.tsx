import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import GSAPWrapper from "@/components/Animations/GSAPWrapper";
import WalletConnector from "@/components/Web3/WalletConnector";
import { 
  User, 
  Award, 
  BookOpen, 
  Calendar, 
  Star, 
  TrendingUp, 
  Download,
  ExternalLink,
  Settings,
  Shield,
  Coins
} from "lucide-react";

interface ProfileProps {
  isWalletConnected: boolean;
  walletAddress?: string;
  onWalletConnect: (address: string) => void;
  onWalletDisconnect: () => void;
}

const userProgress = {
  coursesCompleted: 8,
  coursesInProgress: 3,
  totalCourses: 11,
  certificatesEarned: 6,
  communityContributions: 45,
  studyStreak: 23,
  totalStudyHours: 156
};

const certificates = [
  {
    id: 1,
    title: "Islamic Finance Fundamentals",
    issuer: "VLCP Academy",
    issueDate: "2024-01-10",
    tokenId: "0x1a2b3c...",
    verified: true,
    image: "🏦"
  },
  {
    id: 2,
    title: "Quranic Arabic Mastery",
    issuer: "VLCP Academy",
    issueDate: "2024-01-05",
    tokenId: "0x4d5e6f...",
    verified: true,
    image: "📚"
  },
  {
    id: 3,
    title: "Hadith Sciences Completion",
    issuer: "VLCP Academy",
    issueDate: "2023-12-28",
    tokenId: "0x7g8h9i...",
    verified: true,
    image: "📖"
  }
];

const currentCourses = [
  {
    id: 1,
    title: "Advanced Fiqh Studies",
    progress: 65,
    instructor: "Sheikh Muhammad Ibrahim",
    nextLesson: "Contemporary Fiqh Applications",
    dueDate: "2024-01-20",
    image: "⚖️"
  },
  {
    id: 2,
    title: "Islamic History: Early Period",
    progress: 40,
    instructor: "Dr. Fatima Ali",
    nextLesson: "The Rashidun Caliphate",
    dueDate: "2024-01-25",
    image: "🏛️"
  },
  {
    id: 3,
    title: "Tafsir al-Quran: Surah Al-Baqarah",
    progress: 20,
    instructor: "Sheikh Abdullah al-Mansouri",
    nextLesson: "Verses 1-20 Analysis",
    dueDate: "2024-02-01",
    image: "🌟"
  }
];

const achievements = [
  { title: "First Course Completed", description: "Completed your first VLCP course", earned: true, icon: "🎯" },
  { title: "Study Streak Champion", description: "Maintained 30-day study streak", earned: false, icon: "🔥" },
  { title: "Community Helper", description: "Helped 50+ fellow students", earned: true, icon: "🤝" },
  { title: "Certificate Collector", description: "Earned 10 NFT certificates", earned: false, icon: "🏆" },
  { title: "Knowledge Seeker", description: "Enrolled in 5+ courses", earned: true, icon: "📚" },
  { title: "Forum Contributor", description: "Made 100+ forum posts", earned: false, icon: "💬" }
];

export default function Profile({ 
  isWalletConnected, 
  walletAddress, 
  onWalletConnect, 
  onWalletDisconnect 
}: ProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <GSAPWrapper animation="fadeInUp">
            <WalletConnector
              onConnect={onWalletConnect}
              onDisconnect={onWalletDisconnect}
              isConnected={isWalletConnected}
              walletAddress={walletAddress}
            />
          </GSAPWrapper>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="py-16 bg-hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GSAPWrapper animation="fadeInUp" className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-gold-gradient rounded-full flex items-center justify-center text-4xl">
                👤
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  Learning Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">
                  Welcome back to your Islamic learning journey
                </p>
                <div className="text-sm text-islamic-teal font-mono mt-2">
                  {walletAddress && `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`}
                </div>
              </div>
            </div>
          </GSAPWrapper>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto bg-card/50 p-1">
            <TabsTrigger value="overview" className="flex items-center space-x-2 py-3">
              <TrendingUp className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center space-x-2 py-3">
              <BookOpen className="w-4 h-4" />
              <span>Courses</span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center space-x-2 py-3">
              <Award className="w-4 h-4" />
              <span>Certificates</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2 py-3">
              <Star className="w-4 h-4" />
              <span>Achievements</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Grid */}
            <GSAPWrapper animation="stagger" staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="card-gradient border-islamic-gold/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                    <BookOpen className="h-4 w-4 text-islamic-gold" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-islamic-gold">{userProgress.coursesCompleted}</div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-gradient border-islamic-teal/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                    <Calendar className="h-4 w-4 text-islamic-teal" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-islamic-teal">{userProgress.studyStreak} days</div>
                    <p className="text-xs text-muted-foreground">
                      Keep it up!
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-gradient border-islamic-gold/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">NFT Certificates</CardTitle>
                    <Award className="h-4 w-4 text-islamic-gold" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-islamic-gold">{userProgress.certificatesEarned}</div>
                    <p className="text-xs text-muted-foreground">
                      Blockchain verified
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-gradient border-islamic-teal/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                    <TrendingUp className="h-4 w-4 text-islamic-teal" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-islamic-teal">{userProgress.totalStudyHours}h</div>
                    <p className="text-xs text-muted-foreground">
                      This semester
                    </p>
                  </CardContent>
                </Card>
              </div>
            </GSAPWrapper>

            {/* Current Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <GSAPWrapper animation="fadeInLeft">
                <Card className="card-gradient border-islamic-gold/20">
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                    <CardDescription>Your current course completion status</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{Math.round((userProgress.coursesCompleted / userProgress.totalCourses) * 100)}%</span>
                      </div>
                      <Progress value={(userProgress.coursesCompleted / userProgress.totalCourses) * 100} />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-islamic-gold">{userProgress.coursesCompleted}</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-islamic-teal">{userProgress.coursesInProgress}</div>
                        <div className="text-xs text-muted-foreground">In Progress</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-muted-foreground">{userProgress.totalCourses}</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </GSAPWrapper>

              <GSAPWrapper animation="fadeInRight">
                <Card className="card-gradient border-islamic-teal/20">
                  <CardHeader>
                    <CardTitle>Community Impact</CardTitle>
                    <CardDescription>Your contributions to the learning community</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Forum Contributions</span>
                      <Badge className="bg-islamic-teal/20 text-islamic-teal">
                        {userProgress.communityContributions}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Helpful Answers</span>
                      <Badge className="bg-islamic-gold/20 text-islamic-gold">
                        23
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Study Groups Joined</span>
                      <Badge className="bg-islamic-teal/20 text-islamic-teal">
                        5
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Community Rank</span>
                      <Badge className="bg-islamic-gold/20 text-islamic-gold">
                        Helper
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </GSAPWrapper>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <GSAPWrapper animation="fadeInUp">
              <h2 className="text-2xl font-bold text-foreground mb-6">Current Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCourses.map((course, index) => (
                  <Card key={course.id} className="card-gradient border-islamic-gold/20 hover:shadow-gold transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="text-3xl">{course.image}</div>
                        <Badge className="bg-islamic-teal/20 text-islamic-teal">
                          {course.progress}%
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={course.progress} />
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Next Lesson: </span>
                          <span className="font-medium">{course.nextLesson}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Due: </span>
                          <span className="font-medium">{course.dueDate}</span>
                        </div>
                      </div>
                      <Button variant="hero" size="sm" className="w-full">
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </GSAPWrapper>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <GSAPWrapper animation="fadeInUp">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">NFT Certificates</h2>
                <Badge className="bg-islamic-gold/20 text-islamic-gold">
                  {certificates.length} Earned
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, index) => (
                  <Card key={cert.id} className="card-gradient border-islamic-gold/20 hover:shadow-gold transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="text-4xl">{cert.image}</div>
                        <Badge className="bg-islamic-teal/20 text-islamic-teal flex items-center space-x-1">
                          <Shield className="w-3 h-3" />
                          <span>Verified</span>
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <CardDescription>{cert.issuer}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm space-y-1">
                        <div>
                          <span className="text-muted-foreground">Issued: </span>
                          <span className="font-medium">{cert.issueDate}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Token ID: </span>
                          <span className="font-mono text-xs">{cert.tokenId}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Verify
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </GSAPWrapper>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <GSAPWrapper animation="fadeInUp">
              <h2 className="text-2xl font-bold text-foreground mb-6">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <Card 
                    key={index} 
                    className={`card-gradient transition-all duration-300 ${
                      achievement.earned 
                        ? 'border-islamic-gold/40 shadow-gold' 
                        : 'border-border/20 opacity-60'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className={`text-3xl ${achievement.earned ? '' : 'grayscale'}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className={`text-lg ${achievement.earned ? 'text-islamic-gold' : 'text-muted-foreground'}`}>
                            {achievement.title}
                          </CardTitle>
                          <CardDescription>{achievement.description}</CardDescription>
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-islamic-gold/20 text-islamic-gold">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </GSAPWrapper>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}