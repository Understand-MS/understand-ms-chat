import appConfig from "@/config/appConfig";
import { ChatRequest } from "@/models/ChatRequest";
import { ChatResponse } from "@/models/ChatResponse";
import { FeedbackRequest } from "@/models/FeedbackRequest";
import { mockSendMessage } from "@/mocks/chatMocks";

export async function sendMessage(payload: ChatRequest): Promise<ChatResponse> {
  if (appConfig.mockEnabled) return mockSendMessage(payload);

  const response = await fetch(`${appConfig.apiEndpoint}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<ChatResponse>;
}

export async function sendFeedback(payload: FeedbackRequest): Promise<void> {
  if (appConfig.mockEnabled) return;

  const response = await fetch(`${appConfig.apiEndpoint}/chat/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Feedback API error: ${response.status} ${response.statusText}`);
  }
}
