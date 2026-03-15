import { MessageSquare, Clock, Info } from "lucide-react";
import msRibbon from "@/assets/ms-ribbon.png";
import ConversationList from "@/components/ConversationList";
import LoginPrompt from "@/components/LoginPrompt";
import { useAuth } from "@/context/AuthContext";

interface ChatSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onConversationSelect: (conversationId: string) => void;
}

const navItems = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "previous", label: "Previous Questions", icon: Clock },
  { id: "about", label: "About MS", icon: Info },
];

const ChatSidebar = ({ activeTab, onTabChange, onConversationSelect }: ChatSidebarProps) => {
  const { user } = useAuth();

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
      <nav className="px-3 py-4 space-y-1">
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

      {/* Previous Questions panel */}
      {activeTab === "previous" && (
        <div className="flex-1 overflow-y-auto border-t border-border">
          {user ? (
            <div className="px-3 py-3">
              <ConversationList onSelect={onConversationSelect} />
            </div>
          ) : (
            <LoginPrompt />
          )}
        </div>
      )}
    </aside>
  );
};

export default ChatSidebar;
