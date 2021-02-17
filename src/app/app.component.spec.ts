import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoggedUserInterface } from './interfaces/user/logged-user.interface';
import { LOCAL_STORAGE_ID } from './constants/rooms.constant';
import { RedirectionInterface } from './interfaces/utilities/redirection.interface';
import { LoggedUserInterfaceMock } from './tests-spec-mocks/logged-user.mock';
import { RedirectionInterfaceMock } from './tests-spec-mocks/redirection.mock';
import { AlertComponentMock } from './tests-spec-mocks/components-mock/alert.component.mock';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let redirectInt: any;
  let loggedUserInt: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {provide: 'LoggedUserInterface', useClass: LoggedUserInterfaceMock},
        {provide: 'RedirectionInterface', useClass: RedirectionInterfaceMock}],
      declarations: [
        AppComponent,
        AlertComponentMock
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    redirectInt = TestBed.get('RedirectionInterface');
    loggedUserInt = TestBed.get('LoggedUserInterface');
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('manageAutoLogin method', () => {
    beforeEach(() => {
      localStorage.removeItem(LOCAL_STORAGE_ID);
    });

    it('should call manageAutoLogin on init', () => {
      spyOn(app, 'manageAutoLogin');
      app.ngOnInit();
      expect(app.manageAutoLogin).toHaveBeenCalled();
    });

    it('should call getLoggedUser if user credential exists', () => {
      spyOn(app, 'getLoggedUser');
      localStorage.setItem(LOCAL_STORAGE_ID, 'test user id');
      app.manageAutoLogin();
      expect(app.getLoggedUser).toHaveBeenCalled();
    });

    it('should not call getLoggedUser if user credential does not exists', () => {
      spyOn(app, 'getLoggedUser');
      app.manageAutoLogin();
      expect(app.getLoggedUser).not.toHaveBeenCalled();
    });

    it('should redirect to / if user credential does not exists', () => {
      spyOn(redirectInt, 'redirectTo');
      app.manageAutoLogin();
      expect(redirectInt.redirectTo).toHaveBeenCalledWith('/');
    });

    it('should not redirect to / if user credential exist', () => {
      spyOn(redirectInt, 'redirectTo');
      localStorage.setItem(LOCAL_STORAGE_ID, 'test user id');
      app.manageAutoLogin();
      expect(redirectInt.redirectTo).not.toHaveBeenCalledWith('/');
    });
  });

  describe('getLoggedUser method', () => {
    it('should call getLoggedUser from service', () => {
      spyOn(loggedUserInt, 'getLoggedUser').and.callThrough();
      app.getLoggedUser();
      expect(loggedUserInt.getLoggedUser).toHaveBeenCalled();
    });

    it('should call setUserName from logged user int', () => {
      spyOn(loggedUserInt, 'setUserName');
      app.getLoggedUser();
      expect(loggedUserInt.setUserName).toHaveBeenCalledWith('samet');
    });

    it('should redirect to rooms with corresponding pseudo', () => {
      spyOn(redirectInt, 'redirectTo');
      loggedUserInt.setError();
      app.getLoggedUser();
      expect(redirectInt.redirectTo).toHaveBeenCalledWith('/');
    });
  });

});
