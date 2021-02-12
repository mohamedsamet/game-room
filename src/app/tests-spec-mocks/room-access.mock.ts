import { RoomAccessInterface } from '../interfaces/rooms/room-access.interface';
import { Observable, of, throwError } from 'rxjs';

export class RoomAccessMock implements RoomAccessInterface {
  public isError = false;
  addUserToRoom(roomId: string): Observable<any> {
    if (!this.isError) {
      return of([]);
    } else {
      return throwError('err')
    }
  }

  setError(val: boolean): void {
    this.isError = val;
  }

  removeUserFromRoom(roomId: string): Observable<any> {
    return of([]);
  }

}
