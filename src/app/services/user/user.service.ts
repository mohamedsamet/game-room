import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedUserInterface } from '../../interfaces/user/logged-user.interface';
import { UserModel } from '../../models/user/user.model';
import { DisconnectionInterface } from '../../interfaces/user/disconnection.interface';
import { AddUserInterface } from '../../interfaces/user/add-user.interface';

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
    return this.http.get<UserModel>(`${this.baseUrl}/users`);
  }

  disconnectUser(hash: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users`);
  }
}
