import { MessageSquare, Clock, BookOpen, Info, User } from "lucide-react";
import msRibbon from "@/assets/ms-ribbon.png";

interface ChatSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "previous", label: "Previous Questions", icon: Clock },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "about", label: "About MS", icon: Info },
];

const ChatSidebar = ({ activeTab, onTabChange }: ChatSidebarProps) => {
  return (
    <aside className="flex flex-col h-full bg-card border-r border-border w-72">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-border">
        <img src={msRibbon} alt="MS Awareness Ribbon" className="w-10 h-10" />
        <span className="text-xl font-bold tracking-tight text-foreground">
          Understand MS
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium transition-colors ${
              activeTab === item.id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User profile */}
      <div className="border-t border-border px-4 py-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Guest User</p>
            <p className="text-xs text-muted-foreground">Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
