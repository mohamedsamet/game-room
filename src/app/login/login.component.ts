import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../interfaces/user-interface/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public pseudo: string = '';
  constructor(@Inject('UserInterface') private  userService: UserInterface) { }

  ngOnInit(): void {
  }

  validatePseudo() {
    this.userService.addUserByPseudo(this.pseudo).subscribe(res => {
      console.log(res)
    })
  }
}
