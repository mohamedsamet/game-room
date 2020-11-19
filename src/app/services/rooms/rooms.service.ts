import { Inject, Injectable } from '@angular/core';
import { AddRoomInterface } from '../../interfaces/rooms/add-room.interface';
import { Observable } from 'rxjs';
import { RoomModel } from '../../models/room/room.model';
import { HttpClient } from '@angular/common/http';
import { GetRoomsInterface } from '../../interfaces/rooms/get-rooms.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService implements AddRoomInterface, GetRoomsInterface {

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string) { }

  addRoom(roomName: string): Observable<RoomModel> {
    const room = {} as RoomModel;
    room.name = roomName;
    return this.http.post<RoomModel>(`${this.baseUrl}/rooms`, room);
  }

  getRooms(): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(`${this.baseUrl}/rooms`);
  }
}
