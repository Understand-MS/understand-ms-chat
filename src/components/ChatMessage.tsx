import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [rating, setRating] = useState<"up" | "down" | null>(null);
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isAssistant ? "justify-start" : "justify-end"} mb-4`}
    >
      <div
        className={`max-w-[80%] md:max-w-[65%] rounded-2xl px-5 py-3.5 ${
          isAssistant
            ? "bg-bubble-assistant text-foreground rounded-bl-md"
            : "bg-bubble-user text-foreground rounded-br-md"
        }`}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {isAssistant && (
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => setRating(rating === "up" ? null : "up")}
                className={`p-1.5 rounded-md transition-colors ${
                  rating === "up"
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-label="Helpful"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRating(rating === "down" ? null : "down")}
                className={`p-1.5 rounded-md transition-colors ${
                  rating === "down"
                    ? "text-destructive bg-destructive/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-label="Not helpful"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
