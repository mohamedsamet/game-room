import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedUserInterface } from '../../interfaces/user-interface/logged-user.interface';
import { UserModel } from '../../models/user/user.model';
import { DisconnectionInterface } from '../../interfaces/user-interface/disconnection.interface';
import { AddUserInterface } from '../../interfaces/user-interface/add-user.interface';

@Injectable({
  providedIn: 'root'
})

export class UserService implements LoggedUserInterface, DisconnectionInterface, AddUserInterface {
  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string) { }

  addUserByPseudo(pseudo: string): Observable<UserModel> {
    const user = {} as UserModel;
    user.pseudo = pseudo;
    return this.http.post<UserModel>(`${this.baseUrl}/users`, user);
  }

  getLoggedUser(hash: string): Observable<UserModel> {
    const headers: HttpHeaders = new HttpHeaders({Authorization: hash});
    return this.http.get<UserModel>(`${this.baseUrl}/users`, {headers});
  }

  disconnectUser(hash: string): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({Authorization: hash});
    return this.http.delete<any>(`${this.baseUrl}/users`, {headers});
  }
}
