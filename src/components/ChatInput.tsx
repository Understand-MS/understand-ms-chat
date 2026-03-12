import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [value]);

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-background px-4 py-3 md:px-6">
      <div className="flex items-end gap-3 max-w-4xl mx-auto">
        <div className="flex-1 bg-muted rounded-xl px-4 py-3 flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about Multiple Sclerosis..."
            rows={1}
            disabled={disabled}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none text-base leading-relaxed"
          />
          <button
            className="p-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            aria-label="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          className="p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 flex-shrink-0"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
