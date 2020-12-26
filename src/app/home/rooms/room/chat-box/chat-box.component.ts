import {Component, Inject, OnInit} from '@angular/core';
import {ManageRoomsInterface} from "../../../../interfaces/rooms/manage-rooms.interface";
import {SendMessageInterface} from "../../../../interfaces/chat/send-message.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  public message: string;
  public roomId: string;
  constructor(@Inject('SendMessageInterface') private sendMsgInt: SendMessageInterface,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.roomId = this.activeRoute.snapshot.paramMap.get('roomId');
  }

  sendMessage() {
    this.sendMsgInt.sendMessage(this.message, this.roomId).subscribe(message => {
      console.log(message);
    })
  }
}
