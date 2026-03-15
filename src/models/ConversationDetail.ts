import { Message } from "@/components/ChatMessage";

export interface ConversationDetail {
  id: string;
  messages: Message[];
}
