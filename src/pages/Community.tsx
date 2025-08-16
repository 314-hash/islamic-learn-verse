import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GSAPWrapper from "@/components/Animations/GSAPWrapper";
import { MessageCircle, Users, Heart, Pin, Search, Plus, Eye, Clock, ThumbsUp, Reply } from "lucide-react";

const categories = ["All", "General Discussion", "Quran Studies", "Islamic Finance", "Hadith Sciences", "Fiqh Q&A", "Study Groups"];

const forumThreads = [
  {
    id: 1,
    title: "Understanding the concept of Riba in modern banking",
    author: "Ahmad_Student",
    authorRole: "Student",
    category: "Islamic Finance",
    content: "I'm having trouble understanding how conventional banking interest (riba) applies to different financial products. Can someone explain the key differences?",
    replies: 23,
    views: 156,
    likes: 45,
    isPinned: true,
    isActive: true,
    lastActivity: "2 hours ago",
    tags: ["Riba", "Banking", "Halal Finance"],
    hasExpertReply: true
  },
  {
    id: 2,
    title: "Memorization techniques for Quran - Share your methods",
    author: "Hafiza_Aisha",
    authorRole: "Verified Hafiza",
    category: "Quran Studies",
    content: "As someone who has memorized the entire Quran, I'd like to share some effective techniques and hear about your experiences with Hifz.",
    replies: 67,
    views: 342,
    likes: 89,
    isPinned: false,
    isActive: true,
    lastActivity: "30 minutes ago",
    tags: ["Hifz", "Memorization", "Quran"],
    hasExpertReply: true
  },
  {
    id: 3,
    title: "Study group for Advanced Fiqh course",
    author: "Omar_Fiqh",
    authorRole: "Course Student",
    category: "Study Groups",
    content: "Looking to form a study group for the Advanced Fiqh Studies course. We can meet weekly to discuss concepts and prepare for assessments.",
    replies: 12,
    views: 78,
    likes: 34,
    isPinned: false,
    isActive: true,
    lastActivity: "1 hour ago",
    tags: ["Study Group", "Fiqh", "Collaboration"],
    hasExpertReply: false
  },
  {
    id: 4,
    title: "Question about hadith authentication methods",
    author: "Seeking_Knowledge",
    authorRole: "New Student",
    category: "Hadith Sciences",
    content: "I'm new to hadith studies and confused about the different chains of narration. How do scholars verify the authenticity of hadiths?",
    replies: 18,
    views: 134,
    likes: 28,
    isPinned: false,
    isActive: false,
    lastActivity: "5 hours ago",
    tags: ["Hadith", "Authentication", "Isnad"],
    hasExpertReply: true
  },
  {
    id: 5,
    title: "Welcome new members - Introduce yourself here!",
    author: "Community_Moderator",
    authorRole: "Moderator",
    category: "General Discussion",
    content: "New to VLCP? This is the perfect place to introduce yourself, share your learning goals, and connect with fellow students.",
    replies: 145,
    views: 892,
    likes: 167,
    isPinned: true,
    isActive: true,
    lastActivity: "15 minutes ago",
    tags: ["Welcome", "Introductions", "Community"],
    hasExpertReply: false
  }
];

