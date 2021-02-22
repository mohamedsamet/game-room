import { ChatModel } from '../../models/chat/chat.model';
import { Observable } from 'rxjs';
import { UserWriterStatusModel } from '../../models/user/user-writer-status.model';
import { ChatResultModel } from '../../models/chat/chat-result.model';

export interface ChatMessageInterface {
  sendMessage(message: string, roomId: string): Observable<ChatModel>;
  getMessagesByPage(roomId:string, start: number, end: number): Observable<ChatResultModel>;
  requestMessageInRoom(roomId: string): void;
  getMessageInRoom(): Observable<ChatModel>;
  updateWriterStatusInRoom(userStatus: UserWriterStatusModel): void;
  getWriterStatusInRoom(): Observable<UserWriterStatusModel[]>;
  requestWritersInToom(roomId: string): void;
}
