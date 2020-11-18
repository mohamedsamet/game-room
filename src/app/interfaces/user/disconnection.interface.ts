import { Observable } from 'rxjs';

export interface DisconnectionInterface {
  disconnectUser(hash: string): Observable<any>;
}
