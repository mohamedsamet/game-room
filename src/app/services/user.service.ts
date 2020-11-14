import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userUrl } from '../constants/urls';
import { UserInterface } from '../interfaces/user-interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements UserInterface{

  constructor(private http: HttpClient) { }

  addUserByPseudo(pseudo:string): Observable<any> {
    return this.http.post(userUrl, {pseudo: pseudo});
  }
}
