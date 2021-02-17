import { Observable } from 'rxjs';
import { RoomsResultModel } from '../../models/room/rooms-result.model';

export interface RoomsNotifInterface {
  getRoomsSockNotif(): Observable<RoomsResultModel>;
  emitRoomNotif(): void;
}
