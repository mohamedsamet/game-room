import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketRoomService {

  constructor(private socket: Socket) {}

  getMessage(): Observable<string> {
    return this.socket.fromEvent('notification');
  }
}
