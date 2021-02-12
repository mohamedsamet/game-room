import { Observable } from 'rxjs';
import { DataInterface } from '../interfaces/utilities/data.interface';

export class DataInterfaceMock implements DataInterface {
  getDataFromEvent(socket: Observable<any>): Observable<any> {
    return socket;
  }
}
