import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { GetRoomsNotifInterface } from '../../interfaces/rooms/get-rooms-notif.interface';
import { filter, map } from 'rxjs/operators';
import { GET_ROOMS, REQUEST_ROOMS } from '../../constants/socket-events';
import { EmitRoomsNotifInterface } from '../../interfaces/rooms/emit-rooms-notif.interface';
import { RoomsResultModel } from '../../models/room/rooms-result.model';

@Injectable({
  providedIn: 'root'
})
export class SocketRoomService implements GetRoomsNotifInterface, EmitRoomsNotifInterface {
  constructor(private socket: Socket) {}

  getRoomsSockNotif(): Observable<RoomsResultModel> {
    const $socket = this.socket.fromEvent(GET_ROOMS);
    this.emitRoomNotif();
    return this.getDataFromEvent($socket);
  }

  emitRoomNotif(): void {
    this.socket.emit(REQUEST_ROOMS);
  }

  private getDataFromEvent(data: Observable<any>): Observable<any> {
    return data.pipe(
        filter(element => element.data),
        map(element => element.data)
    );
  }
}
