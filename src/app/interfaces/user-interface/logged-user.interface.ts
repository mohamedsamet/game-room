import { Observable } from 'rxjs';
import { UserModel } from '../../models/user/user.model';

export interface LoggedUserInterface {
  getLoggedUser(hash: string): Observable<UserModel>;
}
