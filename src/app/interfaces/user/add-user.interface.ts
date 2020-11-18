import { Observable } from 'rxjs';
import { UserModel } from '../../models/user/user.model';

export interface AddUserInterface {
  addUserByPseudo(pseudo: string): Observable<UserModel>;
}
