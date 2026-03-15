import { Message } from "@/models/Message";

export interface ChatResponse {
  conversationId: string;
  answer: Message;
}
