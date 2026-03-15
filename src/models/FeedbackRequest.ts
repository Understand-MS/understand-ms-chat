export interface FeedbackRequest {
  conversationId: string;
  messageId: string;
  rating: "positive" | "negative";
}
