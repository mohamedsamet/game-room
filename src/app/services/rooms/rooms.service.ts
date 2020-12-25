import { Inject, Injectable } from '@angular/core';
import { AddRoomInterface } from '../../interfaces/rooms/add-room.interface';
import { Observable } from 'rxjs';
import { RoomModel } from '../../models/room/room.model';
import { HttpClient } from '@angular/common/http';
import { ManageRoomsInterface } from '../../interfaces/rooms/manage-rooms.interface';
import { RoomsResultModel } from '../../models/room/rooms-result.model';
import { RoomAccessInterface } from '../../interfaces/rooms/room-access.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomsService implements AddRoomInterface, ManageRoomsInterface, RoomAccessInterface {
  private roomName: string;
  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string,
              @Inject('API_URLS') private urls: any) { }

  addRoom(roomName: string): Observable<RoomModel> {
    const room = {} as RoomModel;
    room.name = roomName;
    return this.http.post<RoomModel>(`${this.baseUrl}${this.urls.ROOMS_URL}`, room);
  }

  getRoomsByPage(start: number, end: number): Observable<RoomsResultModel> {
    return this.http.get<RoomsResultModel>(`${this.baseUrl}${this.urls.ROOMS_URL}?start=${start}&end=${end}`);
  }

  deleteRooms(roomId: string, userHash: string): Observable<RoomsResultModel> {
    return this.http.delete<RoomsResultModel>(`${this.baseUrl}${this.urls.ROOMS_URL}?id=${roomId}&user=${userHash}`);
  }

  addUserToRoom(roomId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.urls.ROOMS_ACCESS_URL}${roomId}`, {});
  }

  removeUserFromRoom(roomId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${this.urls.ROOMS_ACCESS_URL}${roomId}`);
  }

  getRoomName(): string {
    return this.roomName;
  }

  setRoomName(roomName: string): void {
    this.roomName = roomName;
  }
}
