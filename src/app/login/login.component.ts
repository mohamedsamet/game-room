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
  constructor(@Inject('UserInterface') private  userInt: UserInterface, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      pseudo: ['', Validators.required]
    });
  }

  validatePseudo(): void {
    this.userInt.addUserByPseudo(this.loginFormGroup.get('pseudo')?.value).subscribe(res => {
      console.log(res);
    });
  }
}
