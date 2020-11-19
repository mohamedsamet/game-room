import { Component, Inject, OnInit } from '@angular/core';
import { RoomModel } from '../../models/room/room.model';
import { Observable } from 'rxjs';
import { GetRoomsInterface } from '../../interfaces/rooms/get-rooms.interface';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
  public $roomList: Observable<RoomModel[]> = new Observable<RoomModel[]>();
  constructor(@Inject('GetRoomsInterface') private getRoomsInt: GetRoomsInterface, private socket: Socket) {
  }

  ngOnInit(): void {
    this.getRooms();
    this.socket.fromEvent('getDoc').subscribe(res => {
      console.log(res);
    });
  }

  getRooms(): void {
    this.$roomList = this.getRoomsInt.getRooms();
  }
}
