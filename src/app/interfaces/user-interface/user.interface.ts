import { Observable } from 'rxjs';

export interface UserInterface {
  addUserByPseudo(pseudo:string): Observable<any>;
}
