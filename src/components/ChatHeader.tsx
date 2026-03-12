import { Menu, Search, Settings } from "lucide-react";

interface ChatHeaderProps {
  onMenuToggle: () => void;
}

const ChatHeader = ({ onMenuToggle }: ChatHeaderProps) => {
  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 md:px-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors md:hidden"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground">Understand MS</h1>
      </div>
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Search">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Settings">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
