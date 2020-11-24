import { Component, Inject } from '@angular/core';
import { RedirectionInterface } from '../interfaces/redirection/redirection.interface';
import { DisconnectionInterface } from '../interfaces/user/disconnection.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
  public $createRoomEvent = new Subject();
  constructor(@Inject('DisconnectionInterface') private disconnectInt: DisconnectionInterface,
              @Inject('RedirectionInterface') private  redirect: RedirectionInterface) {}

  disconnect(): void {
    const hash = localStorage.getItem('hash');
    if (hash) {
      this.disconnectInt.disconnectUser(hash).subscribe(res => {
        this.logOutAction();
      });
    } else {
      this.logOutAction();
    }
  }

  logOutAction(): void {
    localStorage.removeItem('hash');
    this.redirect.redirectTo('/');
  }

  createRoom(): void {
    this.$createRoomEvent.next();
  }
}
