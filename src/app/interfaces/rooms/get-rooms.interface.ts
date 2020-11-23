import { Observable } from 'rxjs';
import { RoomsResultModel } from '../../models/room/rooms-result.model';

export interface GetRoomsInterface {
  getRoomsByPage(start: number, end: number): Observable<RoomsResultModel>;
}
