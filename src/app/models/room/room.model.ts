import { UserModel } from '../user/user.model';

export interface RoomModel {
  _id: string;
  name: string;
  createdBy: string;
  createdByUserHash: string;
  users: UserModel[];
}
