import { Observable } from 'rxjs';

export class DataInterfaceMock {
  getDataFromEvent(socket: Observable<any>): Observable<any> {
    return socket;
  }
}
