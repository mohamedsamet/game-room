import { Observable, of } from 'rxjs';
import { DisconnectUserInterface } from '../interfaces/user/disconnect-user.interface';

export class DisconnectionInterfaceMock implements DisconnectUserInterface {
  disconnectUser(): Observable<any> {
    return of([]);
  }
}
