export interface ChatMessage {
  role: string;
  message: string;
  created_at?: string;
}

export interface GetMessagesApiResponse {
  data: ChatMessage[],
  message: string
}

export interface AskQuestionApiResponse {
  data: ChatMessage;
  message: string;
}
