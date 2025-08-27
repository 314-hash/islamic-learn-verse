import { useState } from 'react';
import EnhancedWalletConnector from './EnhancedWalletConnector';
import { ReputationCard } from './ReputationCard';
import { ZakatPoolCard } from './ZakatPoolCard';
import { ScholarVerificationCard } from './ScholarVerificationCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Wallet, Trophy, Heart, GraduationCap, BookOpen, Award, Smartphone, Monitor, Globe, ArrowRight } from 'lucide-react';

export function Web3Dashboard() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const isMobile = useIsMobile();

  // In a real app, this would come from your authentication system
  const isAdmin = walletAddress.toLowerCase() === '0x742d35Cc6567C4532E5b4b5dE8cB9A7986D652'; // Example admin address

  const handleConnect = (address: string) => {
    setWalletAddress(address);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setWalletAddress('');
    setIsConnected(false);
  };

  const quickActions = [
    {
      icon: Trophy,
      title: "Earn Reputation",
      description: "Complete courses & quizzes",
      color: "vlcp-gold",
      href: "/courses"
    },
    {
      icon: Heart,
      title: "Donate to Zakat",
      description: "Support students in need",
      color: "vlcp-blue",
      href: "#zakat"
    },
    {
      icon: Award,
      title: "Get Verified",
      description: "Become a verified scholar",
      color: "vlcp-gold",
      href: "#scholar"
    },
    {
      icon: BookOpen,
      title: "Create Course",
      description: "Share your knowledge",
      color: "vlcp-blue",
      href: "/courses"
    }
  ];

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-12">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-vlcp-gold to-vlcp-blue bg-clip-text text-transparent">
              Web3 Learning dApp
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect your wallet to access blockchain-verified education, NFT certificates, 
              and participate in our decentralized learning ecosystem.
            </p>
          </div>
          
          {/* Device Icons */}
          <div className="flex items-center justify-center space-x-6 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Monitor className="w-5 h-5" />
              <span className="text-sm">Desktop</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm">Mobile</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Web3</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="card-gradient border-vlcp-gold/20 hover:shadow-gold transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-2">
                  <div className={`w-12 h-12 mx-auto bg-${action.color}/10 rounded-full flex items-center justify-center mb-3`}>
                    <Icon className={`w-6 h-6 text-${action.color}`} />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-sm">{action.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Wallet Connection */}
        <div className="max-w-md mx-auto">
          <EnhancedWalletConnector
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            isConnected={isConnected}
            walletAddress={walletAddress}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-6xl">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-vlcp-gold to-vlcp-blue bg-clip-text text-transparent">
            Web3 Dashboard
          </h1>
          {isAdmin && (
            <Badge variant="default" className="bg-vlcp-gold text-vlcp-navy">
              <Award className="h-3 w-3 mr-1" />
              Admin
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Manage your blockchain-based learning experience, track reputation, and interact with smart contracts.
        </p>
      </div>

      {/* Wallet Info - Always Visible */}
      <div className="max-w-md mx-auto">
        <EnhancedWalletConnector
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          isConnected={isConnected}
          walletAddress={walletAddress}
        />
      </div>

      {/* Main Dashboard - Responsive Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-8`}>
          <TabsTrigger value="overview" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <Wallet className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Overview</span>
            <span className="sm:hidden">Home</span>
          </TabsTrigger>
          <TabsTrigger value="reputation" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
            <Trophy className="h-3 w-3 md:h-4 md:w-4" />
            <span>Reputation</span>
          </TabsTrigger>
          {!isMobile && (
            <>
              <TabsTrigger value="zakat" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Zakat Pool
              </TabsTrigger>
              <TabsTrigger value="scholar" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Scholar DAO
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReputationCard walletAddress={walletAddress} isAdmin={isAdmin} />
            <ZakatPoolCard walletAddress={walletAddress} isAdmin={isAdmin} />
            <ScholarVerificationCard walletAddress={walletAddress} isAdmin={isAdmin} />
          </div>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common dApp interactions and platform features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all"
                    >
                      <Icon className={`h-6 w-6 md:h-8 md:w-8 text-${action.color}`} />
                      <div className="text-center">
                        <div className="text-xs md:text-sm font-medium">{action.title}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Mobile Additional Tabs */}
          {isMobile && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 cursor-pointer hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-vlcp-blue" />
                      <span className="font-medium">Zakat Pool</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
                
                <Card className="p-4 cursor-pointer hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-vlcp-gold" />
                      <span className="font-medium">Scholar DAO</span>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reputation" className="space-y-6">
          <ReputationCard walletAddress={walletAddress} isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="zakat" className="space-y-6">
          <ZakatPoolCard walletAddress={walletAddress} isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="scholar" className="space-y-6">
          <ScholarVerificationCard walletAddress={walletAddress} isAdmin={isAdmin} />
        </TabsContent>
      </Tabs>
    </div>
  );
}