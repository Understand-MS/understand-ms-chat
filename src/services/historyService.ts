import appConfig from "@/config/appConfig";
import { ConversationSummary } from "@/models/ConversationSummary";
import { ConversationDetail } from "@/models/ConversationDetail";
import { mockGetConversationList, mockGetConversationById } from "@/mocks/historyMocks";

export async function getConversationList(): Promise<ConversationSummary[]> {
  if (appConfig.mockEnabled) return mockGetConversationList();

  const response = await fetch(`${appConfig.apiEndpoint}/history/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`History API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<ConversationSummary[]>;
}

export async function getConversationById(conversationId: string): Promise<ConversationDetail> {
  if (appConfig.mockEnabled) return mockGetConversationById(conversationId);

  const response = await fetch(`${appConfig.apiEndpoint}/history/${conversationId}/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`History API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<ConversationDetail>;
}
