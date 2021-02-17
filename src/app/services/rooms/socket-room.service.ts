import { Inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { RoomsNotifInterface } from '../../interfaces/rooms/rooms-notif.interface';
import {
  DISCONNECT_SOCKET, GET_ROOMS, GET_USERS_IN_ROOMS, LEAVE_USER_FROM_ROOM, REQUEST_ROOMS, REQUEST_USERS_IN_ROOM
} from '../../constants/socket-events';
import { RoomsResultModel } from '../../models/room/rooms-result.model';
import { RedirectionInterface } from '../../interfaces/utilities/redirection.interface';
import { UserInRoomResultModel } from '../../models/user/user-in-room-result.model';
import { LOCAL_STORAGE_ID, ROOMS_PER_PAGE } from '../../constants/rooms.constant';
import { DataInterface } from '../../interfaces/utilities/data.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketRoomService implements RoomsNotifInterface, RoomsNotifInterface {
  constructor(private socket: Socket,
              @Inject('RedirectionInterface') private  redirect: RedirectionInterface,
              @Inject('DataInterface') private  dataInt: DataInterface) {
    this.listenToDisconnection();
  }

  getRoomsSockNotif(): Observable<RoomsResultModel> {
    const $socket = this.socket.fromEvent(GET_ROOMS);
    this.emitRoomNotif();
    return this.dataInt.getDataFromEvent($socket);
  }

  getUsersInRoomNotif(roomId: string): Observable<UserInRoomResultModel> {
    const $socket = this.socket.fromEvent(GET_USERS_IN_ROOMS);
    this.emitUsersInRoomNotif(roomId);
    return this.dataInt.getDataFromEvent($socket);
  }

  emitUsersInRoomNotif(roomId: string): void {
    this.emitNotif(REQUEST_USERS_IN_ROOM, roomId);
  }

  emitRoomNotif(): void {
    this.emitNotif(REQUEST_ROOMS, {id: localStorage.getItem(LOCAL_STORAGE_ID), roomsByPage: ROOMS_PER_PAGE });
  }

  private emitNotif(topic: string, data: any): void {
    this.socket.emit(topic, data);
  }

  listenToDisconnection(): void {
    this.socket.on(DISCONNECT_SOCKET, () => {
      this.redirect.redirectTo('/');
    });
  }

  emitUsersLeaveRoomNotif(roomId: string): void {
    this.emitNotif(LEAVE_USER_FROM_ROOM, roomId);
  }
}
