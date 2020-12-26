import { Observable } from 'rxjs';
import { UserModel } from '../../models/user/user.model';

export interface LoggedUserInterface {
  getLoggedUser(): Observable<UserModel>;
  setUserName(userName: string): void;
  getUserName(): string;
}
