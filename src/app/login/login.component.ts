import { Component, Inject, OnInit } from '@angular/core';
import { UserInterface } from '../interfaces/user-interface/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  constructor(@Inject('UserInterface') private  userService: UserInterface, private _formBuilder: FormBuilder) {
    this.loginFormGroup = this._formBuilder.group({
      pseudo: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  validatePseudo() {
    this.userService.addUserByPseudo(this.loginFormGroup.get('pseudo')?.value).subscribe(res => {
      console.log(res)
    })
  }
}
