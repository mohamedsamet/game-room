import { Observable } from 'rxjs';
import { RoomModel } from '../../models/room/room.model';

export interface AddRoomInterface {
  addRoom(roomName: string): Observable<RoomModel>;
}
