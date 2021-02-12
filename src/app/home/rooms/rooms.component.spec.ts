import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RoomsComponent} from "./rooms.component";
import {RoomsListComponentMock} from "../../tests-spec-mocks/components-mock/rooms-list.component.mock";
import {CreateRoomComponentMock} from "../../tests-spec-mocks/components-mock/create-room.component.mock";
import {By} from "@angular/platform-browser";
import {Observable, Subject} from "rxjs";

describe('RoomsComponent', () => {
  let fixture: ComponentFixture<RoomsComponent>;
  let roomsComponent: RoomsComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RoomsComponent,
        RoomsListComponentMock,
        CreateRoomComponentMock
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(RoomsComponent);
    roomsComponent = fixture.componentInstance;
  });

  it('should create rooms component', () => {
    expect(roomsComponent).toBeTruthy();
  });

  it('should next event on createRoom method', () => {
    spyOn(roomsComponent.$createRoomEvent, 'next');
    roomsComponent.createRoom();
    expect(roomsComponent.$createRoomEvent.next).toHaveBeenCalled();
  });

  describe('HTML DOM spec', () => {
    it('should display two blocks', () => {
      const roomCompBlocks = fixture.debugElement.queryAll(By.css('.row div'));
      expect(roomCompBlocks[0].nativeElement.classList.toString()).toEqual('col-12 col-md-4 pl-md-0 px-0 mb-2 mb-md-0 pr-md-3');
      expect(roomCompBlocks[1].nativeElement.classList.toString()).toEqual('col-12 col-md-8 pr-md-0 px-0');
    });

    it('should display create room component', () => {
      const createRoomComp = fixture.nativeElement.querySelector('app-create-room');
      expect(createRoomComp).toBeTruthy();
    });

    it('should display app-rooms-list', () => {
      const roomsListComp = fixture.nativeElement.querySelector('app-rooms-list');
      expect(roomsListComp).toBeTruthy();
    });

    it('should call create room when createRoomEvent', () => {
      spyOn(roomsComponent, 'createRoom');
      const createRoomComp = fixture.debugElement.query(By.css('app-create-room'));
      createRoomComp.triggerEventHandler('createRoomEvent', {});
      fixture.detectChanges();
      expect(roomsComponent.createRoom).toHaveBeenCalled();
    });

    it('should call create room when createRoomEvent', () => {
      const roomsList = fixture.nativeElement.querySelector('app-rooms-list');
      roomsComponent.$createRoomEvent = new Subject();
      fixture.detectChanges();
      expect(roomsList.getAttribute('ng-reflect-_room-created')).toBeTruthy();
    });
  });

});
