import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, CheckCircle, XCircle } from 'lucide-react';
import { useScholarDAO } from '@/hooks/useScholarDAO';

interface ScholarVerificationCardProps {
  walletAddress?: string;
  isAdmin?: boolean;
}

export function ScholarVerificationCard({ walletAddress, isAdmin = false }: ScholarVerificationCardProps) {
  const [scholarAddress, setScholarAddress] = useState('');
  const [metadata, setMetadata] = useState('');
  const [revokeAddress, setRevokeAddress] = useState('');
  
  const {
    isVerified,
    loading,
    verifyScholar,
    revokeScholar,
  } = useScholarDAO(walletAddress);

  const handleVerifyScholar = () => {
    if (scholarAddress && metadata) {
      verifyScholar(scholarAddress, metadata);
      setScholarAddress('');
      setMetadata('');
    }
  };

  const handleRevokeScholar = () => {
    if (revokeAddress) {
      revokeScholar(revokeAddress);
      setRevokeAddress('');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Scholar Verification
        </CardTitle>
        <CardDescription>
          Verify academic credentials and scholarly achievements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            {isVerified ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-muted-foreground" />
            )}
            <span className="font-medium">Your Scholar Status</span>
          </div>
          <Badge variant={isVerified ? 'default' : 'secondary'}>
            {isVerified ? 'Verified Scholar' : 'Not Verified'}
          </Badge>
        </div>

        {/* Admin Verification Section */}
        {isAdmin && (
          <div className="space-y-4 pt-4 border-t">
            <Label className="text-sm font-semibold">Verify Scholar (Admin Only)</Label>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="scholar-address">Scholar Address</Label>
                <Input
                  id="scholar-address"
                  placeholder="0x..."
                  value={scholarAddress}
                  onChange={(e) => setScholarAddress(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <div>
                <Label htmlFor="metadata">Verification Metadata</Label>
                <Textarea
                  id="metadata"
                  placeholder="Scholar credentials, degree, institution, etc."
                  value={metadata}
                  onChange={(e) => setMetadata(e.target.value)}
                  disabled={loading}
                  rows={3}
                />
              </div>
              
              <Button
                onClick={handleVerifyScholar}
                disabled={loading || !scholarAddress || !metadata}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Verify Scholar'}
              </Button>
            </div>

            {/* Revoke Section */}
            <div className="space-y-3 pt-4 border-t">
              <Label className="text-sm font-semibold text-destructive">Revoke Scholar Status</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Scholar address to revoke"
                  value={revokeAddress}
                  onChange={(e) => setRevokeAddress(e.target.value)}
                  disabled={loading}
                />
                <Button
                  onClick={handleRevokeScholar}
                  disabled={loading || !revokeAddress}
                  variant="destructive"
                  className="shrink-0"
                >
                  {loading ? 'Processing...' : 'Revoke'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Information for non-admin users */}
        {!isAdmin && !isVerified && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              To get verified as a scholar, please contact the platform administrators 
              with your academic credentials and achievements.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}