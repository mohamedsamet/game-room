import { Observable, of } from 'rxjs';
import { DisconnectionInterface } from '../interfaces/user/disconnection.interface';

export class DisconnectionInterfaceMock implements DisconnectionInterface {
  disconnectUser(): Observable<any> {
    return of([]);
  }
}
