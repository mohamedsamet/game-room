import { Component, Inject, OnInit } from '@angular/core';
import { RoomModel } from '../../models/room/room.model';
import { Observable } from 'rxjs';
import { GetRoomsInterface } from '../../interfaces/rooms/get-rooms.interface';
import { GetRoomsNotifInterface } from '../../interfaces/rooms/get-rooms-notif.interface';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
  public $roomList: Observable<RoomModel[]>;
  constructor(@Inject('GetRoomsInterface') private getRoomsInt: GetRoomsInterface,
              @Inject('GetRoomsNotifInterface') private getRoomsNotif: GetRoomsNotifInterface) {
  }

  ngOnInit(): void {
    this.$roomList = this.getRooms();
  }

  getRooms(): Observable<RoomModel[]> {
    this.getRoomsNotif.getRoomsSockNotif().subscribe();
    return this.getRoomsNotif.getRoomsSockNotif();
  }
}
