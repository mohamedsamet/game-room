import { Observable, of } from 'rxjs';
import { GetUsersInRoomNotifInterface } from '../interfaces/rooms/get-users-in-room-notif.interface';
import { UserInRoomResultModel } from '../models/user/user-in-room-result.model';
import { RoomsHelper } from './helpers/room.service.spec.helper';

export class GetUsersInRoomNotifMock implements GetUsersInRoomNotifInterface {
  emitUsersInRoomNotif(roomId: string): void {
  }

  emitUsersLeaveRoomNotif(roomId: string): void {
  }

  getUsersInRoomNotif(roomId: string): Observable<UserInRoomResultModel> {
    return of({users: new RoomsHelper().users, roomId: 'azeaze'} as UserInRoomResultModel);
  }
}
