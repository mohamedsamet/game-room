import { Component, Inject, OnInit } from '@angular/core';
import { RoomModel } from '../../models/room/room.model';
import { Observable } from 'rxjs';
import { GetRoomsInterface } from '../../interfaces/rooms/get-rooms.interface';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
  public $roomList: Observable<RoomModel[]>;
  constructor(@Inject('GetRoomsInterface') private getRoomsInt: GetRoomsInterface) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.$roomList = this.getRoomsInt.getRooms();
  }
}
