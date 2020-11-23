import { RoomModel } from './room.model';

export interface RoomsResultModel {
  rooms: RoomModel[];
  total: number;
}
