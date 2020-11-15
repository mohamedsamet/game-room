import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user-interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserInterface{

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private baseUrl: string) { }

  addUserByPseudo(pseudo:string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, {pseudo: pseudo});
  }
}
