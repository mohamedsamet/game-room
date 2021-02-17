import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/user/user.model';
import { RedirectionInterface } from '../interfaces/utilities/redirection.interface';
import { AddUserInterface } from '../interfaces/user/add-user.interface';
import { LoggedUserInterface } from '../interfaces/user/logged-user.interface';
import { LOCAL_STORAGE_ID } from '../constants/rooms.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  constructor(@Inject('AddUserInterface') private addUserInt: AddUserInterface,
              @Inject('RedirectionInterface') private redirect: RedirectionInterface,
              @Inject('LoggedUserInterface') private  loggedUser: LoggedUserInterface,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initLoginForm(this.formBuilder);
  }

  initLoginForm(formBuilder: FormBuilder): void {
    this.loginFormGroup = formBuilder.group({
      pseudo: ['', Validators.required]
    });
  }

  validatePseudo(): void {
    this.addUserInt.addUserByPseudo(this.loginFormGroup.get('pseudo')?.value).subscribe((user: UserModel)  => {
      this.loggedUser.setUserName(user.pseudo);
      this.loginToHome(user);
    });
  }

  loginToHome(user: UserModel): void {
    if (user._id) {
      this.saveUserIdToStorage(user._id);
      this.redirect.redirectTo(`${user.pseudo}/rooms`);
    }
  }

  saveUserIdToStorage(userId: string): void {
    localStorage.setItem(LOCAL_STORAGE_ID, userId);
  }
}
