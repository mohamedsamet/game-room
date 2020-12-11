import { Component, Inject, Input, OnInit } from '@angular/core';
import { GetUsersInRoomNotifInterface } from '../../../interfaces/rooms/get-users-in-room-notif.interface';
import { UserModel } from '../../../models/user/user.model';

@Component({
  selector: 'app-user-in-room',
  templateUrl: './user-in-room.component.html',
  styleUrls: ['./user-in-room.component.scss']
})
export class UserInRoomComponent implements OnInit {
  @Input() roomId: number;
  @Input() users: UserModel[];
  public  usersConncted: UserModel[];
  constructor(@Inject('GetUsersInRoomNotifInterface') private getUsersInRoom: GetUsersInRoomNotifInterface) { }

  ngOnInit(): void {
    this.getUsersConnected();
  }

  getUsersConnected(): void {
    this.getUsersInRoom.getUsersInRoomNotif(this.roomId).subscribe(users => {
      this.usersConncted = users;
      console.log(this.usersConncted);
    });
  }

}
