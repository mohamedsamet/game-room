import {Inject, Injectable} from '@angular/core';
import {SendMessageInterface} from "../../interfaces/chat/send-message.interface";
import {Observable} from "rxjs";
import {ChatModel} from "../../models/chat/chat.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class ChatService implements SendMessageInterface {

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string,
              @Inject('API_URLS') private urls: any) { }

  sendMessage(message: string, roomId: string): Observable<ChatModel> {
    return this.http.post<ChatModel>(`${this.baseUrl}${this.urls.CHAT_URL}/${roomId}`, {message: message});
  }
}
