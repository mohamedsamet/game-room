import { Observable, of, throwError } from 'rxjs';
import {RoomModel} from "../models/room/room.model";
import {RoomsHelper} from "./helpers/room.service.spec.helper";

export class AddRoomMock {
  addRoom(roomName: string): Observable<RoomModel> {
    const users = new RoomsHelper().users;
    const roomModel = {name: roomName, createdBy: 'samet', createdByUserId: '12346', users: users, _id: '456789'} as RoomModel;
    return of(roomModel);
  }
}
