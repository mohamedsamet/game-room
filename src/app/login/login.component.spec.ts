import {ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LOCAL_STORAGE_ID } from '../constants/rooms.constant';
import { Observable, of } from 'rxjs';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserModel } from '../models/user/user.model';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let loginApp: LoginComponent;
  let redirect: any;
  let addUserInt: any;
  let loggedUser: any;
  let formBuilder: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        {provide: 'AddUserInterface', useClass: AddUserInterfaceMock},
        {provide: 'RedirectionInterface', useClass: RedirectionInterfaceMock},
        {provide: 'LoggedUserInterface', useClass: LoggedUserInterfaceMock},
        FormBuilder],
      declarations: [
        LoginComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    loginApp = fixture.componentInstance;
    redirect = TestBed.get('RedirectionInterface');
    addUserInt = TestBed.get('AddUserInterface');
    loggedUser = TestBed.get('LoggedUserInterface');
    formBuilder = TestBed.get(FormBuilder);
  });

  it('should create the login component', () => {
    expect(loginApp).toBeTruthy();
  });

  describe('manageAutoLogin method', () => {
    it('should call initLoginForm on init', () => {
      spyOn(loginApp, 'initLoginForm');
      loginApp.ngOnInit();
      expect(loginApp.initLoginForm).toHaveBeenCalledWith(formBuilder);
    });

    it('should set loginFromGroup pseudo value', () => {
      loginApp.initLoginForm(formBuilder);
      expect(loginApp.loginFormGroup.get('pseudo').value).toEqual('');
    });

    it('should check form validity', () => {
      loginApp.initLoginForm(formBuilder);
      expect(loginApp.loginFormGroup.get('pseudo').valid).toBeFalsy();
    });

    it('should set loginFromGroup validation required', () => {
      loginApp.initLoginForm(formBuilder);
      expect(loginApp.loginFormGroup.get('pseudo').validator).toEqual(Validators.required);
    });
  });

  describe('saveUserIdToStorage method', () => {
    beforeEach(() => {
      localStorage.removeItem(LOCAL_STORAGE_ID);
    });

    it('should set localStorage userId', () => {
      loginApp.saveUserIdToStorage('samet user Id');
      expect(localStorage.getItem(LOCAL_STORAGE_ID)).toEqual('samet user Id');
    })
  })

  describe('loginToHome method', () => {

    it('should call saveUserIdToStorage when user has id', () => {
      spyOn(loginApp, 'saveUserIdToStorage')
      const user = {} as UserModel;
      user._id = '456123';
      loginApp.loginToHome(user);
      expect(loginApp.saveUserIdToStorage).toHaveBeenCalledWith('456123');
    })

    it('should not call saveUserIdToStorage when user has no id', () => {
      spyOn(loginApp, 'saveUserIdToStorage');
      const user = {} as UserModel;
      loginApp.loginToHome(user);
      expect(loginApp.saveUserIdToStorage).not.toHaveBeenCalled();
    });

    it('should call redirect to when user has id', () => {
      spyOn(redirect, 'redirectTo');
      const user = {} as UserModel;
      user._id = '456123';
      user.pseudo = 'samet';
      loginApp.loginToHome(user);
      expect(redirect.redirectTo).toHaveBeenCalledWith('samet/rooms');
    });

    it('should not call saveUserIdToStorage when user has no id', () => {
      spyOn(redirect, 'redirectTo');
      const user = {} as UserModel;
      loginApp.loginToHome(user);
      expect(redirect.redirectTo).not.toHaveBeenCalled();
    });
  });

  describe('validPseudo method', () => {
    beforeEach(() => {
      loginApp.loginFormGroup = formBuilder.group({
        pseudo: ['samet', Validators.required]
      });
    });

    it('should call addUserByPseudo from add user int', () => {
      spyOn(addUserInt, 'addUserByPseudo').and.callThrough();
      loginApp.validatePseudo();
      expect(addUserInt.addUserByPseudo).toHaveBeenCalledWith('samet');
    });

    it('should call setUserName from loggedUser int', () => {
      spyOn(loggedUser, 'setUserName');
      loginApp.validatePseudo();
      expect(loggedUser.setUserName).toHaveBeenCalledWith('user-samet');
    });

    it('should call loginToHome', () => {
      spyOn(loginApp, 'loginToHome');
      loginApp.validatePseudo();
      expect(loginApp.loginToHome).toHaveBeenCalledWith({pseudo: 'user-samet'} as UserModel);
    });
  });

  describe('HTML DOM tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
      loginApp.loginFormGroup = formBuilder.group({
        pseudo: ['samet', Validators.required]
      });
    });

    it('should display formGroup', () => {
      const formGroup = fixture.nativeElement.querySelector('form');
      expect(formGroup.getAttribute('ng-reflect-form')).toBeTruthy();
    });

    it('should display label pseudo', () => {
      const formGroupLabel = fixture.nativeElement.querySelector('.form-group label');
      expect(formGroupLabel.getAttribute('for')).toEqual('pseudoLogin');
      expect(formGroupLabel.textContent).toEqual('Pseudo');
    });

    describe('input element', () => {
      it('should display input with formControlName', () => {
        const formGroupInput = fixture.nativeElement.querySelector('.form-group input');
        expect(formGroupInput.getAttribute('formControlName')).toEqual('pseudo');
        expect(formGroupInput.id).toEqual('pseudoLogin');
        expect(formGroupInput.getAttribute('minlength')).toEqual('4');
        expect(formGroupInput.getAttribute('maxlength')).toEqual('20');
        expect(formGroupInput.getAttribute('autofocus')).not.toEqual(null);
      });

      it('should add class is-invalid to input', () => {
        loginApp.loginFormGroup.controls.pseudo.setValue('');
        loginApp.loginFormGroup.controls.pseudo.markAsDirty();
        fixture.detectChanges();
        const formGroupInput = fixture.nativeElement.querySelector('.form-group input');
        expect(formGroupInput.classList.toString().includes('is-invalid')).toBeTruthy();
      });

      it('should not add class is-invalid to input', () => {
        loginApp.loginFormGroup.controls.pseudo.setValue('test');
        loginApp.loginFormGroup.controls.pseudo.markAsDirty();
        fixture.detectChanges();
        const formGroupInput = fixture.nativeElement.querySelector('.form-group input');
        expect(formGroupInput.classList.toString().includes('is-invalid')).toBeFalsy();
      });

      it('should not add class is-invalid to input 2 scen', () => {
        loginApp.loginFormGroup.controls.pseudo.setValue('');
        loginApp.loginFormGroup.controls.pseudo.markAsPristine();
        fixture.detectChanges();
        const formGroupInput = fixture.nativeElement.querySelector('.form-group input');
        expect(formGroupInput.classList.toString().includes('is-invalid')).toBeFalsy();
      });
    });

    describe('small info element', () => {
      it('should display small info with text', () => {
        const formGroupSmall = fixture.nativeElement.querySelector('.form-group small');
        expect(formGroupSmall.textContent).toEqual(' Your pseudo must be 4-20 characters long. ');
      });

      it('should display small with class text-danger', () => {
        loginApp.loginFormGroup.controls.pseudo.setValue('');
        loginApp.loginFormGroup.controls.pseudo.markAsDirty();
        fixture.detectChanges();
        const formGroupSmall = fixture.nativeElement.querySelector('.form-group small');
        expect(formGroupSmall.classList.toString().includes('text-danger')).toBeTruthy();
        expect(formGroupSmall.classList.toString().includes('text-muted')).toBeFalsy();
      });

      it('should display small with class text-muted', () => {
        loginApp.loginFormGroup.controls.pseudo.setValue('sssss');
        loginApp.loginFormGroup.controls.pseudo.markAsDirty();
        fixture.detectChanges();
        const formGroupSmall = fixture.nativeElement.querySelector('.form-group small');
        expect(formGroupSmall.classList.toString().includes('text-danger')).toBeFalsy();
        expect(formGroupSmall.classList.toString().includes('text-muted')).toBeTruthy();
      });
    });

    describe('submit button', () => {
      it('should display button submit type', () => {
        const formGroupBtn = fixture.nativeElement.querySelector('button');
        expect(formGroupBtn.textContent).toEqual('Submit');
        expect(formGroupBtn.getAttribute('type')).toEqual('submit');
      });

      it('should disable button', () => {
        loginApp.loginFormGroup.controls.pseudo.setValue('');
        fixture.detectChanges();
        const formGroupBtn = fixture.nativeElement.querySelector('button');
        expect(formGroupBtn.disabled).toBeTruthy();
      });

      it('should not disable button', () => {
        loginApp.loginFormGroup.controls.pseudo.setValue('test');
        fixture.detectChanges();
        const formGroupBtn = fixture.nativeElement.querySelector('button');
        expect(formGroupBtn.disabled).toBeFalsy();
      });

      it('should submit form button', () => {
        loginApp.loginFormGroup.controls.pseudo.setValue('test');
        fixture.detectChanges();
        const formGroupBtn = fixture.nativeElement.querySelector('button');
        spyOn(loginApp, 'validatePseudo')
        formGroupBtn.click();
        expect(loginApp.validatePseudo).toHaveBeenCalled();
      });
    });
  });

});

class AddUserInterfaceMock {
  addUserByPseudo(): Observable<any> {
    const user = {pseudo: 'user-samet'} as UserModel;
    return of(user);
  }
}

class RedirectionInterfaceMock {
  redirectTo(path: string): void {}
}

class LoggedUserInterfaceMock {
  private userName: string;
  setUserName(userName: string): void {
    this.userName = userName;
  }
}
