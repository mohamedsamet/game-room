import { Inject, Injectable } from '@angular/core';
import { ChatMessageInterface } from '../../interfaces/chat/chat-message.interface';
import { Observable } from 'rxjs';
import { ChatModel } from '../../models/chat/chat.model';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import {
  GET_CHATMSG, GET_WRITER_STATUS_IN_ROOM, PUSH_WRITER_STATE_IN_ROOM, REQUEST_CHATMSG, REQUEST_WRITER_STATE_IN_ROOM
} from '../../constants/socket-events';
import { DataInterface } from '../../interfaces/utilities/data.interface';
import { UserWriterStatusModel } from '../../models/user/user-writer-status.model';

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
    this.socket.emit(REQUEST_CHATMSG, roomId);
  }

  getMessagesInRoom(): Observable<ChatModel[]> {
    const $socket = this.socket.fromEvent(GET_CHATMSG);
    return this.dataInt.getDataFromEvent($socket);
  }

  updateWriterStatusInRoom(userStatus: UserWriterStatusModel): void {
    this.socket.emit(PUSH_WRITER_STATE_IN_ROOM, userStatus);
  }

  getWriterStatusInRoom(): Observable<UserWriterStatusModel[]> {
    const $socket = this.socket.fromEvent(GET_WRITER_STATUS_IN_ROOM);
    return this.dataInt.getDataFromEvent($socket);
  }

  requestWritersInToom(roomId: string): void {
    this.socket.emit(REQUEST_WRITER_STATE_IN_ROOM, roomId);
  }
}
