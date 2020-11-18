import { Component, Inject, OnInit } from '@angular/core';
import { LoggedUserInterface } from '../interfaces/user/logged-user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/user/user.model';
import { RedirectionInterface } from '../interfaces/redirection/redirection.interface';
import { AddUserInterface } from '../interfaces/user/add-user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  constructor(@Inject('AddUserInterface') private  addUserInt: AddUserInterface,
              @Inject('RedirectionInterface') private  redirect: RedirectionInterface,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      pseudo: ['', Validators.required]
    });
  }

  validatePseudo(): void {
    this.addUserInt.addUserByPseudo(this.loginFormGroup.get('pseudo')?.value).subscribe((user: UserModel)  => {
      this.loginToHome(user);
    });
  }

  loginToHome(user: UserModel): void {
    if (user.hash) {
      this.saveHashToStorage(user.hash);
      this.redirect.redirectTo(`/rooms/${user.pseudo}`);
    }
  }

  saveHashToStorage(hash: string): void {
    localStorage.setItem('hash', hash);
  }
}
