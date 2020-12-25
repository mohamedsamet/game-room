import { Observable } from 'rxjs';

export interface RoomAccessInterface {
  addUserToRoom(roomId: string): Observable<any>;
  removeUserFromRoom(roomId: string): Observable<any>;
}
