import { UserModel } from './user.model';

export interface UserInRoomResultModel {
  users: UserModel[];
  roomId: string;
}
