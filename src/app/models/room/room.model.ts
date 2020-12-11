import { UserModel } from '../user/user.model';

export interface RoomModel {
  id: number;
  name: string;
  createdBy: string;
  createdByUserHash: string;
  users: UserModel[];
}
