import { ManageRoomsInterface } from '../interfaces/rooms/manage-rooms.interface';
import { Observable, of } from 'rxjs';
import { RoomsResultModel } from '../models/room/rooms-result.model';
import { RoomsHelper } from './helpers/room.service.spec.helper';

export class ManageRoomsMock implements  ManageRoomsInterface {
  deleteRoom(roomdId: string, id: string): Observable<RoomsResultModel> {
    return of({} as RoomsResultModel);
  }

  getRoomName(): string {
    return 'room1';
  }

  getRoomsByPage(start: number, end: number): Observable<RoomsResultModel> {
    return of({rooms: new RoomsHelper().rooms, total: 3});
  }

  setRoomName(roomName: string): void {
  }

}
