import { Observable } from 'rxjs';
import { RoomsResultModel } from '../../models/room/rooms-result.model';

export interface ManageRoomsInterface {
  getRoomsByPage(start: number, end: number): Observable<RoomsResultModel>;
  deleteRooms(roomdId: number, userHash: string): Observable<RoomsResultModel>;
  setRoomName(roomName: string): void;
  getRoomName(): string;
}
