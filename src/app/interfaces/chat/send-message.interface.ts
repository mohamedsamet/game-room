import {ChatModel} from "../../models/chat/chat.model";
import {Observable} from "rxjs";

export interface SendMessageInterface {
  sendMessage(message: string, roomId: string): Observable<ChatModel>;
}
