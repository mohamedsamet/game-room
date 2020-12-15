import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user/user.model';

@Component({
  selector: 'app-user-in-room',
  templateUrl: './user-in-room.component.html',
  styleUrls: ['./user-in-room.component.scss']
})
export class UserInRoomComponent implements OnInit {
  @Input() roomId: number;
  @Input() users: UserModel[];
  constructor() { }

  ngOnInit(): void {
  }

}
