import { Message } from "@/models/Message";

export interface ChatRequest {
  conversationId: string;
  question: string;
  history: Pick<Message, "role" | "content">[];
}
