import { ChatRequest } from "@/models/ChatRequest";
import { ChatResponse } from "@/models/ChatResponse";

const MOCK_RESPONSES: Record<string, string> = {
  "What are early symptoms of MS?":
    "Early symptoms of Multiple Sclerosis can vary widely, but common ones include:\n\n• Vision problems (blurred or double vision, optic neuritis)\n• Numbness or tingling in the limbs\n• Fatigue that is disproportionate to activity\n• Muscle weakness or spasms\n• Balance and coordination difficulties\n• Cognitive changes such as difficulty concentrating\n\nIf you experience any of these symptoms persistently, please consult a neurologist for proper evaluation.",
  "How is MS diagnosed?":
    "MS diagnosis typically involves several steps:\n\n1. **Neurological exam** — Your doctor checks for abnormalities in nerve pathways.\n2. **MRI scans** — To detect lesions in the brain and spinal cord.\n3. **Lumbar puncture** — Analyzing cerebrospinal fluid for specific antibodies.\n4. **Evoked potential tests** — Measuring electrical activity in the brain.\n\nThe McDonald Criteria are commonly used to confirm diagnosis. Early diagnosis is key for managing the condition effectively.",
  "Can exercise help with MS?":
    "Yes! Research strongly supports exercise for people with MS. Benefits include:\n\n• Improved strength and flexibility\n• Better balance and reduced fall risk\n• Reduced fatigue levels\n• Enhanced mood and cognitive function\n• Better cardiovascular health\n\nRecommended activities include swimming, yoga, walking, and resistance training. Always consult your healthcare provider before starting a new exercise program.",
};

const DEFAULT_RESPONSE =
  "Thank you for your question about Multiple Sclerosis. This is running in mock mode — in production your question will be sent to the AI backend for a detailed, medically-informed response. Please consult a healthcare professional for personalised medical advice.";

export function mockSendMessage(payload: ChatRequest): Promise<ChatResponse> {
  const content = MOCK_RESPONSES[payload.question] ?? DEFAULT_RESPONSE;
  return Promise.resolve({
    conversationId: payload.conversationId,
    message: {
      id: crypto.randomUUID(),
      role: "assistant",
      content,
      timestamp: new Date(),
    },
  });
}
