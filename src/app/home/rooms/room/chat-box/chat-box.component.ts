import { Component, Inject, OnInit } from '@angular/core';
import { ChatMessageInterface } from '../../../../interfaces/chat/chat-message.interface';
import { ActivatedRoute } from '@angular/router';
import { ChatModel } from '../../../../models/chat/chat.model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  public message: string;
  public roomId: string;
  public chatMessages: ChatModel[];
  constructor(@Inject('SendMessageInterface') private sendMsgInt: ChatMessageInterface,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.roomId = this.activeRoute.snapshot.paramMap.get('roomId');
    this.getMessagesInRoom();
  }

  sendMessage(): void {
    this.message = this.message.trim();
    if (this.message && this.message.length > 0 && this.message !== ' ') {
      this.sendMsgInt.sendMessage(this.message, this.roomId).subscribe(() => {
        this.sendMsgInt.requestMessagesInRoom(this.roomId);
        this.message = '';
      });
    }
  }

  private getMessagesInRoom(): void {
    this.sendMsgInt.getMessagesInRoom().subscribe(chatMessages => {
      this.chatMessages = chatMessages;
    });
    this.sendMsgInt.requestMessagesInRoom(this.roomId);
  }
}
