import { ManageRoomsInterface } from '../interfaces/rooms/manage-rooms.interface';
import {Observable, of, throwError} from 'rxjs';
import { RoomsResultModel } from '../models/room/rooms-result.model';
import { RoomsHelper } from './helpers/room.service.spec.helper';

export class ManageRoomsMock implements  ManageRoomsInterface {
  public isError = false;
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

  addUserToRoom(roomId: string): Observable<any> {
    if (!this.isError) {
      return of([]);
    } else {
      return throwError('err')
    }
  }

  setError(val: boolean): void {
    this.isError = val;
  }

  removeUserFromRoom(roomId: string): Observable<any> {
    return of([]);
  }

}
