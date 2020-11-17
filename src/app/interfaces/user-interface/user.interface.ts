import { Observable } from 'rxjs';
import { UserModel } from '../../models/user/user.model';

export interface UserInterface {
  addUserByPseudo(pseudo: string): Observable<UserModel>;
  getLoggedUser(hash: string): Observable<UserModel>;
  disconnectUser(hash: string): Observable<any>;
}
