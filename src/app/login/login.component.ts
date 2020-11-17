import { Component, Inject, OnInit } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public loginError = false;
  public loginMessage: string;
  constructor(@Inject('UserInterface') private  userInt: UserInterface, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      pseudo: ['', Validators.required]
    });
    this.manageAutoLogin();
  }

  manageAutoLogin(): void {
    const userCredential = localStorage.getItem('hash');
    if (userCredential) {
      this.getLoggedUser(userCredential);
    }
  }

  getLoggedUser(hash: string): void {
    this.userInt.getLoggedUser(hash).subscribe(user => {
      this.redirectToRooms(user.pseudo);
    }, (error) => {
      localStorage.removeItem('hash');
      this.loginError = true;
      this.loginMessage = error.error;
    });
  }

  validatePseudo(): void {
    this.userInt.addUserByPseudo(this.loginFormGroup.get('pseudo')?.value).subscribe((user: UserModel)  => {
      this.loginToHome(user);
    }, error => {
      this.loginError = true;
      this.loginMessage = error.error;
    });
  }

  loginToHome(user: UserModel): void {
    if (user.hash) {
      this.saveHashToStorage(user.hash);
      this.redirectToRooms(user.pseudo);
    } else {
      this.loginError = true;
    }
  }

  redirectToRooms(pseudo: string): void {
    this.router.navigate(['/rooms/' + pseudo]);
  }

  saveHashToStorage(hash: string): void {
    localStorage.setItem('hash', hash);
  }
}
