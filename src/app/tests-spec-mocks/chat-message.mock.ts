import { Observable, of } from 'rxjs';
import { ChatMessageInterface } from '../interfaces/chat/chat-message.interface';
import { ChatModel } from '../models/chat/chat.model';
import { UserWriterStatusModel } from '../models/user/user-writer-status.model';

export class ChatMessageMock implements ChatMessageInterface {
  getMessagesInRoom(): Observable<ChatModel[]> {
    return undefined;
  }

  getWriterStatusInRoom(): Observable<UserWriterStatusModel[]> {
    return of([{} as UserWriterStatusModel]);
  }

  requestMessagesInRoom(roomId: string): void {
  }

  requestWritersInToom(roomId: string): void {
  }

  sendMessage(message: string, roomId: string): Observable<ChatModel> {
    return of({} as ChatModel);
  }

  updateWriterStatusInRoom(userStatus: UserWriterStatusModel): void {
  }

}
