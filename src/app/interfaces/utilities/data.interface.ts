import { Observable } from 'rxjs';

export interface DataInterface {
  getDataFromEvent(data: Observable<any>): Observable<any>;
}
