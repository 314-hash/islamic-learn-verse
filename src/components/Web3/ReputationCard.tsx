import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Star } from 'lucide-react';
import { useReputation } from '@/hooks/useReputation';

interface ReputationCardProps {
  walletAddress?: string;
  isAdmin?: boolean;
}

export function ReputationCard({ walletAddress, isAdmin = false }: ReputationCardProps) {
  const { reputation, loading, awardReputation } = useReputation(walletAddress);

  const getReputationLevel = (points: number) => {
    if (points >= 1000) return { level: 'Expert', color: 'bg-primary', icon: Trophy };
    if (points >= 500) return { level: 'Advanced', color: 'bg-secondary', icon: Award };
    if (points >= 100) return { level: 'Intermediate', color: 'bg-muted', icon: Star };
    return { level: 'Beginner', color: 'bg-muted-foreground', icon: Star };
  };

  const reputationLevel = getReputationLevel(reputation);
  const IconComponent = reputationLevel.icon;

  const handleAwardReputation = () => {
    if (walletAddress) {
      awardReputation(walletAddress, 10);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconComponent className="h-5 w-5 text-primary" />
          Reputation Score
        </CardTitle>
        <CardDescription>
          Earn reputation points by participating in courses and community activities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-primary">{reputation}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </div>
          <Badge className={reputationLevel.color}>
            {reputationLevel.level}
          </Badge>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min((reputation % 100), 100)}%`
            }}
          />
        </div>
        
        {isAdmin && (
          <Button
            onClick={handleAwardReputation}
            disabled={loading || !walletAddress}
            variant="outline"
            className="w-full"
          >
            {loading ? 'Awarding...' : 'Award 10 Points (Admin)'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}