import { Message } from "@/components/ChatMessage";

export interface ChatRequest {
  conversationId: string;
  message: string;
  history: Pick<Message, "role" | "content">[];
}
