import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wallet, ExternalLink, Copy, CheckCircle, AlertTriangle, Loader2, Smartphone, Monitor } from "lucide-react";

interface WalletInfo {
  address: string;
  balance: string;
  chainId: number;
  networkName: string;
}

interface EnhancedWalletConnectorProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
  isConnected: boolean;
  walletAddress?: string;
}

export default function EnhancedWalletConnector({
  onConnect,
  onDisconnect,
  isConnected,
  walletAddress,
}: EnhancedWalletConnectorProps) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [networkSupported, setNetworkSupported] = useState(true);
  const { toast } = useToast();

  const supportedNetworks = {
    1: "Ethereum Mainnet",
    5: "Goerli Testnet", 
    11155111: "Sepolia Testnet",
    137: "Polygon Mainnet",
    80001: "Polygon Mumbai",
    56: "BSC Mainnet",
    97: "BSC Testnet",
    31415926: "Sidra Chain",
  };

  const getNetworkName = (chainId: number): string => {
    return supportedNetworks[chainId as keyof typeof supportedNetworks] || `Unsupported Chain (${chainId})`;
  };

  const isNetworkSupported = (chainId: number): boolean => {
    return chainId in supportedNetworks;
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "Wallet Not Found",
        description: "Please install MetaMask or another Web3 wallet to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    setConnectionProgress(20);

    try {
      // Request account access
      const provider = new ethers.BrowserProvider(window.ethereum);
      setConnectionProgress(40);
      
      const accounts = await provider.send("eth_requestAccounts", []);
      setConnectionProgress(60);
      
      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();
        setConnectionProgress(80);

        const chainId = Number(network.chainId);
        const isSupported = isNetworkSupported(chainId);
        setNetworkSupported(isSupported);

        const walletData: WalletInfo = {
          address,
          balance: ethers.formatEther(balance),
          chainId,
          networkName: getNetworkName(chainId),
        };

        setWalletInfo(walletData);
        onConnect(address);
        setConnectionProgress(100);

        toast({
          title: "Wallet Connected Successfully",
          description: `Connected to ${walletData.networkName}`,
          variant: isSupported ? "default" : "destructive",
        });

        if (!isSupported) {
          toast({
            title: "Unsupported Network",
            description: "Please switch to a supported network for full functionality.",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
      setConnectionProgress(0);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletInfo(null);
    setConnectionProgress(0);
    onDisconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been safely disconnected.",
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
        11155111: "https://sepolia.etherscan.io/address/",
      };
      
      const baseUrl = explorerUrls[walletInfo.chainId];
      if (baseUrl) {
        window.open(`${baseUrl}${walletInfo.address}`, "_blank");
      }
    }
  };

  const switchNetwork = async (chainId: string) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (error: any) {
      console.error('Failed to switch network:', error);
      toast({
        title: "Network Switch Failed",
        description: "Please manually switch to the required network in your wallet.",
        variant: "destructive",
      });
    }
  };

  // Listen for account and network changes
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
        connectWallet(); // Reconnect to get new network info
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

  // Mobile-friendly connection card
  if (!isConnected || !walletInfo) {
    return (
      <Card className="w-full max-w-md mx-auto card-gradient border-vlcp-gold/20 shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-vlcp-gold/10 rounded-full flex items-center justify-center">
            <Wallet className="w-8 h-8 text-vlcp-gold" />
          </div>
          <CardTitle className="text-xl font-semibold">Connect Your Wallet</CardTitle>
          <CardDescription className="text-sm">
            Connect your Web3 wallet to access premium dApp features, NFT certificates, and blockchain transactions
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isConnecting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Connecting...</span>
                <span>{connectionProgress}%</span>
              </div>
              <Progress value={connectionProgress} className="h-2" />
            </div>
          )}
          
          <Button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full"
            variant="hero"
            size="lg"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect MetaMask
              </>
            )}
          </Button>
          
          <div className="text-xs text-muted-foreground text-center space-y-2">
            <p>Don't have MetaMask?</p>
            <div className="flex items-center justify-center space-x-4">
              <a
                href="https://metamask.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-vlcp-gold hover:underline"
              >
                <Monitor className="w-3 h-3" />
                <span>Desktop</span>
              </a>
              <a
                href="https://metamask.app.link/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-vlcp-gold hover:underline"
              >
                <Smartphone className="w-3 h-3" />
                <span>Mobile</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Connected wallet display
  return (
    <Card className="w-full max-w-md mx-auto card-gradient border-vlcp-gold/20 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-vlcp-blue" />
            <span className="text-lg">Wallet Connected</span>
          </span>
          <Button
            onClick={disconnectWallet}
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive h-8"
          >
            Disconnect
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Network Status */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
          <span className="text-sm font-medium">Network</span>
          <div className="flex items-center space-x-2">
            {!networkSupported && (
              <AlertTriangle className="w-4 h-4 text-destructive" />
            )}
            <Badge 
              variant={networkSupported ? "default" : "destructive"}
              className="text-xs"
            >
              {walletInfo.networkName}
            </Badge>
          </div>
        </div>

        {/* Address Display */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Address</label>
          <div className="flex items-center space-x-2">
            <code className="flex-1 text-xs sm:text-sm bg-muted px-3 py-2 rounded-md font-mono">
              {`${walletInfo.address.slice(0, 6)}...${walletInfo.address.slice(-4)}`}
            </code>
            <Button
              onClick={copyAddress}
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-vlcp-blue" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
            <Button
              onClick={openInExplorer}
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Balance Display */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-card/50">
          <span className="text-sm font-medium">Balance</span>
          <span className="text-lg font-semibold text-vlcp-gold">
            {parseFloat(walletInfo.balance).toFixed(4)} ETH
          </span>
        </div>

        {/* Network Switch Suggestion */}
        {!networkSupported && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-xs text-destructive font-medium">
                  Unsupported Network
                </p>
                <p className="text-xs text-muted-foreground">
                  Switch to a supported network for full dApp functionality.
                </p>
                <Button
                  onClick={() => switchNetwork("0x1")} // Switch to Ethereum mainnet
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                >
                  Switch to Ethereum
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}