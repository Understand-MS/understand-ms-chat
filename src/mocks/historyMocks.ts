import { ConversationSummary } from "@/models/ConversationSummary";
import { ConversationDetail } from "@/models/ConversationDetail";

export const MOCK_CONVERSATION_LIST: ConversationSummary[] = [
  {
    id: "mock-conv-1",
    title: "Early symptoms of MS",
    lastMessage: "If you experience any of these symptoms persistently...",
    date: "2026-03-14T10:00:00Z",
    messageCount: 2,
  },
  {
    id: "mock-conv-2",
    title: "How is MS diagnosed?",
    lastMessage: "The McDonald Criteria are commonly used to confirm diagnosis...",
    date: "2026-03-13T15:30:00Z",
    messageCount: 2,
  },
  {
    id: "mock-conv-3",
    title: "Exercise and MS",
    lastMessage: "Recommended activities include swimming, yoga, walking...",
    date: "2026-03-12T09:15:00Z",
    messageCount: 2,
  },
];

const MOCK_CONVERSATION_DETAILS: Record<string, ConversationDetail> = {
  "mock-conv-1": {
    id: "mock-conv-1",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "What are early symptoms of MS?",
        timestamp: new Date("2026-03-14T10:00:00Z"),
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Early symptoms of Multiple Sclerosis can vary widely, but common ones include:\n\n• Vision problems (blurred or double vision, optic neuritis)\n• Numbness or tingling in the limbs\n• Fatigue that is disproportionate to activity\n• Muscle weakness or spasms\n• Balance and coordination difficulties\n• Cognitive changes such as difficulty concentrating\n\nIf you experience any of these symptoms persistently, please consult a neurologist for proper evaluation.",
        timestamp: new Date("2026-03-14T10:00:02Z"),
      },
    ],
  },
  "mock-conv-2": {
    id: "mock-conv-2",
    messages: [
      {
        id: "m3",
        role: "user",
        content: "How is MS diagnosed?",
        timestamp: new Date("2026-03-13T15:30:00Z"),
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "MS diagnosis typically involves several steps:\n\n1. **Neurological exam** — Your doctor checks for abnormalities in nerve pathways.\n2. **MRI scans** — To detect lesions in the brain and spinal cord.\n3. **Lumbar puncture** — Analyzing cerebrospinal fluid for specific antibodies.\n4. **Evoked potential tests** — Measuring electrical activity in the brain.\n\nThe McDonald Criteria are commonly used to confirm diagnosis. Early diagnosis is key for managing the condition effectively.",
        timestamp: new Date("2026-03-13T15:30:02Z"),
      },
    ],
  },
  "mock-conv-3": {
    id: "mock-conv-3",
    messages: [
      {
        id: "m5",
        role: "user",
        content: "Can exercise help with MS?",
        timestamp: new Date("2026-03-12T09:15:00Z"),
      },
      {
        id: "m6",
        role: "assistant",
        content:
          "Yes! Research strongly supports exercise for people with MS. Benefits include:\n\n• Improved strength and flexibility\n• Better balance and reduced fall risk\n• Reduced fatigue levels\n• Enhanced mood and cognitive function\n• Better cardiovascular health\n\nRecommended activities include swimming, yoga, walking, and resistance training. Always consult your healthcare provider before starting a new exercise program.",
        timestamp: new Date("2026-03-12T09:15:02Z"),
      },
    ],
  },
};

export function mockGetConversationList(): Promise<ConversationSummary[]> {
  return Promise.resolve(MOCK_CONVERSATION_LIST);
}

export function mockGetConversationById(conversationId: string): Promise<ConversationDetail> {
  const detail = MOCK_CONVERSATION_DETAILS[conversationId];
  if (!detail) return Promise.reject(new Error("Conversation not found"));
  return Promise.resolve(detail);
}
