import { Component, Inject, OnInit } from '@angular/core';
import { LoggedUserInterface } from './interfaces/user/logged-user.interface';
import { RedirectionInterface } from './interfaces/utilities/redirection.interface';
import { LOCAL_STORAGE_ID } from './constants/rooms.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public isLoading = true;
  constructor(@Inject('LoggedUserInterface') private  loggedUser: LoggedUserInterface,
              @Inject('RedirectionInterface') private  redirect: RedirectionInterface) {}

  ngOnInit(): void {
   this.manageAutoLogin();
  }

  manageAutoLogin(): void {
    const userCredential = localStorage.getItem(LOCAL_STORAGE_ID);
    if (userCredential) {
      this.getLoggedUser();
    } else {
      this.isLoading = false;
      this.redirect.redirectTo(`/`);
    }
  }

  getLoggedUser(): void {
    this.loggedUser.getLoggedUser().subscribe(user => {
      this.loggedUser.setUserName(user.pseudo);
      this.isLoading = false;
      this.redirect.redirectTo(`${user.pseudo}/rooms`);
    }, () => {
      localStorage.removeItem(LOCAL_STORAGE_ID);
      this.isLoading = false;
      this.redirect.redirectTo(`/`);
    });
  }
}
