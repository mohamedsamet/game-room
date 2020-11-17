import { Component, Inject, OnInit } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(@Inject('UserInterface') private userInt: UserInterface, private router: Router) { }

  ngOnInit(): void {
  }

  disconnect(): void {
    const hash = localStorage.getItem('hash');
    if (hash) {
      this.userInt.disconnectUser(hash).subscribe(res => {
        this.logOutAction();
      });
    } else {
      this.logOutAction();
    }
  }

  logOutAction(): void {
    localStorage.removeItem('hash');
    this.router.navigate(['/']);
  }
}
