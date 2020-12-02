import { Component, Inject, OnInit } from '@angular/core';
import { LoggedUserInterface } from './interfaces/user/logged-user.interface';
import { RedirectionInterface } from './interfaces/redirection/redirection.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(@Inject('LoggedUserInterface') private  loggedUser: LoggedUserInterface,
              @Inject('RedirectionInterface') private  redirect: RedirectionInterface) {}

  ngOnInit(): void {
   this.manageAutoLogin();
  }

  manageAutoLogin(): void {
    const userCredential = localStorage.getItem('hash');
    if (userCredential) {
      this.getLoggedUser(userCredential);
    } else {
      this.redirect.redirectTo(`/`);
    }
  }

  getLoggedUser(hash: string): void {
    this.loggedUser.getLoggedUser(hash).subscribe(user => {
      this.redirect.redirectTo(`${user.pseudo}/rooms`);
    }, () => {
      localStorage.removeItem('hash');
      this.redirect.redirectTo(`/`);
    });
  }
}
