import { Observable } from 'rxjs';
import { UserModel } from '../../models/user/user.model';
import { RoomModel } from '../../models/room/room.model';

export interface AddRoomInterface {
  addRoom(roomName: string): Observable<RoomModel>;
}