const liveActivities = [
  { user: "Dr_Ahmad_Hassan", action: "replied to", thread: "Understanding Riba", time: "2 min ago" },
  { user: "Hafiza_Aisha", action: "created", thread: "Tajweed rules discussion", time: "5 min ago" },
  { user: "Sheikh_Omar", action: "liked", thread: "Hadith authentication", time: "8 min ago" },
  { user: "Student_Fatima", action: "joined", thread: "Study group", time: "12 min ago" },
];

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);

  const filteredThreads = forumThreads.filter(thread => {
    const matchesCategory = selectedCategory === "All" || thread.category === selectedCategory;
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Moderator": return "bg-destructive/20 text-destructive";
      case "Verified Hafiza": return "bg-islamic-gold/20 text-islamic-gold";
      case "Expert": return "bg-islamic-teal/20 text-islamic-teal";
      case "Instructor": return "bg-islamic-teal/20 text-islamic-teal";
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
              Community Forum
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Connect with fellow learners, ask questions, share knowledge, and build meaningful 
              relationships in our moderated Islamic learning community.
            </p>
          </GSAPWrapper>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Forum Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="hero"
                onClick={() => setShowNewThreadForm(!showNewThreadForm)}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Thread</span>
              </Button>
            </div>

            {/* Category Filters */}
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

            {/* New Thread Form */}
            {showNewThreadForm && (
              <GSAPWrapper animation="fadeInUp">
                <Card className="card-gradient border-islamic-gold/20">
                  <CardHeader>
                    <CardTitle>Create New Thread</CardTitle>
                    <CardDescription>
                      Share your question or start a discussion with the community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Thread title..." />
                    <select className="w-full p-2 rounded-md border border-border bg-background">
                      <option>Select Category</option>
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <Textarea placeholder="What would you like to discuss?" rows={4} />
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setShowNewThreadForm(false)}>
                        Cancel
                      </Button>
                      <Button variant="hero">Post Thread</Button>
                    </div>
                  </CardContent>
                </Card>
              </GSAPWrapper>
            )}

            {/* Forum Threads */}
            <div className="space-y-4">
              {filteredThreads.map((thread, index) => (
                <GSAPWrapper key={thread.id} animation="fadeInUp" delay={index * 0.1}>
                  <Card className={`card-gradient transition-all duration-300 hover:shadow-gold hover:scale-[1.02] ${
                    thread.isPinned ? 'border-islamic-gold/40' : 'border-islamic-gold/20'
                  }`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {thread.isPinned && (
                              <Pin className="w-4 h-4 text-islamic-gold" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {thread.category}
                            </Badge>
                            {thread.hasExpertReply && (
                              <Badge className="bg-islamic-teal/20 text-islamic-teal text-xs">
                                Expert Reply
                              </Badge>
                            )}
                          </div>
                          
                          <CardTitle className="text-lg hover:text-islamic-gold transition-colors cursor-pointer">
                            {thread.title}
                          </CardTitle>
                          
                          <div className="flex items-center space-x-4 mt-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{thread.author}</span>
                              <Badge className={`text-xs ${getRoleColor(thread.authorRole)}`}>
                                {thread.authorRole}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{thread.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`w-3 h-3 rounded-full ${
                          thread.isActive ? 'bg-islamic-teal' : 'bg-muted'
                        }`} />
                      </div>
                      
                      <CardDescription className="line-clamp-2 mt-3">
                        {thread.content}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{thread.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{thread.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{thread.likes}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {thread.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </GSAPWrapper>
              ))}
            </div>

            {filteredThreads.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">No discussions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or start a new discussion.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <GSAPWrapper animation="fadeInRight">
              <Card className="card-gradient border-islamic-teal/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-islamic-teal" />
                    <span>Community Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Members</span>
                    <span className="font-semibold text-islamic-gold">12,547</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Discussions</span>
                    <span className="font-semibold text-islamic-teal">289</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expert Contributors</span>
                    <span className="font-semibold text-islamic-gold">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Online Now</span>
                    <span className="font-semibold text-islamic-teal">234</span>
                  </div>
                </CardContent>
              </Card>
            </GSAPWrapper>

            {/* Live Activity */}
            <GSAPWrapper animation="fadeInRight" delay={0.2}>
              <Card className="card-gradient border-islamic-gold/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-islamic-teal rounded-full animate-pulse" />
                    <span>Live Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {liveActivities.map((activity, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium text-islamic-teal">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action} </span>
                      <span className="font-medium">{activity.thread}</span>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </GSAPWrapper>

            {/* Community Guidelines */}
            <GSAPWrapper animation="fadeInRight" delay={0.4}>
              <Card className="card-gradient border-islamic-gold/20">
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Heart className="w-4 h-4 text-islamic-teal mt-0.5 flex-shrink-0" />
                    <span>Maintain respect and Islamic values in all discussions</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MessageCircle className="w-4 h-4 text-islamic-gold mt-0.5 flex-shrink-0" />
                    <span>Keep discussions relevant and constructive</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Users className="w-4 h-4 text-islamic-teal mt-0.5 flex-shrink-0" />
                    <span>Help fellow learners and share knowledge</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Read Full Guidelines
                  </Button>
                </CardContent>
              </Card>
            </GSAPWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}