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
  private userName: string
  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string,
              @Inject('API_URLS') private urls: any) { }

  addUserByPseudo(pseudo: string): Observable<UserModel> {
    const user = {} as UserModel;
    user.pseudo = pseudo;
    return this.http.post<UserModel>(`${this.baseUrl}${this.urls.USER_URL}`, user);
  }

  getLoggedUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}${this.urls.USER_URL}`);
  }

  disconnectUser(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${this.urls.USER_URL}`);
  }

  getUserName(): string {
    return this.userName;
  }

  setUserName(userName: string): void {
    this.userName = userName;
  }
}
