import { Observable, of } from 'rxjs';
import { ChatMessageInterface } from '../interfaces/chat/chat-message.interface';
import { ChatModel } from '../models/chat/chat.model';
import { UserWriterStatusModel } from '../models/user/user-writer-status.model';
import { ChatMessagesSpecHelper } from './helpers/chat-messages.spec.helper';
import { ChatResultModel } from '../models/chat/chat-result.model';
import { delay } from 'rxjs/operators';

export class ChatMessageMock implements ChatMessageInterface {

  getWriterStatusInRoom(): Observable<UserWriterStatusModel[]> {
    return of(ChatMessagesSpecHelper.usersInRoom);
  }

  requestWritersInToom(roomId: string): void {
  }

  sendMessage(message: string, roomId: string): Observable<ChatModel> {
    return of({} as ChatModel);
  }

  updateWriterStatusInRoom(userStatus: UserWriterStatusModel): void {
  }

  requestMessageInRoom(roomId: string): void {
  }

  getMessageInRoom(): Observable<ChatModel> {
    return of(ChatMessagesSpecHelper.ChatMessage).pipe(delay(2000));
  }

  getMessagesByPage(roomId: string, start: number, end: number): Observable<ChatResultModel> {
    const chatMessages = {} as ChatResultModel;
    chatMessages.messages = ChatMessagesSpecHelper.ChatMessages;
    chatMessages.total = 2;
    return of(chatMessages);
  }

}
