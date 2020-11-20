import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { GetRoomsNotifInterface } from '../../interfaces/rooms/get-rooms-notif.interface';
import { RoomModel } from '../../models/room/room.model';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketRoomService implements GetRoomsNotifInterface {

  constructor(private socket: Socket) {}

  getRoomsSockNotif(): Observable<RoomModel[]> {
    this.socket.emit('reqRooms');
    const $socket = this.socket.fromEvent('getRooms');
    return this.getDataFromEvent($socket);
  }

  private getDataFromEvent(data: Observable<any>): Observable<any> {
    return data.pipe(
        filter(element => element.data),
        map(element => element.data)
    );
  }
}
