import { Inject, Injectable } from '@angular/core';
import { ChatMessageInterface } from '../../interfaces/chat/chat-message.interface';
import { Observable } from 'rxjs';
import { ChatModel } from '../../models/chat/chat.model';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { GET_CHATMSG, REQUEST_CHATMSG } from '../../constants/socket-events';
import { DataInterface } from '../../interfaces/utilities/data.interface';

@Injectable({
  providedIn: 'root'
})

export class ChatService implements ChatMessageInterface {

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string,
              @Inject('API_URLS') private urls: any, private socket: Socket,
              @Inject('DataInterface') private  dataInt: DataInterface) { }

  sendMessage(message: string, roomId: string): Observable<ChatModel> {
    return this.http.post<ChatModel>(`${this.baseUrl}${this.urls.CHAT_URL}/${roomId}`, {message});
  }

  requestMessagesInRoom(roomId: string): void {
    this.socket.emit(REQUEST_CHATMSG, roomId)
  }

  getMessagesInRoom(): Observable<ChatModel[]> {
    const $socket = this.socket.fromEvent(GET_CHATMSG);
    return this.dataInt.getDataFromEvent($socket);
  }
}
