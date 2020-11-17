import { Component, Inject, OnInit } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public loginError = false;
  constructor(@Inject('UserInterface') private  userInt: UserInterface, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      pseudo: ['', Validators.required]
    });
  }

  validatePseudo(): void {
    this.userInt.addUserByPseudo(this.loginFormGroup.get('pseudo')?.value).subscribe((user: UserModel)  => {
      this.loginToHome(user);
    }, error => {
      this.loginError = true;
    });
  }

  loginToHome(user: UserModel): void {
    if (user.hash) {
      this.saveHashToStorage(user.hash);
      this.redirectToHome();
    } else {
      this.loginError = true;
    }
  }

  redirectToHome(): void {}

  saveHashToStorage(hash: string): void {
    localStorage.setItem('hash', hash);
  }
}
