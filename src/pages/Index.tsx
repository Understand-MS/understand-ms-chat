import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatSidebar from "@/components/ChatSidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessage, { Message } from "@/components/ChatMessage";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import SuggestedQuestions from "@/components/SuggestedQuestions";
import TypingIndicator from "@/components/TypingIndicator";

const MOCK_RESPONSES: Record<string, string> = {
  "What are early symptoms of MS?":
    "Early symptoms of Multiple Sclerosis can vary widely, but common ones include:\n\n• Vision problems (blurred or double vision, optic neuritis)\n• Numbness or tingling in the limbs\n• Fatigue that is disproportionate to activity\n• Muscle weakness or spasms\n• Balance and coordination difficulties\n• Cognitive changes such as difficulty concentrating\n\nIf you experience any of these symptoms persistently, please consult a neurologist for proper evaluation.",
  "How is MS diagnosed?":
    "MS diagnosis typically involves several steps:\n\n1. **Neurological exam** — Your doctor checks for abnormalities in nerve pathways.\n2. **MRI scans** — To detect lesions in the brain and spinal cord.\n3. **Lumbar puncture** — Analyzing cerebrospinal fluid for specific antibodies.\n4. **Evoked potential tests** — Measuring electrical activity in the brain.\n\nThe McDonald Criteria are commonly used to confirm diagnosis. Early diagnosis is key for managing the condition effectively.",
  "Can exercise help with MS?":
    "Yes! Research strongly supports exercise for people with MS. Benefits include:\n\n• Improved strength and flexibility\n• Better balance and reduced fall risk\n• Reduced fatigue levels\n• Enhanced mood and cognitive function\n• Better cardiovascular health\n\nRecommended activities include swimming, yoga, walking, and resistance training. Always consult your healthcare provider before starting a new exercise program.",
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response =
        MOCK_RESPONSES[text] ||
        "Thank you for your question about Multiple Sclerosis. This is a demo interface — in production, your question would be sent to our AI backend for a detailed, medically-informed response. Please consult a healthcare professional for personalized medical advice.";
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <ChatSidebar activeTab={activeTab} onTabChange={setActiveTab} />
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
              <ChatSidebar activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setSidebarOpen(false); }} />
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

export default Index;
