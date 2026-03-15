import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatSidebar from "@/components/ChatSidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessage, { Message } from "@/components/ChatMessage";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import SuggestedQuestions from "@/components/SuggestedQuestions";
import TypingIndicator from "@/components/TypingIndicator";
import { sendMessage } from "@/services/chatService";
import { getConversationById } from "@/services/historyService";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string>(() => crypto.randomUUID());
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const data = await sendMessage({
        conversationId,
        question: text,
        history: messages.map(({ role, content }) => ({ role, content })),
      });

      if (!data?.answer) {
        console.error("Unexpected API response shape:", data);
        throw new Error("Invalid response from server");
      }

      setMessages((prev) => [...prev, data.answer]);
    } catch (err) {
      console.error("sendMessage error:", err);
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleConversationSelect = async (selectedId: string) => {
    try {
      const detail = await getConversationById(selectedId);
      setConversationId(detail.id);
      setMessages(detail.messages);
      setActiveTab("chat");
      setSidebarOpen(false);
    } catch {
      // conversation failed to load — stay on current view
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <ChatSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onConversationSelect={handleConversationSelect}
        />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 z-50 md:hidden"
            >
              <ChatSidebar
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  setSidebarOpen(false);
                }}
                onConversationSelect={handleConversationSelect}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <DisclaimerBanner />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <SuggestedQuestions onSelect={handleSend} />
          ) : (
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-6">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-bubble-assistant rounded-2xl rounded-bl-md">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
};

export default Chat;
