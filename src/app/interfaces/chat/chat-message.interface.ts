import { ChatModel } from '../../models/chat/chat.model';
import { Observable } from 'rxjs';
import { UserWriterStatusModel } from '../../models/user/user-writer-status.model';

export interface ChatMessageInterface {
  sendMessage(message: string, roomId: string): Observable<ChatModel>;
  requestMessagesInRoom(roomId: string): void;
  getMessagesInRoom(): Observable<ChatModel[]>;
  updateWriterStatusInRoom(userStatus: UserWriterStatusModel): void;
  getWriterStatusInRoom(): Observable<UserWriterStatusModel[]>;
  requestWritersInToom(roomId: string): void;
}
