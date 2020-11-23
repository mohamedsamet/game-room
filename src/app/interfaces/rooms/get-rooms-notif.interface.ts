import { Observable } from 'rxjs';
import { RoomsResultModel } from '../../models/room/rooms-result.model';

export interface GetRoomsNotifInterface {
  getRoomsSockNotif(): Observable<RoomsResultModel>;
}
