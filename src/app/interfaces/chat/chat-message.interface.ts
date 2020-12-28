import { ChatModel } from '../../models/chat/chat.model';
import { Observable } from 'rxjs';

export interface ChatMessageInterface {
  sendMessage(message: string, roomId: string): Observable<ChatModel>;
  requestMessagesInRoom(roomId: string): void;
  getMessagesInRoom(): Observable<ChatModel[]>;
}
