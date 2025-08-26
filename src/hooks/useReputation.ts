import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContracts } from './useContracts';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function useReputation(walletAddress?: string) {
  const [reputation, setReputation] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { contracts } = useContracts(walletAddress);
  const { toast } = useToast();

  const fetchReputation = async () => {
    if (!contracts.reputation || !walletAddress) return;

    try {
      setLoading(true);
      const points = await contracts.reputation.getReputation(walletAddress);
      const reputationValue = Number(points);
      setReputation(reputationValue);
      
      // Update database
      const { error } = await supabase
        .from('profiles')
        .update({ reputation_points: reputationValue })
        .eq('wallet_address', walletAddress);
      
      if (error) console.error('Failed to update reputation in database:', error);
    } catch (error) {
      console.error('Failed to fetch reputation:', error);
      toast({
        title: 'Failed to Load Reputation',
        description: 'Could not fetch reputation from blockchain',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const awardReputation = async (userAddress: string, amount: number) => {
    if (!contracts.reputation) {
      toast({
        title: 'Contract Not Available',
        description: 'Reputation contract is not initialized',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const tx = await contracts.reputation.award(userAddress, amount);
      
      toast({
        title: 'Transaction Submitted',
        description: 'Reputation award transaction submitted to blockchain',
      });

      await tx.wait();
      
      toast({
        title: 'Reputation Awarded',
        description: `Successfully awarded ${amount} reputation points`,
      });

      if (userAddress.toLowerCase() === walletAddress?.toLowerCase()) {
        fetchReputation();
      }
    } catch (error: any) {
      console.error('Failed to award reputation:', error);
      toast({
        title: 'Transaction Failed',
        description: error.message || 'Failed to award reputation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReputation();
  }, [contracts.reputation, walletAddress]);

  return {
    reputation,
    loading,
    fetchReputation,
    awardReputation,
  };
}