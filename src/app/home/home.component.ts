import { Component, Inject, OnInit } from '@angular/core';
import { DisconnectionInterface } from '../interfaces/user/disconnection.interface';
import { RedirectionInterface } from '../interfaces/redirection/redirection.interface';
import { LoggedUserInterface } from '../interfaces/user/logged-user.interface';

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
    const hash = localStorage.getItem('hash');
    if (hash) {
      this.disconnectInt.disconnectUser(hash).subscribe(res => {
        this.logOutAction();
      });
    } else {
      this.logOutAction();
    }
  }

  logOutAction(): void {
    localStorage.removeItem('hash');
    this.redirect.redirectTo('/');
  }
}
