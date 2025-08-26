import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACTS, ABIS } from '@/contracts/config';
import { useToast } from '@/hooks/use-toast';

export interface ContractInstances {
  reputation: ethers.Contract | null;
  webinarNFT: ethers.Contract | null;
  scholarDAO: ethers.Contract | null;
  zakatPool: ethers.Contract | null;
  courseManager: ethers.Contract | null;
  eduToken: ethers.Contract | null;
}

export function useContracts(walletAddress?: string) {
  const [contracts, setContracts] = useState<ContractInstances>({
    reputation: null,
    webinarNFT: null,
    scholarDAO: null,
    zakatPool: null,
    courseManager: null,
    eduToken: null,
  });
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeContracts = async () => {
      if (!window.ethereum || !walletAddress) {
        setContracts({
          reputation: null,
          webinarNFT: null,
          scholarDAO: null,
          zakatPool: null,
          courseManager: null,
          eduToken: null,
        });
        return;
      }

      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const currentSigner = await browserProvider.getSigner();
        
        setProvider(browserProvider);
        setSigner(currentSigner);

        // Initialize all contracts
        const newContracts: ContractInstances = {
          reputation: new ethers.Contract(CONTRACTS.REPUTATION, ABIS.REPUTATION, currentSigner),
          webinarNFT: new ethers.Contract(CONTRACTS.WEBINAR_NFT, ABIS.WEBINAR_NFT, currentSigner),
          scholarDAO: new ethers.Contract(CONTRACTS.SCHOLAR_DAO, ABIS.SCHOLAR_DAO, currentSigner),
          zakatPool: new ethers.Contract(CONTRACTS.ZAKAT_POOL, ABIS.ZAKAT_POOL, currentSigner),
          courseManager: new ethers.Contract(CONTRACTS.COURSE_MANAGER, ABIS.COURSE_MANAGER, currentSigner),
          eduToken: new ethers.Contract(CONTRACTS.EDU_TOKEN, ABIS.ERC20, currentSigner),
        };

        setContracts(newContracts);
      } catch (error) {
        console.error('Failed to initialize contracts:', error);
        toast({
          title: 'Contract Initialization Failed',
          description: 'Failed to connect to smart contracts',
          variant: 'destructive',
        });
      }
    };

    initializeContracts();
  }, [walletAddress, toast]);

  return { contracts, provider, signer };
}