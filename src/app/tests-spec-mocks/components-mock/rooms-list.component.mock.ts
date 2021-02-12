import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rooms-list',
  template: ''
})
export class RoomsListComponentMock {
  @Input() $roomCreated = new Subject();
}
