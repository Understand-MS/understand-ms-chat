import { Message } from "@/components/ChatMessage";

export interface ChatResponse {
  conversationId: string;
  message: Message;
}
