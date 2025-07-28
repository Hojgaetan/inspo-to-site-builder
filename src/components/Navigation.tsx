import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: "hello", label: "_hello", icon: <span role="img" aria-label="hello">👋</span> },
  { id: "about", label: "_à-propos", icon: <span role="img" aria-label="à-propos">🧑‍💼</span> },
  { id: "projects", label: "_projets", icon: <span role="img" aria-label="projets">🛠️</span> },
  { id: "blog", label: "_blog", icon: <span role="img" aria-label="blog">📝</span> },
  { id: "formations", label: "_formations", icon: <span role="img" aria-label="formations">🎓</span> },
  { id: "services", label: "_services", icon: <span role="img" aria-label="services">💼</span> },
  { id: "contact", label: "_me-contacter", icon: <span role="img" aria-label="contact">✉️</span> },
];

export const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-sidebar-background border-b border-sidebar-border">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-accent-foreground font-mono text-sm font-bold">JG</span>
            </div>
            <span className="hidden sm:inline text-sidebar-foreground font-mono text-sm">joel-gaetan-hassam-obah</span>
            <span className="sm:hidden text-sidebar-foreground font-mono text-sm">JG</span>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden lg:flex items-center">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`font-mono text-sm px-3 py-2 h-12 rounded-none border-r border-sidebar-border ${
                  activeTab === item.id
                    ? "bg-background text-foreground border-b-2 border-accent"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile menu button and Theme Toggle */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <span className="hidden md:inline text-sidebar-foreground font-mono text-sm">_@Hojgaetan</span>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-sidebar-border bg-sidebar-background">
            <div className="py-2 space-y-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start font-mono text-sm px-4 py-3 rounded-none ${
                    activeTab === item.id
                      ? "bg-background text-foreground border-l-2 border-accent"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};