import { Component, Input } from '@angular/core';
import { UserModel } from '../../../models/user/user.model';

@Component({
  selector: 'app-user-in-room',
  templateUrl: './user-in-room.component.html'
})
export class UserInRoomComponent {
  @Input() users: UserModel[];
  constructor() { }
}
