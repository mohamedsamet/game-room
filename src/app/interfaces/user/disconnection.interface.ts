import { Observable } from 'rxjs';

export interface DisconnectionInterface {
  disconnectUser(): Observable<any>;
}
