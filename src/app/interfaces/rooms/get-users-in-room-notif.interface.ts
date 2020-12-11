import { Observable } from 'rxjs';
import { UserModel } from '../../models/user/user.model';

export interface GetUsersInRoomNotifInterface {
  getUsersInRoomNotif(roomId: number): Observable<UserModel[]>;
  emitUsersInRoomNotif(roomId: number): void;
}
