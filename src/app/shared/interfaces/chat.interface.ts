export interface IChatMessage {
  role: string;
  message: string;
  created_at?: string;
}

export interface IGetMessagesApiResponse {
  data: IChatMessage[],
  message: string
}

export interface IAskQuestionApiResponse {
  data: IChatMessage;
  message: string;
}
