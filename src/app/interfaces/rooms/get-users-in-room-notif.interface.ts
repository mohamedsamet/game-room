import { Observable } from 'rxjs';
import { UserInRoomResultModel } from '../../models/user/user-in-room-result.model';

export interface GetUsersInRoomNotifInterface {
  getUsersInRoomNotif(roomId: number): Observable<UserInRoomResultModel>;
  emitUsersInRoomNotif(roomId: number): void;
}
