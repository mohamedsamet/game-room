import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { RedirectionInterface } from '../../../interfaces/utilities/redirection.interface';
import { ActivatedRoute } from '@angular/router';
import { GetUsersInRoomNotifInterface } from '../../../interfaces/rooms/get-users-in-room-notif.interface';
import { UserModel } from '../../../models/user/user.model';
import { ManageRoomsInterface } from '../../../interfaces/rooms/manage-rooms.interface';
import { RoomsNotifInterface } from '../../../interfaces/rooms/rooms-notif.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  public roomId: string;
  public usersConnected: UserModel[];
  public roomName: string;
  constructor(@Inject('RedirectionInterface') private  redirect: RedirectionInterface,
              @Inject('RoomsNotifInterface') private roomsNotifInt: RoomsNotifInterface,
              @Inject('GetUsersInRoomNotifInterface') private getUsersInRoom: GetUsersInRoomNotifInterface,
              @Inject('ManageRoomsInterface') private manageRoomsInt: ManageRoomsInterface,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.addUserInRoom();
    this.getRoomName();
  }

  ngOnDestroy(): void {
    this.getOutFromRoom();
  }

  getRoomName(): void {
    this.roomName = this.manageRoomsInt.getRoomName();
  }

  addUserInRoom(): void {
    this.roomId = this.activeRoute.snapshot.paramMap.get('roomId');
    this.manageRoomsInt.addUserToRoom(this.roomId).subscribe(() => {
      this.roomsNotifInt.emitRoomNotif();
      this.getUsersConnected();
    }, () => {
      this.goBack();
    });
  }

  getUsersConnected(): void {
    this.getUsersInRoom.getUsersInRoomNotif(this.roomId).subscribe(usersResult => {
      this.usersConnected = usersResult.users;
    });
  }

  getOutFromRoom(): void {
    this.manageRoomsInt.removeUserFromRoom(this.roomId).subscribe(() => {
      this.roomsNotifInt.emitRoomNotif();
      this.getUsersInRoom.emitUsersLeaveRoomNotif(this.roomId);
    });
  }

  goBack(): void {
    this.redirect.redirectTo('../', this.activeRoute);
  }

}
