import { Message } from "@/models/Message";

export interface ConversationDetail {
  id: string;
  messages: Message[];
}
