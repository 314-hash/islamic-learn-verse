import { useState } from 'react';
import WalletConnector from './WalletConnector';
import { ReputationCard } from './ReputationCard';
import { ZakatPoolCard } from './ZakatPoolCard';
import { ScholarVerificationCard } from './ScholarVerificationCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Wallet, Trophy, Heart, GraduationCap, BookOpen, Award } from 'lucide-react';

export function Web3Dashboard() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

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

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <WalletConnector
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
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Web3 Learning Platform</h1>
        <p className="text-muted-foreground">
          Manage your blockchain-based learning experience
        </p>
        {isAdmin && (
          <Badge variant="default" className="bg-primary">
            <Award className="h-3 w-3 mr-1" />
            Administrator
          </Badge>
        )}
      </div>

      {/* Wallet Info */}
      <div className="max-w-md mx-auto">
        <WalletConnector
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          isConnected={isConnected}
          walletAddress={walletAddress}
        />
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="reputation" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Reputation
          </TabsTrigger>
          <TabsTrigger value="zakat" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Zakat Pool
          </TabsTrigger>
          <TabsTrigger value="scholar" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Scholar DAO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
                Common actions you can perform on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Earn Reputation</div>
                  <div className="text-xs text-muted-foreground">Complete courses</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Donate to Zakat</div>
                  <div className="text-xs text-muted-foreground">Help students</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Get Verified</div>
                  <div className="text-xs text-muted-foreground">Scholar status</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Create Course</div>
                  <div className="text-xs text-muted-foreground">Share knowledge</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reputation">
          <ReputationCard walletAddress={walletAddress} isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="zakat">
          <ZakatPoolCard walletAddress={walletAddress} isAdmin={isAdmin} />
        </TabsContent>

        <TabsContent value="scholar">
          <ScholarVerificationCard walletAddress={walletAddress} isAdmin={isAdmin} />
        </TabsContent>
      </Tabs>
    </div>
  );
}