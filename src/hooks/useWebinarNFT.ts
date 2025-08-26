import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useContracts } from './useContracts';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface WebinarNFT {
  id: string;
  token_id: number;
  owner_id: string;
  webinar_title: string;
  webinar_date: string;
  metadata_uri: string;
  transaction_hash: string;
  minted_at: string;
}

export function useWebinarNFT(walletAddress?: string) {
  const [nfts, setNfts] = useState<WebinarNFT[]>([]);
  const [loading, setLoading] = useState(false);
  const { contracts } = useContracts(walletAddress);
  const { toast } = useToast();

  const fetchNFTs = async () => {
    if (!contracts.webinarNFT || !walletAddress) return;

    try {
      setLoading(true);
      const balance = await contracts.webinarNFT.balanceOf(walletAddress);
      const tokenCount = Number(balance);
      
      // Get profile ID first
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('wallet_address', walletAddress)
        .single();

      // Fetch from database for metadata
      const { data: dbNFTs } = await supabase
        .from('webinar_nfts')
        .select('*')
        .eq('owner_id', profile?.id);

      setNfts(dbNFTs || []);
    } catch (error) {
      console.error('Failed to fetch NFTs:', error);
      toast({
        title: 'Failed to Load NFTs',
        description: 'Could not fetch webinar NFTs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const mintTicket = async (to: string, webinarTitle: string, webinarDate: Date, metadataURI: string) => {
    if (!contracts.webinarNFT) {
      toast({
        title: 'Contract Not Available',
        description: 'Webinar NFT contract is not initialized',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const tx = await contracts.webinarNFT.mintTicket(to, metadataURI);
      
      toast({
        title: 'Transaction Submitted',
        description: 'NFT minting transaction submitted to blockchain',
      });

      const receipt = await tx.wait();
      
      // Extract token ID from event logs
      const mintEvent = receipt.logs.find((log: any) => log.fragment?.name === 'Transfer');
      const tokenId = mintEvent ? Number(mintEvent.args[2]) : null;

      // Store in database
      if (tokenId) {
        // Get profile ID first
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('wallet_address', to)
          .single();

        const { error } = await supabase
          .from('webinar_nfts')
          .insert({
            token_id: tokenId,
            owner_id: profile?.id,
            webinar_title: webinarTitle,
            webinar_date: webinarDate.toISOString(),
            metadata_uri: metadataURI,
            transaction_hash: receipt.hash,
          });

        if (error) {
          console.error('Failed to store NFT in database:', error);
        }
      }

      toast({
        title: 'NFT Minted',
        description: 'Webinar ticket NFT successfully minted',
      });

      fetchNFTs();
    } catch (error: any) {
      console.error('Failed to mint NFT:', error);
      toast({
        title: 'Minting Failed',
        description: error.message || 'Failed to mint webinar NFT',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [contracts.webinarNFT, walletAddress]);

  return {
    nfts,
    loading,
    fetchNFTs,
    mintTicket,
  };
}