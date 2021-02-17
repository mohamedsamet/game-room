import { Observable } from 'rxjs';

export interface DisconnectUserInterface {
  disconnectUser(): Observable<any>;
}
