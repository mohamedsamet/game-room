import { Observable, of } from 'rxjs';

export class DisconnectionInterfaceMock {
  disconnectUser(): Observable<any> {
    return of([]);
  }
}
