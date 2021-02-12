import { GetRoomsNotifInterface } from '../interfaces/rooms/get-rooms-notif.interface';
import { Observable, of } from 'rxjs';
import { RoomsResultModel } from '../models/room/rooms-result.model';
import { RoomsHelper } from './helpers/room.service.spec.helper';

export class GetRoomsNotifMock implements GetRoomsNotifInterface {
  getRoomsSockNotif(): Observable<RoomsResultModel> {
    const roomResult = {} as RoomsResultModel;
    roomResult.total = 3;
    roomResult.rooms = new RoomsHelper().rooms;
    return of(roomResult);
  }
}
