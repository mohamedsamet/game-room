import { Component, Input } from '@angular/core';
import { UserModel } from '../../models/user/user.model';

@Component({
  selector: 'app-user-in-room',
  template: ''
})
export class UserInRoomComponentMock {
  @Input() users: UserModel[];
}
