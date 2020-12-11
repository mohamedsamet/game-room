import { Inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { GetRoomsNotifInterface } from '../../interfaces/rooms/get-rooms-notif.interface';
import { filter, map } from 'rxjs/operators';
import { GET_ROOMS, REQUEST_ROOMS } from '../../constants/socket-events';
import { EmitRoomsNotifInterface } from '../../interfaces/rooms/emit-rooms-notif.interface';
import { RoomsResultModel } from '../../models/room/rooms-result.model';
import { RedirectionInterface } from '../../interfaces/redirection/redirection.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketRoomService implements GetRoomsNotifInterface, EmitRoomsNotifInterface {
  constructor(private socket: Socket, @Inject('RedirectionInterface') private  redirect: RedirectionInterface) {
    this.listenToDisconnection();
  }

  getRoomsSockNotif(): Observable<RoomsResultModel> {
    const $socket = this.socket.fromEvent(GET_ROOMS);
    this.emitRoomNotif();
    return this.getDataFromEvent($socket);
  }

  emitRoomNotif(): void {
    this.socket.emit(REQUEST_ROOMS, localStorage.getItem('hash'));
  }

  private getDataFromEvent(data: Observable<any>): Observable<any> {
    return data.pipe(
        filter(element => element.data),
        map(element => element.data)
    );
  }

  listenToDisconnection(): void {
    this.socket.on('disconnect', () => {
      this.redirect.redirectTo('/');
    });
  }
}
