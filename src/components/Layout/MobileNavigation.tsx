import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Video, 
  Users, 
  User, 
  Info, 
  Wallet,
  Globe,
  Smartphone
} from "lucide-react";

interface MobileNavigationProps {
  onWalletConnect: () => void;
  isWalletConnected: boolean;
  walletAddress?: string;
}

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Webinars", href: "/webinars", icon: Video },
  { name: "Community", href: "/community", icon: Users },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Web3 dApp", href: "/web3", icon: Globe },
  { name: "About", href: "/about", icon: Info },
];

export default function MobileNavigation({ 
  onWalletConnect, 
  isWalletConnected, 
  walletAddress 
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const formatAddress = (address: string) => 
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative"
        >
          <Menu className="w-5 h-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <SheetTitle className="flex items-center justify-between">
            <span className="text-lg font-bold bg-gradient-to-r from-vlcp-gold to-vlcp-blue bg-clip-text text-transparent">
              VLCP Menu
            </span>
            <ThemeToggle />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Wallet Status */}
          <div className="p-4 bg-card/50 border-b border-border">
            {isWalletConnected ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-vlcp-blue rounded-full"></div>
                  <span className="text-sm font-medium text-vlcp-blue">Connected</span>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {walletAddress && formatAddress(walletAddress)}
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => {
                  onWalletConnect();
                  setIsOpen(false);
                }}
                variant="hero" 
                size="sm" 
                className="w-full"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${active 
                        ? 'bg-vlcp-gold/10 text-vlcp-gold border border-vlcp-gold/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                    {item.name === "Web3 dApp" && (
                      <Badge variant="outline" className="ml-auto text-xs">
                        New
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-card/30">
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                <Smartphone className="w-4 h-4" />
                <span>Mobile Optimized dApp</span>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  VLCP - Virtual Learning & Career Platform
                </p>
                <p className="text-xs text-vlcp-gold font-medium">
                  Blockchain-Verified Education
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}