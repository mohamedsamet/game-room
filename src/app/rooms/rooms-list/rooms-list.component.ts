import { Component, Inject, OnInit } from '@angular/core';
import { RoomModel } from '../../models/room/room.model';
import { Observable, of } from 'rxjs';
import { GetRoomsInterface } from '../../interfaces/rooms/get-rooms.interface';
import { GetRoomsNotifInterface } from '../../interfaces/rooms/get-rooms-notif.interface';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
  public roomList: RoomModel[] = [];
  constructor(@Inject('GetRoomsInterface') private getRoomsInt: GetRoomsInterface,
              @Inject('GetRoomsNotifInterface') private getRoomsNotif: GetRoomsNotifInterface) {
  }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.getRoomsNotif.getRoomsSockNotif().subscribe(rooms => {
      this.roomList = rooms;
    });
  }
}
