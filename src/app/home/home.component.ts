import { Component, Inject } from '@angular/core';
import { DisconnectionInterface } from '../interfaces/user/disconnection.interface';
import { RedirectionInterface } from '../interfaces/redirection/redirection.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(@Inject('DisconnectionInterface') private disconnectInt: DisconnectionInterface,
              @Inject('RedirectionInterface') private  redirect: RedirectionInterface) { }

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
