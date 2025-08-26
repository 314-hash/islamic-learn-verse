import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ui/theme-toggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Webinars", href: "/webinars" },
  { name: "Community", href: "/community" },
  { name: "About", href: "/about" },
  { name: "Web3", href: "/web3" },
];

interface HeaderProps {
  onWalletConnect: () => void;
  isWalletConnected: boolean;
  walletAddress?: string;
}

export default function Header({ onWalletConnect, isWalletConnected, walletAddress }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/625df1a1-ed43-49dd-a662-0e0aa6e79601.png" 
              alt="VLCP Logo" 
              className="w-12 h-12 rounded-full object-contain"
            />
            <span className="text-2xl font-bold text-foreground">VLCP</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 relative group",
                  location.pathname === item.href
                    ? "text-vlcp-gold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vlcp-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant={isWalletConnected ? "premium" : "hero"}
              size="default"
              onClick={onWalletConnect}
              className="flex items-center space-x-2"
            >
              <Wallet className="w-4 h-4" />
              <span>
                {isWalletConnected && walletAddress
                  ? formatAddress(walletAddress)
                  : "Connect Wallet"}
              </span>
            </Button>
            {isWalletConnected && (
              <Link to="/profile">
                <Button variant="elegant" size="default">
                  Profile
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-md rounded-lg mt-2 border border-border/50">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    location.pathname === item.href
                      ? "text-vlcp-gold bg-vlcp-gold/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <div className="flex justify-center pb-2">
                  <ThemeToggle />
                </div>
                <Button
                  variant={isWalletConnected ? "premium" : "hero"}
                  size="default"
                  onClick={() => {
                    onWalletConnect();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <Wallet className="w-4 h-4" />
                  <span>
                    {isWalletConnected && walletAddress
                      ? formatAddress(walletAddress)
                      : "Connect Wallet"}
                  </span>
                </Button>
                {isWalletConnected && (
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="elegant" size="default" className="w-full">
                      Profile
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}