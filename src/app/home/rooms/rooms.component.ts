import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html'
})
export class RoomsComponent {
  public $createRoomEvent = new Subject();
  constructor() {}

  createRoom(): void {
    this.$createRoomEvent.next();
  }
}
