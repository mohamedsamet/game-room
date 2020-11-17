import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../../interfaces/user-interface/user.interface';
import { UserModel } from '../../models/user/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService implements UserInterface {
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
}
