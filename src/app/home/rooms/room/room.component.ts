import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RedirectionInterface } from '../../../interfaces/redirection/redirection.interface';
import { ActivatedRoute } from '@angular/router';
import { RoomAccessInterface } from '../../../interfaces/rooms/room-access.interface';
import { EmitRoomsNotifInterface } from '../../../interfaces/rooms/emit-rooms-notif.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  constructor(@Inject('RedirectionInterface') private  redirect: RedirectionInterface,
              @Inject('RoomAccessInterface') private  roomAccess: RoomAccessInterface,
              @Inject('EmitRoomsNotifInterface') private emitRoomInt: EmitRoomsNotifInterface,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserInRoom();
  }

  ngOnDestroy(): void {
    this.getOutFromRoom();
  }

  getUserInRoom(): void {
    const roomId = +this.activeRoute.snapshot.paramMap.get('roomId');
    this.roomAccess.addUserToRoom(roomId).subscribe(() => {
      this.emitRoomInt.emitRoomNotif();
    });
  }

  getOutFromRoom(): void {
    const roomId = +this.activeRoute.snapshot.paramMap.get('roomId');
    this.roomAccess.removeUserFromRoom(roomId).subscribe(() => {
      this.emitRoomInt.emitRoomNotif();
    });
  }

  goBack(): void {
    this.redirect.redirectTo('../', this.activeRoute);
  }

}
