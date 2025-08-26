import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContracts } from './useContracts';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function useZakatPool(walletAddress?: string) {
  const [userDonations, setUserDonations] = useState<string>('0');
  const [totalDonations, setTotalDonations] = useState<string>('0');
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [loading, setLoading] = useState(false);
  const { contracts } = useContracts(walletAddress);
  const { toast } = useToast();

  const fetchData = async () => {
    if (!contracts.zakatPool || !contracts.eduToken || !walletAddress) return;

    try {
      setLoading(true);
      
      // Fetch user donations
      const donations = await contracts.zakatPool.donations(walletAddress);
      setUserDonations(ethers.formatEther(donations));
      
      // Fetch total donations
      const total = await contracts.zakatPool.totalTokenDonations();
      setTotalDonations(ethers.formatEther(total));
      
      // Fetch user token balance
      const balance = await contracts.eduToken.balanceOf(walletAddress);
      setTokenBalance(ethers.formatEther(balance));
      
    } catch (error) {
      console.error('Failed to fetch zakat pool data:', error);
      toast({
        title: 'Failed to Load Data',
        description: 'Could not fetch zakat pool information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const donate = async (amount: string) => {
    if (!contracts.zakatPool || !contracts.eduToken || !walletAddress) {
      toast({
        title: 'Contract Not Available',
        description: 'Zakat pool contract is not initialized',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const amountWei = ethers.parseEther(amount);
      
      // First approve the token transfer
      const approveTx = await contracts.eduToken.approve(
        await contracts.zakatPool.getAddress(),
        amountWei
      );
      
      toast({
        title: 'Approval Submitted',
        description: 'Token approval transaction submitted',
      });
      
      await approveTx.wait();
      
      // Then donate
      const donateTx = await contracts.zakatPool.donate(amountWei);
      
      toast({
        title: 'Donation Submitted',
        description: 'Donation transaction submitted to blockchain',
      });

      const receipt = await donateTx.wait();

      // Get profile ID first
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('wallet_address', walletAddress)
        .single();

      // Store in database
      const { error } = await supabase
        .from('zakat_donations')
        .insert({
          donor_id: profile?.id,
          amount_wei: amountWei.toString(),
          amount_display: parseFloat(amount),
          transaction_hash: receipt.hash,
        });

      if (error) {
        console.error('Failed to store donation:', error);
      }

      toast({
        title: 'Donation Successful',
        description: `Successfully donated ${amount} EDU tokens`,
      });

      fetchData();
    } catch (error: any) {
      console.error('Failed to donate:', error);
      toast({
        title: 'Donation Failed',
        description: error.message || 'Failed to complete donation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (to: string, amount: string) => {
    if (!contracts.zakatPool) {
      toast({
        title: 'Contract Not Available',
        description: 'Zakat pool contract is not initialized',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const amountWei = ethers.parseEther(amount);
      const tx = await contracts.zakatPool.withdraw(to, amountWei);
      
      toast({
        title: 'Withdrawal Submitted',
        description: 'Withdrawal transaction submitted',
      });

      await tx.wait();

      toast({
        title: 'Withdrawal Successful',
        description: `Successfully withdrew ${amount} EDU tokens`,
      });

      fetchData();
    } catch (error: any) {
      console.error('Failed to withdraw:', error);
      toast({
        title: 'Withdrawal Failed',
        description: error.message || 'Failed to withdraw funds',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [contracts.zakatPool, contracts.eduToken, walletAddress]);

  return {
    userDonations,
    totalDonations,
    tokenBalance,
    loading,
    donate,
    withdraw,
    fetchData,
  };
}