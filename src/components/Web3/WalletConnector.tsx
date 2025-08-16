import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, ExternalLink, Copy, CheckCircle } from "lucide-react";

interface WalletInfo {
  address: string;
  balance: string;
  chainId: number;
  networkName: string;
}

interface WalletConnectorProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
  isConnected: boolean;
  walletAddress?: string;
}

export default function WalletConnector({
  onConnect,
  onDisconnect,
  isConnected,
  walletAddress,
}: WalletConnectorProps) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const getNetworkName = (chainId: number): string => {
    const networks: { [key: number]: string } = {
      1: "Ethereum Mainnet",
      5: "Goerli Testnet",
      137: "Polygon Mainnet",
      80001: "Polygon Mumbai",
      56: "BSC Mainnet",
      97: "BSC Testnet",
      // Add Sidra Chain ID when available
      31415926: "Sidra Chain",
    };
    return networks[chainId] || `Chain ID: ${chainId}`;
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not detected",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();

        const walletData: WalletInfo = {
          address,
          balance: ethers.formatEther(balance),
          chainId: Number(network.chainId),
          networkName: getNetworkName(Number(network.chainId)),
        };

        setWalletInfo(walletData);
        onConnect(address);

        toast({
          title: "Wallet Connected",
          description: `Connected to ${walletData.networkName}`,
        });
      }
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletInfo(null);
    onDisconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const copyAddress = async () => {
    if (walletInfo?.address) {
      await navigator.clipboard.writeText(walletInfo.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const openInExplorer = () => {
    if (walletInfo?.address) {
      const explorerUrls: { [key: number]: string } = {
        1: "https://etherscan.io/address/",
        137: "https://polygonscan.com/address/",
        56: "https://bscscan.com/address/",
        // Add Sidra Chain explorer when available
      };
      
      const baseUrl = explorerUrls[walletInfo.chainId];
      if (baseUrl) {
        window.open(`${baseUrl}${walletInfo.address}`, "_blank");
      }
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== walletInfo?.address) {
          connectWallet();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, [walletInfo?.address]);

  if (!isConnected || !walletInfo) {
    return (
      <Card className="w-full max-w-md mx-auto card-gradient border-islamic-gold/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Wallet className="w-6 h-6 text-islamic-gold" />
            <span>Connect Wallet</span>
          </CardTitle>
          <CardDescription>
            Connect your wallet to access premium features and earn NFT certificates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full"
            variant="hero"
            size="lg"
          >
            {isConnecting ? "Connecting..." : "Connect MetaMask"}
          </Button>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Don't have MetaMask?{" "}
            <a
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-islamic-gold hover:underline"
            >
              Install here
            </a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto card-gradient border-islamic-gold/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-islamic-teal" />
            <span>Wallet Connected</span>
          </span>
          <Button
            onClick={disconnectWallet}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
          >
            Disconnect
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Address</label>
          <div className="flex items-center space-x-2 mt-1">
            <code className="flex-1 text-sm bg-muted px-3 py-2 rounded-md font-mono">
              {`${walletInfo.address.slice(0, 6)}...${walletInfo.address.slice(-4)}`}
            </code>
            <Button
              onClick={copyAddress}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-islamic-teal" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <Button
              onClick={openInExplorer}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Balance</label>
          <p className="text-lg font-semibold text-islamic-gold mt-1">
            {parseFloat(walletInfo.balance).toFixed(4)} ETH
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">Network</label>
          <p className="text-sm text-foreground mt-1">{walletInfo.networkName}</p>
        </div>
      </CardContent>
    </Card>
  );
}