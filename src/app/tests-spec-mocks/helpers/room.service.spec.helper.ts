import { UserModel } from '../../models/user/user.model';
import { RoomModel } from '../../models/room/room.model';

export class RoomsHelper {
  users: UserModel[] = [{pseudo: 'samet', _id: '54654'}, {pseudo: 'yasmine', _id: '5254'}, {pseudo: 'marwa', _id: '54699'}];
  room1: RoomModel = {name: 'room1', createdByUserId: '54654', users: [this.users[0], this.users[2]], _id: 'wxcccc', createdBy: 'samet'};
  room2: RoomModel = {name: 'room2', createdByUserId: '54655', users: [this.users[1], this.users[2]], _id: 'fggggdfdf', createdBy: 'samet'};
  room3: RoomModel = {name: 'room3', createdByUserId: '54656', users: [this.users[0], this.users[1], this.users[2]], _id: 'zersssszer', createdBy: 'yasmine'};
  rooms: RoomModel[] = [this.room1, this.room2, this.room3];
}
