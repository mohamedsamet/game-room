import { RoomsNotifInterface } from '../interfaces/rooms/rooms-notif.interface';
import { Observable, of } from 'rxjs';
import { RoomsResultModel } from '../models/room/rooms-result.model';
import { RoomsHelper } from './helpers/room.service.spec.helper';

export class RoomsNotifMock implements RoomsNotifInterface {
  getRoomsSockNotif(): Observable<RoomsResultModel> {
    const roomResult = {} as RoomsResultModel;
    roomResult.total = 3;
    roomResult.rooms = new RoomsHelper().rooms;
    return of(roomResult);
  }

  emitRoomNotif() {
  }
}
