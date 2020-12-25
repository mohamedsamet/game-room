import { Observable } from 'rxjs';
import { UserInRoomResultModel } from '../../models/user/user-in-room-result.model';

export interface GetUsersInRoomNotifInterface {
  getUsersInRoomNotif(roomId: string): Observable<UserInRoomResultModel>;
  emitUsersInRoomNotif(roomId: string): void;
  emitUsersLeaveRoomNotif(roomId: string): void;
}
