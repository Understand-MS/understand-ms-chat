import { useEffect, useState } from "react";
import { ConversationSummary } from "@/models/ConversationSummary";
import { getConversationList } from "@/services/historyService";

interface ConversationListProps {
  onSelect: (conversationId: string) => void;
}

const ConversationList = ({ onSelect }: ConversationListProps) => {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getConversationList()
      .then(setConversations)
      .catch(() => setError("Could not load conversation history."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p className="px-4 py-3 text-sm text-muted-foreground">Loading...</p>;
  }

  if (error) {
    return <p className="px-4 py-3 text-sm text-destructive">{error}</p>;
  }

  if (conversations.length === 0) {
    return <p className="px-4 py-3 text-sm text-muted-foreground">No previous conversations.</p>;
  }

  return (
    <ul className="space-y-1">
      {conversations.map((conv) => (
        <li key={conv.id}>
          <button
            onClick={() => onSelect(conv.id)}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors"
          >
            <p className="text-sm font-medium text-foreground truncate">{conv.title}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{new Date(conv.date).toLocaleDateString()}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ConversationList;
