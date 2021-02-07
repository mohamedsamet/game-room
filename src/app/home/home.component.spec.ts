import {ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { DisconnectionInterface } from '../interfaces/user/disconnection.interface';
import { LOCAL_STORAGE_ID } from '../constants/rooms.constant';
import { Observable, of } from 'rxjs';
import {RedirectionInterfaceMock} from "../tests-spec-mocks/redirection.mock";
import {LoggedUserInterfaceMock} from "../tests-spec-mocks/logged-user.mock";
import {DisconnectionInterfaceMock} from "../tests-spec-mocks/disconnection.mock";

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let homeApp: HomeComponent;
  let redirect: any;
  let disconnectInt: any;
  let loggedUser: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {provide: 'DisconnectionInterface', useClass: DisconnectionInterfaceMock},
        {provide: 'RedirectionInterface', useClass: RedirectionInterfaceMock},
        {provide: 'LoggedUserInterface', useClass: LoggedUserInterfaceMock}],
      declarations: [
        HomeComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    homeApp = fixture.componentInstance;
    redirect = TestBed.get('RedirectionInterface');
    disconnectInt = TestBed.get('DisconnectionInterface');
    loggedUser = TestBed.get('LoggedUserInterface');
  });

  it('should create the home component', () => {
    expect(homeApp).toBeTruthy();
  });

  describe('getUSerName method', () => {
    it('should call getusername method on init', () => {
      spyOn(homeApp, 'getUserName');
      homeApp.ngOnInit();
      expect(homeApp.getUserName).toHaveBeenCalled()
    });

    it('should set username to right value', () => {
      loggedUser.setUserName('samet');
      homeApp.ngOnInit();
      expect(homeApp.userName).toEqual('samet');
    });
  });

  describe('logoutAction method', () => {
    it('should remove localStorage variable', () => {
      localStorage.setItem(LOCAL_STORAGE_ID, 'hello');
      homeApp.logOutAction();
      expect(localStorage.getItem(LOCAL_STORAGE_ID)).toBeFalsy();
    });

    it('should redirect to /', () => {
      spyOn(redirect, 'redirectTo');
      homeApp.logOutAction();
      expect(redirect.redirectTo).toHaveBeenCalledWith('/');
    });
  });

  describe('disconnect method', () => {
    it('should call disconnect User if userId exist', () => {
      spyOn(disconnectInt, 'disconnectUser').and.callThrough();
      localStorage.setItem(LOCAL_STORAGE_ID, 'userId');
      homeApp.disconnect();
      expect(disconnectInt.disconnectUser).toHaveBeenCalled();
    });

    it('should call logoutAction after disconnecting', () => {
      spyOn(homeApp, 'logOutAction');
      localStorage.setItem(LOCAL_STORAGE_ID, 'userId');
      homeApp.disconnect();
      expect(homeApp.logOutAction).toHaveBeenCalled();
    });

    it('should call logoutAction if userId not exist', () => {
      spyOn(homeApp, 'logOutAction');
      localStorage.removeItem(LOCAL_STORAGE_ID);
      homeApp.disconnect();
      expect(homeApp.logOutAction).toHaveBeenCalled();
    });
  });

  describe('HTML DOM tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should display title', () => {
      const titleDom = fixture.nativeElement.querySelector('.navbar-brand');
      expect(titleDom.textContent).toEqual('Game room');
    });

    it('should display userName', () => {
      homeApp.userName = 'samet';
      fixture.detectChanges();
      const userName = fixture.nativeElement.querySelector('.navbar p');
      expect(userName.textContent).toEqual('samet');
    });

    it('should disconnect when click on go-out link', () => {
      const goOutLink = fixture.nativeElement.querySelector('.navbar .go-out');
      spyOn(homeApp, 'disconnect');
      goOutLink.click();
      expect(homeApp.disconnect).toHaveBeenCalled();
    });

    it('should contain router-outlet element', () => {
      const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
      expect(routerOutlet).toBeTruthy();
    });
  });
});

