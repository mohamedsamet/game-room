import { Component, Inject } from '@angular/core';
import { RedirectionInterface } from '../../interfaces/redirection/redirection.interface';
import { DisconnectionInterface } from '../../interfaces/user/disconnection.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
  public $createRoomEvent = new Subject();
  constructor() {}

  createRoom(): void {
    this.$createRoomEvent.next();
  }
}
