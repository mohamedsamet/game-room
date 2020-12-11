import { Component } from '@angular/core';
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
