import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContracts } from './useContracts';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function useScholarDAO(walletAddress?: string) {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const { contracts } = useContracts(walletAddress);
  const { toast } = useToast();

  const checkVerification = async () => {
    if (!contracts.scholarDAO || !walletAddress) return;

    try {
      setLoading(true);
      const verified = await contracts.scholarDAO.isScholarVerified(walletAddress);
      setIsVerified(verified);
      
      // Update database
      const { error } = await supabase
        .from('profiles')
        .update({ is_verified_scholar: verified })
        .eq('wallet_address', walletAddress);
      
      if (error) console.error('Failed to update verification status:', error);
    } catch (error) {
      console.error('Failed to check verification:', error);
      toast({
        title: 'Verification Check Failed',
        description: 'Could not verify scholar status',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyScholar = async (scholarAddress: string, metadata: string) => {
    if (!contracts.scholarDAO) {
      toast({
        title: 'Contract Not Available',
        description: 'Scholar DAO contract is not initialized',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const tx = await contracts.scholarDAO.verifyScholar(scholarAddress, metadata);
      
      toast({
        title: 'Transaction Submitted',
        description: 'Scholar verification transaction submitted',
      });

      const receipt = await tx.wait();

      // Get profile IDs first
      const { data: scholarProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('wallet_address', scholarAddress)
        .single();

      // Store in database
      const { error } = await supabase
        .from('scholar_verifications')
        .insert({
          scholar_id: scholarProfile?.id,
          verifier_address: walletAddress,
          metadata: metadata,
          verification_status: 'verified',
          transaction_hash: receipt.hash,
          verified_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Failed to store verification:', error);
      }

      toast({
        title: 'Scholar Verified',
        description: 'Scholar successfully verified on blockchain',
      });

      if (scholarAddress.toLowerCase() === walletAddress?.toLowerCase()) {
        checkVerification();
      }
    } catch (error: any) {
      console.error('Failed to verify scholar:', error);
      toast({
        title: 'Verification Failed',
        description: error.message || 'Failed to verify scholar',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const revokeScholar = async (scholarAddress: string) => {
    if (!contracts.scholarDAO) {
      toast({
        title: 'Contract Not Available',
        description: 'Scholar DAO contract is not initialized',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const tx = await contracts.scholarDAO.revokeScholar(scholarAddress);
      
      toast({
        title: 'Transaction Submitted',
        description: 'Scholar revocation transaction submitted',
      });

      await tx.wait();

      // Update database
      const { error } = await supabase
        .from('profiles')
        .update({ is_verified_scholar: false })
        .eq('wallet_address', scholarAddress);

      if (error) {
        console.error('Failed to update revocation:', error);
      }

      toast({
        title: 'Scholar Revoked',
        description: 'Scholar verification successfully revoked',
      });

      if (scholarAddress.toLowerCase() === walletAddress?.toLowerCase()) {
        checkVerification();
      }
    } catch (error: any) {
      console.error('Failed to revoke scholar:', error);
      toast({
        title: 'Revocation Failed',
        description: error.message || 'Failed to revoke scholar',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkVerification();
  }, [contracts.scholarDAO, walletAddress]);

  return {
    isVerified,
    loading,
    checkVerification,
    verifyScholar,
    revokeScholar,
  };
}