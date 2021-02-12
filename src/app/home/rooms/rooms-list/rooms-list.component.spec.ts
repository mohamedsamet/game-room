import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsListComponent } from './rooms-list.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ManageRoomsMock } from '../../../tests-spec-mocks/manage-rooms.mock';
import { GetRoomsNotifMock } from '../../../tests-spec-mocks/get-rooms-notif.mock';
import { EmitRoomsMock } from '../../../tests-spec-mocks/emit-rooms.mock';
import { RedirectionInterfaceMock } from '../../../tests-spec-mocks/redirection.mock';
import { RoomsHelper } from '../../../tests-spec-mocks/helpers/room.service.spec.helper';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { By } from '@angular/platform-browser';

describe('RoomsListComponent', () => {
  let fixture: ComponentFixture<RoomsListComponent>;
  let roomsList: RoomsListComponent;
  let getRoomsNotif: GetRoomsNotifMock
  let manageRooms: ManageRoomsMock;
  let emitRoomsMock: EmitRoomsMock;
  let redirect: RedirectionInterfaceMock;
  const activeRoute = {} as ActivatedRoute;
  activeRoute.outlet = 'urltest';
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [
        RoomsListComponent,
        PaginatorComponent
      ],
      providers: [
        {provide: 'ManageRoomsInterface', useClass: ManageRoomsMock},
        {provide: 'GetRoomsNotifInterface', useClass: GetRoomsNotifMock},
        {provide: 'EmitRoomsNotifInterface', useClass: EmitRoomsMock},
        {provide: 'RedirectionInterface', useClass: RedirectionInterfaceMock},
        {provide: ActivatedRoute, useValue: activeRoute}
        ]
    }).compileComponents();
    fixture = TestBed.createComponent(RoomsListComponent);
    getRoomsNotif = TestBed.get('GetRoomsNotifInterface');
    redirect = TestBed.get('RedirectionInterface');
    emitRoomsMock = TestBed.get('EmitRoomsNotifInterface');
    manageRooms = TestBed.get('ManageRoomsInterface');
    roomsList = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the rooms list component', () => {
    expect(roomsList).toBeTruthy();
  });

  describe('ngOnInit method', () => {
    it('should call get Rooms on Init', () => {
      spyOn(roomsList, 'getRooms');
      roomsList.ngOnInit();
      expect(roomsList.getRooms).toHaveBeenCalled();
    });

    it('should call listento room creation on init', () => {
      spyOn(roomsList, 'listenToRoomCreation');
      roomsList.ngOnInit();
      expect(roomsList.listenToRoomCreation).toHaveBeenCalled();
    });

    it('should set userId from localstorage on init', () => {
      localStorage.setItem('g-r-userId', 'sametid');
      roomsList.ngOnInit();
      expect(roomsList.userId).toEqual('sametid');
    });
  });

  describe('openRoom method', () => {
    it('should call set roomName from manage int', () => {
      spyOn(manageRooms, 'setRoomName');
      roomsList.openRoom(new RoomsHelper().room2);
      expect(manageRooms.setRoomName).toHaveBeenCalledWith('room2');
    });

    it('should call redirect to the room', () => {
      spyOn(redirect, 'redirectTo');
      roomsList.openRoom(new RoomsHelper().room2);
      expect(redirect.redirectTo).toHaveBeenCalledWith('fggggdfdf', activeRoute);
    });
  });

  describe('listenToRoomCreation method', () => {
    it('should subscribe to room created', () => {
      spyOn(roomsList.$roomCreated, 'subscribe');
      roomsList.listenToRoomCreation();
      expect(roomsList.$roomCreated.subscribe).toHaveBeenCalled();
    });

    it('should call selectePage with page num 1if selectedPage != 1', () => {
      spyOn(roomsList, 'selectPage');
      roomsList.selectedPage = 2;
      roomsList.listenToRoomCreation();
      roomsList.$roomCreated.next();
      expect(roomsList.selectPage).toHaveBeenCalledWith(1);
    });

    it('should not call selectePage with page num 1if selectedPage == 1', () => {
      spyOn(roomsList, 'selectPage');
      roomsList.selectedPage = 1;
      roomsList.listenToRoomCreation();
      roomsList.$roomCreated.next();
      expect(roomsList.selectPage).not.toHaveBeenCalled();
    });

    it('should set selected page to from pagination child component', () => {
      roomsList.selectedPage = 2;
      roomsList.paginator.selectedPage = 2;
      roomsList.listenToRoomCreation();
      roomsList.$roomCreated.next();
      fixture.detectChanges();
      expect(roomsList.paginator.selectedPage).toEqual(1);
    });
  });

  describe('getRooms method', () => {
    beforeEach(() => {
      roomsList.roomList = [];
      roomsList.totalRooms = null;
    });
    it('should call getRoomsSockNotif from int', () => {
      spyOn(getRoomsNotif, 'getRoomsSockNotif').and.callThrough();
      roomsList.getRooms();
      expect(getRoomsNotif.getRoomsSockNotif).toHaveBeenCalled();
    });

    it('should not show reload btn if selected page =1', () => {
      roomsList.selectedPage = 1;
      roomsList.getRooms();
      expect(roomsList.showReloadBtn).toBeFalsy();
    });

    it('should not applyroomResult id selected page != 1', () => {
      roomsList.selectedPage = 2;
      roomsList.getRooms();
      expect(roomsList.roomList.length).toEqual(0);
      expect(roomsList.totalRooms).toBeFalsy();
    });

    it('should show reload btn', () => {
      roomsList.selectedPage = 2;
      roomsList.getRooms();
      expect(roomsList.showReloadBtn).toBeTruthy();
    });

    it('should set roomList with results if selected page = 1', () => {
      roomsList.selectedPage =1;
      roomsList.getRooms();
    });
  });

  describe('selectPage method', () => {
    it('should set selectedPage', () => {
      roomsList.selectPage(5);
      expect(roomsList.selectedPage).toEqual(5);
    });

    it('should call getRoomsByPage', () => {
      spyOn(roomsList, 'getRoomsByPage');
      roomsList.selectPage(5);
      expect(roomsList.getRoomsByPage).toHaveBeenCalledWith(20, 24);
    });
  });

  describe('getRoomsByPage method', () => {
    it('should call getRoomsByPage from int', () => {
      spyOn(manageRooms, 'getRoomsByPage').and.callThrough();
      roomsList.getRoomsByPage(20, 24);
      expect(manageRooms.getRoomsByPage).toHaveBeenCalledWith(20, 24);
    });

    it('should set reload btn to false', () => {
      roomsList.showReloadBtn = true;
      roomsList.getRoomsByPage(20, 24);
      expect(roomsList.showReloadBtn).toBeFalsy();
    });

    it('should set roomList', () => {
      roomsList.getRoomsByPage(20, 24);
      const expectedKeys = ['name', 'createdByUserId', 'users', '_id', 'createdBy'].sort();
      expect(Object.keys(roomsList.roomList[1]).sort()).toEqual(expectedKeys);
      expect(roomsList.totalRooms).toEqual(3);
      expect(roomsList.roomList[2]._id).toEqual('zersssszer');
      expect(roomsList.roomList[2].name).toEqual('room3');
      expect(roomsList.roomList[2].createdByUserId).toEqual('54656');
      expect(roomsList.roomList[2].users.length).toEqual(3);
      expect(roomsList.roomList[2].createdBy).toEqual('yasmine');
    });
  });

  describe('initPagination method', () => {
    it('should set selected Page', () => {
      roomsList.initPagination();
      expect(roomsList.selectedPage).toEqual(1);
    });

    it('should set selected Page of paginator', () => {
      roomsList.paginator.selectedPage = 2;
      roomsList.initPagination();
      expect(roomsList.paginator.selectedPage).toEqual(1);
    });
  });

  describe('reloadRooms method', () => {
    it('should call getRoomsByPAge', () => {
      spyOn(roomsList, 'getRoomsByPage');
      roomsList.reloadRooms();
      expect(roomsList.getRoomsByPage).toHaveBeenCalledWith(0, 4);
    });

    it('should call initPagination', () => {
      spyOn(roomsList, 'initPagination');
      roomsList.reloadRooms();
      expect(roomsList.initPagination).toHaveBeenCalled();
    });
  });

  describe('deleteRoom method', () => {
    it('should call deleteRoom from int', () => {
      spyOn(manageRooms, 'deleteRoom').and.callThrough();
      roomsList.userId = '999';
      roomsList.deleteRoom('525');
      expect(manageRooms.deleteRoom).toHaveBeenCalledWith('525', '999');
    });

    it('should call selectPage 1', () => {
      spyOn(roomsList, 'selectPage').and.callThrough();
      roomsList.deleteRoom('525');
      expect(roomsList.selectPage).toHaveBeenCalledWith(1);
    });

    it('should call initPagination', () => {
      spyOn(roomsList, 'initPagination').and.callThrough();
      roomsList.deleteRoom('525');
      expect(roomsList.initPagination).toHaveBeenCalled();
    });

    it('should emit notif of room', () => {
      spyOn(emitRoomsMock, 'emitRoomNotif').and.callThrough();
      roomsList.deleteRoom('525');
      fixture.detectChanges();
      expect(emitRoomsMock.emitRoomNotif).toHaveBeenCalled();
    });
  });

  describe('HTML spec DOM', () => {
    it('should display label Rooms', () => {
      const labelElement = fixture.nativeElement.querySelector('label');
      expect(labelElement.textContent.trim()).toEqual('Rooms');
    });

    describe('Reload button', () => {
      it('should show reload btn', () => {
        roomsList.showReloadBtn = true;
        fixture.detectChanges();
        const reloadBtnElement = fixture.nativeElement.querySelector('div.reload-icon');
        expect(reloadBtnElement).toBeTruthy();
      });

      it('should not show reload btn', () => {
        roomsList.showReloadBtn = false;
        fixture.detectChanges();
        const reloadBtnElement = fixture.nativeElement.querySelector('div.reload-icon');
        expect(reloadBtnElement).toBeFalsy();
      });

      it('should reloadRooms on click', () => {
        spyOn(roomsList, 'reloadRooms');
        roomsList.showReloadBtn = true;
        fixture.detectChanges();
        const reloadBtnElement = fixture.nativeElement.querySelector('div.reload-icon');
        reloadBtnElement.click();
        expect(roomsList.reloadRooms).toHaveBeenCalled();
      });
    });

    describe('app-paginator element', () => {
      it('should show app paginator', () => {
        const appPaginator = fixture.nativeElement.querySelector('app-paginator');
        expect(appPaginator).toBeTruthy();
      });

      it('should pass totalRooms', () => {
        roomsList.totalRooms = 99;
        fixture.detectChanges();
        const appPaginator = fixture.nativeElement.querySelector('app-paginator');
        expect(appPaginator.getAttribute('ng-reflect-total-result')).toEqual('99');
      });

      it('should call selectPage when selectPageEvent', () => {
        spyOn(roomsList, 'selectPage');
        roomsList.paginator.selectedPageEvent.emit(5);
        expect(roomsList.selectPage).toHaveBeenCalledWith(5);
      });
    });

    describe('table of content', () => {
      beforeEach(() => {
        roomsList.roomList = new RoomsHelper().rooms;
        fixture.detectChanges();
      });

      it('should not show table if roomList empty and show small empty message', () => {
        roomsList.roomList = [];
        fixture.detectChanges();
        const tableContent = fixture.nativeElement.querySelector('table.table');
        const emptyMessage = fixture.nativeElement.querySelector('p small');
        expect(tableContent).toBeFalsy();
        expect(emptyMessage.textContent.trim()).toEqual('Rooms list is empty');
      });

      it('should show table if roomList exist', () => {
        const tableContent = fixture.nativeElement.querySelector('table.table');
        const emptyMessage = fixture.nativeElement.querySelector('p small');
        expect(tableContent).toBeTruthy();
        expect(emptyMessage).toBeFalsy()
      });

      it('should show table header', () => {
        const tableContentHeader = fixture.debugElement.queryAll(By.css('table.table thead th'));
        expect(tableContentHeader[0].nativeElement.textContent.trim()).toEqual('Name');
        expect(tableContentHeader[1].nativeElement.textContent.trim()).toEqual('Created By');
        expect(tableContentHeader[2].nativeElement.textContent.trim()).toEqual('N° persons');
      });

      it('should display content of table', () => {
        const tableContentRows = fixture.debugElement.queryAll(By.css('table.table tbody tr:nth-child(1) td'));
        expect(tableContentRows[0].nativeElement.textContent.trim()).toEqual('room1');
        expect(tableContentRows[1].nativeElement.textContent.trim()).toEqual('samet');
        expect(tableContentRows[2].nativeElement.textContent.trim()).toEqual('2');
      });

      it('should open room', () => {
        spyOn(roomsList, 'openRoom');
        const tableContentRows = fixture.nativeElement.querySelector('table.table tbody tr:nth-child(1)');
        tableContentRows.click();
        fixture.detectChanges();
        expect(roomsList.openRoom).toHaveBeenCalledWith(new RoomsHelper().room1);
      });

      describe('delete Icon', () => {
        it('should not show delete icon if not created b userID', () => {
          const deleteIcon = fixture.nativeElement.querySelector('table.table tbody tr:nth-child(1) span');
          expect(deleteIcon).toBeFalsy();
        });

        it('should show delete icon if created b userID', () => {
          roomsList.userId = '54654';
          fixture.detectChanges();
          const deleteIcon = fixture.nativeElement.querySelector('table.table tbody tr:nth-child(1) span');
          expect(deleteIcon).toBeTruthy();
        });

        it('should call delete room', () => {
          spyOn(roomsList, 'deleteRoom');
          roomsList.userId = '54654';
          fixture.detectChanges();
          const deleteIcon = fixture.nativeElement.querySelector('table.table tbody tr:nth-child(1) span');
          deleteIcon.click();
          expect(roomsList.deleteRoom).toHaveBeenCalledWith('wxcccc');
        });
      });
    });
  });
});

