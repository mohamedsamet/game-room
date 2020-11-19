import { Observable } from 'rxjs';
import { RoomModel } from '../../models/room/room.model';

export interface GetRoomsInterface {
  getRooms(): Observable<RoomModel[]>;
}
