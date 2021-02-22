import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ChatMessageInterface } from '../../../../interfaces/chat/chat-message.interface';
import { ActivatedRoute } from '@angular/router';
import { ChatModel } from '../../../../models/chat/chat.model';
import { CHAT_LIMIT_MESSAGES_LOADED, LOCAL_STORAGE_ID } from '../../../../constants/rooms.constant';
import { UserWriterStatusModel } from '../../../../models/user/user-writer-status.model';
import { LoggedUserInterface } from '../../../../interfaces/user/logged-user.interface';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  public message = '';
  public roomId: string;
  public chatMessages: ChatModel[];
  public userId: string;
  public writers: UserWriterStatusModel[] = [];
  @ViewChild('messagesScroll') public chatContent: ElementRef;
  constructor(@Inject('ChatMessageInterface') private chatMessageInterface: ChatMessageInterface,
              @Inject('LoggedUserInterface') private  loggedUser: LoggedUserInterface,
              private activeRoute: ActivatedRoute,
              private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.roomId = this.activeRoute.snapshot.paramMap.get('roomId');
    this.getMessagesInRoom();
    this.getWriterStatusInRoom(this.roomId);
    this.userId = localStorage.getItem(LOCAL_STORAGE_ID);
    this.listenToNewMessages();
  }

  sendMessage(): void {
    this.message = this.message.trim();
    if (this.message && this.message.length > 0) {
      this.chatMessageInterface.sendMessage(this.message, this.roomId).subscribe(() => {
        this.chatMessageInterface.requestMessageInRoom(this.roomId);
        this.message = '';
        this.sendUpdateWriterStatus();
      });
    }
  }

  getMessagesInRoom(): void {
    this.chatMessageInterface.getMessagesByPage(this.roomId, 0, CHAT_LIMIT_MESSAGES_LOADED).subscribe(chatMessages => {
      this.chatMessages = chatMessages.messages;
      this.manageScrollChatBox();
    });
  }

  listenToNewMessages(): void {
    this.chatMessageInterface.getMessageInRoom().subscribe(message => {
      this.chatMessages.unshift(message);
      this.manageScrollChatBox();
    });
  }

  private manageScrollChatBox(): void {
    this.ref.detectChanges();
    this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
  }

  textChanged(text: string): void {
    const canUpdate = (this.message.length === 0 && text.length > 0) || (this.message.length > 0 &&  text.length === 0);
    this.message = text;
    if (canUpdate) {
      this.sendUpdateWriterStatus();
    }
  }

  sendUpdateWriterStatus(): void {
    const isMessageWriterStatus = this.message.length > 0;
    const userWriterStatus: UserWriterStatusModel =
      {_id: this.userId, pseudo: this.loggedUser.getUserName(), roomId: this.roomId, status: isMessageWriterStatus};
    this.updateWriterInRoomStatus(userWriterStatus);
  }

  updateWriterInRoomStatus(userStatus: UserWriterStatusModel): void {
    this.chatMessageInterface.updateWriterStatusInRoom(userStatus);
    this.chatMessageInterface.requestWritersInToom(this.roomId);
  }

  getWriterStatusInRoom(roomId: string): void {
    this.chatMessageInterface.getWriterStatusInRoom().subscribe(writers => {
      this.writers = writers.filter(writer => writer._id !== this.userId);
    });
    this.chatMessageInterface.requestWritersInToom(roomId);
  }
}
