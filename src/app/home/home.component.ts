import { Component, Inject, OnInit } from '@angular/core';
import { DisconnectionInterface } from '../interfaces/user/disconnection.interface';
import { RedirectionInterface } from '../interfaces/utilities/redirection/redirection.interface';
import { LoggedUserInterface } from '../interfaces/user/logged-user.interface';
import {LOCAL_STORAGE_ID} from "../constants/rooms.constant";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userName: string;
  constructor(@Inject('DisconnectionInterface') private disconnectInt: DisconnectionInterface,
              @Inject('RedirectionInterface') private  redirect: RedirectionInterface,
              @Inject('LoggedUserInterface') private  loggedUser: LoggedUserInterface) { }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(): void {
    this.userName = this.loggedUser.getUserName();
  }

  disconnect(): void {
    const userId = localStorage.getItem(LOCAL_STORAGE_ID);
    if (userId) {
      this.disconnectInt.disconnectUser().subscribe(res => {
        this.logOutAction();
      });
    } else {
      this.logOutAction();
    }
  }

  logOutAction(): void {
    localStorage.removeItem(LOCAL_STORAGE_ID);
    this.redirect.redirectTo('/');
  }
}
