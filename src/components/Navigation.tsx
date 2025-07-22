import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  Settings, 
  Brain,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import CortexMascot from "@/assets/cortex-mascot.png";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Overview of your productivity"
  },
  {
    name: "Study",
    href: "/study",
    icon: BookOpen,
    description: "Learning materials and progress"
  },
  {
    name: "Meetings",
    href: "/meetings",
    icon: Video,
    description: "Recording archive and notes"
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Customize your experience"
  }
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-card hover:bg-muted"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40 transition-transform duration-300",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">MindHub</h1>
              <p className="text-xs text-muted-foreground">Productivity Companion</p>
            </div>
          </div>
        </div>

        {/* Cortex Mascot Welcome */}
        <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
          <div className="flex items-start gap-3">
            <img 
              src={CortexMascot} 
              alt="Cortex mascot" 
              className="w-12 h-12 flex-shrink-0"
            />
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                Hi! I'm Cortex
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your productivity assistant is here to help you stay organized!
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-muted hover:shadow-sm",
                isActive ? 
                  "bg-primary text-primary-foreground shadow-primary" : 
                  "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs opacity-75">{item.description}</div>
              </div>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center gap-2 hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};