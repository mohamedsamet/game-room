import { ChatModel } from './chat.model';

export interface ChatResultModel {
  total: number;
  messages: ChatModel[];
}
