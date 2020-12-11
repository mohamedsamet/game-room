import { Observable } from 'rxjs';

export interface RoomAccessInterface {
  addUserToRoom(roomId: number): Observable<any>;
  removeUserFromRoom(roomId: number): Observable<any>;
}
