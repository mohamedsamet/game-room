import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-create-room',
  template: ''
})
export class CreateRoomComponentMock {

  @Output() createRoomEvent = new EventEmitter<any>()
}
