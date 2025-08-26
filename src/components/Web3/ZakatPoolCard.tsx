import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, DollarSign, Coins } from 'lucide-react';
import { useZakatPool } from '@/hooks/useZakatPool';

interface ZakatPoolCardProps {
  walletAddress?: string;
  isAdmin?: boolean;
}

export function ZakatPoolCard({ walletAddress, isAdmin = false }: ZakatPoolCardProps) {
  const [donationAmount, setDonationAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  
  const {
    userDonations,
    totalDonations,
    tokenBalance,
    loading,
    donate,
    withdraw,
  } = useZakatPool(walletAddress);

  const handleDonate = () => {
    if (donationAmount && parseFloat(donationAmount) > 0) {
      donate(donationAmount);
      setDonationAmount('');
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount && withdrawAddress && parseFloat(withdrawAmount) > 0) {
      withdraw(withdrawAddress, withdrawAmount);
      setWithdrawAmount('');
      setWithdrawAddress('');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Zakat Pool
        </CardTitle>
        <CardDescription>
          Contribute to educational charity and help students in need
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pool Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalDonations}</div>
            <div className="text-sm text-muted-foreground">Total Pool EDU</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-secondary">{userDonations}</div>
            <div className="text-sm text-muted-foreground">Your Donations</div>
          </div>
        </div>

        {/* Token Balance */}
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <Coins className="h-4 w-4 text-primary" />
          <span className="text-sm">Your EDU Balance: </span>
          <span className="font-semibold">{tokenBalance}</span>
        </div>

        {/* Donation Section */}
        <div className="space-y-3">
          <Label htmlFor="donation">Make a Donation</Label>
          <div className="flex gap-2">
            <Input
              id="donation"
              type="number"
              placeholder="Amount in EDU"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              disabled={loading}
            />
            <Button
              onClick={handleDonate}
              disabled={loading || !donationAmount || !walletAddress}
              className="shrink-0"
            >
              {loading ? 'Processing...' : 'Donate'}
            </Button>
          </div>
        </div>

        {/* Admin Withdrawal Section */}
        {isAdmin && (
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-sm font-semibold">Admin Withdrawal</Label>
            <div className="space-y-2">
              <Input
                placeholder="Recipient Address"
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                disabled={loading}
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Amount in EDU"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  disabled={loading}
                />
                <Button
                  onClick={handleWithdraw}
                  disabled={loading || !withdrawAmount || !withdrawAddress}
                  variant="outline"
                  className="shrink-0"
                >
                  {loading ? 'Processing...' : 'Withdraw'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}