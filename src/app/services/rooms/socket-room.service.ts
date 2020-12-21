import { Inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { GetRoomsNotifInterface } from '../../interfaces/rooms/get-rooms-notif.interface';
import { filter, map } from 'rxjs/operators';
import {
  DISCONNECT_SOCKET, GET_ROOMS, GET_USERS_IN_ROOMS, LEAVE_USER_FROM_ROOM, REQUEST_ROOMS, REQUEST_USERS_IN_ROOM
} from '../../constants/socket-events';
import { EmitRoomsNotifInterface } from '../../interfaces/rooms/emit-rooms-notif.interface';
import { RoomsResultModel } from '../../models/room/rooms-result.model';
import { RedirectionInterface } from '../../interfaces/redirection/redirection.interface';
import { UserModel } from '../../models/user/user.model';
import { GetUsersInRoomNotifInterface } from '../../interfaces/rooms/get-users-in-room-notif.interface';
import { UserInRoomResultModel } from '../../models/user/user-in-room-result.model';

@Injectable({
  providedIn: 'root'
})
export class SocketRoomService implements GetRoomsNotifInterface, EmitRoomsNotifInterface, GetUsersInRoomNotifInterface {
  constructor(private socket: Socket, @Inject('RedirectionInterface') private  redirect: RedirectionInterface) {
    this.listenToDisconnection();
  }

  getRoomsSockNotif(): Observable<RoomsResultModel> {
    const $socket = this.socket.fromEvent(GET_ROOMS);
    this.emitRoomNotif();
    return this.getDataFromEvent($socket);
  }

  getUsersInRoomNotif(roomId: number): Observable<UserInRoomResultModel> {
    const $socket = this.socket.fromEvent(GET_USERS_IN_ROOMS);
    this.emitUsersInRoomNotif(roomId);
    return this.getDataFromEvent($socket);
  }

  emitUsersInRoomNotif(roomId: number): void {
    this.emitNotif(REQUEST_USERS_IN_ROOM, roomId);
  }

  emitRoomNotif(): void {
    this.emitNotif(REQUEST_ROOMS, localStorage.getItem('hash'));
  }

  private emitNotif(topic: string, data: any): void {
    this.socket.emit(topic, data);
  }

  private getDataFromEvent(data: Observable<any>): Observable<any> {
    return data.pipe(
        filter(element => element.data),
        map(element => element.data)
    );
  }

  listenToDisconnection(): void {
    this.socket.on(DISCONNECT_SOCKET, () => {
      this.redirect.redirectTo('/');
    });
  }

  emitUsersLeaveRoomNotif(roomId: number): void {
    this.emitNotif(LEAVE_USER_FROM_ROOM, roomId);
  }
}
