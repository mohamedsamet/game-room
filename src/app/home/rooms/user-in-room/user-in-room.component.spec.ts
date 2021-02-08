import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInRoomComponent } from './user-in-room.component';
import { RoomsHelper } from '../../../tests-spec-mocks/helpers/room.service.spec.helper';
import { By } from '@angular/platform-browser';

describe('UserInRoom', () => {
  let fixture: ComponentFixture<UserInRoomComponent>;
  let userInRoom: UserInRoomComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserInRoomComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UserInRoomComponent);
    userInRoom = fixture.componentInstance;
  });

  it('should create the user in room component', () => {
    expect(userInRoom).toBeTruthy();
  });

  describe('HTML DOM tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should display label', () => {
      const titleDom = fixture.nativeElement.querySelector('label');
      expect(titleDom.textContent).toEqual('User connected');
    });

    it('should display users', () => {
      userInRoom.users = new RoomsHelper().users;
      fixture.detectChanges();
      const users = fixture.debugElement.queryAll(By.css('ul li'));
      expect(users.length).toEqual(3);
    });
  });
});

